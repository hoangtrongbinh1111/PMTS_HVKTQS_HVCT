const tbl_thamsohethong = require('./tbl_thamsohethong');
const tbl_diadiemthi = require('./tbl_diadiemthi');
const tbl_diachidaotao = require('./tbl_diachidaotao');
const tbl_truongdaihoc = require('./tbl_truongdaihoc');
const tbl_nganh = require('./tbl_nganh');
const tbl_loaihinhdt = require('./tbl_loaihinhdt');
const tbl_pltotnghiepdh = require('./tbl_pltotnghiepdh');
const tbl_htuutien = require('./tbl_htuutien');
const tbl_htkyluat = require('./tbl_htkyluat');
const tbl_nhommonhoc = require('./tbl_nhommonhoc');
const tbl_monthi = require('./tbl_monthi');
const tbl_nganhts = require('./tbl_nganhts');
const tbl_chuyennganhts = require('./tbl_chuyennganhts');
const tbl_chuyennganhhep = require('./tbl_chuyennganhhep');
const tbl_chitieuts = require('./tbl_chitieuts');
const tbl_hosothisinh = require('./tbl_hosothisinh');
const tbl_lephithi = require('./tbl_lephithi');
const tbl_chitietvipham = require('./tbl_chitietvipham');
const tbl_phongthi = require('./tbl_phongthi');
const tbl_baithi = require('./tbl_baithi');
const tbl_thutudontui = require('./tbl_thutudontui');
const tbl_tuithi = require('./tbl_tuithi');
const tbl_rela_baithituithi = require('./tbl_rela_baithituithi');
const tbl_tinh = require('./tbl_tinh');
const tbl_chucvu = require('./tbl_chucvu');
const tbl_diemchuan = require('./tbl_diemchuan');


module.exports = function (knex) {
    return [
        tbl_thamsohethong(knex),
        tbl_diadiemthi(knex),
        tbl_diachidaotao(knex),
        tbl_nganh(knex),
        tbl_truongdaihoc(knex),
        tbl_loaihinhdt(knex),
        tbl_pltotnghiepdh(knex),
        tbl_htuutien(knex),
        tbl_htkyluat(knex),
        tbl_nhommonhoc(knex),
        tbl_monthi(knex),
        tbl_nganhts(knex),
        tbl_chuyennganhts(knex),
        tbl_chuyennganhhep(knex),
        tbl_chitieuts(knex),
        tbl_hosothisinh(knex),
        tbl_lephithi(knex),
        tbl_chitietvipham(knex),
        tbl_phongthi(knex),
        tbl_baithi(knex),
        tbl_thutudontui(knex),
        tbl_tuithi(knex),
        tbl_rela_baithituithi(knex),
        tbl_chucvu(knex),
        tbl_tinh(knex),
        tbl_diemchuan(knex)
        // Add more table imports and calls here
    ];
};
