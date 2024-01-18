const { TBL_THAMSOHETHONG, TBL_THAMSOHETHONG_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_THAMSOHETHONG}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_THAMSOHETHONG} table created successfully.`);
        return knex.schema.createTable(`${TBL_THAMSOHETHONG}`, function (table) {
          table.increments(`${TBL_THAMSOHETHONG_KEY}`).primary();
          table.string('donVicq').notNullable();
          table.string('tenDv').notNullable();
          table.string('diaChi').notNullable();
          table.string('chucVu_ngki').notNullable();
          table.string('tenNgki').notNullable();
          table.string('thuKi').notNullable();
          table.string('soDT').notNullable();
          table.datetime('ngayBDPhucKhao').notNullable();
          table.datetime('ngayKTPhucKhao').notNullable();
          table.datetime('ngayChamPhucKhao').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_THAMSOHETHONG} table:`, error);
    });

};

