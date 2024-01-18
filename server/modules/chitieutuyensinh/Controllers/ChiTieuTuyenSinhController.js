const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const Knex = require("knex");
const ChiTieuTuyenSinhRepository = require("../../../repositories/ChiTieuTuyenSinhRepository");

exports.getListChiTieu = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  const { page, perPage, search } = req.query;
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.getListChiTieu(parseInt(page), parseInt(perPage), search);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.DuKienDiem = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  const { page, perPage, search } = req.query;
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.DuKienDiem(parseInt(page), parseInt(perPage), search);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.getListChiTieuVaSoLuong = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  const { page, perPage, search } = req.query;
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.getListChiTieuVaSoLuong(parseInt(page), parseInt(perPage), search);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.getListDuDieuKienXetTuyen = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  const { page, perPage, search } = req.query;
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.getListDuDieuKienXetTuyen(parseInt(page), parseInt(perPage), search);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.getListChiTieuDetail = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  const { page, perPage, query, maChuyennganhTS } = req.query;
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.getListChiTieuDetail(parseInt(page), parseInt(perPage), query, maChuyennganhTS);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.getListDCNot = async (req, res) => {
  const {maChuyennganhTS} = req.query
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  // Get all books from database
  try {
    const data = await chiTieuTuyenSinhRepository.getListDCNot(maChuyennganhTS);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.createNewCT = async (req, res) => {
  const {maChuyennganhTS, maDcdaotao, soLuongDS, soLuongQS} = req.body

  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  // Get all books from database
  try {
    const response = await chiTieuTuyenSinhRepository.create({
      maChuyennganhTS: maChuyennganhTS,
      maDcdaotao: maDcdaotao,
      soLuongDS: soLuongDS,
      soLuongQS: soLuongQS
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.update = async (req, res) => {
  const {maChitieu, soLuongDS, soLuongQS} = req.body

  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  // Get all books from database
  try {
    const response = await chiTieuTuyenSinhRepository.update(maChitieu, {
      soLuongDS: soLuongDS,
      soLuongQS: soLuongQS
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.delete = async (req, res) => {
  const {maChitieu} = req.query

  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  // Get all books from database
  try {
    const response = await chiTieuTuyenSinhRepository.delete(maChitieu);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.deleteCNTS = async (req, res) => {
  const {maChuyennganhTS} = req.body

  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  // Get all books from database
  try {
    const response = await chiTieuTuyenSinhRepository.deleteCNTS(maChuyennganhTS);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.getDataToExportDocx = async (req, res) => {
  const chiTieuTuyenSinhRepository = new ChiTieuTuyenSinhRepository();
  try {
    const data = await chiTieuTuyenSinhRepository.getDataToExportDocx();
    if (!data) {
      return responseFailed({ res });
    }
    else return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
