const { TBL_NHOMMONHOC, TBL_NHOMMONHOC_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_NHOMMONHOC}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_NHOMMONHOC} table created successfully.`);
        return knex.schema.createTable(`${TBL_NHOMMONHOC}`, function (table) {
          table.increments(`${TBL_NHOMMONHOC_KEY}`).primary();
          table.string('tenNhomMonHoc').notNullable();
          table.string('gioThi').notNullable();
          table.datetime('ngayThi').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_NHOMMONHOC} table:`, error);
    });

};

