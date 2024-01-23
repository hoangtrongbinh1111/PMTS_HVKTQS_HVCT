const { TBL_NGANHTS, TBL_NGANHTS_KEY, TBL_MONTHI, TBL_MONTHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_NGANHTS}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_NGANHTS} table created successfully.`);
        return knex.schema.createTable(`${TBL_NGANHTS}`, function (table) {
          table.increments(`${TBL_NGANHTS_KEY}`).primary();
          table.string('tenNganh').notNullable();
          table.string('kihieuNganh').notNullable();
          table.string(`maMon1`);
          table.foreign(`maMon1`).references(`${TBL_MONTHI_KEY}`).inTable(`${TBL_MONTHI}`);
          table.string(`maMon2`);
          table.foreign(`maMon2`).references(`${TBL_MONTHI_KEY}`).inTable(`${TBL_MONTHI}`);
          table.string(`maMon3`);
          table.foreign(`maMon3`).references(`${TBL_MONTHI_KEY}`).inTable(`${TBL_MONTHI}`);
          table.string(`ghiChu`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_NGANHTS} table:`, error);
    });

};
