const { TBL_DIADIEMTHI, TBL_DIADIEMTHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_DIADIEMTHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_DIADIEMTHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_DIADIEMTHI}`, function (table) {
          table.increments(`${TBL_DIADIEMTHI_KEY}`).primary();
          table.string('tenDiadiem').notNullable();
          table.string('KiHieuDiadiem').notNullable();
          table.string('gioTt').notNullable();
          table.string('ngayTt').notNullable();
          table.string('diaChi').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_DIADIEMTHI} table:`, error);
    });

};

