const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const HinhThucKyLuatRepository = require("../../../repositories/HinhThucKyLuatRepository");

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
// Retrieve all books
exports.getListHinhThucKyLuat = async (req, res) => {
  const hinhThucKyLuatRepository = new HinhThucKyLuatRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await hinhThucKyLuatRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoHinhThucKyLuat = async (req, res) => {
  const hinhThucKyLuatRepository = new HinhThucKyLuatRepository();
  try {
    const response = await hinhThucKyLuatRepository.create({
       
      tenHinhthuc: req.body.tenHinhthuc,
      mucTru: req.body.mucTru,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaHinhThucKyLuat = async (req, res) => {
  const hinhThucKyLuatRepository = new HinhThucKyLuatRepository();
  const id = req.body.id
  try {
    const response = await hinhThucKyLuatRepository.update(id, {
      tenHinhthuc: req.body.tenHinhthuc,
      mucTru: req.body.mucTru,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaHinhThucKyLuat = async (req, res) => {
  const hinhThucKyLuatRepository = new HinhThucKyLuatRepository();
  const { id } = req.query;
  try {
    const response = await hinhThucKyLuatRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcel = async (req, res) => {
  const fs = require('fs');
  try {
    const mydata = ExportFile('template/hinhthuckyluat/dsthinhthuckyluat.xlsx', 'output/hinhthuckyluat/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/hinhthuckyluat/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

