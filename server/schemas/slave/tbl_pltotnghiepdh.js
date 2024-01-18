const { TBL_PLTOTNGHIEPDH, TBL_PLTOTNGHIEPDH_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_PLTOTNGHIEPDH}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_PLTOTNGHIEPDH} table created successfully.`);
        return knex.schema.createTable(`${TBL_PLTOTNGHIEPDH}`, function (table) {
          table.increments(`${TBL_PLTOTNGHIEPDH_KEY}`).primary();
          table.string('tenPhanloai').notNullable();
          table.string('kiHieuPhanloai').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_PLTOTNGHIEPDH} table:`, error);
    });

};

