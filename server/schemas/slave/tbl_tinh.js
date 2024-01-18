const { TBL_TINH, TBL_TINH_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_TINH}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_TINH} table created successfully.`);
        return knex.schema.createTable(`${TBL_TINH}`, function (table) {
          table.increments(`${TBL_TINH_KEY}`).primary();
          table.string('tenTinh').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_TINH} table:`, error);
    });

};

