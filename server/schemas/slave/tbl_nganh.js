const { TBL_NGANH, TBL_NGANH_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_NGANH}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_NGANH} table created successfully.`);
        return knex.schema.createTable(`${TBL_NGANH}`, function (table) {
          table.increments(`${TBL_NGANH_KEY}`).primary();
          table.string('tenNganh').notNullable();
          table.string('kihieuNganh').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_NGANH} table:`, error);
    });

};

