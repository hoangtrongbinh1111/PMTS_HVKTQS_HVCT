const knex = require('knex');

const BaseRepository = require('./BaseRepository');
const { TBL_CHITIEUTS, TBL_CHITIEUTS_KEY } = require("../schemas/constant");
const { getSlaveDatabase } = require('../db');
const { result } = require('lodash');

class ChiTieuTuyenSinhRepository extends BaseRepository {
  constructor() {
    super(`${TBL_CHITIEUTS}`, `${TBL_CHITIEUTS_KEY}`, getSlaveDatabase(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getListChiTieu(page, perPage, search = '') {
    const offset = (page - 1) * perPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage - 1;
    if (!search) {
      // Use query builder for filtering if a query is provided
      try {
        const queryBuilder = this.database
          .select(
            'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.kiHieuChuyenNganh',
            'tbl_chuyennganhts.tenChuyennganh'
          )
          .sum('tbl_chitieuts.soLuongQS as totalQS')
          .sum('tbl_chitieuts.soLuongDS as totalDS')
          .from('tbl_chuyennganhts')
          .leftJoin('tbl_chitieuts', 'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chitieuts.maChuyennganhTS')
          .groupBy('tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.tenChuyennganh');

        const results = await queryBuilder;
        const results1 = results.slice(startIndex, endIndex);
        // const totalCount = await this._getTotalCount(queryBuilder);
        const listChiTieu = []
        for (let i = 0; i < results.length; i++) {
          const countSL = results[i].totalQS + results[i].totalDS
          const temp = {
            ...results[i],
            tong: countSL
          }
          listChiTieu.push(temp)
        }
        return {
          data: listChiTieu,
          totalCount: results.length,
        };
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const queryBuilder = this.database
          .select(
            'tbl_chuyennganhts.maChuyennganhTS',
            'tbl_chuyennganhts.tenChuyennganh'
          )
          .sum('tbl_chitieuts.soLuongQS as totalQS')
          .sum('tbl_chitieuts.soLuongDS as totalDS')
          .from('tbl_chuyennganhts')
          .leftJoin('tbl_chitieuts', 'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chitieuts.maChuyennganhTS')
          .where('tbl_chitieuts.maChuyennganhTS', 'like', `%${search}%`)
          .orWhere('tenChuyennganh', 'like', `%${search}%`)
          .orWhere('tbl_chitieuts.soLuongDS', 'like', `%${search}%`)
          .orWhere('tbl_chitieuts.soLuongQS', 'like', `%${search}%`)
          .groupBy('tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.tenChuyennganh');

        const results = await queryBuilder;
        const results1 = results.slice(startIndex, endIndex);
        const listChiTieu = []
        for (let i = 0; i < results.length; i++) {
          const countSL = results[i].totalQS + results[i].totalDS
          const temp = {
            ...results[i],
            tong: countSL
          }
          listChiTieu.push(temp)
        }
        return {
          data: listChiTieu,
          totalCount: results1.length,
        };
      } catch (err) {
        console.log(err)
      }
    }
  }
  filterHoso(item, results) {
    if (item.maChuyennganhTS == results.maChuyennganhTS && parseInt(item.maDcdaotao) == parseInt(results.maDcdaotao)) {
      return true;
    } else {
      return false;

    }
  }


  async DuKienDiem(page, perPage, search = '') {
    const offset = (page - 1) * perPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage - 1;

    try {

      // lấy danh sách chỉ tiêu
      const queryBuilder = this.database
        .select(
          'tbl_chuyennganhts.maChuyennganhTS',
          'tbl_chuyennganhts.tenChuyennganh',
          'tbl_chitieuts.soLuongQS as totalQS',
          'tbl_chitieuts.soLuongDS as totalDS',
          'tbl_diachidaotao.KiHieuDc',
          'tbl_diachidaotao.maDcdaotao'

        )
        // .sum('tbl_chitieuts.soLuongQS as totalQS')
        // .sum('tbl_chitieuts.soLuongDS as totalDS')
        .from('tbl_chuyennganhts')
        .leftJoin('tbl_chitieuts', 'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chitieuts.maChuyennganhTS')
        .leftJoin('tbl_diachidaotao', 'tbl_chitieuts.maDcdaotao', 'tbl_diachidaotao.maDcdaotao')

      // .groupBy('tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.tenChuyennganh');

      const results = await queryBuilder;
      const queryBuilder1 = this.database
        .from('tbl_hosothisinh')
        .select('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
        .count('* as SoLuong')
        .groupBy('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
      const resultsSoLuong = await queryBuilder1;
      const listChiTieu = []
      for (let i = 0; i < results.length; i++) {
        const countSL = results[i].totalQS + results[i].totalDS

        const diemChuan = await this.database.from('tbl_diemchuan').select('*').where('maChuyennganhTS', 'like', `%${results[i].maChuyennganhTS}%`).andWhere('maDcdaotao', 'like', `%${results[i].maDcdaotao}%`).first()
        if (results[i].maDcdaotao) {

          const soLuong = resultsSoLuong.filter(item => this.filterHoso(item, results[i]))
          const temp = {
            ...results[i],
            tong: countSL,
            diemChuanDS: diemChuan.diemChuanDS,
            diemChuanQS: diemChuan.diemChuanQS,
            soLuong: soLuong
          }
          listChiTieu.push(temp)
        }
      }
      const transformedData = []
      for (const item of listChiTieu) {
        if (item.totalQS !== null) {
          // thống kê mức điểm của chuyên ngành và địa chỉ thi đó

          const mucdiem = await this.database('tbl_hosothisinh').select('*')
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Quân sự`)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          const groups = {};

          mucdiem.forEach(item => {
            const maChuyennganhTS = item.maChuyennganhTS;
            if (!groups[maChuyennganhTS]) {
              groups[maChuyennganhTS] = {
                maChuyennganhTS: maChuyennganhTS,
                kiHieuChuyennganh: item.kiHieuChuyennganh,
                data1: [],
                countDiem: []
              };
            }
            groups[maChuyennganhTS].data1.push(item.tongDiem);
          });

          const data = Object.values(groups);
          data.forEach(item => {
            const countDiem = []
            const counts = {};
            for (const number of item.data1) {
              if (counts[number]) {
                counts[number]++;
              } else {
                counts[number] = 1;
              }
            }
            for (const number in counts) {
              countDiem.push({ value: parseFloat(number), count: counts[number], kiHieuChuyennganh: item.kiHieuChuyennganh });
            }
            let tichLuy = item.data1.length
            const final = []
            countDiem.sort((a, b) => a.value - b.value).forEach((e, index) => {
              final.push({ ...e, tichLuy: tichLuy })
              tichLuy = tichLuy - e.count
            })
            final.reverse().forEach((e, index) => {
              item.countDiem.push({ ...e, index: index + 1 })
            })
            delete item.data1
          })
          const diemDuKien = data[0]?.countDiem.find(a => a.tichLuy >= item.totalQS)
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Quân sự`)
            .andWhere('tongDiem', '>=', diemDuKien !== undefined ? diemDuKien.value : 0)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          // lấy các thí sinh chuyên ngành đấy ở địa điểm đào tạo kia
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((parseFloat(item1.diemThi) * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= parseFloat(item1.diemLiet)) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }
          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            maDcdaotao: item.maDcdaotao,

            tenChuyennganh: `${item.tenChuyennganh}_QS_${item.KiHieuDc}`,
            loaiTS: 'Quân sự',
            total: item.totalQS,
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Quân sự')[0]?.SoLuong,
            diemXetTuyen: diemDuKien !== undefined ? diemDuKien.value : 0,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
          })
        }

        if (item.totalDS !== null) {
          // thống kê mức điểm của chuyên ngành và địa chỉ thi đó

          const mucdiem = await this.database('tbl_hosothisinh').select('*')
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Dân sự`)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          const groups = {};

          mucdiem.forEach(item => {
            const maChuyennganhTS = item.maChuyennganhTS;
            if (!groups[maChuyennganhTS]) {
              groups[maChuyennganhTS] = {
                maChuyennganhTS: maChuyennganhTS,
                kiHieuChuyennganh: item.kiHieuChuyennganh,
                data1: [],
                countDiem: []
              };
            }
            groups[maChuyennganhTS].data1.push(item.tongDiem);
          });

          const data = Object.values(groups);
          data.forEach(item => {
            const countDiem = []
            const counts = {};
            for (const number of item.data1) {
              if (counts[number]) {
                counts[number]++;
              } else {
                counts[number] = 1;
              }
            }
            for (const number in counts) {
              countDiem.push({ value: parseFloat(number), count: counts[number], kiHieuChuyennganh: item.kiHieuChuyennganh });
            }
            let tichLuy = item.data1.length
            const final = []
            countDiem.sort((a, b) => a.value - b.value).forEach((e, index) => {
              final.push({ ...e, tichLuy: tichLuy })
              tichLuy = tichLuy - e.count
            })
            final.reverse().forEach((e, index) => {
              item.countDiem.push({ ...e, index: index + 1 })
            })
            delete item.data1
          })
          const diemDuKien = data[0]?.countDiem.find(a => a.tichLuy >= item.totalQS)
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Dân sự`)
            .andWhere('tongDiem', '>=', diemDuKien !== undefined ? diemDuKien.value : 0)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((item1.diemThi * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= item1.diemLiet) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }

          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            tenChuyennganh: `${item.tenChuyennganh}_DS_${item.KiHieuDc}`,
            maDcdaotao: item.maDcdaotao,
            total: item.totalDS,
            loaiTS: 'Dân sự',
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Dân sự')[0]?.SoLuong,
            diemXetTuyen: diemDuKien !== undefined ? diemDuKien.value : 0,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
          })
        }
      }
      return {
        data: transformedData,
        totalCount: transformedData.length,
      };
    } catch (err) {
      console.log(err)
    }

  }
  async getListChiTieuVaSoLuong(page, perPage, search = '') {
    const offset = (page - 1) * perPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage - 1;

    try {
      const queryBuilder = this.database
        .select(
          'tbl_chuyennganhts.maChuyennganhTS',
          'tbl_chuyennganhts.tenChuyennganh',
          'tbl_chuyennganhts.kiHieuChuyennganh',
          'tbl_chitieuts.soLuongQS as totalQS',
          'tbl_chitieuts.soLuongDS as totalDS',
          'tbl_diachidaotao.KiHieuDc',
          'tbl_diachidaotao.maDcdaotao'

        )
        // .sum('tbl_chitieuts.soLuongQS as totalQS')
        // .sum('tbl_chitieuts.soLuongDS as totalDS')
        .from('tbl_chuyennganhts')
        .leftJoin('tbl_chitieuts', 'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chitieuts.maChuyennganhTS')
        .leftJoin('tbl_diachidaotao', 'tbl_chitieuts.maDcdaotao', 'tbl_diachidaotao.maDcdaotao')

      // .groupBy('tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.tenChuyennganh');

      const results = await queryBuilder;
      const queryBuilder1 = this.database
        .from('tbl_hosothisinh')
        .select('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
        .count('* as SoLuong')
        .groupBy('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
      const resultsSoLuong = await queryBuilder1;
      const listChiTieu = []
      for (let i = 0; i < results.length; i++) {
        const countSL = results[i].totalQS + results[i].totalDS
        const diemChuan = await this.database.from('tbl_diemchuan').select('*').where('maChuyennganhTS', 'like', `%${results[i].maChuyennganhTS}%`).andWhere('maDcdaotao', 'like', `%${results[i].maDcdaotao}%`).first()
        if (results[i].maDcdaotao) {

          const soLuong = resultsSoLuong.filter(item => this.filterHoso(item, results[i]))
          const temp = {
            ...results[i],
            tong: countSL,
            diemChuanDS: diemChuan.diemChuanDS,
            diemChuanQS: diemChuan.diemChuanQS,
            soLuong: soLuong
          }
          listChiTieu.push(temp)
        }
      }
      const transformedData = []
      for (const item of listChiTieu) {
        if (item.totalQS !== null) {
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Quân sự`)
            .andWhere('tongDiem', '>=', item.diemChuanQS)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          // lấy các thí sinh chuyên ngành đấy ở địa điểm đào tạo kia
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((parseFloat(item1.diemThi) * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= parseFloat(item1.diemLiet)) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }
          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            maDcdaotao: item.maDcdaotao,
            tenChuyennganh: `${item.tenChuyennganh}_QS_${item.KiHieuDc}`,
            loaiTS: 'Quân sự',
            total: item.totalQS,
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Quân sự')[0]?.SoLuong,
            diemXetTuyen: item.diemChuanQS,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
            kiHieuChuyennganh: item.kiHieuChuyennganh,

          })
        }

        if (item.totalDS !== null) {
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Dân sự`)
            .andWhere('tongDiem', '>=', item.diemChuanDS)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((item1.diemThi * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= item1.diemLiet) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }

          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            tenChuyennganh: `${item.tenChuyennganh}_DS_${item.KiHieuDc}`,
            maDcdaotao: item.maDcdaotao,
            total: item.totalDS,
            loaiTS: 'Dân sự',
            kiHieuChuyennganh: item.kiHieuChuyennganh,
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Dân sự')[0]?.SoLuong,
            diemXetTuyen: item.diemChuanDS,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
          })
        }
      }
      return {
        data: transformedData,
        totalCount: transformedData.length,
      };
    } catch (err) {
      console.log(err)
    }

  }
  async getListDuDieuKienXetTuyen(page, perPage, search = '') {
    const offset = (page - 1) * perPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage - 1;

    try {
      const queryBuilder = this.database
        .select(
          'tbl_chuyennganhts.maChuyennganhTS',
          'tbl_chuyennganhts.tenChuyennganh',
          'tbl_chuyennganhts.kiHieuChuyennganh',
          'tbl_chitieuts.soLuongQS as totalQS',
          'tbl_chitieuts.soLuongDS as totalDS',
          'tbl_diachidaotao.KiHieuDc',
          'tbl_diachidaotao.maDcdaotao'

        )
        // .sum('tbl_chitieuts.soLuongQS as totalQS')
        // .sum('tbl_chitieuts.soLuongDS as totalDS')
        .from('tbl_chuyennganhts')
        .leftJoin('tbl_chitieuts', 'tbl_chuyennganhts.maChuyennganhTS', 'tbl_chitieuts.maChuyennganhTS')
        .leftJoin('tbl_diachidaotao', 'tbl_chitieuts.maDcdaotao', 'tbl_diachidaotao.maDcdaotao')

      // .groupBy('tbl_chuyennganhts.maChuyennganhTS', 'tbl_chuyennganhts.tenChuyennganh');

      const results = await queryBuilder;
      const queryBuilder1 = this.database
        .from('tbl_hosothisinh')
        .select('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
        .count('* as SoLuong')
        .groupBy('maChuyennganhTS', 'loaiTS', 'maDcdaotao')
      const resultsSoLuong = await queryBuilder1;
      const listChiTieu = []
      for (let i = 0; i < results.length; i++) {
        const countSL = results[i].totalQS + results[i].totalDS
        const diemChuan = await this.database.from('tbl_diemchuan').select('*').where('maChuyennganhTS', 'like', `%${results[i].maChuyennganhTS}%`).andWhere('maDcdaotao', 'like', `%${results[i].maDcdaotao}%`).first()
        if (results[i].maDcdaotao) {

          const soLuong = resultsSoLuong.filter(item => this.filterHoso(item, results[i]))
          const temp = {
            ...results[i],
            tong: countSL,
            diemChuanDS: diemChuan.diemChuanDS,
            diemChuanQS: diemChuan.diemChuanQS,
            soLuong: soLuong
          }
          listChiTieu.push(temp)
        }
      }
      const transformedData = []
      for (const item of listChiTieu) {
        if (item.totalQS !== null) {
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Quân sự`)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          // lấy các thí sinh chuyên ngành đấy ở địa điểm đào tạo kia
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((parseFloat(item1.diemThi) * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= parseFloat(item1.diemLiet)) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }
          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            maDcdaotao: item.maDcdaotao,
            tenChuyennganh: `${item.tenChuyennganh}_QS_${item.KiHieuDc}`,
            loaiTS: 'Quân sự',
            total: item.totalQS,
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Quân sự')[0]?.SoLuong,
            diemXetTuyen: item.diemChuanQS,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
            kiHieuChuyennganh: item.kiHieuChuyennganh,

          })
        }

        if (item.totalDS !== null) {
          const queryBuilder1 = this.database
            .from('tbl_hosothisinh')
            .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
            .where('loaiTS', 'like', `Dân sự`)
            .andWhere('tbl_hosothisinh.maChuyennganhTS', 'like', `%${item.maChuyennganhTS}%`)
            .andWhere('tbl_hosothisinh.maDcdaotao', 'like', `%${item.maDcdaotao}%`)
          const total = await queryBuilder1;
          const danhSachTrungTuyen = []
          for (const item of total) {
            const diem = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
              .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
            let flag = true
            for (const item1 of diem) {
              const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
                .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
                .first()
              if ((item1.diemThi * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= item1.diemLiet) {
                flag = false
              }
            }
            if (flag === true) {
              danhSachTrungTuyen.push(item)
            }

          }
          transformedData.push({
            maChuyennganhTS: item.maChuyennganhTS,
            tenChuyennganh: `${item.tenChuyennganh}_DS_${item.KiHieuDc}`,
            maDcdaotao: item.maDcdaotao,
            total: item.totalDS,
            loaiTS: 'Dân sự',
            kiHieuChuyennganh: item.kiHieuChuyennganh,
            soLuong: item.soLuong.filter(item => item.loaiTS === 'Dân sự')[0]?.SoLuong,
            diemXetTuyen: item.diemChuanDS,
            soLuongTrungTuyen: danhSachTrungTuyen.length,
            danhSachTrungTuyen: danhSachTrungTuyen,
          })
        }
      }
      return {
        data: transformedData,
        totalCount: transformedData.length,
      };
    } catch (err) {
      console.log(err)
    }

  }
  async getListChiTieuDetail(page, perPage, query = '', maChuyennganhTS) {
    const offset = (page - 1) * perPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage - 1;
    if (!query) {
      // Use query builder for filtering if a query is provided
      try {
        const queryBuilder = this.database('tbl_chitieuts')
          .join('tbl_diachidaotao', 'tbl_chitieuts.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
          .where('tbl_chitieuts.maChuyennganhTS', maChuyennganhTS)
          .select('tbl_diachidaotao.maDcdaotao', 'tbl_diachidaotao.tenDc', 'tbl_chitieuts.soLuongDS', 'tbl_chitieuts.soLuongQS', 'tbl_chitieuts.maChitieu')

        const results = await queryBuilder;
        const results1 = results.slice(startIndex, endIndex);
        // const totalCount = await this._getTotalCount(queryBuilder);
        const listChiTieu = []
        for (let i = 0; i < results.length; i++) {
          const countSL = results[i].totalQS + results[i].totalDS
          const temp = {
            ...results[i],
            tong: countSL
          }
          listChiTieu.push(temp)
        }
        return {
          data: listChiTieu,
          totalCount: results.length,
        };
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const queryBuilder = this.database('tbl_chitieuts')
          .join('tbl_diachidaotao', 'tbl_chitieuts.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
          .where('tbl_chitieuts.maChuyennganhTS', maChuyennganhTS)
          .andWhere('tbl_diachidaotao.tenDc', 'like', `%${query}`)
          .select('tbl_diachidaotao.tenDc', 'tbl_chitieuts.soLuongDS', 'tbl_chitieuts.soLuongQS')

        const results = await queryBuilder;
        const results1 = results.slice(startIndex, endIndex);
        const listChiTieu = []
        for (let i = 0; i < results.length; i++) {
          const countSL = results[i].totalQS + results[i].totalDS
          const temp = {
            ...results[i],
            tong: countSL
          }
          listChiTieu.push(temp)
        }
        return {
          data: listChiTieu,
          totalCount: results1.length,
        };
      } catch (err) {
        console.log(err)
      }
    }
  }

  // lấy địa chỉ đào tạo chưa có chỉ tiêu tuyển sinh của một chuyên ngành nào đó
  async getListDCNot(maChuyennganhTS) {
    const queryBuilder = this.database('tbl_diachidaotao')
      .whereNotIn(
        'maDcdaotao',
        this.database('tbl_chitieuts').where('maChuyennganhTS', maChuyennganhTS).select('maDcdaotao')
      )
      .select('maDcdaotao', 'tenDc')
    const results = await queryBuilder;
    return {
      data: results
    }
  }

  async deleteCNTS(maChuyennganhTS) {
    const queryBuilder = this.database('tbl_chitieuts')
      .where('maChuyennganhTS', maChuyennganhTS)
      .del()
    const results = await queryBuilder;
    return {
      data: results
    }
  }

  // get data to export docx file
  async getDataToExportDocx() {
    // Use query builder for filtering if a query is provided
    try {
      // lay danh sach chuyen nganh
      const queryBuilder1 = this.database
        .select('maChuyennganhTS', 'kiHieuChuyennganh', 'tenChuyennganh')
        .from('tbl_chuyennganhts')
      const listChuyennganhts = await queryBuilder1

      // lay ds dia chi dao tao
      const queryBuilder2 = this.database
        .select('maDcdaotao', 'KiHieuDc')
        .from('tbl_diachidaotao')
      const listDC = await queryBuilder2
      const results = []
      let tongAllQS = 0
      let tongAllDS = 0
      for (let i = 0; i < listChuyennganhts.length; i++) {
        const item_cn = []
        item_cn.push(i + 1)
        item_cn.push(listChuyennganhts[i].kiHieuChuyennganh)
        item_cn.push(listChuyennganhts[i].tenChuyennganh)
        let listQS = []
        let listDS = []
        let listQD = []
        for (let j = 0; j < 5; j++) {
          const queryBuilder3 = this.database
            .select('soLuongDS', 'soLuongQS')
            .from('tbl_chitieuts')
            .where('tbl_chitieuts.maChuyennganhTS', listChuyennganhts[i].maChuyennganhTS)
            .andWhere('tbl_chitieuts.maDcdaotao', listDC[j]?.maDcdaotao || 0)
          const count1 = await queryBuilder3.first()
          listQS.push(count1?.soLuongQS || '')
          listDS.push(count1?.soLuongDS || '')
        }
        let countQS = 0
        for (let i = 0; i < 5; i++) {
          item_cn.push(listQS[i])
          if (listQS[i] !== '') {
            countQS = countQS + listQS[i]
          }
        }
        item_cn.push(countQS)
        let countDS = 0
        for (let i = 0; i < 5; i++) {
          item_cn.push(listDS[i])
          if (listDS[i] !== '') {
            countDS = countDS + listDS[i]
          }
        }
        item_cn.push(countDS)
        item_cn.push(countDS + countQS)
        results.push(item_cn)
        tongAllDS = tongAllDS + countDS
        tongAllQS = tongAllQS + countQS
      }
      const data = []
      let tongqs1 = 0
      let tongqs2 = 0
      let tongqs3 = 0
      let tongqs4 = 0
      let tongqs5 = 0
      let tongds1 = 0
      let tongds2 = 0
      let tongds3 = 0
      let tongds4 = 0
      let tongds5 = 0
      for (let i = 0; i < results.length; i++) {
        const item = {
          stt: results[i][0],
          kihieu: results[i][1],
          tenCN: results[i][2],
          qs1: results[i][3] !== 0 ? results[i][3] : '',
          qs2: results[i][4] !== 0 ? results[i][4] : '',
          qs3: results[i][5] !== 0 ? results[i][5] : '',
          qs4: results[i][6] !== 0 ? results[i][6] : '',
          qs5: results[i][7] !== 0 ? results[i][7] : '',
          tongQS: results[i][8] !== 0 ? results[i][8] : '',
          ds1: results[i][9] !== 0 ? results[i][9] : '',
          ds2: results[i][10] !== 0 ? results[i][10] : '',
          ds3: results[i][11] !== 0 ? results[i][11] : '',
          ds4: results[i][12] !== 0 ? results[i][12] : '',
          ds5: results[i][13] !== 0 ? results[i][13] : '',
          tongDS: results[i][14] !== 0 ? results[i][14] : '',
          tongDQ: results[i][15] !== 0 ? results[i][15] : ''
        }
        if (results[i][3] !== '') {
          tongqs1 = tongqs1 + results[i][3]
        }
        if (results[i][4] !== '') {
          tongqs2 = tongqs2 + results[i][4]
        }
        if (results[i][5] !== '') {
          tongqs3 = tongqs3 + results[i][5]
        }
        if (results[i][6] !== '') {
          tongqs4 = tongqs4 + results[i][6]
        }
        if (results[i][7] !== '') {
          tongqs5 = tongqs5 + results[i][7]
        }
        if (results[i][9] !== '') {
          tongds1 = tongds1 + results[i][9]
        }
        if (results[i][10] !== '') {
          tongds2 = tongds2 + results[i][10]
        }
        if (results[i][11] !== '') {
          tongds3 = tongds3 + results[i][11]
        }
        if (results[i][12] !== '') {
          tongds4 = tongds4 + results[i][12]
        }
        if (results[i][13] !== '') {
          tongds5 = tongds5 + results[i][13]
        }
        data.push(item)
      }
      data.push({
        stt: results.length + 1,
        kihieu: 'ZZZ',
        tenCN: 'Tổng',
        qs1: tongqs1 !== 0 ? tongqs1 : '',
        qs2: tongqs2 !== 0 ? tongqs2 : '',
        qs3: tongqs3 !== 0 ? tongqs3 : '',
        qs4: tongqs4 !== 0 ? tongqs4 : '',
        qs5: tongqs5 !== 0 ? tongqs5 : '',
        tongQS: tongAllQS !== 0 ? tongAllQS : '',
        ds1: tongds1 !== 0 ? tongds1 : '',
        ds2: tongds2 !== 0 ? tongds2 : '',
        ds3: tongds3 !== 0 ? tongds3 : '',
        ds4: tongds4 !== 0 ? tongds4 : '',
        ds5: tongds5 !== 0 ? tongds5 : '',
        tongDS: tongAllDS !== 0 ? tongAllDS : '',
        tongDQ: tongAllDS + tongAllQS !== 0 ? tongAllDS + tongAllQS : ''
      })
      return data
    } catch (err) {
      console.log(err)
    }
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }

}


module.exports = ChiTieuTuyenSinhRepository;
