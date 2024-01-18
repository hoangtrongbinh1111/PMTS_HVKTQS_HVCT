const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile } = require("../../../helpers/exportfile");
// Import database
// Import repository
const ThamSoHeThongRepository = require("../../../repositories/ThamSoHeThongRepository");
const Knex = require("knex");
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
// lay thong tin tham so he thong, neu chua co tra ve {}
exports.getInfo = async (req, res) => {
  const thamSoHeThongRepository = new ThamSoHeThongRepository();
  try {
    const data = await thamSoHeThongRepository.getAll(1,10)
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

// cap nhat tham so he thong
exports.update = async (req, res) => {
  const thamSoHeThongRepository = new ThamSoHeThongRepository();
  const {maThamso, donVicq, tenDv, diaChi, chucVu_ngki, tenNgki, thuKi, ngayBDPhucKhao, ngayKTPhucKhao, ngayChamPhucKhao, soDT } = req.body
  try {
    if (maThamso) {
    const response = await thamSoHeThongRepository.update(maThamso, {
      donVicq: donVicq,
      tenDv: tenDv,
      diaChi: diaChi,
      chucVu_ngki: chucVu_ngki,
      tenNgki: tenNgki,
      thuKi: thuKi,
      ngayBDPhucKhao: ngayBDPhucKhao,
      ngayKTPhucKhao: ngayKTPhucKhao,
      ngayChamPhucKhao: ngayChamPhucKhao,
      soDT: soDT
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } else {
    const response = await thamSoHeThongRepository.create({
      donVicq: donVicq,
      tenDv: tenDv,
      diaChi: diaChi,
      chucVu_ngki: chucVu_ngki,
      tenNgki: tenNgki,
      thuKi: thuKi,
      ngayBDPhucKhao: ngayBDPhucKhao,
      ngayKTPhucKhao: ngayKTPhucKhao,
      ngayChamPhucKhao: ngayChamPhucKhao,
      soDT: soDT
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  }
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

