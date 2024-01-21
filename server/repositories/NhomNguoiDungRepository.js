const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_NHOMNGUOIDUNG, TBL_NHOMNGUOIDUNG_KEY } = require("../schemas/constant");
const { getMasterDatabase } = require('../db');
const { result } = require('lodash');

class NhomNguoiDungRepository extends BaseRepository {
  constructor() {
    super(`${TBL_NHOMNGUOIDUNG}`, `${TBL_NHOMNGUOIDUNG_KEY}`, getMasterDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    if (query) {
      // Use query builder for filtering if a query is provided
      const offset = (page - 1) * perPage;
      let queryBuilder = this._getQueryBuilder();
      queryBuilder = queryBuilder.where((builder) => {
        // Customize search conditions based on your requirements
        builder.where('tenNhom', 'like', `%${query}%`);
        // builder.orWhere('email', 'like', `%${query}%`);
      });

      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maNhom`)'],
      };
    } else {
      return super.getAll(page, perPage);
    }
  }

  async getRoleById(maNhom) {
    const query = this.database.select('tbl_nhomnguoidung.maNhom', 'tenNhom', 'tenChucnang')
  .from('tbl_nhomnguoidung')
  .join('tbl_rela_nhomquyen', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomquyen.maNhom')
  .join('tbl_quyen', 'tbl_rela_nhomquyen.maQuyen', '=', 'tbl_quyen.maQuyen')
  .where('tbl_nhomnguoidung.maNhom', parseInt(maNhom));
  query
  .then(rows => {
    console.log(rows);
  })
  .catch(error => {
    console.log(error);
  });
  const results = await query.first();
    console.log(results)
  return results;
  }

  async getListRoles() {
    let queryBuilder1 = this._getQueryBuilder();
    queryBuilder1 = queryBuilder1
    .select('tbl_nhomnguoidung.maNhom', 'tbl_nhomnguoidung.tenNhom', 'tbl_nhomnguoidung.ghiChu', 'tbl_quyen.tenChucnang')
    .from('tbl_nhomnguoidung')
    .leftJoin('tbl_rela_nhomquyen', 'tbl_nhomnguoidung.maNhom', '=', 'tbl_rela_nhomquyen.maNhom')
    .leftJoin('tbl_quyen', 'tbl_rela_nhomquyen.maQuyen', '=', 'tbl_quyen.maQuyen')
    let listRoles = await queryBuilder1;

    let queryBuilder2 = this.database
    .select('maNhom')
    .count('maNguoiDung as countNguoiDung')
    .from('tbl_rela_nhomnguoi')
    .groupBy('maNhom')
    let countUsers = await queryBuilder2;

    listRoles?.map((role, index) => {
      const countUser = countUsers.find(x => parseInt(x.maNhom) === role.maNhom)?.countNguoiDung
      if (countUser !== undefined) {
        role.totalUsers = countUser;
      } else {
        role.totalUsers = 0;
      }
    })
    return listRoles;
  }

  async updateRole(roleId, permission) {
    const check = await this.database('tbl_rela_nhomquyen')
    .select('maQuyen', 'maNhom')
    .where('maNhom', roleId)
    if (check.length === 0) {
      const resultIn = await this.database('tbl_quyen').insert({
        tenChucnang: permission
      })
      if (resultIn[0]){
        await this.database('tbl_rela_nhomquyen').insert({
          maQuyen: resultIn[0],
          maNhom: roleId
        })
        .then(res => {
          console.log("res", "res")
        })
        .catch(err => {
          console.log(err)
        })
      }
    } else {
    const response =  await this.database('tbl_quyen')
  .update({ tenChucnang: permission })
  .where({ maQuyen: parseInt(check[0].maQuyen) })
    }
  return 'OK';
  }

  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

}


module.exports = NhomNguoiDungRepository;
