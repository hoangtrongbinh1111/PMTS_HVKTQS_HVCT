const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const MonThiRepository = require("../../../repositories/MonThiRepository");

exports.getListMonThi = async (req, res) => {
  const monThiRepository = new MonThiRepository();

  const { page, perPage, query } = req.query;
  try {
    const data = await monThiRepository.getAll(parseInt(page), parseInt(perPage), query);
    // console.log(data)
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
      
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoMonThi = async (req, res) => {
  const monThiRepository = new MonThiRepository();
  try {
    const response = await monThiRepository.create({
       
      tenMon: req.body.tenMon,
      diemLiet: req.body.diemLiet,
      maNhommonhoc: req.body.maNhommonhoc,
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
exports.SuaMonThi = async (req, res) => {
  const monThiRepository = new MonThiRepository();
  const id = req.body.id
  try {
    const response = await monThiRepository.update(id, {
      tenMon: req.body.tenMon,
      diemLiet: req.body.diemLiet,
      maNhommonhoc: req.body.maNhommonhoc,
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
exports.XoaMonThi = async (req, res) => {
  const monThiRepository = new MonThiRepository();
  const { id } = req.query;
  try {
    const response = await monThiRepository.delete(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ThongKeSoLuongPhongMon = async (req, res) => {
  const monThiRepository = new MonThiRepository();

  try {
    const data = await monThiRepository.ThongKeSoLuongThiSinhTheoPhongMon();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
      
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};

exports.ThongKeSoLuongMonPhong = async (req, res) => {
  const monThiRepository = new MonThiRepository();

  try {
    const data = await monThiRepository.ThongKeSoLuongThiSinhTheoMonPhong();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
      
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};

exports.ThongKeSoLuongTheoMonThi = async (req, res) => {
  const monThiRepository = new MonThiRepository();

  try {
    const data = await monThiRepository.ThongKeSoLuongThiSinhTheoMonThi();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
      
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};

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

