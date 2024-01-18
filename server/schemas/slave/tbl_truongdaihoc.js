const { TBL_TRUONGDAIHOC, TBL_TRUONGDAIHOC_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_TRUONGDAIHOC}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_TRUONGDAIHOC} table created successfully.`);
        return knex.schema.createTable(`${TBL_TRUONGDAIHOC}`, function (table) {
          table.increments(`${TBL_TRUONGDAIHOC_KEY}`).primary();
          table.string('tenTruong').notNullable();
          table.string('kiHieuTruong').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_TRUONGDAIHOC} table:`, error);
    });

};

