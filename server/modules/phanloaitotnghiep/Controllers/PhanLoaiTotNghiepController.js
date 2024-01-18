const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const PhanLoaiTotNghiepRepository = require("../../../repositories/PhanLoaiTotNghiepRepository");

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

exports.getListPhanLoaiTotNghiep = async (req, res) => {
  const phanLoaiTotNghiepRepository = new PhanLoaiTotNghiepRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await phanLoaiTotNghiepRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoPhanLoaiTotNghiep = async (req, res) => {
  const phanLoaiTotNghiepRepository = new PhanLoaiTotNghiepRepository();
  try {
    const response = await phanLoaiTotNghiepRepository.create({     
      tenPhanloai: req.body.tenPhanloai,
      kiHieuPhanloai: req.body.kiHieuPhanloai,
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
exports.SuaPhanLoaiTotNghiep = async (req, res) => {
  const phanLoaiTotNghiepRepository = new PhanLoaiTotNghiepRepository();
  const id = req.body.id
  try {
    const response = await phanLoaiTotNghiepRepository.update(id, {
      tenPhanloai: req.body.tenPhanloai,
      kiHieuPhanloai: req.body.kiHieuPhanloai,
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
exports.XoaPhanLoaiTotNghiep = async (req, res) => {
  const phanLoaiTotNghiepRepository = new PhanLoaiTotNghiepRepository();
  const { id } = req.query;
  try {
    const response = await phanLoaiTotNghiepRepository.delete(id);
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
    const mydata = ExportFile('template/phanloaitotnghiep/dsphanloaitotnghiep.xlsx', 'output/phanloaitotnghiep/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/phanloaitotnghiep/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

