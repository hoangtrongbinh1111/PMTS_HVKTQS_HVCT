const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const DiaDiemToChucThiRepository = require("../../../repositories/DiaDiemToChucThiRepository");
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

exports.getListDiaDiemToChucThi = async (req, res) => {
  const diaDiemToChucThiRepository = new DiaDiemToChucThiRepository();

  const { page, perPage, query } = req.query;

  try {
    const data = await diaDiemToChucThiRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.TaoDiaDiemToChucThi = async (req, res) => {
  const diaDiemToChucThiRepository = new DiaDiemToChucThiRepository();

  try {
    const response = await diaDiemToChucThiRepository.create({

      tenDiadiem: req.body.tenDiadiem,
      KiHieuDiadiem: req.body.KiHieuDiadiem,
      gioTt: req.body.gioTt,
      ngayTt: req.body.ngayTt,
      diaChi: req.body.diaChi,
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
exports.SuaDiaDiemToChucThi = async (req, res) => {
  const diaDiemToChucThiRepository = new DiaDiemToChucThiRepository();

  const id = req.body.id
  try {
    const response = await diaDiemToChucThiRepository.update(id, {
      tenDiadiem: req.body.tenDiadiem,
      KiHieuDiadiem: req.body.KiHieuDiadiem,
      gioTt: req.body.gioTt,
      ngayTt: req.body.ngayTt,
      diaChi: req.body.diaChi,
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
exports.XoaDiaDiemToChucThi = async (req, res) => {
  const diaDiemToChucThiRepository = new DiaDiemToChucThiRepository();

  const { id } = req.query;
  try {
    const response = await diaDiemToChucThiRepository.delete(id);
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
    const mydata = ExportFile('template/diadiemtochucthi/dstdiadiemtochucthi.xlsx', 'output/diadiemtochucthi/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/diadiemtochucthi/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

