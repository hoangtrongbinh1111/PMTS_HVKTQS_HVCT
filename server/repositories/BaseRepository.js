

class BaseRepository {
  constructor(tableName, primaryKey, database, knex) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.database = database;
    this._knex = knex;
  }

  async getAll(page, perPage) {
    const offset = (page - 1) * perPage;
    const results = await this.database.select('*').limit(perPage).offset(offset).from(this.tableName);

    const totalCount = await this.database.count(this.primaryKey).first().from(this.tableName);
    return {
      data: results,
      totalCount: totalCount['count(`' + this.primaryKey + '`)'],
    };
  }

  _getTotalCount() {
    return this.database.count(this.primaryKey).first().from(this.tableName);
  }

  getById(id) {
    return this.database(this.tableName).select('*').where(this.primaryKey, id).first();
  }

  create(entity) {
    return this.database(this.tableName).insert(entity);
  }

  update(id, entity) {
    return this.database(this.tableName).where(this.primaryKey, id).update(entity);
  }

  delete(id) {
    return this.database(this.tableName).where(this.primaryKey, id).del();
  }
}

module.exports = BaseRepository;
