const express = require('express');
const ChiTieuTuyenSinhController = require('../Controllers/ChiTieuTuyenSinhController');

const router = express.Router();

router.get('/getListChiTieu', ChiTieuTuyenSinhController.getListChiTieu);
router.get('/getListChiTieuDetail', ChiTieuTuyenSinhController.getListChiTieuDetail);
router.get('/getListDCNot', ChiTieuTuyenSinhController.getListDCNot);
router.post('/update', ChiTieuTuyenSinhController.update);
router.delete('/delete', ChiTieuTuyenSinhController.delete);
router.post('/create', ChiTieuTuyenSinhController.createNewCT);
router.post('/deleteCNTS', ChiTieuTuyenSinhController.deleteCNTS);
router.get('/getDataToExport', ChiTieuTuyenSinhController.getDataToExportDocx);
router.get('/getListChiTieuVaSoLuong', ChiTieuTuyenSinhController.getListChiTieuVaSoLuong);
router.get('/dukiendiem', ChiTieuTuyenSinhController.DuKienDiem);
router.get('/dudieukienxettuyen', ChiTieuTuyenSinhController.getListDuDieuKienXetTuyen);


module.exports = router;
