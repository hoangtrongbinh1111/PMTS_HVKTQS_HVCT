const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const NhomMonThiRepository = require("../../../repositories/NhomMonThiRepository");

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

exports.getListNhomMonThi = async (req, res) => {
  const nhomMonThiRepository = new NhomMonThiRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await nhomMonThiRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};


exports.TaoNhomMonThi = async (req, res) => {
  const nhomMonThiRepository = new NhomMonThiRepository();
  try {
    const response = await nhomMonThiRepository.create({
       
      tenNhomMonHoc: req.body.tenNhomMonHoc,
      gioThi: req.body.gioThi,
      ngayThi: req.body.ngayThi,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaNhomMonThi = async (req, res) => {
  const nhomMonThiRepository = new NhomMonThiRepository();
  const maNhommonhoc = req.body.id
  try {
    const response = await nhomMonThiRepository.update(maNhommonhoc, {
      tenNhomMonHoc: req.body.tenNhomMonHoc,
      gioThi: req.body.gioThi,
      ngayThi: req.body.ngayThi,
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
exports.XoaNhomMonThi = async (req, res) => {
  const nhomMonThiRepository = new NhomMonThiRepository();
  const { id } = req.query;
  try {
    const response = await nhomMonThiRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.ExportExcel = async (req, res) => {
  const fs = require('fs');
  try {
    const mydata = ExportFile('template/nhommonthi/dstnhommonthi.xlsx', 'output/nhommonthi/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nhommonthi/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

