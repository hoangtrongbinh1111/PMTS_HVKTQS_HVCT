const { TBL_RELA_NHOMNGUOI, TBL_NGUOIDUNG, TBL_NHOMNGUOIDUNG } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_RELA_NHOMNGUOI}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
        return knex.schema.createTable(`${TBL_RELA_NHOMNGUOI}`, function (table) {
          table.string('maNguoiDung');
          table.foreign('maNguoiDung').references('maNguoiDung').inTable(`${TBL_NGUOIDUNG}`);
          table.string('maNhom');
          table.foreign('maNhom').references('maNhom').inTable(`${TBL_NHOMNGUOIDUNG}`);
          table.string('ghiChu');
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_RELA_NHOMNGUOI} table:`, error);
    });

};
