// phân người dùng
const TBL_NGUOIDUNG = "tbl_nguoidung";
const TBL_NGUOIDUNG_KEY = "maNguoiDung";
const TBL_NHOMNGUOIDUNG = "tbl_nhomnguoidung";
const TBL_NHOMNGUOIDUNG_KEY = "maNhom";
const TBL_RELA_NHOMNGUOI = "tbl_rela_nhomnguoi";
const TBL_QUYEN = "tbl_quyen";
const TBL_QUYEN_KEY = "maQuyen";
const TBL_RELA_NHOMQUYEN = "tbl_rela_nhomquyen";
// phần hệ thống
const TBL_THAMSOHETHONG = "tbl_thamsohethong";
const TBL_THAMSOHETHONG_KEY = "maThamso";
const TBL_DOTTUYENSINH = "tbl_dottuyensinh";
const TBL_DOTTUYENSINH_KEY = "maDotTS";
// phần các danh mục
const TBL_DIADIEMTHI = "tbl_diadiemthi"
const TBL_DIADIEMTHI_KEY = "maDidiem";
const TBL_DIACHIDAOTAO = "tbl_diachidaotao";
const TBL_DIACHIDAOTAO_KEY = "maDcdaotao";
const TBL_TRUONGDAIHOC = "tbl_truongdaihoc";
const TBL_TRUONGDAIHOC_KEY = "maTruong";
const TBL_NGANH = "tbl_nganh";
const TBL_NGANH_KEY = "maNganh";
const TBL_LOAIHINHDT = "tbl_loaihinhdt";
const TBL_LOAIHINHDT_KEY = "maLoaihinh";
const TBL_PLTOTNGHIEPDH = "tbl_pltotnghiepdh";
const TBL_PLTOTNGHIEPDH_KEY = "maPhanloai";
const TBL_HTUUTIEN = "tbl_htuutien";
const TBL_HTUUTIEN_KEY = "maHinhthuc";
const TBL_HTKYLUAT = "tbl_htkyluat";
const TBL_HTKYLUAT_KEY = "maHinhthuc";
const TBL_NHOMMONHOC = "tbl_nhommonhoc";
const TBL_NHOMMONHOC_KEY = "maNhommonhoc";
const TBL_MONTHI = "tbl_monthi";
const TBL_MONTHI_KEY = "maMon";
const TBL_NGANHTS = "tbl_nganhts";
const TBL_NGANHTS_KEY = "maNganhTS";
const TBL_CHUYENNGANHTS = "tbl_chuyennganhts";
const TBL_CHUYENNGANHTS_KEY = "maChuyennganhTS";
const TBL_CHUYENNGANHHEP = "tbl_chuyennganhhep";
const TBL_CHUYENNGANHHEP_KEY = "maChuyennganhhep";
const TBL_CHITIEUTS = "tbl_chitieuts";
const TBL_CHITIEUTS_KEY = "maChitieu";
const TBL_TINH = 'tbl_tinh';
const TBL_TINH_KEY = 'maTinh';
const TBL_CHUCVU = 'tbl_chucvu';
const TBL_CHUCVU_KEY = 'maChucVu';
const TBL_DIEMCHUAN = 'tbl_diemchuan';
const TBL_DIEMCHUAN_KEY = 'maDiemChuan';
// phần hồ sơ thí sinh
const TBL_HOSOTHISINH = "tbl_hosothisinh";
const TBL_HOSOTHISINH_KEY = "maHoso";
const TBL_LEPHITHI = "tbl_lephithi";
const TBL_LEPHITHI_KEY = "maPhi";
// phan to chuc thi
const TBL_CHITIETVIPHAM = "tbl_chitietvipham";
const TBL_CHITIETVIPHAM_KEY = "maChitiet";
const TBL_PHONGTHI = "tbl_phongthi";
const TBL_PHONGTHI_KEY = "maPhongthi";
const TBL_BAITHI = "tbl_baithi";
const TBL_BAITHI_KEY = "maBaithi";
const TBL_THUTUDONTUI = "tbl_thutudontui";
const TBL_THUTUDONTUI_KEY = "maDon";
const TBL_TUITHI = "tbl_tuithi";
const TBL_TUITHI_KEY = "maTui";
const TBL_RELA_BAITHITUITHI = "tbl_rela_baithituithi";
module.exports = {
  // người dùng
  TBL_NGUOIDUNG,
  TBL_NGUOIDUNG_KEY,
  TBL_NHOMNGUOIDUNG,
  TBL_NHOMNGUOIDUNG_KEY,
  TBL_RELA_NHOMNGUOI,
  TBL_QUYEN,
  TBL_QUYEN_KEY,
  TBL_RELA_NHOMQUYEN,
  // hệ thống
  TBL_THAMSOHETHONG,
  TBL_THAMSOHETHONG_KEY,
  TBL_DOTTUYENSINH,
  TBL_DOTTUYENSINH_KEY,
  // danh mục
  TBL_DIADIEMTHI,
  TBL_DIADIEMTHI_KEY,
  TBL_DIACHIDAOTAO,
  TBL_DIACHIDAOTAO_KEY,
  TBL_TRUONGDAIHOC,
  TBL_TRUONGDAIHOC_KEY,
  TBL_NGANH,
  TBL_NGANH_KEY,
  TBL_LOAIHINHDT,
  TBL_LOAIHINHDT_KEY,
  TBL_PLTOTNGHIEPDH,
  TBL_PLTOTNGHIEPDH_KEY,
  TBL_HTUUTIEN,
  TBL_HTUUTIEN_KEY,
  TBL_HTKYLUAT,
  TBL_HTKYLUAT_KEY,
  TBL_NGANHTS,
  TBL_NGANHTS_KEY,
  TBL_CHUYENNGANHTS,
  TBL_CHUYENNGANHTS_KEY,
  TBL_CHUYENNGANHHEP,
  TBL_CHUYENNGANHHEP_KEY,
  TBL_NHOMMONHOC,
  TBL_NHOMMONHOC_KEY,
  TBL_MONTHI,
  TBL_MONTHI_KEY,
  TBL_CHITIEUTS,
  TBL_CHITIEUTS_KEY,
  TBL_TINH,
  TBL_TINH_KEY,
  TBL_CHUCVU,
  TBL_CHUCVU_KEY,
  TBL_DIEMCHUAN,
  TBL_DIEMCHUAN_KEY,
  //hồ sơ thí sinh
  TBL_HOSOTHISINH,
  TBL_HOSOTHISINH_KEY,
  TBL_LEPHITHI,
  TBL_LEPHITHI_KEY,
  // phan to chuc thi
  TBL_CHITIETVIPHAM,
  TBL_CHITIETVIPHAM_KEY,
  TBL_PHONGTHI,
  TBL_PHONGTHI_KEY,
  TBL_BAITHI,
  TBL_BAITHI_KEY,
  TBL_THUTUDONTUI,
  TBL_THUTUDONTUI_KEY,
  TBL_TUITHI,
  TBL_TUITHI_KEY,
  TBL_RELA_BAITHITUITHI,
}
