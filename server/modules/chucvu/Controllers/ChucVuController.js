const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const ChucVuRepository = require("../../../repositories/ChucVuRepository");

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

exports.getListChucVu = async (req, res) => {
  const chucVuRepository = new ChucVuRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await chucVuRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoChucVu = async (req, res) => {
  const chucVuRepository = new ChucVuRepository();
  try {
    const response = await chucVuRepository.create({
       
      tenChucvu: req.body.tenChucvu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaChucVu = async (req, res) => {
  const chucVuRepository = new ChucVuRepository();
  const id = req.body.id
  try {
    const response = await chucVuRepository.update(id, {
      tenChucvu: req.body.tenChucvu,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaChucVu = async (req, res) => {
  const chucVuRepository = new ChucVuRepository();
  const { id } = req.query;
  try {
    const response = await chucVuRepository.delete(id);
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

