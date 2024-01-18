const express = require('express');

const DotTuyenSinhRouter = require('../modules/dottuyensinh/routes');
const TruongDaiHocRouter = require('../modules/truongdaihoc/routes');
const NhomNguoiDungRouter = require('../modules/nhomnguoidung/routes')
const NganhDaiHocRouter = require('../modules/nganhdaihoc/routes')
const LoaiHinhDaoTaoRouter = require('../modules/loaihinhdaotao/routes')
const PhanLoaiTotNghiepRouter = require('../modules/phanloaitotnghiep/routes')
const DiaChiDaoTaoRouter = require('../modules/diachidaotao/routes')
const DiaDiemToChucThiRouter = require('../modules/diadiemtochucthi/routes')
const HinhThucKyLuatRouter = require('../modules/hinhthuckyluat/routes')
const HinhThucUuTienRouter = require('../modules/hinhthucuutien/routes')
const NhomMonThiRouter = require('../modules/nhommonhoc/routes')
const MonThiRouter = require('../modules/monThi/routes')
const NganhTuyenSinhRouter = require('../modules/nganhts/routes')
const ChuyenNganhRouter = require('../modules/chuyennganh/routes')
const ChuyenNganhHepRouter = require('../modules/chuyennganhhep/routes')

const HoSoDangKiRouter = require('../modules/hosodangki/routes')
const PhongThiRouter = require('../modules/phongthi/routes')



const AuthRouter = require('../modules/auth/routes');
const NhomNguoiDung = require('../modules/nhomnguoidung/routes');
const ThamSoHeThong = require('../modules/thamsohethong/routes');
const ChiTieuTuyenSinh = require('../modules/chitieutuyensinh/routes');
const NguoiDung = require('../modules/nguoidung/routes');
const ThuTuDonTui = require('../modules/thutudontui/routes');
const DonTuiDanhPhach = require('../modules/dontuidanhphach/routes');
const HuonDanDonTui = require('../modules/huongdandontui/routes');
const BaiThi = require('../modules/baiThi/routes');
const CapNhatThiSinhViPham = require('../modules/capnhatthisinhvipham/routes')
const Tinh = require('../modules/tinh/routes')

const ChucVu = require('../modules/chucvu/routes')


module.exports = {
  configRoute: app => {
    app.use('/api/v1/dottuyensinh', DotTuyenSinhRouter);
    app.use('/api/v1/truongdaihoc', TruongDaiHocRouter);
    app.use('/api/v1/groupuser', NhomNguoiDungRouter);
    app.use('/api/v1/nganhdaihoc', NganhDaiHocRouter);
    app.use('/api/v1/loaihinhdaotao', LoaiHinhDaoTaoRouter);
    app.use('/api/v1/phanloaitotnghiep', PhanLoaiTotNghiepRouter);
    app.use('/api/v1/diachidaotao', DiaChiDaoTaoRouter);
    app.use('/api/v1/diadiemtochucthi', DiaDiemToChucThiRouter);
    app.use('/api/v1/nhommonthi', NhomMonThiRouter);
    app.use('/api/v1/monthi', MonThiRouter);
    app.use('/api/v1/chuyennganh', ChuyenNganhRouter);
    app.use('/api/v1/chuyennganhhep', ChuyenNganhHepRouter);
    app.use('/api/v1/nganhtuyensinh', NganhTuyenSinhRouter);
    app.use('/api/v1/hinhthuckyluat', HinhThucKyLuatRouter);
    app.use('/api/v1/hinhthucuutien', HinhThucUuTienRouter);
    app.use('/api/v1/hosodangki', HoSoDangKiRouter);
    app.use('/api/v1/phongthi', PhongThiRouter);
    app.use('/api/v1/auth', AuthRouter);
    app.use('/api/v1/groupuser', NhomNguoiDung);
    app.use('/api/v1/user', NguoiDung);
    app.use('/api/v1/thamsohethong', ThamSoHeThong);
    app.use('/api/v1/chitieutuyensinh', ChiTieuTuyenSinh);
    app.use("/public/images", express.static("public/images"));
    app.use('/api/v1/thutudontui', ThuTuDonTui);
    app.use('/api/v1/dontuidanhphach', DonTuiDanhPhach);
    app.use('/api/v1/huongdandontui', HuonDanDonTui);
    app.use('/api/v1/tinh', Tinh);
    app.use('/api/v1/chucvu', ChucVu);

    app.use('/api/v1/baithi', BaiThi);
    app.use('/api/v1/capnhatthisinhvipham', CapNhatThiSinhViPham);
  },
};
