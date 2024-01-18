const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_TUITHI, TBL_TUITHI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class HuongDanDonTuiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_TUITHI}`, `${TBL_TUITHI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(maMonThi) {
    let queryBuilder = this._getQueryBuilder();
    const results = queryBuilder.where('maMon', maMonThi)
    return results;
  }
  async getHuongDanDonTui(page, perPage, query) {
    const offset = (page - 1) * perPage;
    const queryBuilder = this.database('tbl_tuithi')
      .join('tbl_rela_baithituithi', 'tbl_tuithi.maTui', '=', 'tbl_rela_baithituithi.maTui')
      .join('tbl_baithi', 'tbl_rela_baithituithi.maBaithi', '=', 'tbl_baithi.maBaithi')
      .join('tbl_hosothisinh', 'tbl_baithi.soTT', '=', 'tbl_hosothisinh.soTT')
      .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
      .select('tbl_tuithi.tenTui', 'tbl_hosothisinh.soBaodanh', 'tbl_baithi.maPhongthi', 'tbl_phongthi.tenPhong', 'tbl_phongthi.giangDuongPhong', 'tbl_baithi.soPhach').where('tbl_tuithi.maTui', query).orderBy(this.database.raw('CAST (tbl_baithi.soPhach AS INTERGER)'));
    const totalCount = await queryBuilder;
    const results = await queryBuilder.limit(perPage).offset(offset);
    return {
      data: results,
      totalCount: totalCount.length,
    };
  }
  async getSoPhachTheoMon(page, perPage, query) {
    const offset = (page - 1) * perPage;
    const queryBuilder = this.database('tbl_monthi')
      .join('tbl_baithi', 'tbl_monthi.maMon', '=', 'tbl_baithi.maMon')
      .join('tbl_rela_baithituithi', 'tbl_rela_baithituithi.maBaithi', '=', 'tbl_baithi.maBaithi')
      .join('tbl_tuithi', 'tbl_tuithi.maTui', '=', 'tbl_rela_baithituithi.maTui')
      .join('tbl_hosothisinh', 'tbl_baithi.soTT', '=', 'tbl_hosothisinh.soTT')
      .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
      .select('tbl_tuithi.tenTui', 'tbl_hosothisinh.soBaodanh', 'tbl_baithi.maPhongthi', 'tbl_phongthi.tenPhong', 'tbl_phongthi.giangDuongPhong', 'tbl_baithi.soPhach').where('tbl_monthi.maMon', query).orderBy(this.database.raw('CAST (tbl_baithi.soPhach AS INTERGER)'));
    const totalCount = await queryBuilder;
    const results = await queryBuilder.limit(perPage).offset(offset);
    
    return {
      data: results,
      totalCount: totalCount.length,
    };
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count('tbl_hosothisinh.soBaodanh as countNumber').first();
  }

}


module.exports = HuongDanDonTuiRepository;
