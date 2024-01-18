const { TBL_HTUUTIEN, TBL_HTUUTIEN_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_HTUUTIEN}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_HTUUTIEN} table created successfully.`);
        return knex.schema.createTable(`${TBL_HTUUTIEN}`, function (table) {
          table.increments(`${TBL_HTUUTIEN_KEY}`).primary();
          table.string('tenHinhthuc').notNullable();
          table.string('kiHieuHinhthuc').notNullable();
          table.float('congM1').notNullable();
          table.float('congM2').notNullable();
          table.float('congM3').notNullable();
          table.float('congM4').notNullable();
          table.float('congM5').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_HTUUTIEN} table:`, error);
    });

};

