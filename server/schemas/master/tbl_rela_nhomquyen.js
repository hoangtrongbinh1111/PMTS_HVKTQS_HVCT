const { TBL_RELA_NHOMQUYEN, TBL_QUYEN, TBL_NHOMNGUOIDUNG } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_RELA_NHOMQUYEN}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_RELA_NHOMQUYEN} table created successfully.`);
        return knex.schema.createTable(`${TBL_RELA_NHOMQUYEN}`, function (table) {
          table.string('maQuyen');
          table.foreign('maQuyen').references('maQuyen').inTable(`${TBL_QUYEN}`);
          table.string('maNhom');
          table.foreign('maNhom').references('maNhom').inTable(`${TBL_NHOMNGUOIDUNG}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_RELA_NHOMQUYEN} table:`, error);
    });

};
