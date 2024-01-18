const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_MONTHI, TBL_MONTHI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class MonThiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_MONTHI}`, `${TBL_MONTHI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
      const offset = (page - 1) * perPage;
      
    if (query) {
      let queryBuilder = this._getQueryBuilder();
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.select('tbl_monthi.tenMon', 'tbl_nhommonhoc.tenNhomMonHoc', 'diemLiet', 'ghiChu')
      .join('tbl_nhommonhoc', 'tbl_nhommonhoc.maNhommonhoc', '=', 'tbl_monthi.maNhommonhoc')
      .where(function(builder) {
        builder.where('tbl_monthi.tenMon', 'like', `%${query}%`)
          .orWhere('tbl_nhommonhoc.tenNhomMonHoc', 'like', `%${query}%`)
          .orWhere('diemLiet', 'like', `%${query}%`)
          .orWhere('ghiChu', 'like', `%${query}%`);
      });    

      const total =await this._getTotalCountAndLastRow(queryBuilder);
      const results = await queryBuilder.limit(perPage).offset(offset);
      return {
        data: results,
        totalCount:total.totalCount,
      };
    } else {
      let queryBuilder = this._getQueryBuilder();
      queryBuilder = queryBuilder.select('tbl_monthi.tenMon', 'tbl_nhommonhoc.tenNhomMonHoc', 'diemLiet', 'ghiChu')
      .join('tbl_nhommonhoc', 'tbl_nhommonhoc.maNhommonhoc', '=', 'tbl_monthi.maNhommonhoc')
      const total =await this._getTotalCountAndLastRow(queryBuilder);
      const results = await queryBuilder.limit(perPage).offset(offset);
      return {
        data: results,
        totalCount:total.totalCount,
      };
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

 
  async _getTotalCountAndLastRow(queryBuilder) {
    const countResult = await queryBuilder.clone().count(this.primaryKey).first();
    
    const totalCount = countResult ? countResult['count(`maMon`)'] : 0;
    return {
      countResult,
      totalCount
    };
  }
  async ThongKeSoLuongThiSinhTheoPhongMon(){
    const dataToExport = [];
    const phongThi = await this.database('tbl_phongthi').select('*');
    await Promise.all(phongThi.map(async (phong) => {
      const getDataTheoPhong = await this.database('tbl_monthi')
        .join('tbl_baithi', 'tbl_monthi.maMon', 'tbl_baithi.maMon')
        .join('tbl_phongthi', 'tbl_phongthi.maPhongthi','tbl_baithi.maPhongthi')
        .select('tbl_monthi.tenMon', 'tbl_phongthi.maPhongthi', 'tbl_phongthi.tenPhong','tbl_phongthi.giangDuongPhong','tbl_monthi.maNhommonhoc')
        .countDistinct('tbl_baithi.soTT as soLuong')
        .where('tbl_baithi.maPhongthi', phong.maPhongthi)
        .groupBy('tbl_monthi.tenMon');
      const groupedData = {};
      // console.log(getDataTheoPhong);
      getDataTheoPhong.forEach((item)=>{
        const key = item.maPhongthi;
        if(!groupedData[key]){
          groupedData[key] = {tenPhong: item.tenPhong, maPhong: item.maPhongthi, giangDuong: item.giangDuongPhong};
        }
        if(!groupedData[key][`nhom${item.maNhommonhoc}`]){
          groupedData[key][`nhom${item.maNhommonhoc}`] = [];
        }
        groupedData[key][`nhom${item.maNhommonhoc}`].push({tenMon:item.tenMon, soLuong:item.soLuong});
      });
      const result = Object.values(groupedData);
      dataToExport.push(...result);
    }));
    return dataToExport;
  }
  async ThongKeSoLuongThiSinhTheoMonPhong (){
    const dataToExport = []
    const listMonthi = await this.database('tbl_monthi').select('*');
    await Promise.all(listMonthi.map(async(monthi)=>{
      const data = await this.database('tbl_phongthi')
      .join('tbl_baithi', 'tbl_phongthi.maPhongthi', 'tbl_baithi.maPhongthi')
      .join('tbl_diadiemthi', 'tbl_phongthi.maDidiem','tbl_diadiemthi.maDidiem')
      .select( 'tbl_phongthi.maPhongthi', 'tbl_phongthi.tenPhong','tbl_phongthi.giangDuongPhong','tbl_diadiemthi.tenDiadiem')
      .countDistinct('tbl_baithi.soTT as soLuong')
      .where('tbl_baithi.maMon', monthi.maMon)
      .groupBy('tbl_phongthi.maPhongthi');
      dataToExport.push({tenMon:monthi.tenMon, data1:data, tong: data.reduce((sum,obj)=>sum+obj.soLuong,0)})
    }))
    return dataToExport;
  }
  async ThongKeSoLuongThiSinhTheoMonThi (){
    const dataToExport =  await this.database('tbl_monthi')
      .join('tbl_baithi', 'tbl_monthi.maMon', 'tbl_baithi.maMon')
      .select( 'tbl_monthi.tenMon')
      .countDistinct('tbl_baithi.soTT as soLuong')
      .groupBy('tbl_monthi.tenMon');
    return dataToExport;
  }
}


module.exports = MonThiRepository;
