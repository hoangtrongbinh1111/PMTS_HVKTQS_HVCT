const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess, responseInValid } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
const multer = require('multer');
const fs = require('fs')
const path = require('path');
// Import repository
const NguoiDungRepository = require("../../../repositories/NguoiDungRepository");
const RelaNhomNguoiRepository = require("../../../repositories/RelaNhomNguoiRepository");
const relaNhomNguoiRepository = new RelaNhomNguoiRepository();
const nguoiDungRepository = new NguoiDungRepository();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/users/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext == '.jpg' || ext == '.png' || ext == '.gif' || ext == '.jpeg' || ext === '.jfif') {
      cb(null, true);
    }
    else {
      cb('Only Images Are Allow', false);
    }
  }
}).single('file')
exports.upLoadImage = async (req, res) => {
  try {
    let savePath = ``;
    upload(req, res, function (err) {
      savePath = req.file.filename
      if (err) {
        console.log(err)
        return responseServerError({ res, err: "Error uploading file." });
      }
      else responseSuccessWithData({ res, data: savePath });
    })
  } catch (err) {
    return responseServerError({ res, err: "Error uploading file1." });
  }
}
exports.getListUsers = async (req, res) => {

  const { currentPage, perPage, searchValue } = req.query;
  try {
    const data = await nguoiDungRepository.getAll(parseInt(currentPage), parseInt(perPage), searchValue);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
};


exports.createUser = async (req, res) => {
  const {hoTen, tenDangKy, matKhau, ngayBD, ngayKT, ghiChu, maNhom, anhDaiDien} = req.body
  try {
    const findUser = await nguoiDungRepository.getMemberInfo(tenDangKy, matKhau)
    if (findUser !== undefined) {
      const mes = 'Tên đăng nhập đã tồn tại'
      return responseInValid({res, mes})
    } else {
    const response = await nguoiDungRepository.create({
      hoTen: req.body.hoTen,
      tenDangKy: req.body.tenDangKy,
      ngayBD: req.body.ngayBD,
      ngayKT: req.body.ngayKT ? req.body.ngayKT : '',
      ghiChu: req.body.ghiChu ? req.body.ghiChu : '',
      matKhau: req.body.matKhau,
      anhDaiDien: req.body.anhDaiDien || ''
    });
    if (response) {
    const maNguoiDung = response[0].toString()
    const temp = {
      maNguoiDung: maNguoiDung,
      maNhom: maNhom.toString()
    }
    const newRela = await relaNhomNguoiRepository.create(temp)
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  }
}
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

exports.updateUser = async (req, res) => {
  const {maNguoiDung, hoTen, tenDangKy, matKhau, ngayBD, ngayKT, ghiChu, maNhom, anhDaiDien} = req.body
  try {
    const response = await nguoiDungRepository.update(maNguoiDung, {
      hoTen: req.body.hoTen,
      tenDangKy: req.body.tenDangKy,
      ngayBD: req.body.ngayBD,
      ngayKT: req.body.ngayKT,
      ghiChu: req.body.ghiChu ? req.body.ghiChu : '',
      matKhau: req.body.matKhau,
      anhDaiDien: req.body.anhDaiDien
    });
    if (response) {
      if (maNhom) {
    const temp = {
      maNguoiDung: maNguoiDung.toString(),
      maNhom: maNhom.toString()
    }
    const newRela = await relaNhomNguoiRepository.updateRela(temp)
    if (!response) {
      return responseFailed({ res });
    }
  }
    return responseSuccess({ res });
  }

  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    const response1 = await relaNhomNguoiRepository.delete(id)
    const response2 = await nguoiDungRepository.delete(id);
    if (!response1) {
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
    const mydata = ExportFile('template/nhomnguoidung/dshoso.xlsx', 'output/nhomnguoidung/output.xlsx', res, values);
    
  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');
  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nhomnguoidung/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}


exports.getRoleById = async (req, res) => {
  const { maNhom } = req.query;
  try {
    const role = await nhomNguoiDungRepository.getRoleById(maNhom);
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.getListRoles = async (req, res) => {
  try {
    const role = await nhomNguoiDungRepository.getListRoles();
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.updateRole = async (req, res) => {
  const {roleId, permission} = req.body;
  try {
    const role = await nhomNguoiDungRepository.updateRole(roleId, permission);
    if (role === undefined) {
      const message = 'role_not_found';
      return responseInValid({ res, message });
    }
    const data = role;
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.getUserById = async (req, res) => {
  const {maNguoiDung} = req.query
  try {
    const data = await nguoiDungRepository.getUserById(maNguoiDung)
    if (data){
      return responseSuccessWithData({ res, data });
    }
  } catch(err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
