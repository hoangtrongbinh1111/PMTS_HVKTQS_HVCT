const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_CHUYENNGANHTS, TBL_CHUYENNGANHTS_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class ChuyenNganhRepository extends BaseRepository {
  constructor() {
    super(`${TBL_CHUYENNGANHTS}`, `${TBL_CHUYENNGANHTS_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
   
      // // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.select('tbl_chuyennganhts.tenChuyennganh', 'tbl_nganhts.tenNganh', 'ghiChu', 'kiHieuChuyennganh')
      .join('tbl_nganhts', 'tbl_chuyennganhts.maNganhts', '=', 'tbl_nganhts.maNganhts')
      .where(function(builder) {
        builder.where('tenChuyennganh', 'like', `%${query}%`)
              .orWhere('ghiChu', 'like', `%${query}%`)
              .orWhere('kiHieuChuyennganh', 'like',`%${query}%`)
              .orWhere('tbl_nganhts.tenNganh', 'like',`%${query}%`)
      }); 


      const total =await this._getTotalCountAndLastRow(queryBuilder);
      const results = await queryBuilder.limit(perPage).offset(offset);
      return {
        data: results,
        totalCount:total.totalCount,
      };
    } else {
      queryBuilder = queryBuilder.join('tbl_nganhts', 'tbl_nganhts.maNganhTS', '=', 'tbl_chuyennganhts.maNganhTS')
      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount:totalCount['count(`maChuyennganhTS`)'],
      };
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

 

  async _getTotalCountAndLastRow(queryBuilder) {
    const countResult = await queryBuilder.clone().count(this.primaryKey).first();
    
    const totalCount = countResult ? countResult['count(`maChuyennganhTS`)'] : 0;
    return {
      countResult,
      totalCount
    };
  }
}


module.exports = ChuyenNganhRepository;
