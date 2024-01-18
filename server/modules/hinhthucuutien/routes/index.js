const express = require('express');
const HinhThucUuTienController = require('../Controllers/HinhThucUuTienController');

const router = express.Router();

router.get('/list', HinhThucUuTienController.getListHinhThucUuTien);
router.post('/add', HinhThucUuTienController.TaoHinhThucUuTien);
router.put('/update', HinhThucUuTienController.SuaHinhThucUuTien);
router.delete('/delete', HinhThucUuTienController.XoaHinhThucUuTien);
router.get('/export', HinhThucUuTienController.ExportExcel);
router.get('/exporttemplate', HinhThucUuTienController.ExportExcelTemplate);




module.exports = router;
