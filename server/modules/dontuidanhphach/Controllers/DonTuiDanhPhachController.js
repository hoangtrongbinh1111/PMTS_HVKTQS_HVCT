const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const DonTuiDanhPhach = require("../../../repositories/DonTuiDanhPhach");

exports.TaoPhachDonTui = async (req, res) => {
  const dontuiDanhPhach = new DonTuiDanhPhach();
  // console.log(req.body.checkdanhphach);
  try {
    const response = await dontuiDanhPhach.generateAll(Number(req.body.sobaiMotui));
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.TaoPhach = async (req, res) => {
  const dontuiDanhPhach = new DonTuiDanhPhach();
  try {
    const response = await dontuiDanhPhach.taoPhach(Number(req.body.sophachBatdau));
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.GetListBaiThiTuiThi = async (req, res) => {
  const dontuiDanhPhach = new DonTuiDanhPhach();
  try {
    const data = await dontuiDanhPhach.getListBaiThiTuiThi();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}