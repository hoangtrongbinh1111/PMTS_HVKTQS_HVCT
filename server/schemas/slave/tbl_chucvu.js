const { TBL_CHUCVU, TBL_CHUCVU_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_CHUCVU}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_CHUCVU} table created successfully.`);
        return knex.schema.createTable(`${TBL_CHUCVU}`, function (table) {
          table.increments(`${TBL_CHUCVU_KEY}`).primary();
          table.string('tenChucvu').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_CHUCVU} table:`, error);
    });

};

