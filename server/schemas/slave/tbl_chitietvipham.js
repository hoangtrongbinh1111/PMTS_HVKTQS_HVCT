const { TBL_CHITIETVIPHAM, TBL_CHITIETVIPHAM_KEY, TBL_HTKYLUAT, TBL_HTKYLUAT_KEY, TBL_DANHSACHVIPHAM, TBL_DANHSACHVIPHAM_KEY, TBL_NHOMMONHOC, TBL_NHOMMONHOC_KEY, TBL_HOSOTHISINH, TBL_HOSOTHISINH_KEY } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_CHITIETVIPHAM}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_CHITIETVIPHAM} table created successfully.`);
        return knex.schema.createTable(`${TBL_CHITIETVIPHAM}`, function (table) {
          table.increments(`${TBL_CHITIETVIPHAM_KEY}`).primary();
          table.string(`maHinhthuc`);
          table.foreign(`maHinhthuc`).references(`${TBL_HTKYLUAT_KEY}`).inTable(`${TBL_HTKYLUAT}`);
          table.string(`maNhommonhoc`);
          table.foreign(`maNhommonhoc`).references(`${TBL_NHOMMONHOC_KEY}`).inTable(`${TBL_NHOMMONHOC}`);
          table.string(`maHoso`);
          table.foreign(`maHoso`).references(`${TBL_HOSOTHISINH_KEY}`).inTable(`${TBL_HOSOTHISINH}`);

        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_CHITIETVIPHAM} table:`, error);
    });

};
