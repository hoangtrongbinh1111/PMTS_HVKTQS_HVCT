const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_CHUYENNGANHHEP, TBL_CHUYENNGANHHEP_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class ChuyenNganhHepRepository extends BaseRepository {
  constructor() {
    super(`${TBL_CHUYENNGANHHEP}`, `${TBL_CHUYENNGANHHEP_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.where((builder) => {
        // builder.join('tbl_chuyennganhts', 'tbl_chuyennganhts.maChuyennganhTS', '=', 'tbl_chuyennganhhep.maChuyennganhTS')
        builder.where('tenChuyennganhhep', 'like', `%${query}%`);
        builder.orWhere('ghiChu', 'like', `%${query}%`);
      });

      const results = await queryBuilder.limit(perPage).offset(offset);

      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maChuyennganhhep`)'],
      };
    } else {
      queryBuilder = queryBuilder.join('tbl_chuyennganhts', 'tbl_chuyennganhts.maChuyennganhTS', '=', 'tbl_chuyennganhhep.maChuyennganhTS')
      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maChuyennganhhep`)'],
      };
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

}


module.exports = ChuyenNganhHepRepository;
