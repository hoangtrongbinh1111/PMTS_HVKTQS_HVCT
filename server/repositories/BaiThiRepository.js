const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_BAITHI, TBL_BAITHI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class BaiThiRespository extends BaseRepository {
  constructor() {
    super(`${TBL_BAITHI}`, `${TBL_BAITHI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAllTheoTui(maTuithi) {
    // const offset = (page - 1) * perPage;
    // Use query builder for filtering if a query is provided
    const results = await this.database(this.tableName)
      .join('tbl_rela_baithituithi', 'tbl_baithi.maBaithi', '=', 'tbl_rela_baithituithi.maBaithi')
      .select('*').where('tbl_rela_baithituithi.maTui', maTuithi)
      .orderBy('tbl_rela_baithituithi.soPhach')
    // const results = await queryBaiThi.limit(perPage).offset(offset);
    // const totalCount = await queryBaiThi;
    return {
      data: results,
      totalCount: results.length,
    };
  }
  async getAllTheoMon(maMonthi) {
    // const offset = (page - 1) * perPage;
    const queryBuilder = this.database(this.tableName)
      .join('tbl_rela_baithituithi', 'tbl_baithi.maBaithi', '=', 'tbl_rela_baithituithi.maBaithi')
      .join('tbl_tuithi', 'tbl_rela_baithituithi.maTui', '=', 'tbl_tuithi.maTui')
      .select('tbl_baithi.*', 'tbl_tuithi.tenTui').where('tbl_baithi.maMon', maMonthi).orderBy('tbl_baithi.soPhach');
    // const results = await queryBuilder.limit(perPage).offset(offset);
    const results = await queryBuilder;
    // const totalCount = await this._getTotalCount(queryBuilder);
    return {
      data: results,
      totalCount: results.length,
    };
  }
  async UpdateDiemThiTheoMon(maMonthi, soPhach, diemThi) {
    // const offset = (page - 1) * perPage;
    return this.database(this.tableName).where('maMon', maMonthi).andWhere('soPhach', soPhach).update({ diemThi: diemThi });
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }
  async getThongTinDanhPhachKhoiTao(){
    try {
      const info = await this.database('tbl_tuithi')
      .join('tbl_rela_baithituithi','tbl_tuithi.maTui', '=', 'tbl_rela_baithituithi.maTui')
      .where('tenTui', 'Túi 1')
      .groupBy('tbl_tuithi.maTui')
      .select('tbl_tuithi.maTui').count('maBaiThi as SL');
    const maxSL = info.reduce((maxItem, currentItem) => {
      return currentItem.SL > maxItem.SL ? currentItem : maxItem;
    }, info[0]);
    const soPhachBatDau = await this.database('tbl_tuithi')
      .join('tbl_rela_baithituithi','tbl_tuithi.maTui', '=', 'tbl_rela_baithituithi.maTui')
      .where('tbl_tuithi.maTui', maxSL.maTui)
      .orderBy('soPhach')
      .first();
    
      return {soBaiMotTui:maxSL.SL, soPhach: soPhachBatDau.soPhach};
    } catch (error) {
      return {soBaiMotTui:0, soPhach: 0};
    }
    
  }
  async checkNhapDiem(){
    const listBaiThi = await this.database(this.tableName).select('*');
    const hasNhapDiem = listBaiThi.some(item => item.diemThi !== 0);
    return {check: hasNhapDiem};
  }

}


module.exports = BaiThiRespository;
