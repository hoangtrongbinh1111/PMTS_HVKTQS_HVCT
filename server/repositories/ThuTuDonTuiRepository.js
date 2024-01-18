const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_THUTUDONTUI, TBL_THUTUDONTUI_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');

class ThuTuDonTuiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_THUTUDONTUI}`, `${TBL_THUTUDONTUI_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }
  async getAll(page, perPage) {
    return super.getAll(page, perPage);
  }
  async thuTuDonTheoMon(maMonthi, thutu) {
    // const query1 = await this.database(this.tableName)
    //   .join('tbl_monthi', 'tbl_thutudontui.maNhommonhoc', '=', 'tbl_monthi.maNhommonhoc')
    //   .select('tbl_thutudontui.thuTuDon')
    //   .where('tbl_monthi.maMon', maMonthi);
    // const thutu = query1[0].thuTuDon.split('-').map(Number);
    thutu = thutu.split('-').map(Number);
    const results = [];
    for (let i = 1; i < thutu.length+1; i++) {
      const soluong = await this.database
      .select('tbl_phongthi.maPhongthi', 'tbl_phongthi.tenPhong', 'tbl_phongthi.giangDuongPhong')
      .count('tbl_baithi.maBaithi as soBai').from('tbl_phongthi')
      .leftJoin('tbl_baithi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
      .where('tbl_phongthi.maPhongthi', thutu.indexOf(i)+1)
      .andWhere('tbl_baithi.maMon', maMonthi)
      .groupBy('tbl_phongthi.maPhongthi', 'tbl_phongthi.tenPhong', 'tbl_phongthi.giangDuongPhong');
        results.push(...soluong);
    }
    return results;
  }
  async thuTuDonTui() {
    const query1 = await this.database('tbl_monthi')
      .join('tbl_thutudontui', 'tbl_thutudontui.maNhommonhoc', '=', 'tbl_monthi.maNhommonhoc')
      .select('tbl_monthi.maMon', 'tbl_monthi.tenMon', 'tbl_thutudontui.thuTuDon');
      const dataToPrint = [];
      for (const res of query1){
        const results =  await this.thuTuDonTheoMon(res.maMon, res.thuTuDon);
          if(results.length > 0){
             dataToPrint.push({...results, tenMon: res.tenMon});
          }
      }
      return dataToPrint;
  }
  async delete() {
    return this.database(this.tableName).del();
  }
}


module.exports = ThuTuDonTuiRepository;
