const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const NganhDaiHocRepository = require("../../../repositories/NganhDaiHocRepository");

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

exports.getListNganhDaiHoc = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await nganhDaiHocRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoNganhDaiHoc = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  try {
    const data = await nganhDaiHocRepository.create({
      tenNganh: req.body.tenNganh,
      kihieuNganh: req.body.kihieuNganh,
      ghiChu: req.body.ghiChu
    });
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.TaoNhieuNganhDaiHoc = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  try {
    for (const element of req.body) {
      const data1 = await nganhDaiHocRepository.kiemTraNganh(element);
      if (!data1) {
        const data = await nganhDaiHocRepository.create({
          tenNganh: element,
          kihieuNganh: element,
          ghiChu: element
        });
      }
  };
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.SuaNganhDaiHoc = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  const id = req.body.id
  try {
    const response = await nganhDaiHocRepository.update(id, {
      tenNganh: req.body.tenNganh,
      kihieuNganh: req.body.kihieuNganh,
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
exports.XoaNganhDaiHoc = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  const { id } = req.query;
  try {
    const response = await nganhDaiHocRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.KiemTraNganh = async (req, res) => {
  const nganhDaiHocRepository = new NganhDaiHocRepository();
  const { kihieuNganh } = req.body;
  try {
    const data = await nganhDaiHocRepository.kiemTraNganh(kihieuNganh);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcel = async (req, res) => {
  const fs = require('fs');
  try {
    const mydata = ExportFile('template/nganhdaihoc/dsnganhdaihoc.xlsx', 'output/nganhdaihoc/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nganhdaihoc/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

