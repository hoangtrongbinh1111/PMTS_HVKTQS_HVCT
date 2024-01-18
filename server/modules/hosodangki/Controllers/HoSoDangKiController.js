const { responseSuccessWithData, responseServerError, responseFailed, responseSuccess } = require("../../../helpers/response");
const { ExportFile, ExportFileDocx } = require("../../../helpers/exportfile");
// 1. read template file
const multer = require('multer');
const decompress = require('decompress')
var fs = require('fs-extra')
const path = require('path');
let dbName = ''
// Import database
// Import repository
const HoSoDangKiRepository = require("../../../repositories/HoSoDangKiRepository");
const ThamSoHeThongRepository = require("../../../repositories/ThamSoHeThongRepository");
const PhongThiRepository = require("../../../repositories/PhongThiRepository");


const { MimeType } = require("easy-template-x");
const { getSlaveName } = require("../../../db");
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
const toDateStringViet = date => {
  const today = new Date(date)
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const yyyy = today.getFullYear()

  return `ngày ${dd} tháng ${mm} năm ${yyyy}`
}
const toDateString = date => {
  const today = new Date(date)
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const yyyy = today.getFullYear()

  return `${dd}/${mm}/${yyyy}`
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const storageZip = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, `public/images/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  // fileFilter: (req, file, cb) => {
  //   if (!whitelist.includes(file.mimetype)) {
  //     return cb(new Error('file is not allowed'))
  //   }
  //   cb(null, true)
  // }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('In File Filter');
    let ext = path.extname(file.originalname);
    if (ext == '.jpg' || ext == '.png' || ext == '.gif' || ext == '.jpeg') {
      console.log('Extension Check');
      cb(null, true);
    }
    else {
      cb('Only Images Are Allow', false);
    }
  }
}).single('file')
const uploadZip = multer({ storage: storageZip }).array("files", 10000);

exports.upLoadImage = async (req, res) => {
  try {
    let savePath = ``;
    upload(req, res, function (err) {
      savePath = req.file.filename
      if (err) {
        console.log(err)
        return responseServerError({ res, err: "Error uploading file." });
      }
      filename = req.file.filename
      dbName = req.body.dbName;
      fs.unlink(`public/images/${dbName}/${filename}`, async function (err) {
        if (err) return console.error(err)
        console.log("delete success!")
      });
      fs.move(`public/images/${filename}`, `public/images/${dbName}/${filename}`, async function (err) {
        if (err) return console.error(err)
        console.log("success!")
      })
      responseSuccessWithData({ res, data: savePath });
    })
  } catch (err) {
    return responseServerError({ res, err: "Error uploading file1." });
  }
}
exports.upLoadFileZip = async (req, res) => {
  try {
    let savePath = ``;

    uploadZip(req, res, async function (err) {
      if (err) {
        return responseServerError({ res, err: "Error uploading file." });
      }
      req.files.map(file => {
        filename = file.filename
        dbName = req.body.dbName;
        const pathTemp = `public/images/${dbName}`;
        fs.unlink(`public/images/${dbName}/${filename}`, async function (err) {
          if (err) return console.error(err)
          console.log("delete success!")
        });
      })
      req.files.map(file => {
        filename = file.filename
        dbName = req.body.dbName;
        const pathTemp = `public/images/${dbName}`;
        fs.move(`public/images/${filename}`, `public/images/${dbName}/${filename}`, async function (err) {
          if (err) return console.error(err)
          console.log("upload success!")
        })
      })
      return responseSuccess({ res });
    });

  } catch (err) {
    return responseServerError({ res, err: "Error uploading file1." });
  }
}
exports.getListHoSoDangKi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  const { page, perPage, query } = req.query;

  try {
    const data = await hoSoDangKiRepository.getAll(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.getListSBD = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  const { page, perPage, query } = req.query;

  try {
    const data = await hoSoDangKiRepository.getSBD(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.danhSoBaoDanhandChiaPhong = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAndSortByName();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};

exports.TaoHoSoDangKi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  try {
    const response = await hoSoDangKiRepository.create({
      soBaodanh: req.body.soBaodanh,
      soTT: req.body.soTT,
      STT: req.body.STT,
      loaiTS: req.body.loaiTS,
      hoTen: req.body.hoTen,
      ngaySinh: req.body.ngaySinh,
      gioiTinh: req.body.gioiTinh,
      noiSinh: req.body.noiSinh,
      coQuan: req.body.coQuan,
      namTN: req.body.namTN,
      capBac: req.body.capBac,
      chucVu: req.body.chucVu,
      ngoaiNgu: req.body.ngoaiNgu,
      hinhThucthiNN: req.body.hinhThucthiNN,
      diaChi: req.body.diaChi,
      dienThoai: req.body.dienThoai,
      thiNCS: req.body.thiNCS,
      tenDetai: req.body.tenDetai,
      giaoVienHD1: req.body.giaoVienHD1,
      giaoVienHD2: req.body.giaoVienHD2,
      fileAnh: req.body.fileAnh,
      ghiChu: req.body.ghiChu,
      tongDiem: 0,
      maDidiem: req.body.maDidiem,
      maDcdaotao: req.body.maDcdaotao,
      maTruong: req.body.maTruong,
      maNganh: req.body.maNganh,
      maLoaihinh: req.body.maLoaihinh,
      maPhanloai: req.body.maPhanloai,
      maChuyennganhTS: req.body.maChuyennganhTS,
      maChuyennganhhep: req.body.maChuyennganhhep,
      maHinhthuc: req.body.maHinhthuc,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
};
exports.TaoNhieuHoSoDangKi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  try {
    req.body.forEach(async (element) => {
      let diemNgoaiNgu = 0
      if (element.ngoaiNgu === 'Miễn Thi') {
        diemNgoaiNgu = 100
      }
      const response = await hoSoDangKiRepository.create({
        soBaodanh: element.soBaodanh,
        soTT: element.soTT,
        STT: element.STT,
        loaiTS: element.loaiTS,
        hoTen: element.hoTen,
        ngaySinh: element.ngaySinh,
        gioiTinh: element.gioiTinh,
        noiSinh: element.noiSinh,
        coQuan: element.coQuan,
        namTN: element.namTN,
        capBac: element.capBac,
        ngoaiNgu: element.ngoaiNgu,
        hinhThucthiNN: element.hinhThucthiNN,
        diaChi: element.diaChi,
        dienThoai: element.dienThoai,
        thiNCS: element.thiNCS,
        tenDetai: element.tenDetai,
        giaoVienHD1: element.giaoVienHD1,
        giaoVienHD2: element.giaoVienHD2,
        fileAnh: element.fileAnh,
        ghiChu: element.ghiChu,
        tongDiem: 0,
        maDidiem: element.maDidiem,
        maDcdaotao: element.maDcdaotao,
        maTruong: element.maTruong,
        maNganh: element.maNganh,
        maLoaihinh: element.maLoaihinh,
        maPhanloai: element.maPhanloai,
        maChuyennganhTS: element.maChuyennganhTS,
        maChuyennganhhep: element.maChuyennganhhep,
        maHinhthuc: element.maHinhthuc,
        diemNgoaiNgu: diemNgoaiNgu,
        diemCoBan: 0,
        diemChuyenNganh: 0
      });
      if (!response) {
        return responseFailed({ res });
      }
    });
    return responseSuccess({ res });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
};
exports.SuaHoSoDangKi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  const id = req.body.maHoso
  try {
    const response = await hoSoDangKiRepository.update(id, {
      soBaodanh: req.body.soBaodanh,
      soTT: req.body.soTT,
      STT: req.body.STT,
      loaiTS: req.body.loaiTS,
      hoTen: req.body.hoTen,
      ngaySinh: req.body.ngaySinh,
      gioiTinh: req.body.gioiTinh,
      noiSinh: req.body.noiSinh,
      coQuan: req.body.coQuan,
      namTN: req.body.namTN,
      capBac: req.body.capBac,
      ngoaiNgu: req.body.ngoaiNgu,
      hinhThucthiNN: req.body.hinhThucthiNN,
      diaChi: req.body.diaChi,
      dienThoai: req.body.dienThoai,
      thiNCS: req.body.thiNCS,
      tenDetai: req.body.tenDetai,
      giaoVienHD1: req.body.giaoVienHD1,
      giaoVienHD2: req.body.giaoVienHD2,
      fileAnh: req.body.fileAnh,
      ghiChu: req.body.ghiChu,
      maDidiem: req.body.maDidiem,
      maDcdaotao: req.body.maDcdaotao,
      maTruong: req.body.maTruong,
      maNganh: req.body.maNganh,
      maLoaihinh: req.body.maLoaihinh,
      maPhanloai: req.body.maPhanloai,
      maChuyennganhTS: req.body.maChuyennganhTS,
      maChuyennganhhep: req.body.maChuyennganhhep,
      maHinhthuc: req.body.maHinhthuc,
    });
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}


exports.XoaHoSoDangKi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();

  const { id } = req.query;
  try {
    const response = await hoSoDangKiRepository.DeleteByID(id);
    if (!response) {
      return responseFailed({ res });
    }
    return responseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.GetHoSoByID = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  const { id } = req.query;
  try {
    const data = await hoSoDangKiRepository.getByID(id);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    return responseServerError({ res, err });
  }
}
exports.getByChuyenNganh = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getByChuyenNganh();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.getByDiaChiDT = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getByDiaChiDT();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getByByDiem = async (req, res) => {
  const { page, perPage, loaiTS, diem, maChuyennganhTS, maDcdaotao } = req.query;

  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getByByDiem(parseInt(page), parseInt(perPage), loaiTS, parseFloat(diem), maChuyennganhTS, maDcdaotao);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.ThongKeTheoMucDiem = async (req, res) => {

  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.ThongKeTheoMucDiem();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getDanhSachDiem = async (req, res) => {
  const { page, perPage, query } = req.query;

  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getDanhSachDiem(parseInt(page), parseInt(perPage), query);
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}

exports.getAllDanhSachTheoPhong = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSachTheoPhong();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getAllDanhSachThiTheoPhong = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSachThiTheoPhong();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getAllDanhSachTheoPhongVaSoBaoDanh = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSachTheoPhongVaSoBaoDanh();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getAllDiemThiTheoPhong = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSachDiemThiTheoPhong();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getAllDanhSach = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSach();
    if (!data) {
      return responseFailed({ res });
    }
    return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getTheDuThi = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  const thamSoHeThongRepository = new ThamSoHeThongRepository();
  const phongThiRepository = new PhongThiRepository();


  try {
    const datathamso = await thamSoHeThongRepository.getAll(1, 10)
    const dataphongthi = await phongThiRepository.getAll(1, 100)
    console.log(dataphongthi)

    const data = await hoSoDangKiRepository.getAllDanhSach();
    if (!data) {
      return responseFailed({ res });
    }
    data.data.map((e) => {
      e['fileAnh'] = {
        _type: "image",
        source: fs.readFileSync(`public/images/${getSlaveName()}/${e.fileAnh}`),
        format: MimeType.Png,
        altText: "Kung Fu Hero", // Optional
        width: 100,
        height: 150
      };
      e.NS = toDateString(e.ngaySinh),
        e.ngay = toDateStringViet(new Date()),
        e.chucVu_ngki = datathamso.data[0].chucVu_ngki,
        e.tenNgki = datathamso.data[0].tenNgki,
        e.year = new Date().getFullYear()
        e.index = dataphongthi.data.findIndex((val) => val.maPhongthi ===  e.maPhongthi) + 1;
    })
    const mydata = ExportFileDocx('template/hoso/theduthi.docx', 'output/hoso/theduthi.docx', res, data);

    // return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.getAllDanhSachDanAnh = async (req, res) => {
  const hoSoDangKiRepository = new HoSoDangKiRepository();
  try {
    const data = await hoSoDangKiRepository.getAllDanhSachDanAnh();
    if (!data) {

      return responseFailed({ res });
    }
    data.data.map((e) => {
      e.childrenData.map((e2) => {
        e2.row.map((e2) => {
          // console.log(toDateString(e.ngaySinh1))
          e2['ngaySinh1'] = e2.ngaySinh1 ? toDateString(e2.ngaySinh1) : ''
          e2['ngaySinh2'] = e2.ngaySinh2 ? toDateString(e2.ngaySinh2) : ''
          e2['ngaySinh3'] = e2.ngaySinh3 ? toDateString(e2.ngaySinh3) : ''
          e2['ngaySinh4'] = e2.ngaySinh4 ? toDateString(e2.ngaySinh4) : ''
          e2['ngaySinh5'] = e2.ngaySinh5 ? toDateString(e2.ngaySinh5) : ''
        })
      })
    })
    const mydata = ExportFileDocx('template/hoso/danhsachdananh.docx', 'output/hoso/danhsachdananh.docx', res, data);

    // return responseSuccessWithData({ res, data });
  } catch (err) {
    console.log(err)
    return responseServerError({ res, err });
  }
}
exports.ExportExcel = async (req, res) => {
  const fs = require('fs');
  try {
    const mydata = ExportFile('template/nhommonthi/dstnhommonthi.xlsx', 'output/nhommonthi/output.xlsx', res, values);

  } catch (err) {
    return responseServerError({ res, err });
  }
}

exports.ExportExcelTemplate = async (req, res) => {
  const fs = require('fs');

  try {
    res.setHeader('Content-Disposition', `attachment; filename=filemau.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const fileStream = fs.createReadStream("template/nhommonthi/filemau.xlsx");
    fileStream.pipe(res);
  } catch (err) {
    return responseServerError({ res, err });
  }
}

