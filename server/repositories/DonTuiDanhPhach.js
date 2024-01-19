const knex = require('knex');
const { getSlaveDatabase } = require('../db');
const { Promise } = require('bluebird');
const tbl_baithi = require('../schemas/slave/tbl_baithi');
const _ = require('lodash');

class DonTuiDanhPhach {
    constructor() {
        this.database = getSlaveDatabase();
        this._knex = knex;
    }
    async taoPhach(soPhachBatDau) {
        let startTime = performance.now();
        const query1 = await this.database('tbl_monthi')
            .join('tbl_nhommonhoc', 'tbl_monthi.maNhommonhoc', '=', 'tbl_nhommonhoc.maNhommonhoc')
            .join('tbl_thutudontui', 'tbl_nhommonhoc.maNhommonhoc', '=', 'tbl_thutudontui.maNhommonhoc')
            .select('tbl_monthi.maMon', 'tbl_nhommonhoc.gioThi', 'tbl_nhommonhoc.ngayThi', 'tbl_thutudontui.thuTuDon');
        let endTime = performance.now();
        const database = this.database;
        startTime = performance.now();
        await query1.map(async (obj) => {
            let phachKhoitao = soPhachBatDau;
            const thutudon = obj.thuTuDon.split('-').map(Number);
            let maPhongTheoThutuDon = [];
            for (let i = 1; i < thutudon.length + 1; i++) {
                const maPhong = await database('tbl_phongthi').select('maPhongthi').orderBy('maPhongthi').offset(thutudon.indexOf(i)).limit(1).first();
                maPhongTheoThutuDon.push(maPhong.maPhongthi);
            }
            maPhongTheoThutuDon.map(async (phong) => {
                const queryBaiThi = await database('tbl_baithi').select('maBaithi', 'soTT').where('maMon', obj.maMon).andWhere('maPhongthi', phong).orderBy(this.database.raw('CAST (soTT as INTERGER)'));
                queryBaiThi.map(async (baithi, index) => {
                    await database('tbl_baithi').update({ soPhach: phachKhoitao + index, ngayThi: obj.ngayThi, gioThi: obj.gioThi }).where('maBaithi', baithi.maBaithi);
                });
                phachKhoitao = phachKhoitao + queryBaiThi.length;
            })
        });
        endTime = performance.now();
        return ('ok!');
    }
    async taoTui(soBaiMotTui) {
        let maTuithi = 1;
        const listMonThiWithCount = await this.database('tbl_monthi').select('tbl_monthi.maMon').count('tbl_baithi.maBaithi as SL').join('tbl_baithi', 'tbl_monthi.maMon', 'tbl_baithi.maMon').groupBy('tbl_monthi.maMon');
        let relaBaiThiArr = [];
        let relaTuiThiArr = [];
        const listBaiThiTuiThiAll = await this.database('tbl_baithi').select('*');
        for (const obj of listMonThiWithCount) {
            let soTui = 1;
            let soBaibandau = obj.SL;
            const chunkListBaiThiTuiThi = _.chunk(listBaiThiTuiThiAll.filter(item => parseInt(item.maMon) === parseInt(obj.maMon)).sort((a,b) => Number(a.soPhach) - Number(b.soPhach)) || [], soBaiMotTui);
            let counterChunk = 0;
            while (soBaibandau > 0) {
                soBaibandau = soBaibandau - soBaiMotTui;
                relaTuiThiArr.push({ tenTui: `Túi ${soTui}`, maMon: obj.maMon });
                let chunkBaiThiItem = chunkListBaiThiTuiThi[counterChunk];
                const dataRelaBaithiTuithi = chunkBaiThiItem.map((item) => {
                    return { maTui: maTuithi, maBaithi: item.maBaithi, soPhach: item.soPhach };
                });
                relaBaiThiArr.push(...dataRelaBaithiTuithi);
                maTuithi = maTuithi + 1;
                soTui = soTui + 1;
                counterChunk++;
            }
        }

        if (relaTuiThiArr.length > 0) {
            await this.database.batchInsert('tbl_tuithi', relaTuiThiArr, 300);
        }

        if (relaBaiThiArr.length > 0) {
            await this.database.batchInsert('tbl_rela_baithituithi', relaBaiThiArr, 300);
        }

    }
    async generateAll(soBaiMotTui) {
        // if(checkdanhphach.check){
            await this.database.raw(`PRAGMA synchronous=OFF`);
            await this.database('tbl_tuithi').del();
            await this.database.raw(`DELETE FROM sqlite_sequence WHERE name='tbl_tuithi'`);
            await this.database('tbl_rela_baithituithi').del();
            await this.database.raw(`DELETE FROM sqlite_sequence WHERE name='tbl_rela_baithituithi'`);
            await this.taoTui(soBaiMotTui);
            await this.database.raw(`PRAGMA synchronous=NORMAL`);
            return ('ok!');
        // }
        // else{
            // await this.taoTui(soBaiMotTui);
            // return ('ok!');
        // }

    }
    async getListBaiThiTuiThi() {
        try {
            const checkBaithiTuithi = await this.database('tbl_rela_baithituithi').select('*');
            if (checkBaithiTuithi.length > 0) {
                return { check: true };
            } else {
                return { check: false };
            }
        } catch (err) {
            console.log("err", err);
            return false;
        }
    }

}

module.exports = DonTuiDanhPhach;