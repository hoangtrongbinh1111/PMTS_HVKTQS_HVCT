const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_PHONGTHI, TBL_PHONGTHI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class PhongThiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_PHONGTHI}`, `${TBL_PHONGTHI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.where((builder) => {
        builder.where('tenPhong', 'like', `%${query}%`);
        builder.orWhere('ghiChu', 'like', `%${query}%`);
      });

      const results = await queryBuilder.join('tbl_diadiemthi', 'tbl_diadiemthi.maDidiem', '=', 'tbl_phongthi.maDidiem').limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maPhongthi`)'],
      };
    } else {
      queryBuilder = queryBuilder.join('tbl_diadiemthi', 'tbl_diadiemthi.maDidiem', '=', 'tbl_phongthi.maDidiem')
      const results = await queryBuilder.limit(perPage).offset(offset);
      const sumSoluong = await this.database('tbl_phongthi').sum('soLuong')
      const soHoso = await this.database('tbl_hosothisinh').count('maHoso')

      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maPhongthi`)'],
        sumSoluong: sumSoluong[0]['sum(`soLuong`)'],
        soHoso: soHoso[0]['count(`maHoso`)']
      };
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('tbl_phongthi.*', 'tbl_diadiemthi.tenDiadiem', 'tbl_diadiemthi.maDidiem');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

}


module.exports = PhongThiRepository;
