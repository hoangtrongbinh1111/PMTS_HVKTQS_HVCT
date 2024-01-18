const express = require('express');
const HoSoDangKiController = require('../Controllers/HoSoDangKiController');

const router = express.Router();

router.get('/list', HoSoDangKiController.getListHoSoDangKi);
router.get('/listSBD', HoSoDangKiController.getListSBD);
router.get('/danhsobaodanhvachiaphong', HoSoDangKiController.danhSoBaoDanhandChiaPhong);

router.get('/getbyid', HoSoDangKiController.GetHoSoByID);
router.post('/add', HoSoDangKiController.TaoHoSoDangKi);
router.post('/taonhieuhoso', HoSoDangKiController.TaoNhieuHoSoDangKi);
router.post('/uploadimage', HoSoDangKiController.upLoadImage);
router.post('/uploadzip', HoSoDangKiController.upLoadFileZip);

router.put('/update', HoSoDangKiController.SuaHoSoDangKi);
router.delete('/delete', HoSoDangKiController.XoaHoSoDangKi);
router.get('/export', HoSoDangKiController.ExportExcel);
router.get('/exporttemplate', HoSoDangKiController.ExportExcelTemplate);

router.get('/getbychuyennganh', HoSoDangKiController.getByChuyenNganh);
router.get('/getbydiachidt', HoSoDangKiController.getByDiaChiDT);

router.get('/getalldanhsach', HoSoDangKiController.getAllDanhSach);
router.get('/getalldanhsachdananh', HoSoDangKiController.getAllDanhSachDanAnh);
router.get('/getbydiem', HoSoDangKiController.getByByDiem);
router.get('/thongketheomucdiem', HoSoDangKiController.ThongKeTheoMucDiem);
router.get('/getDanhSachDiem', HoSoDangKiController.getDanhSachDiem);
router.get('/getdanhsachtheophong', HoSoDangKiController.getAllDanhSachTheoPhong);
router.get('/getdanhsachthisinhtheophong', HoSoDangKiController.getAllDanhSachThiTheoPhong);

router.get('/getdanhsachtheophongvasobaodanh', HoSoDangKiController.getAllDanhSachTheoPhongVaSoBaoDanh); 
router.get('/gettheduthi', HoSoDangKiController.getTheDuThi);
router.get('/getdiemthitheophong', HoSoDangKiController.getAllDiemThiTheoPhong);



module.exports = router;
