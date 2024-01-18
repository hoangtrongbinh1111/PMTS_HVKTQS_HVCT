const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const NganhTuyenSinhRepository = require("../../../repositories/NganhTuyenSinhRepository");
const ChuyenNganhRepository = require("../../../repositories/ChuyenNganhRepository");

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
exports.getListNganhTuyenSinh = async (req, res) => {
  const nganhTuyenSinhRepository = new NganhTuyenSinhRepository();
  const { page, perPage, query } = req.query;
  try {
    const data = await nganhTuyenSinhRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.TaoNganhTuyenSinh = async (req, res) => {
  const nganhTuyenSinhRepository = new NganhTuyenSinhRepository();
  try {
    const response = await nganhTuyenSinhRepository.create({
      tenNganh: req.body.tenNganh,
      kihieuNganh: req.body.kihieuNganh,
      maMon1: req.body.maMon1,
      maMon2: req.body.maMon2,
      maMon3: req.body.maMon3,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaNganhTuyenSinh = async (req, res) => {
  const nganhTuyenSinhRepository = new NganhTuyenSinhRepository();
  const id = req.body.id
  try {
    const response = await nganhTuyenSinhRepository.update(id, {
      tenNganh: req.body.tenNganh,
      kihieuNganh: req.body.kihieuNganh,
      maMon1: req.body.maMon1,
      maMon2: req.body.maMon2,
      maMon3: req.body.maMon3,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaNganhTuyenSinh = async (req, res) => {
  const nganhTuyenSinhRepository = new NganhTuyenSinhRepository();
  const chuyenNganh = new ChuyenNganhRepository()
  const { id } = req.query;
  try {
    const response = await nganhTuyenSinhRepository.deleteNganh(id);
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
    const mydata = ExportFile('template/nganhtuyensinh/dstnganhtuyensinh.xlsx', 'output/nganhtuyensinh/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nganhtuyensinh/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

