const { TBL_DIACHIDAOTAO, TBL_DIACHIDAOTAO_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_DIACHIDAOTAO}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_DIACHIDAOTAO} table created successfully.`);
        return knex.schema.createTable(`${TBL_DIACHIDAOTAO}`, function (table) {
          table.increments(`${TBL_DIACHIDAOTAO_KEY}`).primary();
          table.string('tenDc').notNullable();
          table.string('KiHieuDc').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_DIACHIDAOTAO} table:`, error);
    });

};

