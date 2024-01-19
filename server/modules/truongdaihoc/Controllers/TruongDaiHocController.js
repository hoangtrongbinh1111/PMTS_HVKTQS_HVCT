const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const TruongDaiHocRepository = require("../../../repositories/TruongDaiHocRepository");

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

exports.getListTruongDaiHoc = async (req, res) => {
  const truongDaiHocRepository = new TruongDaiHocRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await truongDaiHocRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoTruongDaiHoc = async (req, res) => {
  const truongDaiHocRepository = new TruongDaiHocRepository();
  try {
    const response = await truongDaiHocRepository.create({
       
      tenTruong: req.body.tenTruong,
      kiHieuTruong: req.body.kiHieuTruong,
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

exports.KiemTraTruong = async (req, res) => {
  const truongDaiHocRepository = new TruongDaiHocRepository();
  const { kiHieuTruong } = req.body;
  try {
    const data = await truongDaiHocRepository.kiemTraTruong(kiHieuTruong);
    console.log("data", data);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.SuaTruongDaiHoc = async (req, res) => {
  const truongDaiHocRepository = new TruongDaiHocRepository();
  const id = req.body.id
  try {
    const response = await truongDaiHocRepository.update(id, {
      tenTruong: req.body.tenTruong,
      kiHieuTruong: req.body.kiHieuTruong,
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
exports.XoaTruongDaiHoc = async (req, res) => {
  const truongDaiHocRepository = new TruongDaiHocRepository();
  const { id } = req.query;
  try {
    const response = await truongDaiHocRepository.delete(id);
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
    const mydata = ExportFile('template/truongdaihoc/dstruongdaihoc.xlsx', 'output/truongdaihoc/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/truongdaihoc/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

