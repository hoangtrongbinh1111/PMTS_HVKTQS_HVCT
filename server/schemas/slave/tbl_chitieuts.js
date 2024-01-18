const { TBL_CHITIEUTS, TBL_CHITIEUTS_KEY, TBL_DIACHIDAOTAO, TBL_DIACHIDAOTAO_KEY, TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_CHITIEUTS}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_CHITIEUTS} table created successfully.`);
        return knex.schema.createTable(`${TBL_CHITIEUTS}`, function (table) {
          table.increments(`${TBL_CHITIEUTS_KEY}`).primary();
          table.int('soLuongDS').notNullable();
          table.int('soLuongQS').notNullable();
          table.string(`${TBL_DIACHIDAOTAO_KEY}`);
          table.foreign(`${TBL_DIACHIDAOTAO_KEY}`).references(`${TBL_DIACHIDAOTAO_KEY}`).inTable(`${TBL_DIACHIDAOTAO}`);
          table.string(`${TBL_CHUYENNGANHTS_KEY}`);
          table.foreign(`${TBL_CHUYENNGANHTS_KEY}`).references(`${TBL_CHUYENNGANHTS_KEY}`).inTable(`${TBL_CHUYENNGANHTS}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_CHITIEUTS} table:`, error);
    });

};
