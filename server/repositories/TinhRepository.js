const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_TINH, TBL_TINH_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class TinhRepository extends BaseRepository {
  constructor() {
    super(`${TBL_TINH}`, `${TBL_TINH_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    if (query) {
      // Use query builder for filtering if a query is provided
      const offset = (page - 1) * perPage;
      let queryBuilder = this._getQueryBuilder();
      queryBuilder = queryBuilder.where((builder) => {
        // Customize search conditions based on your requirements
        builder.where('tenTinh', 'like', `%${query}%`);
        // builder.orWhere('email', 'like', `%${query}%`);
      });

      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maTinh`)'],
      };
    } else {
      return super.getAll(page, perPage);
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

}


module.exports = TinhRepository;
