const knex = require('knex');
const BaseRepository = require('./BaseRepository');
const { TBL_NGUOIDUNG, TBL_NGUOIDUNG_KEY } = require('../schemas/constant');
const { getMasterDatabase, initializeSlaveDatabase } = require('../db');
const tbl_nguoidung = require('../schemas/master/tbl_nguoidung');

class NguoiDungRepository extends BaseRepository {
  constructor() {
    super(`${TBL_NGUOIDUNG}`, `${TBL_NGUOIDUNG_KEY}`, getMasterDatabase(), knex); // Khởi tạo
  }

  async getAll(page, perPage, query = '') {
    const offset = (page - 1)*perPage;
    if (query) {
      const queryBuilder1 = this.database
      .select('tbl_nguoidung.*', 'tbl_nhomnguoidung.tenNhom', 'tbl_nhomnguoidung.maNhom')
      .from('tbl_nguoidung')
      .leftJoin('tbl_rela_nhomnguoi', 'tbl_nguoidung.maNguoiDung', '=', 'tbl_rela_nhomnguoi.maNguoiDung')
      .leftJoin('tbl_nhomnguoidung', 'tbl_rela_nhomnguoi.maNhom', '=', 'tbl_nhomnguoidung.maNhom')
      .where('tbl_nguoidung.hoTen', 'like', `%${query}%`)
      .orWhere('tbl_nguoidung.tenDangKy', 'like', `%${query}%`)
      .orWhere('tbl_nguoidung.ngayBD', 'like', `%${query}%`)
      .orWhere('tbl_nguoidung.ngayKT', 'like', `%${query}%`)
      .orWhere('tbl_nguoidung.ghiChu', 'like', `%${query}%`)
      const results1 = await queryBuilder1
      const totalCount_ = results1.length
      const results2 = await queryBuilder1.limit(perPage).offset(offset);
      return {
        data: results2,
        totalCount: totalCount_
      };
    } else {
      const queryBuilder2 = this.database
      .select('tbl_nguoidung.*', 'tbl_nhomnguoidung.tenNhom', 'tbl_nhomnguoidung.maNhom')
      .from('tbl_nguoidung')
      .leftJoin('tbl_rela_nhomnguoi', 'tbl_nguoidung.maNguoiDung', '=', 'tbl_rela_nhomnguoi.maNguoiDung')
      .leftJoin('tbl_nhomnguoidung', 'tbl_rela_nhomnguoi.maNhom', '=', 'tbl_nhomnguoidung.maNhom')
      const results1 = await queryBuilder2
      const totalCount_ = results1.length
      const results2 = await queryBuilder2.limit(perPage).offset(offset);
      return {
        data: results2,
        totalCount: totalCount_
      };
    }
  }
  async getMemberInfo(username, password) {
    let queryBuilder = this._getQueryBuilder();
    queryBuilder = queryBuilder
    .join('tbl_rela_nhomnguoi', 'tbl_nguoidung.maNguoiDung', '=', 'tbl_rela_nhomnguoi.maNguoiDung')
    .join('tbl_nhomnguoidung', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomnguoi.maNhom')
    .join('tbl_rela_nhomquyen', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomquyen.maNhom')
    .join('tbl_quyen', 'tbl_rela_nhomquyen.maQuyen', '=', 'tbl_quyen.maQuyen')
    .where('tenDangKy', '=', `${username}`)
  const results = await queryBuilder.first();
  if (results !== undefined) {
  if (password === results.matKhau) {
    return results;
  }
else {
  return {}
}}
  return undefined;
  }
  async getUserById(maNguoiDung) {
    let queryBuilder = this._getQueryBuilder();
    queryBuilder = queryBuilder
    .join('tbl_rela_nhomnguoi', 'tbl_nguoidung.maNguoiDung', '=', 'tbl_rela_nhomnguoi.maNguoiDung')
    .join('tbl_nhomnguoidung', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomnguoi.maNhom')
    .join('tbl_rela_nhomquyen', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomquyen.maNhom')
    .join('tbl_quyen', 'tbl_rela_nhomquyen.maQuyen', '=', 'tbl_quyen.maQuyen')
    .where('tbl_nguoidung.maNguoiDung', '=', maNguoiDung)
  const results = await queryBuilder.first();
  return results;
  }
  async createUser(data) {
    const queryBuilder= this.database('tbl_rela_nhomnguoi').insert(data)
    const result = await queryBuilder
    return result
  }

  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

  async switchDotTuyenSinh(databaseName) {
    initializeSlaveDatabase(databaseName);
    return "OK";
  }
}

module.exports = NguoiDungRepository;
