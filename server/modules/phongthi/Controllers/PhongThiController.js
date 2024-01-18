const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const PhongThiRepository = require("../../../repositories/PhongThiRepository");
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

exports.getListPhongThi = async (req, res) => {

  const phongThiRepository = new PhongThiRepository();
  const { page, perPage, query } = req.query;

  try {
    const data = await phongThiRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoPhongThi = async (req, res) => {

  const phongThiRepository = new PhongThiRepository();
  try {
    const response = await phongThiRepository.create({
      tenPhong: req.body.tenPhong,
      giangDuongPhong: req.body.giangDuongPhong,
      maDidiem: req.body.maDidiem,
      giangDuongPhong: req.body.giangDuongPhong,
      soLuong: req.body.soLuong,
      ghiChu: req.body.ghiChu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaPhongThi = async (req, res) => {

  const phongThiRepository = new PhongThiRepository();
  const id = req.body.id
  try {
    const response = await phongThiRepository.update(id, {
      tenPhong: req.body.tenPhong,
      giangDuongPhong: req.body.giangDuongPhong,
      maDidiem: req.body.maDidiem,
      giangDuongPhong: req.body.giangDuongPhong,
      soLuong: req.body.soLuong,
      ghiChu: req.body.ghiChu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {

    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.XoaPhongThi = async (req, res) => {

  const phongThiRepository = new PhongThiRepository();
  const { id } = req.query;
  try {
    const response = await phongThiRepository.delete(id);
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

