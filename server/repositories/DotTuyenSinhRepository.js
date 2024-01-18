//import hệ thống
const knex = require('knex');
const fs = require('fs');
const path = require('path');

//Import phía người dùng
const BaseRepository = require('./BaseRepository');
const { TBL_DOTTUYENSINH, TBL_DOTTUYENSINH_KEY, TBL_BAITHI, TBL_HOSOTHISINH, TBL_PHONGTHI, TBL_THUTUDONTUI, TBL_DANHSACHVIPHAM, TBL_CHITIETVIPHAM, TBL_TUITHI, TBL_RELA_BAITHITUITHI,
  TBL_CHITIEUTS, 
  TBL_THAMSOHETHONG} = require('../schemas/constant');
const { getMasterDatabase, initializeSlaveDatabase, getSlaveDatabase } = require('../db');
const tablesToDelete = [TBL_BAITHI, TBL_HOSOTHISINH, TBL_PHONGTHI, TBL_THUTUDONTUI, TBL_CHITIETVIPHAM, TBL_TUITHI, TBL_RELA_BAITHITUITHI, TBL_CHITIEUTS, TBL_THAMSOHETHONG];
const tbl_baithi = require('../schemas/slave/tbl_baithi');
const tbl_hosothisinh = require('../schemas/slave/tbl_hosothisinh');
const tbl_phongthi = require('../schemas/slave/tbl_phongthi');
const tbl_thutudontui = require('../schemas/slave/tbl_thutudontui');
const tbl_chitietvipham = require('../schemas/slave/tbl_chitietvipham');
const tbl_tuithi = require('../schemas/slave/tbl_tuithi');
const tbl_rela_baithituithi = require('../schemas/slave/tbl_rela_baithituithi');
const tbl_chitieuts = require('../schemas/slave/tbl_chitieuts');
const tbl_thamsohethong = require('../schemas/slave/tbl_thamsohethong');

const schemasToRecreat = [tbl_baithi, tbl_hosothisinh, tbl_phongthi, tbl_thutudontui, tbl_chitietvipham, tbl_tuithi, tbl_rela_baithituithi, tbl_chitieuts, tbl_thamsohethong]
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
class DotTuyenSinhRepository extends BaseRepository {
  constructor() {
    super(TBL_DOTTUYENSINH, TBL_DOTTUYENSINH_KEY, getMasterDatabase(), knex); // Khởi tạo
  }
  async getAll(page, perPage, query = '') {
    const offset = (page - 1) * perPage;
    let queryBuilder = this._getQueryBuilder();
    let results;
    let totalCount;
    if (query) {
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.where(builder => {
        builder.where('tgianTS', 'like', `%${query}%`)
               .orWhere('loaiTS', 'like', `%${query}%`)
               .orWhere('tenDotTS', 'like', `%${query}%`)
               .orderBy('maDotTS', 'desc')
      });

      results = await queryBuilder.limit(perPage).offset(offset);
      totalCount = await this._getTotalCount( this._getQueryBuilder());
    }
    else {
      results = await queryBuilder.orderBy('maDotTS', 'desc').limit(perPage).offset(offset);
      totalCount = await this._getTotalCount( this._getQueryBuilder());
    }
    return {
      data: results,
      totalCount: totalCount['count(`' + this.primaryKey + '`)'],
    };
  }
  async getDatabaseName(id) {
    if (id === 0) {
      return { duongDan: 'slave' }
    } else {
      const databaseName = await this.database(this.tableName).select('duongDan').where('maDotTS', id).first();
      return databaseName
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*').where('isActive', 1);
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

  async switchDotTuyenSinh(databaseName) {
    initializeSlaveDatabase(databaseName);
    return "OK";
  }
  //Lấy dữ liệu đợt tuyển sinh mới nhất
  async getNewestDatabaseName() {
    const newestDatabase = await this.database.select('duongDan').from(this.tableName).orderBy('maDotTS', 'desc').first();
    return newestDatabase.duongDan;
  }
  // Lấy dữ liệu các bảng cần clone
  async recreateTable(databaseInit, tableName, reCreatedSchema) {
    return databaseInit.schema.dropTableIfExists(tableName)
      .then(() => {
        console.log(`Dropped table: ${tableName}`);
        return reCreatedSchema(databaseInit);
      })
      .then(() => {
        console.log(`Recreated table: ${tableName}`);
      })
      .catch((err) => {
        console.error(`Error dropping/creating table ${tableName}:`, err);
      });
  }

  async createNewDatabase(databaseName) {
    const newestDatabase = await this.getNewestDatabaseName();
    if(newestDatabase){
      const oldDbPath = path.resolve(__dirname, `../db/${newestDatabase}.sqlite`); // Specify the path to your old database file
      const newDbName = `${databaseName}.sqlite`; // Specify the new name for the database file
  
      const newDbPath = path.join(path.dirname(oldDbPath), newDbName);
  
      fs.copyFileSync(oldDbPath, newDbPath);
      initializeSlaveDatabase(databaseName);
      const recreatePromises = tablesToDelete.map((table, index) => this.recreateTable(getSlaveDatabase(), table, schemasToRecreat[index]));
      await Promise.all(recreatePromises);
      await getSlaveDatabase()('tbl_nhommonhoc').update({
        ngayThi: '', // Set to null or a default value
        gioThi: ''
    })
    .then(() => {
        console.log('Data in the columns deleted.');
    })
    .catch((error) => {
        console.error('Error deleting data:', error);
    })
      console.log('Database file copied and renamed successfully!');
    }else {
      initializeSlaveDatabase(databaseName);
    }

    const folderName = databaseName;

    fs.mkdir(`public/images/${folderName}`, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Folder '${folderName}' created successfully.`);
      }
    });
    return databaseName;
  }
  async hideRecord(id) {
    return this.database(this.tableName).where(this.primaryKey, id).update({ isActive: 0 });
  }
  _generateDatabaseName() {
    const randomNumber = Math.random();
    const base = ALPHABET.length;

    let hashString = '';
    let value = randomNumber;

    while (value > 0) {
      const index = Math.floor(value * base);
      hashString += ALPHABET[index];
      value = value * base - index;
    }

    return hashString;
  }
  // async deleteDatabase(databaseName) {
  //   const filePath = path.resolve(__dirname, `../db/${databaseName}.sqlite`);
  //   await fs.unlink(filePath, (error) => {
  //     if (error) {
  //       console.error('Error deleting the file:', error);
  //     } else {
  //       console.log('File deleted successfully');
  //     }
  //   });
  // }
}

module.exports = DotTuyenSinhRepository;
