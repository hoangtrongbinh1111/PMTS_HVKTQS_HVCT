const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_CHITIETVIPHAM, TBL_CHITIETVIPHAM_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');
const tbl_hosothisinh = require('../schemas/slave/tbl_hosothisinh');

class CapNhatThiSinhViPhamRepository extends BaseRepository {
    constructor() {
        super(`${TBL_CHITIETVIPHAM}`, `${TBL_CHITIETVIPHAM_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
    }
    async timKiemThiSinh(SBD = '', ten = '', phongthi = '') {
        let results;
        const queryBuider = this.database('tbl_hosothisinh')
            .join('tbl_baithi', 'tbl_hosothisinh.soTT', '=', 'tbl_baithi.soTT')
            .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
            .select('*')
            .groupBy('tbl_hosothisinh.soBaodanh');
        if (SBD && phongthi && ten) {
            results = await queryBuider.where('tbl_hosothisinh.soBaodanh', 'like', `%${SBD}%`).andWhere('tbl_hosothisinh.hoTen', 'like', `%${ten}%`).andWhere('tbl_phongthi.maPhongthi', phongthi);
        } else if (SBD && phongthi) {
            results = await queryBuider.where('tbl_hosothisinh.soBaodanh', 'like', `%${SBD}%`).andWhere('tbl_phongthi.maPhongthi', phongthi);
        } else if (SBD && ten) {
            results = await queryBuider.where('tbl_hosothisinh.soBaodanh', 'like', `%${SBD}%`).andWhere('tbl_hosothisinh.hoTen', 'like', `%${ten}%`);
        } else if (SBD) {
            results = await queryBuider.where('tbl_hosothisinh.soBaodanh', 'like', `%${SBD}%`);
        } else if (ten && phongthi) {
            results = await queryBuider.where('tbl_hosothisinh.hoTen', 'like', `%${ten}%`).andWhere('tbl_phongthi.maPhongthi', phongthi);
        } else if (ten) {
            results = await queryBuider.where('tbl_hosothisinh.hoTen', 'like', `%${ten}%`);
        } else if (phongthi) {
            results = await queryBuider.where('tbl_phongthi.maPhongthi', phongthi);
        }
        return results;
    }
    _findLongestArray(arrays) {
        return arrays.reduce((longestArray, currentArray) => {
            return currentArray.length > longestArray.length ? currentArray : longestArray;
        }, []);
    }
    async getAllDanhSachViPham() {
        const results1 = await this.database('tbl_hosothisinh')
            .join('tbl_baithi', 'tbl_hosothisinh.soTT', '=', 'tbl_baithi.soTT')
            .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
            .join('tbl_chitietvipham', 'tbl_hosothisinh.maHoso', '=', 'tbl_chitietvipham.maHoso')
            .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', '=', 'tbl_htkyluat.maHinhthuc')
            .where('tbl_chitietvipham.maNhommonhoc', 1)
            .groupBy('tbl_hosothisinh.maHoso')
            .select('*')
        const results2 = await this.database('tbl_hosothisinh')
            .join('tbl_baithi', 'tbl_hosothisinh.soTT', '=', 'tbl_baithi.soTT')
            .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
            .join('tbl_chitietvipham', 'tbl_hosothisinh.maHoso', '=', 'tbl_chitietvipham.maHoso')
            .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', '=', 'tbl_htkyluat.maHinhthuc')
            .where('tbl_chitietvipham.maNhommonhoc', 2)
            .groupBy('tbl_hosothisinh.maHoso')
            .select('*')
        const results3 = await this.database('tbl_hosothisinh')
            .join('tbl_baithi', 'tbl_hosothisinh.soTT', '=', 'tbl_baithi.soTT')
            .join('tbl_phongthi', 'tbl_baithi.maPhongthi', '=', 'tbl_phongthi.maPhongthi')
            .join('tbl_chitietvipham', 'tbl_hosothisinh.maHoso', '=', 'tbl_chitietvipham.maHoso')
            .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', '=', 'tbl_htkyluat.maHinhthuc')
            .where('tbl_chitietvipham.maNhommonhoc', 3)
            .groupBy('tbl_hosothisinh.maHoso')
            .select('*')
        const longestResults = this._findLongestArray([results1, results2, results3]);
        const finalResults = [];
        longestResults.map(item => {
            finalResults.push({
                ...item,
                klMon1: (results1.find(obj => obj.soBaodanh === item.soBaodanh)) ? (results1.find(obj => obj.soBaodanh === item.soBaodanh)).mucTru : '',
                klMon2: (results2.find(obj => obj.soBaodanh === item.soBaodanh)) ? (results2.find(obj => obj.soBaodanh === item.soBaodanh)).mucTru : '',
                klMon3: (results3.find(obj => obj.soBaodanh === item.soBaodanh)) ? (results3.find(obj => obj.soBaodanh === item.soBaodanh)).mucTru : '',
            })
        })
        // console.log(finalResults);
        return finalResults;
    }
    async upDateVipham(maNhommonhoc, maHoso, entity){
        return this.database(this.tableName).update(entity).where('maNhommonhoc',maNhommonhoc).andWhere('maHoso',maHoso);
    }
    async deleteVipham(maHoso){
        const deleteRecorded =  await this.database(this.tableName).del().where('maHoso', maHoso);
        return deleteRecorded;
    }
}
module.exports = CapNhatThiSinhViPhamRepository;