const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_DIADIEMTHI, TBL_DIADIEMTHI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class DiaDiemToChucThiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_DIADIEMTHI}`, `${TBL_DIADIEMTHI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    if (query) {
      // Use query builder for filtering if a query is provided
      const offset = (page - 1) * perPage;
      let queryBuilder = this._getQueryBuilder();
      queryBuilder = queryBuilder.where((builder) => {
        // Customize search conditions based on your requirements
        builder.where('tenDiadiem', 'like', `%${query}%`);
        builder.orWhere('KiHieuDiadiem', 'like', `%${query}%`);
        builder.orWhere('ghiChu', 'like', `%${query}%`);
        builder.orWhere('diaChi', 'like', `%${query}%`);
      });

      const total =await this._getTotalCountAndLastRow(queryBuilder);
      const results = await queryBuilder.limit(perPage).offset(offset);
      return {
        data: results,
        totalCount:total.totalCount,
      };
    } else {
      return super.getAll(page, perPage);
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }
  async _getTotalCountAndLastRow(queryBuilder) {
    const countResult = await queryBuilder.clone().count(this.primaryKey).first();
    
    const totalCount = countResult ? countResult['count(`maDidiem`)'] : 0;
    return {
      countResult,
      totalCount
    };
  }

}


module.exports = DiaDiemToChucThiRepository;
