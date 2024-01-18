const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const {TBL_HTUUTIEN, TBL_HTUUTIEN_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class HinhThucUuTienRepository extends BaseRepository {
  constructor() {
    super(`${TBL_HTUUTIEN}`, `${TBL_HTUUTIEN_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
try{
    if (query) {
      // Use query builder for filtering if a query is provided
      const offset = (page - 1) * perPage;
      let queryBuilder = this._getQueryBuilder();
      queryBuilder = queryBuilder.where((builder) => {
        // Customize search conditions based on your requirements
        builder.where('kiHieuHinhthuc', 'like', `%${query}%`);
        builder.orWhere('tenHinhthuc', 'like', `%${query}%`);
        builder.orWhere('congM1', 'like', `%${query}%`);
        builder.orWhere('congM5', 'like', `%${query}%`);
        builder.orWhere('congM2', 'like', `%${query}%`);
        builder.orWhere('congM3', 'like', `%${query}%`);
        builder.orWhere('congM4', 'like', `%${query}%`);
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
  catch (error) {
    throw error; // Ném lỗi để được xử lý ở phần gọi hàm này
  }
}
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  async _getTotalCountAndLastRow(queryBuilder) {
    const countResult = await queryBuilder.clone().count(this.primaryKey).first();
    
    const totalCount = countResult ? countResult['count(`maHinhthuc`)'] : 0;
    return {
      countResult,
      totalCount
    };
  }

}


module.exports = HinhThucUuTienRepository;
