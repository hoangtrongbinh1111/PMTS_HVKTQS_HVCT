const { TBL_DOTTUYENSINH, TBL_DOTTUYENSINH_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_DOTTUYENSINH}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_DOTTUYENSINH} table created successfully.`);
        return knex.schema.createTable(`${TBL_DOTTUYENSINH}`, function (table) {
          table.increments(`${TBL_DOTTUYENSINH_KEY}`).primary();
          table.string('tenDotTS').notNullable();
          table.string('tgianTS').notNullable();
          table.string('loaiTS').notNullable();
          table.string('duongDan').notNullable();
          table.string('chucVu_ngki').notNullable();
          table.integer('isActive').notNullable();
          table.string('ghiChu').notNullable();
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_NGUOIDUNG} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_DOTTUYENSINH} table:`, error);
    });

};

