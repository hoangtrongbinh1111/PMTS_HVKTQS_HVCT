const { TBL_MONTHI, TBL_MONTHI_KEY, TBL_NHOMMONHOC, TBL_NHOMMONHOC_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_MONTHI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_MONTHI} table created successfully.`);
        return knex.schema.createTable(`${TBL_MONTHI}`, function (table) {
          table.increments(`${TBL_MONTHI_KEY}`).primary();
          table.string(`${TBL_NHOMMONHOC_KEY}`);
          table.foreign(`${TBL_NHOMMONHOC_KEY}`).references(`${TBL_NHOMMONHOC_KEY}`).inTable(`${TBL_NHOMMONHOC}`);
          table.string('tenMon').notNullable();
          table.float('diemLiet').notNullable();
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_MONTHI} table:`, error);
    });

};
