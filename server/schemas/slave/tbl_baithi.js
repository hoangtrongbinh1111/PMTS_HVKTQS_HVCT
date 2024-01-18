const { TBL_BAITHI, TBL_BAITHI_KEY, TBL_HOSOTHISINH, TBL_PHONGTHI, TBL_PHONGTHI_KEY, TBL_MONTHI, TBL_MONTHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_BAITHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_BAITHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_BAITHI}`, function (table) {
          table.increments(`${TBL_BAITHI_KEY}`).primary();
          table.datetime('ngayThi').notNullable();
          table.string('gioThi').notNullable();
          table.string('soPhach').notNullable();
          table.float('diemThi').notNullable();
          table.float('diemSua').notNullable();
          table.string(`soTT`);
          table.foreign(`soTT`).references(`soTT`).inTable(`${TBL_HOSOTHISINH}`);
          table.string(`${TBL_PHONGTHI_KEY}`);
          table.foreign(`${TBL_PHONGTHI_KEY}`).references(`${TBL_PHONGTHI_KEY}`).inTable(`${TBL_PHONGTHI}`);
          table.string(`${TBL_MONTHI_KEY}`);
          table.foreign(`${TBL_MONTHI_KEY}`).references(`${TBL_MONTHI_KEY}`).inTable(`${TBL_MONTHI}`);

        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_BAITHI} table:`, error);
    });

};
