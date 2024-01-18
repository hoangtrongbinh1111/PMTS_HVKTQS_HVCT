const { TBL_LOAIHINHDT, TBL_LOAIHINHDT_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_LOAIHINHDT}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_LOAIHINHDT} table created successfully.`);
        return knex.schema.createTable(`${TBL_LOAIHINHDT}`, function (table) {
          table.increments(`${TBL_LOAIHINHDT_KEY}`).primary();
          table.string('tenLoaihinh').notNullable();
          table.string('kiHieuLoaihinh').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_LOAIHINHDT} table:`, error);
    });

};

