const knex = require('knex');
var fs = require('fs-extra')

const BaseRepository = require('./BaseRepository');
const { TBL_HOSOTHISINH, TBL_HOSOTHISINH_KEY } = require("../schemas/constant");
const { getSlaveDatabase, getSlaveName } = require('../db');
const { MimeType } = require('easy-template-x');
const { upperCase } = require('lodash');

class HoSoDangKiRepository extends BaseRepository {
  constructor() {
    super(`${TBL_HOSOTHISINH}`, `${TBL_HOSOTHISINH_KEY}`, getSlaveDatabase(), getSlaveName(), knex); // Specify the table name for the UserRepository
  }

  // Add additional methods specific to the UserRepository if needed
  async getAll(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
      // Use query builder for filtering if a query is provided
      queryBuilder = queryBuilder.where((builder) => {
        builder.where('hoTen', 'like', `%${query}%`);
        builder.orWhere('gioiTinh', 'like', `%${query}%`);
        builder.orWhere('noiSinh', 'like', `%${query}%`);
        builder.orWhere('STT', 'like', query);
        builder.orWhere('gioiTinh', 'like', `%${query}%`);
      });

      const results = await queryBuilder.limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maHoso`)'],
      };
    } else {
      // const results = await await this.database(this.tableName).select('*').leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
      // .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
      // .groupBy('tbl_hosothisinh.maHoso').limit(perPage).offset(offset);
      const results = await this.database(this.tableName).select('*')
        .leftJoin('tbl_truongdaihoc', 'tbl_hosothisinh.maTruong', 'tbl_truongdaihoc.maTruong')
        .leftJoin('tbl_nganh', 'tbl_hosothisinh.maNganh', 'tbl_nganh.maNganh')
        .leftJoin('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
        .limit(perPage).offset(offset);
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: results,
        totalCount: totalCount['count(`maHoso`)'],
      };
    }
  }
  async getByByDiem(page, perPage, loaiTS, diem, maChuyennganhTS, maDcdaotao) {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    // const results = await await this.database(this.tableName).select('*').leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
    // .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
    // .groupBy('tbl_hosothisinh.maHoso').limit(perPage).offset(offset);

    // danh sách đủ điểm chuẩn
    queryBuilder = queryBuilder.where((builder) => {
      builder.join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', 'tbl_chuyennganhts.maChuyennganhTS')
      builder.where('loaiTS', 'like', `%${loaiTS}%`)
      builder.andWhere('tongDiem', '>=', diem)
      builder.andWhere('maChuyennganhTS', 'like', `%${maChuyennganhTS}%`)
      builder.andWhere('maDcdaotao', 'like', `%${maDcdaotao}%`)
    });
    // lọc ra những thằng bị liệt
    const results = await queryBuilder.limit(perPage).offset(offset);
    console.log(results)
    const listTrungTuyen = []
    for (const item of results) {
      const results1 = await this.database.select('*').from('tbl_baithi').where(`tbl_baithi.soTT`, '=', item.soTT)
        .join('tbl_monthi', 'tbl_baithi.maMon', 'tbl_monthi.maMon')
      let flag = true
      for (const item1 of results1) {
        const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${item.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${item1.maNhommonhoc}`)
          .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
          .first()
        if ((item1.diemThi * (1 - (vipham === undefined ? 0 : parseFloat(vipham.mucTru) / 100))) <= item1.diemLiet) {
          flag = false
        }
      }
      if (flag === true) {
        listTrungTuyen.push(item)
      }

    }

    return {
      data: listTrungTuyen,
      totalCount: listTrungTuyen.length,
    };

  }
  async getSBD(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    if (query) {
      // Use query builder for filtering if a query is provided
      const results = await this.database(this.tableName).select('*')
        .leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
        .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
        .leftJoin('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
        .leftJoin('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
        .leftJoin('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
        .groupBy('tbl_hosothisinh.maHoso')
        .where('hoTen', 'like', `%${query}%`)
        .orWhere('gioiTinh', 'like', `%${query}%`)
        .orWhere('noiSinh', 'like', `%${query}%`)
        .orWhere('STT', 'like', query)
        .orWhere('gioiTinh', 'like', `%${query}%`)
        .orWhere('tenPhong', 'like', `%${query}%`)

      results.sort((a, b) => {
        const aParts = a.hoTen.split(' ');
        const bParts = b.hoTen.split(' ');

        // Lấy tên từ sau cùng của mỗi tên
        const aFirstName = aParts[aParts.length - 1];
        const bFirstName = bParts[bParts.length - 1];

        // Lấy tên đệm (nếu có) từ sau cùng của mỗi tên
        const aMiddleName = aParts.slice(1, aParts.length - 1).join(' ');
        const bMiddleName = bParts.slice(1, bParts.length - 1).join(' ');
        // lấy họ 
        const aLastName = aParts[0];
        const bLastName = bParts[0];


        // So sánh theo thứ tự tên đến tên đệm đến họ
        if (this.CharCompare(aFirstName, bFirstName, 0) != 0) {
          return this.CharCompare(aFirstName, bFirstName, 0)
        } else {
          if (this.CharCompare(aLastName, bLastName, 0) != 0) {
            return this.CharCompare(aLastName, bLastName, 0)
          } else {
            return this.CharCompare(aMiddleName, bMiddleName, 0)
          }
        }
      })
      return {
        data: results.slice((page - 1) * perPage, perPage * page),
        totalCount: results.length,
      };
    } else {
      const results = await this.database(this.tableName).select('*').leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
        .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
        .leftJoin('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
        .leftJoin('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
        .leftJoin('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
        .groupBy('tbl_hosothisinh.maHoso');
      // const results = await await this.database(this.tableName).select('*').limit(perPage).offset(offset);
      const temp = results.sort((a, b) => {
        const aParts = a.hoTen.split(' ');
        const bParts = b.hoTen.split(' ');

        // Lấy tên từ sau cùng của mỗi tên
        const aFirstName = aParts[aParts.length - 1];
        const bFirstName = bParts[bParts.length - 1];

        // Lấy tên đệm (nếu có) từ sau cùng của mỗi tên
        const aMiddleName = aParts.slice(1, aParts.length - 1).join(' ');
        const bMiddleName = bParts.slice(1, bParts.length - 1).join(' ');
        // lấy họ 
        const aLastName = aParts[0];
        const bLastName = bParts[0];


        // So sánh theo thứ tự tên đến tên đệm đến họ
        if (this.CharCompare(aFirstName, bFirstName, 0) != 0) {
          return this.CharCompare(aFirstName, bFirstName, 0)
        } else {
          if (this.CharCompare(aLastName, bLastName, 0) != 0) {
            return this.CharCompare(aLastName, bLastName, 0)
          } else {
            return this.CharCompare(aMiddleName, bMiddleName, 0)
          }
        }
      })
      temp.sort((a, b) => a.maDidiem - b.maDidiem)
      const totalCount = await this._getTotalCount(queryBuilder);
      return {
        data: temp.slice((page - 1) * perPage, perPage * page),
        totalCount: totalCount['count(`maHoso`)'],
      };
    }
  }
  removeAccents(input) {
    const mapAccents = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd',
      ' ': '',
    };

    return input.split('').map(char => mapAccents[char] || char).join('');

  }
  convertToCustomFormat(input) {
    const withoutAccents = this.removeAccents(input);
    const lowercase = withoutAccents.toLowerCase();
    const withoutSpaces = lowercase.replace(/\s+/g, "");
    return withoutSpaces;
  }
  async getDanhSachDiem(page, perPage, query = '') {
    let queryBuilder = this._getQueryBuilder();
    const offset = (page - 1) * perPage;
    // list các bài thi của thí sinh
    const results = await this.database(this.tableName).select('*').orderBy('soTT')
      .leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
      .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
      .leftJoin('tbl_htuutien', 'tbl_hosothisinh.maHinhthuc', '=', 'tbl_htuutien.maHinhthuc')
    console.log(results)

    const groupedData = {};

    for (const record of results) {
      if (!groupedData[record.maHoso]) {
        groupedData[record.maHoso] = {
          maHoso: record.maHoso,
          soBaodanh: record.soBaodanh,
          hoTen: record.hoTen,
          cong: record.congM1,
          hinhthuc: record.tenHinhthuc,
          ngoaiNgu: record.ngoaiNgu,
          coban: null,
          chuyennganh: null,
          ngoaingu: null,
          viphamcoban: null,
          viphamchuyennganh: null,
          viphamngoaingu: null,
          tongDiem: 0,
        };
      }
      // thông tin mnoon thi
      const monthi = await this.database.select('*').from('tbl_monthi')
        .join('tbl_nhommonhoc', `tbl_monthi.maNhommonhoc`, `tbl_nhommonhoc.maNhommonhoc`).where('tbl_monthi.maMon', 'like', `%${record.maMon}`).first()
      // list vi phạm của thi sinh
      const vipham = await this.database.select('*').from('tbl_chitietvipham').where('tbl_chitietvipham.maHoso', 'like', `%${record.maHoso}`).andWhere('tbl_chitietvipham.maNhommonhoc', 'like', `%${monthi.maNhommonhoc}`)
        .join('tbl_htkyluat', 'tbl_chitietvipham.maHinhthuc', 'tbl_htkyluat.maHinhthuc')
        .first()
      switch (this.convertToCustomFormat(monthi.tenNhomMonHoc)) {

        case 'ngoaingu': {
          groupedData[record.maHoso].ngoaingu = record.diemThi
          if (vipham) groupedData[record.maHoso].viphamngoaingu = vipham
          break
        }
        case 'coban': {
          groupedData[record.maHoso].coban = record.diemThi
          if (vipham) groupedData[record.maHoso].viphamcoban = vipham

          break
        }
        case 'chuyennganh': {
          groupedData[record.maHoso].chuyennganh = record.diemThi
          if (vipham) groupedData[record.maHoso].viphamchuyennganh = vipham
          break
        }
      }
    }
    // update tongdiem vao hoso 

    const resultArray = Object.values(groupedData);
    for (const item of resultArray) {
      item.tongDiem = (item.coban - item.coban * (item.viphamcoban === null ? 0 : item.viphamcoban.mucTru / 100) + item.chuyennganh - item.chuyennganh * (item.viphamchuyennganh === null ? 0 : item.viphamchuyennganh.mucTru / 100) + item.cong).toFixed(2)
      const res = await this.database('tbl_hosothisinh').where('tbl_hosothisinh.maHoso', item.maHoso).update({
        tongDiem: item.tongDiem,
        diemCoBan: item.coban - item.coban * (item.viphamcoban === null ? 0 : item.viphamcoban.mucTru / 100),
        diemChuyenNganh: item.chuyennganh - item.chuyennganh * (item.viphamchuyennganh === null ? 0 : item.viphamchuyennganh.mucTru / 100),
        diemNgoaiNgu: item.ngoaiNgu === 'Miễn Thi' ? 100 : item.ngoaingu - item.ngoaingu * (item.viphamngoaingu === null ? 0 : item.viphamngoaingu.mucTru / 100),
      })
    }
    return {
      data: resultArray.slice((page - 1) * perPage, perPage * page),
      totalCount: resultArray.length,
    };

  }
  groupByMaDidiem = (data) => {
    const groups = {};

    data.forEach(item => {
      const maDidiem = item.maDidiem;
      if (!groups[maDidiem]) {
        groups[maDidiem] = {
          maDidiem: maDidiem,
          tenDiadiem: item.tenDiadiem,
          KiHieuDiadiem: item.KiHieuDiadiem,
          data1: []
        };
      }
      groups[maDidiem].data1.push(item);
    });

    return Object.values(groups);
  }
  groupByDiaChiDT = (data) => {
    const groups = {};

    data.forEach(item => {
      const maDcdaotao = item.maDcdaotao;
      if (!groups[maDcdaotao]) {
        groups[maDcdaotao] = {
          maDcdaotao: maDcdaotao,
          tenDc: item.tenDc,
          KiHieuDc: item.KiHieuDc,
          data1: []
        };
      }
      groups[maDcdaotao].data1.push(item);
    });

    return Object.values(groups);
  }
  groupByMaChuyenNganhTS(groupedData) {
    groupedData.forEach(group => {
      const data1 = group.data1;
      const groupsByMaChuyenNganhTS = {};

      data1.forEach(item => {
        const maChuyennganhTS = item.maChuyennganhTS;
        if (!groupsByMaChuyenNganhTS[maChuyennganhTS]) {
          groupsByMaChuyenNganhTS[maChuyennganhTS] = {
            maChuyennganhTS: maChuyennganhTS,
            tenChuyennganh: item.tenChuyennganh,
            kiHieuChuyennganh: item.kiHieuChuyennganh,
            data2: []
          };
        }
        groupsByMaChuyenNganhTS[maChuyennganhTS].data2.push(item);
      });

      group.data1 = Object.values(groupsByMaChuyenNganhTS);
    });

    return groupedData;
  }
  groupedPhongThi(groups, item) {
    const key = item.maPhongthi;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }

  countByLoaiTS(groupedData) {

    groupedData.forEach(group => {
      group.data1.forEach(subGroup => {
        const loaiTSCounts = [{
          "DS": 0,
          "QS": 0,
        }];;
        let totalLoaiTS = 0;
        subGroup.data2.forEach(item => {
          const loaiTS = item.loaiTS;
          if (loaiTS == 'Dân sự') {
            loaiTSCounts[0]['DS'] = (loaiTSCounts[0]['DS'] || 0) + 1;

          } else {
            loaiTSCounts[0]['QS'] = (loaiTSCounts[0]['QS'] || 0) + 1;

          }
          totalLoaiTS++;
        });
        subGroup.loaiTSCounts = loaiTSCounts;
        subGroup.totalLoaiTS = totalLoaiTS;
        delete subGroup.data2
      });
      const loaiTSCounts = [{
        "DS": 0,
        "QS": 0,
      }];
      let totalLoaiTS = 0; // Tổng số lượng "loaiTS" của từng nhóm "maDiadiem" và "maNganhTS"
      group.data1.forEach(subGroup => {
        Object.keys(subGroup.loaiTSCounts[0]).forEach(loaiTS => {
          loaiTSCounts[0][loaiTS] += subGroup.loaiTSCounts[0][loaiTS];
          totalLoaiTS += subGroup.loaiTSCounts[0][loaiTS];
        });
      });
      group.loaiTSCounts = loaiTSCounts;
      group.totalLoaiTS = totalLoaiTS;
    });
    const loaiTSCounts = [{
      "DS": 0,
      "QS": 0,
    }];;
    let totalLoaiTS = 0;
    groupedData.forEach(group => {
      Object.keys(group.loaiTSCounts[0]).forEach(loaiTS => {
        loaiTSCounts[0][loaiTS] += group.loaiTSCounts[0][loaiTS];
        totalLoaiTS += group.loaiTSCounts[0][loaiTS];
      });
    });
    return {
      data: groupedData,
      loaiTSCounts: loaiTSCounts,
      totalLoaiTS: totalLoaiTS
    };
  }
  async getByChuyenNganh() {
    const results = await this.database(this.tableName).select('*').join('tbl_chuyennganhts', 'tbl_chuyennganhts.maChuyennganhTS', '=', 'tbl_hosothisinh.maChuyennganhTS')
      .join('tbl_nganhts', 'tbl_nganhts.maNganhTS', '=', 'tbl_chuyennganhts.maNganhTS')
      .join('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
    const data = this.groupByMaDidiem(results)
    const data1 = this.groupByMaChuyenNganhTS(data)
    const finalGroupedData = this.countByLoaiTS(data1);
    return {
      data: finalGroupedData
    };
  }

  async getByDiaChiDT() {
    const results = await this.database(this.tableName).select('*').join('tbl_chuyennganhts', 'tbl_chuyennganhts.maChuyennganhTS', '=', 'tbl_hosothisinh.maChuyennganhTS')
      .join('tbl_nganhts', 'tbl_nganhts.maNganhTS', '=', 'tbl_chuyennganhts.maNganhTS')
      .join('tbl_diachidaotao', 'tbl_hosothisinh.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
    const data = this.groupByDiaChiDT(results)
    const data1 = this.groupByMaChuyenNganhTS(data)
    const finalGroupedData = this.countByLoaiTS(data1);
    return {
      data: finalGroupedData
    };
  }
  async getAllDanhSachDanAnh() {

    const results = await this.database(this.tableName).select('*')
      .join('tbl_diachidaotao', 'tbl_hosothisinh.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
      .join('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
      .join('tbl_truongdaihoc', 'tbl_hosothisinh.maTruong', '=', 'tbl_truongdaihoc.maTruong')
      .join('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
      .join('tbl_loaihinhdt', 'tbl_hosothisinh.maLoaihinh', '=', 'tbl_loaihinhdt.maLoaihinh')
      .join('tbl_pltotnghiepdh', 'tbl_hosothisinh.maPhanloai', '=', 'tbl_pltotnghiepdh.maPhanloai')
      .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
      .leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
      .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
      .groupBy('tbl_hosothisinh.maHoso');
    const groupedData = results.reduce((groups, item) => {
      const key = item.maPhongthi;
      if (!groups[key]) {
        groups[key] = { maPhongthi: key, tenPhong: item.tenPhong, giangDuongPhong: item.giangDuongPhong, childrenData: [] };
      }

      // Push the item to the "data" array
      groups[key].childrenData.push(item);

      return groups;
    }, {});

    // Create "row" objects with chunks of data
    const resultArray = Object.values(groupedData).map(group => {
      const chunkSize = 5;
      const rows = []

      for (let i = 0; i < group.childrenData.length; i += chunkSize) {
        const newRow = {};
        const chunk = group.childrenData.slice(i, i + chunkSize);
        chunk.forEach((item, index) => {
          newRow[`hoTen${index + 1}`] = item.hoTen;
          newRow[`SoBaodanh${index + 1}`] = item.soBaodanh;
          newRow[`ngaySinh${index + 1}`] = item.ngaySinh;
          newRow[`STT${index + 1}`] = `Mã HS ${item.STT}`;
          newRow[`file${index + 1}`] = {
            _type: "image",
            source: fs.readFileSync(`public/images/${getSlaveName()}/${item.fileAnh}`),
            format: MimeType.Png,
            altText: "Kung Fu Hero", // Optional
            width: 80,
            height: 100
          };
        });
        // newArray.row.push(...objectsInRow);
        rows.push(newRow);
      }
      return { maPhongthi: group.maPhongthi, tenPhong: group.tenPhong, giangDuongPhong: group.giangDuongPhong, childrenData: [{ row: rows }] };
    });

    return {
      data: resultArray
    };
  }
  async getAllDanhSach() {
    const results = await this.database(this.tableName).select('*')
      .join('tbl_diachidaotao', 'tbl_hosothisinh.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
      .join('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
      .join('tbl_truongdaihoc', 'tbl_hosothisinh.maTruong', '=', 'tbl_truongdaihoc.maTruong')
      .join('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
      .join('tbl_loaihinhdt', 'tbl_hosothisinh.maLoaihinh', '=', 'tbl_loaihinhdt.maLoaihinh')
      .join('tbl_pltotnghiepdh', 'tbl_hosothisinh.maPhanloai', '=', 'tbl_pltotnghiepdh.maPhanloai')
      .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
      .leftJoin('tbl_baithi', `tbl_hosothisinh.soTT`, `tbl_baithi.soTT`)
      .leftJoin('tbl_phongthi', 'tbl_phongthi.maPhongthi', '=', 'tbl_baithi.maPhongthi')
      .groupBy('tbl_hosothisinh.maHoso');
    return {
      data: results
    };
  }
  async getAllDanhSachTheoPhong() {
    const results = await this.database.from('tbl_baithi').select(`tbl_monthi.tenMon`, `tbl_hosothisinh.hoTen`, `tbl_hosothisinh.gioiTinh`, `tbl_hosothisinh.ngaySinh`, 'tbl_phongthi.tenPhong', 'tbl_phongthi.giangDuongPhong', 'tbl_nhommonhoc.tenNhomMonHoc', `tbl_hosothisinh.soBaodanh`, `tbl_diadiemthi.KiHieuDiadiem`)
      .join('tbl_monthi', `tbl_baithi.maMon`, `tbl_monthi.maMon`)
      .join('tbl_phongthi', `tbl_baithi.maPhongthi`, `tbl_phongthi.maPhongthi`)
      .join('tbl_nhommonhoc', `tbl_monthi.maNhommonhoc`, `tbl_nhommonhoc.maNhommonhoc`)
      .join('tbl_diadiemthi', `tbl_phongthi.maDidiem`, `tbl_diadiemthi.maDidiem`)
      .join('tbl_hosothisinh', `tbl_baithi.soTT`, `tbl_hosothisinh.soTT`)
    const groupedData = [];
    let i = 1
    for (const item of results) {
      let nhomMonHoc = groupedData.find(nhom => {
        if (nhom.tenNhomMonHoc === upperCase(item.tenNhomMonHoc) && nhom.tenMon === item.tenMon && nhom.tenPhong === item.tenPhong) return true
        else return false
      });
      if (!nhomMonHoc) {
        nhomMonHoc = {
          index: i,
          tenNhomMonHoc: upperCase(item.tenNhomMonHoc),
          tenPhong: item.tenPhong,
          tenMon: item.tenMon,
          giangDuongPhong: item.giangDuongPhong,
          KiHieuDiadiem: item.KiHieuDiadiem,
          data1: []
        };
        i = i + 1
        groupedData.push(nhomMonHoc);
      }

      nhomMonHoc.data1.push(item);
    }

    return {
      data: groupedData
    };
  }
  async getAllDanhSachThiTheoPhong() {
    const results = await this.database.from('tbl_hosothisinh')
      .join('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
      .join('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
      .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
      .join('tbl_baithi', 'tbl_baithi.soTT', 'tbl_hosothisinh.soTT')
      .join('tbl_phongthi', `tbl_phongthi.maPhongthi`, `tbl_baithi.maPhongthi`)
      .leftJoin('tbl_htuutien', 'tbl_hosothisinh.maHinhthuc', 'tbl_htuutien.maHinhthuc')
      .groupBy('tbl_hosothisinh.maHoso');
    const groupedData = [];
    let i = 1;
    for (const item of results) {
      let phonghoc = groupedData.find(phonghoc => {
        if (phonghoc.tenPhong === item.tenPhong) return true
        else return false
      });
      if (!phonghoc) {
        phonghoc = {
          index: i,
          giangDuongPhong: item.giangDuongPhong,
          tenPhong: item.tenPhong,
          KiHieuDiadiem: item.KiHieuDiadiem,
          data1: []
        };
        i = i + 1
        groupedData.push(phonghoc);
      }

      phonghoc.data1.push(item);
    }

    return {
      data: groupedData
    };
  }
  async getAllDanhSachDiemThiTheoPhong() {
    const results = await this.database.from('tbl_hosothisinh').distinct('tbl_hosothisinh.soTT', 'tbl_hosothisinh.soBaodanh', 'tbl_hosothisinh.ngoaiNgu', 'tbl_hosothisinh.hoTen', 'tbl_hosothisinh.gioiTinh', 'tbl_hosothisinh.ngaySinh', 'tbl_hosothisinh.diemCoBan', 'tbl_hosothisinh.diemChuyenNganh', 'tbl_hosothisinh.diemNgoaiNgu', 'tbl_phongthi.*', 'tbl_htuutien.kiHieuHinhthuc', 'tbl_htuutien.congM1')
      .join('tbl_baithi', 'tbl_baithi.soTT', 'tbl_hosothisinh.soTT')
      .join('tbl_phongthi', `tbl_phongthi.maPhongthi`, `tbl_baithi.maPhongthi`)
      .leftJoin('tbl_htuutien', 'tbl_hosothisinh.maHinhthuc', 'tbl_htuutien.maHinhthuc')
    const groupedData = [];
    for (const item of results) {
      let nhomMonHoc = groupedData.find(nhom => {
        if (nhom.tenNhomMonHoc === item.tenNhomMonHoc && nhom.tenMon === item.tenMon && nhom.tenPhong === item.tenPhong) return true
        else return false
      });
      if (!nhomMonHoc) {
        nhomMonHoc = {
          tenNhomMonHoc: item.tenNhomMonHoc,
          tenPhong: item.tenPhong,
          tenMon: item.tenMon,
          data1: []
        };
        groupedData.push(nhomMonHoc);
      }

      nhomMonHoc.data1.push(item);
    }

    return {
      data: groupedData
    };
  }
  async getAllDanhSachTheoPhongVaSoBaoDanh() {
    const results = await this.database.from('tbl_hosothisinh')
      .join('tbl_diachidaotao', 'tbl_hosothisinh.maDcdaotao', '=', 'tbl_diachidaotao.maDcdaotao')
      .join('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
      .join('tbl_truongdaihoc', 'tbl_hosothisinh.maTruong', '=', 'tbl_truongdaihoc.maTruong')
      .join('tbl_nganh', 'tbl_hosothisinh.maNganh', '=', 'tbl_nganh.maNganh')
      .join('tbl_loaihinhdt', 'tbl_hosothisinh.maLoaihinh', '=', 'tbl_loaihinhdt.maLoaihinh')
      .join('tbl_pltotnghiepdh', 'tbl_hosothisinh.maPhanloai', '=', 'tbl_pltotnghiepdh.maPhanloai')
      .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
      .join('tbl_baithi', 'tbl_baithi.soTT', 'tbl_hosothisinh.soTT')
      .join('tbl_phongthi', `tbl_phongthi.maPhongthi`, `tbl_baithi.maPhongthi`)
      .leftJoin('tbl_htuutien', 'tbl_hosothisinh.maHinhthuc', 'tbl_htuutien.maHinhthuc')
      .groupBy('tbl_hosothisinh.maHoso');
    const temp = results.sort((a, b) => {
      const aParts = a.hoTen.split(' ');
      const bParts = b.hoTen.split(' ');

      // Lấy tên từ sau cùng của mỗi tên
      const aFirstName = aParts[aParts.length - 1];
      const bFirstName = bParts[bParts.length - 1];

      // Lấy tên đệm (nếu có) từ sau cùng của mỗi tên
      const aMiddleName = aParts.slice(1, aParts.length - 1).join(' ');
      const bMiddleName = bParts.slice(1, bParts.length - 1).join(' ');
      // lấy họ 
      const aLastName = aParts[0];
      const bLastName = bParts[0];
      // So sánh theo thứ tự tên đến tên đệm đến họ
      if (this.CharCompare(aFirstName, bFirstName, 0) != 0) {
        return this.CharCompare(aFirstName, bFirstName, 0)
      } else {
        if (this.CharCompare(aLastName, bLastName, 0) != 0) {
          return this.CharCompare(aLastName, bLastName, 0)
        } else {
          return this.CharCompare(aMiddleName, bMiddleName, 0)
        }
      }

    });
    return {
      data: temp
    };
  }
  async ThongKeTheoMucDiem() {
    const results = await this.database(this.tableName).select('*')
      .join('tbl_chuyennganhts', 'tbl_hosothisinh.maChuyennganhTS', '=', 'tbl_chuyennganhts.maChuyennganhTS')
    const groups = {};

    results.forEach(item => {
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


    return {
      data: data
    };
  }
  CharCompare(a, b, index) {
    // Sắp xếp "a" trước "ă"
    var AccentsMap = [
      "a", "à", "ả", "ã", "á,", "ạ,", "ă", "ằ", "ẳ", "ẵ", "ắ", "ặ", "â", "ầ", "ẩ", "ẫ", "ấ", "ậ", "b", "c",
      "d", "đ",
      "e", "è", "ẻ", "ẽ", "é", "ẹ", "ê", "ề", "ể", "ễ", "ế", "ệ", "f", "g", "h",
      "i", "ì", "ỉ", "ĩ", "í", "ị", "j", "k", "l", "m", "n",
      "o", "ò", "ỏ", "õ", "ó", "ọ", "ô", "ồ", "ổ", "ỗ", "ố", "ộ", "ơ", "ờ", "ở", "ỡ", "ớ", "ợ", "p", "q", "r", "s", "t",
      "u", "ù", "ủ", "ũ", "ú", "ụ", "ư", "ừ", "ử", "ữ", "ứ", "ự", "v", "x",
      "y", "ỳ", "ỷ", "ỹ", "ý", "ỵ",
    ];
    if (index == a.length || index == b.length)
      return 0;
    //toUpperCase: isn't case sensitive
    var aChar = AccentsMap.indexOf(a.toLowerCase().charAt(index));
    var bChar = AccentsMap.indexOf(b.toLowerCase().charAt(index));
    if (aChar != bChar)
      return aChar - bChar
    else
      return this.CharCompare(a, b, index + 1)
  }
  async getAndSortByName() {
    try {
      let queryBuilder = this._getQueryBuilder();
      let results = await this.database(this.tableName).select('*').join('tbl_chuyennganhts', 'tbl_chuyennganhts.maChuyennganhTS', '=', 'tbl_hosothisinh.maChuyennganhTS')
        .join('tbl_nganhts', 'tbl_nganhts.maNganhTS', '=', 'tbl_chuyennganhts.maNganhTS')
        .leftJoin('tbl_diadiemthi', 'tbl_hosothisinh.maDidiem', '=', 'tbl_diadiemthi.maDidiem')
      var timeSort = "xếp tên";

      console.time(timeSort);
      results = results.sort((a, b) => {
        const aParts = a.hoTen.split(' ');
        const bParts = b.hoTen.split(' ');

        // Lấy tên từ sau cùng của mỗi tên
        const aFirstName = aParts[aParts.length - 1];
        const bFirstName = bParts[bParts.length - 1];

        // Lấy tên đệm (nếu có) từ sau cùng của mỗi tên
        const aMiddleName = aParts.slice(1, aParts.length - 1).join(' ');
        const bMiddleName = bParts.slice(1, bParts.length - 1).join(' ');
        // lấy họ 
        const aLastName = aParts[0];
        const bLastName = bParts[0];
        // So sánh theo thứ tự tên đến tên đệm đến họ
        if (this.CharCompare(aFirstName, bFirstName, 0) != 0) {
          return this.CharCompare(aFirstName, bFirstName, 0)
        } else {
          if (this.CharCompare(aLastName, bLastName, 0) != 0) {
            return this.CharCompare(aLastName, bLastName, 0)
          } else {
            return this.CharCompare(aMiddleName, bMiddleName, 0)
          }
        }

      });
      // log xếp tên
      console.timeEnd(timeSort);
      var timeSBD = "đánh sbd";

      console.time(timeSBD);
      let datasource = []
      results.sort((a, b) => a.maDidiem - b.maDidiem)
      // đánh số thứ tự và báo danh
      results.forEach(async (element, index) => {
        const formattedNumbers = (index + 1).toString().padStart(4, '0')
        const soBaodanh = element.kihieuNganh + '.' + formattedNumbers
        datasource.push({
          ...element,
          SBD: soBaodanh,
          STT: index + 1
        })
        const res = await super.update(element.maHoso, {
          soBaodanh: soBaodanh,
          soTT: index + 1
        })
      });
      console.timeEnd(timeSBD);
      var timeTaoBaiThi = "Xếp phòng và tạo bài thi";

      console.time(timeTaoBaiThi);
      // số lượng thí sinh
      const totalCount = await this._getTotalCount(queryBuilder);

      // lấy số lượng ghế

      const countSoluong = await this.database('tbl_phongthi').sum('soLuong as Tong')

      // nếu số ghế nhỏ hơn số lượng thí sinh thì lỗi
      if (countSoluong[0].Tong < totalCount['count(`maHoso`)']) {
        return
      } else {
        // xóa sắp xếp cũ trong data
        const baiThi = await this.database('tbl_baithi').del()
        // list phòng thi 

        const phongThi = await this.database('tbl_phongthi').select('*');
        let phongDangdung = 0; // Chỉ số phòng hiện tại
        let soChodadung = 0; // Số chỗ đã sử dụng trong phòng hiện tại
        let baiThiArr = [];
        for (const thiSinh of datasource) {
          // Nếu hết chỗ trong phòng hiện tại, chuyển sang phòng tiếp theo
          if (soChodadung === phongThi[phongDangdung].soLuong || parseInt(thiSinh.maDidiem) !== parseInt(phongThi[phongDangdung].maDidiem)) {
            phongDangdung = phongDangdung + 1;
            soChodadung = 0;
          }
          //thêm mới bản ghi vào bài thi
          const baithiThiSinhArr = [
            {
              soTT: thiSinh.STT,
              maPhongthi: phongThi[phongDangdung].maPhongthi,
              maMon: thiSinh.maMon1,
              gioThi: '',
              ngayThi: '',
              soPhach: '',
              diemThi: 0,
              diemSua: 0,
            },
            {
              soTT: thiSinh.STT,
              maPhongthi: phongThi[phongDangdung].maPhongthi,
              maMon: thiSinh.maMon2,
              gioThi: '',
              ngayThi: '',
              soPhach: '',
              diemThi: 0,
              diemSua: 0,
            }
          ]
          if (thiSinh.ngoaiNgu !== 'Miễn Thi') {
            baithiThiSinhArr.push({
              soTT: thiSinh.STT,
              maPhongthi: phongThi[phongDangdung].maPhongthi,
              maMon: thiSinh.maMon3,
              gioThi: '',
              ngayThi: '',
              soPhach: '',
              diemThi: 0,
              diemSua: 0,
            });
          }
          baiThiArr.push(
            ...baithiThiSinhArr
          )
          soChodadung = soChodadung + 1;
        }
        if (baiThiArr.length > 0) {
          const chunkSize = 50;
          await this.database.batchInsert('tbl_baithi', baiThiArr, chunkSize);
        }

        console.timeEnd(timeTaoBaiThi);

        return {
          data: results,
          totalCount: totalCount['count(`maHoso`)'],
        };
      }
    } catch (err) {
      console.log(err)
    }

  }
  async getByID(id) {
    let queryBuilder = this._getQueryBuilder();
    queryBuilder = queryBuilder.where((builder) => {
      builder.where(this.primaryKey, id);
    });
    const results = await queryBuilder.first();
    return {
      data: results
    }
  }
  async DeleteByID(id) {
    // tìm các bài thi có trong bảng bài thi 
    // xóa các bài thi có trong bảng bài thi
    const hoso = await this.database(this.tableName).select('SoTT')
    if (hoso[0].soTT !== '') {
      const baithi = await this.database('tbl_baithi').where('SoTT', hoso[0].soTT).del()
    }
    return this.database(this.tableName).where(this.primaryKey, id).del();
  }
  _getQueryBuilder() {
    return this.database(this.tableName).select('*');
  }

  _getTotalCount(queryBuilder) {
    return queryBuilder.clone().count(this.primaryKey).first();
  }
}


module.exports = HoSoDangKiRepository;
