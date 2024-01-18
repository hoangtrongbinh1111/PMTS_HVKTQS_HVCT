const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const LoaiHinhDaoTaoRepository = require("../../../repositories/LoaiHinhDaoTaoRepository");

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

exports.getListLoaiHinhDaoTao = async (req, res) => {
  const loaiHinhDaoTaoRepository = new LoaiHinhDaoTaoRepository();
  const { page, perPage, query } = req.query;
  
  try {
    const data = await loaiHinhDaoTaoRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoLoaiHinhDaoTao = async (req, res) => {
  const loaiHinhDaoTaoRepository = new LoaiHinhDaoTaoRepository();
  try {
    const response = await loaiHinhDaoTaoRepository.create({
      tenLoaiHinh: req.body.tenLoaiHinh,
      kiHieuLoaihinh: req.body.kiHieuLoaihinh,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaLoaiHinhDaoTao = async (req, res) => {
  const loaiHinhDaoTaoRepository = new LoaiHinhDaoTaoRepository();
  const id = req.body.id
  try {
    const response = await loaiHinhDaoTaoRepository.update(id, {
      tenLoaiHinh: req.body.tenLoaiHinh,
      kiHieuLoaihinh: req.body.kiHieuLoaihinh,
      ghiChu: req.body.ghiChu
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.XoaLoaiHinhDaoTao = async (req, res) => {
  const { id } = req.query;
  const loaiHinhDaoTaoRepository = new LoaiHinhDaoTaoRepository();
  try {
    const response = await loaiHinhDaoTaoRepository.delete(id);
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
    const mydata = ExportFile('template/loaihinhdaotao/dsloaihinhdaotao.xlsx', 'output/loaihinhdaotao/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/loaihinhdaotao/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

