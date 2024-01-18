const { TBL_PHONGTHI, TBL_PHONGTHI_KEY, TBL_DIADIEMTHI, TBL_DIADIEMTHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_PHONGTHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_PHONGTHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_PHONGTHI}`, function (table) {
          table.increments(`${TBL_PHONGTHI_KEY}`).primary();
          table.string('tenPhong').notNullable();
          table.string('giangDuongPhong').notNullable();
          table.integer('soLuong').notNullable();
          table.string('ghiChu');
          table.string(`${TBL_DIADIEMTHI_KEY}`);
          table.foreign(`${TBL_DIADIEMTHI_KEY}`).references(`${TBL_DIADIEMTHI_KEY}`).inTable(`${TBL_DIADIEMTHI}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_PHONGTHI} table:`, error);
    });

};
