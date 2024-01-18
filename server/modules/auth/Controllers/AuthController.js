const {
  responseSuccessWithData,
  responseServerError,
  responseInValid,
  responseSuccess
} = require('../../../helpers/response');
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY= 'PrCZBF6nm.LV]v<N'
// Import repository
let NguoiDungRepository = require('../../../repositories/NguoiDungRepository');

let nguoiDungRepository = new NguoiDungRepository();


exports.loginMember = async (req, res) => {
  const { username, password, maDotTS } = req.body;
  try {
    const user = await nguoiDungRepository.getMemberInfo(username, password);
    if (user === undefined) {
      const message = 'Tài khoản không tồn tại!';
      return responseInValid({ res, message });
    } else if (Object.keys(user).length === 0) {
      const message = 'Tên đăng nhập hoặc mật khẩu không đúng!';
      return responseInValid({ res, message });
    }
    else {
    const token = jwt.sign(req.body, JWT_SECRET_KEY);
    const data = {
      maNguoiDung: user.maNguoiDung,
      token: token,
      tenDangKy: username,
      tenNhom: user.tenNhom,
      tenChucNang: user.tenChucnang,
      hoTen: user.hoTen,
      anhDaiDien: user.anhDaiDien,
      ngayBD: user.ngayBD
    };
    return responseSuccessWithData({ res, data });
  }
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

exports.changePass = async (req, res) => {
  const { maNguoiDung, username, oldPassword, newPassword } = req.body;
  try {
    const user = await nguoiDungRepository.getMemberInfo(username, oldPassword);
    if (user !==  undefined && !(Object.keys(user).length === 0) && user.matKhau === oldPassword) {
      const data = await nguoiDungRepository.update(maNguoiDung, {
        matKhau: newPassword
      });
      if (data) {
      return responseSuccessWithData({ res, data });
      }
    } else {
      const message = 'Mật khẩu hiện tại không đúng!';
      return responseInValid({ res, message });
    } 
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

