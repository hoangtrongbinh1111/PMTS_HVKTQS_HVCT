const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const TinhRepository = require("../../../repositories/TinhRepository");

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

exports.getListTinh = async (req, res) => {
  const tinhRepository = new TinhRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await tinhRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoTinh = async (req, res) => {
  const tinhRepository = new TinhRepository();
  try {
    const response = await tinhRepository.create({
       
      tenTinh: req.body.tenTinh,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaTinh = async (req, res) => {
  const tinhRepository = new TinhRepository();
  const id = req.body.id
  try {
    const response = await tinhRepository.update(id, {
      tenTinh: req.body.tenTinh,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaTinh = async (req, res) => {
  const tinhRepository = new TinhRepository();
  const { id } = req.query;
  try {
    const response = await tinhRepository.delete(id);
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

