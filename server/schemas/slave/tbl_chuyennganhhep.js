const { TBL_CHUYENNGANHHEP, TBL_CHUYENNGANHHEP_KEY, TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_CHUYENNGANHHEP}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_CHUYENNGANHHEP} table created successfully.`);
        return knex.schema.createTable(`${TBL_CHUYENNGANHHEP}`, function (table) {
          table.increments(`${TBL_CHUYENNGANHHEP_KEY}`).primary();
          table.string('tenChuyennganhhep').notNullable();
          table.string('kiHieuChuyennganhhep').notNullable();
          table.string('ghiChu');
          table.string(`${TBL_CHUYENNGANHTS_KEY}`);
          table.foreign(`${TBL_CHUYENNGANHTS_KEY}`).references(`${TBL_CHUYENNGANHTS_KEY}`).inTable(`${TBL_CHUYENNGANHTS}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_CHUYENNGANHHEP} table:`, error);
    });

};
