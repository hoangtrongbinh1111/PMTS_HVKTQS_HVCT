const { TBL_HTKYLUAT, TBL_HTKYLUAT_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_HTKYLUAT}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_HTKYLUAT} table created successfully.`);
        return knex.schema.createTable(`${TBL_HTKYLUAT}`, function (table) {
          table.increments(`${TBL_HTKYLUAT_KEY}`).primary();
          table.string('tenHinhthuc').notNullable();
          table.float('mucTru').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_HTKYLUAT} table:`, error);
    });

};

