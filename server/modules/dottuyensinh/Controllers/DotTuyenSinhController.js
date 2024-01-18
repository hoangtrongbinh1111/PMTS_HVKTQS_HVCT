const {
  responseSuccessWithData,
  responseServerError,
  responseFailed,
  responseSuccess,
} = require('../../../helpers/response');

// Import repository
let DotTuyenSinhRepository = require('../../../repositories/DotTuyenSinhRepository');
let dotTuyenSinhRepository = new DotTuyenSinhRepository();

exports.getListDotTuyenSinh = async (req, res) => {
  const { page, perPage, query } = req.query;

  try {
    const data = await dotTuyenSinhRepository.getAll(parseInt(page), parseInt(perPage), query);

    if (!data) {
      return responseFailed({ res });
    }

    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.switchDotTuyenSinh = async (req, res) => {
  const id = req.body.id;
  const databaseName = await dotTuyenSinhRepository.getDatabaseName(id)
  try {
    const data = await dotTuyenSinhRepository.switchDotTuyenSinh(databaseName.duongDan);

    if (!data) {
      return responseFailed({ res });
    }

    return responseSuccessWithData({ res,  data: databaseName.duongDan});
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.switchDotTuyenSinhByName = async (req, res) => {
  const dbName = req.body.dbName;
  try {
    const data = await dotTuyenSinhRepository.switchDotTuyenSinh(dbName);

    if (!data) {
      return responseFailed({ res });
    }

    return responseSuccessWithData({ res,  data: dbName});
  } catch (err) {
    return responseServerError({ res, err });
  }
};

exports.createDotTuyenSinh = async (req, res) => {
  const databaseName = dotTuyenSinhRepository._generateDatabaseName()
  await dotTuyenSinhRepository.createNewDatabase(databaseName)
  const isActive = 1
  await dotTuyenSinhRepository.create({
    tenDotTS: req.body.tenDotTS,
    tgianTS: req.body.tgianTS,
    loaiTS: req.body.loaiTS,
    duongDan: databaseName,
    chucVu_ngki: '',
    isActive: isActive,
    ghiChu: req.body.ghiChu,
  })
    .then((result) => {
      data = databaseName
      return responseSuccessWithData({ res, data });
    })
    .catch(err => {
      console.log(err)
      return responseServerError({ res, err });
    });
};

exports.UpdateDotTuyenSinh = async (req, res) => {
  const id = req.body.id;
  try {
    const response = await dotTuyenSinhRepository.update(id, {
      tenDotTS: req.body.tenDotTS,
      tgianTS: req.body.tgianTS,
      loaiTS: req.body.loaiTS,
      chucVu_ngki: req.body.chucVu_ngki,
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

exports.DeleteDotTuyenSinh = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await dotTuyenSinhRepository.hideRecord(id);
    if (!response) {
      return responseFailed({ res });
    }

    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
