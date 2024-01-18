const { TBL_DIEMCHUAN, TBL_DIEMCHUAN_KEY, TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY, TBL_DIACHIDAOTAO_KEY, TBL_DIACHIDAOTAO } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_DIEMCHUAN}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_DIEMCHUAN} table created successfully.`);
        return knex.schema.createTable(`${TBL_DIEMCHUAN}`, function (table) {
          table.increments(`${TBL_DIEMCHUAN_KEY}`).primary();
          table.string(`${TBL_CHUYENNGANHTS_KEY}`);
          table.foreign(`${TBL_CHUYENNGANHTS_KEY}`).references(`${TBL_CHUYENNGANHTS_KEY}`).inTable(`${TBL_CHUYENNGANHTS}`);
          table.string(`${TBL_DIACHIDAOTAO_KEY}`);
          table.foreign(`${TBL_DIACHIDAOTAO_KEY}`).references(`${TBL_DIACHIDAOTAO_KEY}`).inTable(`${TBL_DIACHIDAOTAO}`);
          table.float('diemChuanDS').notNullable();
          table.float('diemChuanQS').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_DIEMCHUAN} table:`, error);
    });

};
