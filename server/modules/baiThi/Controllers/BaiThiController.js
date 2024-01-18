const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const BaiThiRespository = require("../../../repositories/BaiThiRepository");


exports.getListBaiThiTheoTui = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  const { maTuithi } = req.query;

  try {
    const data = await baithiThiRepository.getAllTheoTui(maTuithi);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};
exports.getListBaiThiTheoMon = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  const { maMonthi } = req.query;
  try {
    const data = await baithiThiRepository.getAllTheoMon(maMonthi);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};
exports.UpdateDiemThi = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  try {
    // console.log(req.body.data);
    const response = await req.body.data.map(async (baithi) => {
      return await baithiThiRepository.update(baithi.maBaithi, { diemThi: parseFloat(baithi.diemThi).toFixed(2) })
    })
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.UpdateDiemThiTheoMon = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  try {
    // console.log(req.body.data);
    const response = await req.body.data.map(async (baithi) => {
      return await baithiThiRepository.UpdateDiemThiTheoMon(req.body.maMonthi, baithi.soPhach, baithi.diemThi)
    })
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
    const mydata = ExportFile('template/nhommonthi/dstnhommonthi.xlsx', 'output/nhommonthi/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.getThongTinDanhPhach = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  try {
    const data = await baithiThiRepository.getThongTinDanhPhachKhoiTao();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};

exports.checkNhapDiemThi = async (req, res) => {
  const baithiThiRepository = new BaiThiRespository();
  try {
    const data = await baithiThiRepository.checkNhapDiem();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};
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

