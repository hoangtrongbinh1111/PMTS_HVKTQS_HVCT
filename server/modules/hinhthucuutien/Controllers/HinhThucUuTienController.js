const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const HinhThucUuTienRepository = require("../../../repositories/HinhThucUuTienRepository");

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

exports.getListHinhThucUuTien = async (req, res) => {
  const hinhThucUuTienRepository = new HinhThucUuTienRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await hinhThucUuTienRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoHinhThucUuTien = async (req, res) => {
  const hinhThucUuTienRepository = new HinhThucUuTienRepository();
  try {
    const response = await hinhThucUuTienRepository.create({
       
      tenHinhthuc: req.body.tenHinhthuc,
      kiHieuHinhthuc: req.body.kiHieuHinhthuc,
      congM1: req.body.congM1,
      congM2: req.body.congM2,
      congM3: req.body.congM3,
      congM4: req.body.congM4,
      congM5: req.body.congM5,
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
exports.SuaHinhThucUuTien = async (req, res) => {
  const hinhThucUuTienRepository = new HinhThucUuTienRepository();
  const id = req.body.id
  try {
    const response = await hinhThucUuTienRepository.update(id, {
      tenHinhthuc: req.body.tenHinhthuc,
      kiHieuHinhthuc: req.body.kiHieuHinhthuc,
      congM1: req.body.congM1,
      congM2: req.body.congM2,
      congM3: req.body.congM3,
      congM4: req.body.congM4,
      congM5: req.body.congM5,
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
exports.XoaHinhThucUuTien = async (req, res) => {
  const hinhThucUuTienRepository = new HinhThucUuTienRepository();
  const { id } = req.query;
  try {
    const response = await hinhThucUuTienRepository.delete(id);
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
    const mydata = ExportFile('template/doituonguutien/dstdoituonguutien.xlsx', 'output/doituonguutien/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/doituonguutien/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

