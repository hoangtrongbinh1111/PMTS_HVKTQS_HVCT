const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const HuongDanDonTuiRepository = require("../../../repositories/HuongDanDonTuiRepository");

exports.getTuiThiByMonThi = async (req, res) => {
  const huongDanDonTuiRepository = new HuongDanDonTuiRepository();
  const maMonThi = req.query;

  try {
    const data = await huongDanDonTuiRepository.getAll(maMonThi.maMonThi);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.getHuongDanDonTui = async (req, res) => {
  const huongDanDonTuiRepository = new HuongDanDonTuiRepository();
  const { page, perPage, query } = req.query;
  try {
    const data = await huongDanDonTuiRepository.getHuongDanDonTui(parseInt(page), parseInt(perPage), parseInt(query));
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.getSophachTheoMon = async (req, res) => {
  const huongDanDonTuiRepository = new HuongDanDonTuiRepository();
  const { page, perPage, query } = req.query;
  try {
    const data = await huongDanDonTuiRepository.getSoPhachTheoMon(parseInt(page), parseInt(perPage), parseInt(query));
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
