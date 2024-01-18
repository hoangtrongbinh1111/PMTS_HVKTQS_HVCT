const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const ChuyenNganhRepository = require("../../../repositories/ChuyenNganhRepository");
const ChiTieuTuyenSinhRepository = require('../../../repositories/ChiTieuTuyenSinhRepository');
const DiaChiDaoTaoRepository = require("../../../repositories/DiaChiDaoTaoRepository");
const DiemChuanRepository = require("../../../repositories/DiemChuanRepository");

var values = {
  data:
    [
      {
        maNhom: 1,
        tenNhom: "HV",
        ghiChu: "Đỗ Minh Hiếu",
      },
      {
        maNhom: 2,
        tenNhom: "HV",
        ghiChu: "Hoàng Trọng Bình",
      },
      {
        maNhom: 3,
        tenNhom: "HV",
        ghiChu: "Nguyễn Huyền Trang",
      }
    ]
};

exports.getListChuyenNganh = async (req, res) => {

  const chuyenNganhRepository = new ChuyenNganhRepository();
  const { page, perPage, query } = req.query;


  try {
    const data = await chuyenNganhRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoChuyenNganh = async (req, res) => {

  const chuyenNganhRepository = new ChuyenNganhRepository();
  const diaChiDaoTao = new DiaChiDaoTaoRepository()
  const diemChuan = new DiemChuanRepository()

  try {
    const response = await chuyenNganhRepository.create({
      tenChuyennganh: req.body.tenChuyennganh,
      maNganhTS: req.body.maNganhTS,
      kiHieuChuyennganh: req.body.kiHieuChuyennganh,
      diemXetTuyenQS: 0,
      diemChuanQS: 0,
      diemXetTuyenDS: 0,
      diemChuanDS: 0,
      ghiChu: req.body.ghiChu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    const listdiachi = await diaChiDaoTao.getAll(1,100)
    for ( const diaChi of listdiachi.data) {
      const  res1 =  await diemChuan.create({
        maChuyennganhTS: response[0],
        maDcdaotao: diaChi.maDcdaotao,
        diemChuanDS: 0,
        diemChuanQS: 0
      })
      console.log(res1)
      if (!res1) {
        return responseFailed({ res });
      }
    }
    
    return responseSuccess({ res });
  } catch (err) {
    console.log("err", err)
    return responseServerError({ res, err });
  }
};
exports.SuaChuyenNganh = async (req, res) => {

  const chuyenNganhRepository = new ChuyenNganhRepository();
  const { id } = req.query;
  try {
    const response = await chuyenNganhRepository.update(id,
      req.body
    );
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
} 
exports.SuaNhieuChuyenNganh = async (req, res) => {

  const diemChuan = new DiemChuanRepository()

  const data = req.body;
  try {
    data.forEach(async element => {
      const response = await diemChuan.updateDiemChuan(element.maChuyennganhTS,element.maDcdaotao, 
        {
          diemChuanDS: element.diemChuanDS,
          diemChuanQS: element.diemChuanQS
        }
      );
      if (!response) {
        return responseFailed({ res });
      }
    });


    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.SuaDiemChuan = async (req, res) => {

  const diemChuan = new DiemChuanRepository()
  const data = req.body;
  try {
    data.forEach(async element => {
      const response = await diemChuan.updateDiemChuan(element.maChuyennganhTS,element.maDcdaotao, 
        {
          diemChuanDS: element.diemChuanDS,
          diemChuanQS: element.diemChuanQS
        }
      );
      if (!response) {
        return responseFailed({ res });
      }
    });


    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.XoaChuyenNganh = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository()
  const chuyenNganhRepository = new ChuyenNganhRepository();
  const diemChuan = new DiemChuanRepository()

  const { id } = req.query;
  try {
    const response__ = await diemChuan.deleteDiemChuan(id);
    const response_ = await chiTieuTuyenSinhRepository.deleteCNTS(id);
    const response = await chuyenNganhRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.ExportExcel = async (req, res) => {

  const fs = require('fs');
  try {
    const mydata = ExportFile('template/chuyennganh/dstchuyennganh.xlsx', 'output/chuyennganh/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/chuyennganh/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

