const { TBL_LEPHITHI, TBL_LEPHITHI_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_LEPHITHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_LEPHITHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_LEPHITHI}`, function (table) {
          table.increments(`${TBL_LEPHITHI_KEY}`).primary();
          table.int('soMon').notNullable();
          table.float('donGia').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_LEPHITHI} table:`, error);
    });

};
