const { TBL_QUYEN, TBL_QUYEN_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_QUYEN}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_QUYEN} table created successfully.`);
        return knex.schema.createTable(`${TBL_QUYEN}`, function (table) {
          table.increments(`${TBL_QUYEN_KEY}`).primary();
          table.string('tenChucnang').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NHOMNGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_QUYEN} table:`, error);
    });

};
