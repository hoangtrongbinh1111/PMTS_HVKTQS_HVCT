const { TBL_NHOMNGUOIDUNG, TBL_NHOMNGUOIDUNG_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_NHOMNGUOIDUNG}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_NHOMNGUOIDUNG} table created successfully.`);
        return knex.schema.createTable(`${TBL_NHOMNGUOIDUNG}`, function (table) {
          table.increments(`${TBL_NHOMNGUOIDUNG_KEY}`).primary();
          table.string('tenNhom').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NHOMNGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_NHOMNGUOIDUNG} table:`, error);
    });

};
