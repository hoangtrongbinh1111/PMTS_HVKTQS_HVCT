const { TBL_MONTHI, TBL_MONTHI_KEY, TBL_TUITHI, TBL_TUITHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_TUITHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_TUITHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_TUITHI}`, function (table) {
          table.increments(`${TBL_TUITHI_KEY}`).primary();
          table.string(`${TBL_MONTHI_KEY}`);
          table.foreign(`${TBL_MONTHI_KEY}`).references(`${TBL_MONTHI_KEY}`).inTable(`${TBL_MONTHI}`);
          table.string('tenTui').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_TUITHI} table:`, error);
    });

};
