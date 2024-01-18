const { TBL_HOSOTHISINH, TBL_HOSOTHISINH_KEY, TBL_DIADIEMTHI, TBL_DIADIEMTHI_KEY, TBL_DIACHIDAOTAO, TBL_DIACHIDAOTAO_KEY, TBL_TRUONGDAIHOC, TBL_TRUONGDAIHOC_KEY, TBL_NGANH, TBL_NGANH_KEY, TBL_LOAIHINHDT, TBL_LOAIHINHDT_KEY, TBL_PLTOTNGHIEPDH, TBL_PLTOTNGHIEPDH_KEY, TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY, TBL_CHUYENNGANHHEP, TBL_CHUYENNGANHHEP_KEY, TBL_HTUUTIEN, TBL_HTUUTIEN_KEY, TBL_LEPHITHI, TBL_LEPHITHI_KEY, TBL_TINH, TBL_TINH_KEY, TBL_CHUCVU_KEY, TBL_CHUCVU } = require("../constant");
module.exports = function (knex) {
  knex.schema.hasTable(`${TBL_HOSOTHISINH}`)
    .then((exists) => {
      if (!exists) {
        console.log(`====> ${TBL_HOSOTHISINH} table created successfully.`);
        return knex.schema.createTable(`${TBL_HOSOTHISINH}`, function (table) {
          table.increments(`${TBL_HOSOTHISINH_KEY}`).primary();
          table.string('soBaodanh').notNullable();
          table.string('soTT').notNullable();
          table.string('STT').notNullable();
          table.string('loaiTS').notNullable();
          table.string('hoTen').notNullable();
          table.datetime('ngaySinh').notNullable();
          table.string('gioiTinh').notNullable();
          table.string('noiSinh').notNullable();
          table.string('coQuan').notNullable();
          table.string('namTN').notNullable();
          table.string('capBac');
          table.string('ngoaiNgu').notNullable();
          table.string('hinhThucthiNN').notNullable();
          table.string('diaChi').notNullable();
          table.string('dienThoai').notNullable();
          table.string('thiNCS');
          table.string('tenDetai');
          table.string('giaoVienHD1');
          table.string('giaoVienHD2');
          table.string('fileAnh').notNullable();
          table.string('ghiChu');
          table.float('tongDiem');
          table.float('diemCoBan');
          table.float('diemChuyenNganh');
          table.float('diemNgoaiNgu');
          table.string(`${TBL_CHUCVU_KEY}`);
          table.foreign(`${TBL_CHUCVU_KEY}`).references(`${TBL_CHUCVU_KEY}`).inTable(`${TBL_CHUCVU}`);
          table.string(`${TBL_DIADIEMTHI_KEY}`);
          table.foreign(`${TBL_DIADIEMTHI_KEY}`).references(`${TBL_DIADIEMTHI_KEY}`).inTable(`${TBL_DIADIEMTHI}`);
          table.string(`${TBL_DIACHIDAOTAO_KEY}`);
          table.foreign(`${TBL_DIACHIDAOTAO_KEY}`).references(`${TBL_DIACHIDAOTAO_KEY}`).inTable(`${TBL_DIACHIDAOTAO}`);
          table.string(`${TBL_TRUONGDAIHOC_KEY}`);
          table.foreign(`${TBL_TRUONGDAIHOC_KEY}`).references(`${TBL_TRUONGDAIHOC_KEY}`).inTable(`${TBL_TRUONGDAIHOC}`);
          table.string(`${TBL_NGANH_KEY}`);
          table.foreign(`${TBL_NGANH_KEY}`).references(`${TBL_NGANH_KEY}`).inTable(`${TBL_NGANH}`);
          table.string(`${TBL_LOAIHINHDT_KEY}`);
          table.foreign(`${TBL_LOAIHINHDT_KEY}`).references(`${TBL_LOAIHINHDT_KEY}`).inTable(`${TBL_LOAIHINHDT}`);
          table.string(`${TBL_PLTOTNGHIEPDH_KEY}`);
          table.foreign(`${TBL_PLTOTNGHIEPDH_KEY}`).references(`${TBL_PLTOTNGHIEPDH_KEY}`).inTable(`${TBL_PLTOTNGHIEPDH}`);
          table.string(`${TBL_CHUYENNGANHTS_KEY}`);
          table.foreign(`${TBL_CHUYENNGANHTS_KEY}`).references(`${TBL_CHUYENNGANHTS_KEY}`).inTable(`${TBL_CHUYENNGANHTS}`);
          table.string(`${TBL_CHUYENNGANHHEP_KEY}`);
          table.foreign(`${TBL_CHUYENNGANHHEP_KEY}`).references(`${TBL_CHUYENNGANHHEP_KEY}`).inTable(`${TBL_CHUYENNGANHHEP}`);
          table.string(`${TBL_HTUUTIEN_KEY}`);
          table.foreign(`${TBL_HTUUTIEN_KEY}`).references(`${TBL_HTUUTIEN_KEY}`).inTable(`${TBL_HTUUTIEN}`);
          table.string(`${TBL_LEPHITHI_KEY}`);
          table.foreign(`${TBL_LEPHITHI_KEY}`).references(`${TBL_LEPHITHI_KEY}`).inTable(`${TBL_LEPHITHI}`);
        });
      }
    })
    .then(() => {
      // console.log(`====> ${TBL_RELA_NHOMNGUOI} table created successfully.`);
    })
    .catch((error) => {
      console.error(`xxxx=> Error creating ${TBL_HOSOTHISINH} table:`, error);
    });

};
