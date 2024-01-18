const { TBL_RELA_BAITHITUITHI, TBL_TUITHI, TBL_BAITHI_KEY, TBL_TUITHI_KEY, TBL_BAITHI } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_RELA_BAITHITUITHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_RELA_BAITHITUITHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_RELA_BAITHITUITHI}`, function (table) {
          table.string(`${TBL_TUITHI_KEY}`);
          table.foreign(`${TBL_TUITHI_KEY}`).references(`${TBL_TUITHI_KEY}`).inTable(`${TBL_TUITHI}`);
          table.string(`${TBL_BAITHI_KEY}`);
          table.foreign(`${TBL_BAITHI_KEY}`).references(`${TBL_BAITHI_KEY}`).inTable(`${TBL_BAITHI}`);
          table.string('soPhach').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_RELA_BAITHITUITHI} table:`, error);
    });

};
