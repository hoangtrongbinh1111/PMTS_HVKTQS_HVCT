const { TBL_NGUOIDUNG, TBL_NGUOIDUNG_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_NGUOIDUNG}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
        return knex.schema.createTable(`${TBL_NGUOIDUNG}`, function (table) {
          table.increments(`${TBL_NGUOIDUNG_KEY}`).primary();
          table.string('tenDangKy').notNullable();
          table.string('matKhau').notNullable();
          table.string('hoTen').notNullable();
          table.datetime('ngayBD').defaultTo(knex.fn.now());
          table.datetime('ngayKT');
          table.string('anhDaiDien');
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_NGUOIDUNG} table:`, error);
    });

};

