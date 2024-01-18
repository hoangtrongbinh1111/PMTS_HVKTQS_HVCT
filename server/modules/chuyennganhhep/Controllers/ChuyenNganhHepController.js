const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const ChuyenNganhHepRepository = require("../../../repositories/ChuyenNganhHepRepository");

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

exports.getListChuyenNganhHep = async (req, res) => {
  const chuyenNganhHepRepository = new ChuyenNganhHepRepository();
  const { page, perPage, query } = req.query;

  
  try {
    const data = await chuyenNganhHepRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoChuyenNganhHep = async (req, res) => {
  const chuyenNganhHepRepository = new ChuyenNganhHepRepository();
  try {
    const response = await chuyenNganhHepRepository.create({
      tenChuyennganhhep : req.body.tenChuyennganhhep,
      kiHieuChuyennganhhep: req.body.kiHieuChuyennganhhep,
      maChuyennganhTS: req.body.maChuyennganhTS,
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
exports.SuaChuyenNganhHep = async (req, res) => {
  const chuyenNganhHepRepository = new ChuyenNganhHepRepository();
  const id = req.body.id
  try {
    const response = await chuyenNganhHepRepository.update(id, {
      tenChuyennganhhep : req.body.tenChuyennganhhep,
      kiHieuChuyennganhhep: req.body.kiHieuChuyennganhhep,
      maChuyennganhTS: req.body.maChuyennganhTS,
      ghiChu: req.body.ghiChu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaChuyenNganhHep = async (req, res) => {
  const chuyenNganhHepRepository = new ChuyenNganhHepRepository();
  const { id } = req.query;
  try {
    const response = await chuyenNganhHepRepository.delete(id);
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
    const mydata = ExportFile('template/chuyennganhhep/dstchuyennganhhep.xlsx', 'output/chuyennganhhep/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/chuyennganhhep/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

