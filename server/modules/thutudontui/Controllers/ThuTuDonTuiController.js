const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
// Import database
// Import repository
const ThuTuDonTuiRepository = require("../../../repositories/ThuTuDonTuiRepository");

exports.getListThuTuDon = async (req, res) => {

  const thutuDonTuiRepository = new ThuTuDonTuiRepository();
  const { page, perPage } = req.query;

  try {
    const data = await thutuDonTuiRepository.getAll(page, perPage);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoThuTuDon = async (req, res) => {
  const {maNhommonhoc, thuTuDon} = req.body;
  const thutuDonTuiRepository = new ThuTuDonTuiRepository();
  try {
    for (let i = 0; i < maNhommonhoc?.length; i++) {     
    const response = await thutuDonTuiRepository.create({
      maNhommonhoc: maNhommonhoc[i],
      thuTuDon: thuTuDon[i],
    });
    console.log(response);
    if (!response) {
      return responseFailed({ res });
    }
  }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.XoaThuTuDon = async (req, res) => {

  const thutuDonTuiRepository = new ThuTuDonTuiRepository();
  try {
    const response = await thutuDonTuiRepository.delete()
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.ThuTuDonTheoMon = async (req, res) => {

  const thutuDonTuiRepository = new ThuTuDonTuiRepository();
  const { maMonthi } = req.query;
  try {
    const data = await thutuDonTuiRepository.thuTuDonTheoMon(maMonthi);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};
exports.ThuTuDonToPrint = async (req, res) => {

  const thutuDonTuiRepository = new ThuTuDonTuiRepository();
  try {
    const data = await thutuDonTuiRepository.thuTuDonTui();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
}