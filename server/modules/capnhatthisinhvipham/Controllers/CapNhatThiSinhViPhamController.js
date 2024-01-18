const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
// Import repository
const CapNhatThiSinhViPhamRepository = require("../../../repositories/CapNhatThiSinhViPhamRepository");
exports.TimKiemThiSinh = async (req, res) => {
  const capnhatThisinhVipham = new CapNhatThiSinhViPhamRepository();

  const { SBD, ten, phongthi } = req.query;

  try {
    const data = await capnhatThisinhVipham.timKiemThiSinh(SBD, ten, phongthi)
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.AddDSViPham = async (req, res) => {
  const { maHoSo, kyLuatMon1, kyLuatMon2, kyLuatMon3 } = req.body
  const capnhatThisinhVipham = new CapNhatThiSinhViPhamRepository();
  try {
    let response;
    if (kyLuatMon1) {
      response = await capnhatThisinhVipham.create({ maNhommonhoc: 1, maHinhthuc: kyLuatMon1, maHoso: maHoSo })
    }
    if (kyLuatMon2) {
      response = await capnhatThisinhVipham.create({ maNhommonhoc: 2, maHinhthuc: kyLuatMon2, maHoso: maHoSo })
    }
    if (kyLuatMon3) {
      response = await capnhatThisinhVipham.create({ maNhommonhoc: 3, maHinhthuc: kyLuatMon3, maHoso: maHoSo })
    }
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.SuaVipham = async (req, res) => {
  const capnhatThisinhVipham = new CapNhatThiSinhViPhamRepository();
  const { maHoSo, kyLuatMon1, kyLuatMon2, kyLuatMon3 } = req.body
  try {
    let response;
    if (kyLuatMon1) {
      response = await capnhatThisinhVipham.upDateVipham( 1, maHoSo, {maHinhthuc: kyLuatMon1})
    }
    if (kyLuatMon2) {
      response = await capnhatThisinhVipham.upDateVipham( 2, maHoSo, {maHinhthuc: kyLuatMon2})
    }
    if (kyLuatMon3) {
      response = await capnhatThisinhVipham.upDateVipham( 3, maHoSo, {maHinhthuc: kyLuatMon3})
    }
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.DeleteViphamByMaHoSo = async (req, res) => {
  const capnhatThisinhVipham = new CapNhatThiSinhViPhamRepository();
  const { maHoso } = req.query;
  try {
    const data = await capnhatThisinhVipham.deleteVipham(maHoso);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err);
    return responseServerError({ res, err });
  }
};
exports.ListDSViPham = async (req, res) => {
  const capnhatThisinhVipham = new CapNhatThiSinhViPhamRepository();
  try {
    const data = await capnhatThisinhVipham.getAllDanhSachViPham();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}