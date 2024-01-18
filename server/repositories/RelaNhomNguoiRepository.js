const knex = require('knex');
const BaseRepository = require('./BaseRepository');
const { TBL_RELA_NHOMNGUOI, TBL_NGUOIDUNG_KEY } = require('../schemas/constant');
const { getMasterDatabase, initializeSlaveDatabase } = require('../db');
const tbl_nguoidung = require('../schemas/master/tbl_nguoidung');

class RelaNhomNguoiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_RELA_NHOMNGUOI}`, `${TBL_NGUOIDUNG_KEY}`,  getMasterDatabase(), knex); // Khởi tạo
  }

//   async createNewRela(maNguoiDung_, maNhom_) {
//  console.log("test", maNguoiDung_, maNhom_)
//     const queryBuilder = this.database(`tbl_rela_nhomnguoi`).insert({
//         maNguoiDung: maNguoiDung_,
//         maNhom: maNhom_
//     })
//     const results = await queryBuilder
//     console.log(' rela', results)
//     return results;
//   }
  async createNewRela(data) {
    const queryBuilder= this.database('tbl_rela_nhomnguoi').insert(data)
    const result = await queryBuilder
    return result
  }
  async updateRela(data) {
    const queryBuilder= this.database('tbl_rela_nhomnguoi')
    .update({
        maNhom: data.maNhom
    })
    .where({maNguoiDung: data.maNguoiDung})
    const result = await queryBuilder
    return result
  }
  async deleteRela(data) {
    const queryBuilder = knex('tbl_rela_nhomnguoi')
    .where({ maNguoiDung: data })
    .delete();
    const result = await queryBuilder
    console.log("result", result)
    return result
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

  async switchDotTuyenSinh(databaseName) {
    initializeSlaveDatabase(databaseName);
    return "OK";
  }
}

module.exports = RelaNhomNguoiRepository;
