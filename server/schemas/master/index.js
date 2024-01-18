const tbl_nguoidung = require('./tbl_nguoidung');
const tbl_nhomnguoidung = require('./tbl_nhomnguoidung');
const tbl_rela_nhomnguoi = require('./tbl_rela_nhomnguoi');
const tbl_quyen = require('./tbl_quyen');
const tbl_rela_nhomquyen = require('./tbl_rela_nhomquyen');
const tbl_dottuyensinh = require('./tbl_dottuyensinh');

module.exports = function (knex) {
    return [
        tbl_nguoidung(knex),
        tbl_nhomnguoidung(knex),
        tbl_rela_nhomnguoi(knex),
        tbl_quyen(knex),
        tbl_rela_nhomquyen(knex),
        tbl_dottuyensinh(knex)
        // Add more table imports and calls here
    ];
};
