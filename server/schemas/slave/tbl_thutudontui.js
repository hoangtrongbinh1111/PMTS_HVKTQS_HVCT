const { TBL_THUTUDONTUI, TBL_THUTUDONTUI_KEY, TBL_NHOMMONHOC_KEY, TBL_NHOMMONHOC } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_THUTUDONTUI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_THUTUDONTUI} table created successfully.`);
        return knex.schema.createTable(`${TBL_THUTUDONTUI}`, function (table) {
          table.increments(`${TBL_THUTUDONTUI_KEY}`).primary();
          table.string(`${TBL_NHOMMONHOC_KEY}`);
          table.foreign(`${TBL_NHOMMONHOC_KEY}`).references(`${TBL_NHOMMONHOC_KEY}`).inTable(`${TBL_NHOMMONHOC}`);
          table.string('thuTuDon').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_THUTUDONTUI} table:`, error);
    });

};
