const { TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY, TBL_NGANHTS, TBL_NGANHTS_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_CHUYENNGANHTS}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_CHUYENNGANHTS} table created successfully.`);
        return knex.schema.createTable(`${TBL_CHUYENNGANHTS}`, function (table) {
          table.increments(`${TBL_CHUYENNGANHTS_KEY}`).primary();
          table.string('tenChuyennganh').notNullable();
          table.string('kiHieuChuyennganh').notNullable();
          table.string('ghiChu');
          table.float('diemXetTuyenQS');
          table.float('diemChuanQS');
          table.float('diemXetTuyenDS');
          table.float('diemChuanDS');
          table.string(`${TBL_NGANHTS_KEY}`);
          table.foreign(`${TBL_NGANHTS_KEY}`).references(`${TBL_NGANHTS_KEY}`).inTable(`${TBL_NGANHTS}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_CHUYENNGANHTS} table:`, error);
    });

};
