const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_NGANHTS, TBL_NGANHTS_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class NganhTuyenSinhRepository extends BaseRepository {
  constructor() {
    super(`${TBL_NGANHTS}`, `${TBL_NGANHTS_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }
  async getAll(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
      queryBuilder = queryBuilder.join('tbl_monthi AS mh1', 'mh1.maMon', 'tbl_nganhts.maMon1')
        .join('tbl_monthi AS mh2', 'mh2.maMon', 'tbl_nganhts.maMon2')
        .join('tbl_monthi AS mh3', 'mh3.maMon', 'tbl_nganhts.maMon3')
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.where((builder) => {
        builder.where('tenNganh', 'like', `%${query}%`);
        builder.orWhere('kihieuNganh', 'like', `%${query}%`);
        builder.orWhere('mon1', 'like', `%${query}%`);
        builder.orWhere('mon2', 'like', `%${query}%`);
        builder.orWhere('mon3', 'like', `%${query}%`);
      });

      const total =await this._getTotalCountAndLastRow(queryBuilder);
      const results = await queryBuilder.limit(perPage).offset(offset);
      return {
        data: results,
        totalCount:total.totalCount,
      };
    } else {
      queryBuilder = queryBuilder.join('tbl_monthi AS mh1', 'mh1.maMon', 'tbl_nganhts.maMon1')
        .join('tbl_monthi AS mh2', 'mh2.maMon', 'tbl_nganhts.maMon2')
        .join('tbl_monthi AS mh3', 'mh3.maMon', 'tbl_nganhts.maMon3')
      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCountAndLastRow(queryBuilder);
      return {
        data: results,
        totalCount: totalCount?.totalCount || 0,
      };
    }
  }
  async deleteNganh (id) {
    const res1 = await this.database('tbl_chuyennganhts').where('maNganhTS', id).del();
    const response = await this.database('tbl_nganhts').where('maNganhTS', id).del();
    return response
  }
  _getQueryBuilder() {
    // return this.database(this.tableName).select('tbl_nganhts.maNganhTS','tbl_nganhts.tenNganh','tbl_nganhts.kihieuNganh','tbl_nganhts.maMon1','tbl_nganhts.maMon2','tbl_nganhts.maMon3', 'mh1.tenMon AS mon1', 'mh2.tenMon AS mon2', 'mh3.tenMon AS mon3');
    return this.database(this.tableName).select("*",'mh1.tenMon AS mon1', 'mh2.tenMon AS mon2', 'mh3.tenMon AS mon3');
  }

 
  async _getTotalCountAndLastRow(queryBuilder) {
    const countResult = await queryBuilder.clone().count(this.primaryKey).first();
    
    const totalCount = countResult ? countResult['count(`maNganhTS`)'] : 0;
    return {
      countResult,
      totalCount
    };
  }
}


module.exports = NganhTuyenSinhRepository;