const express = require('express');
const HinhThucKyLuatController = require('../Controllers/HinhThucKyLuatController');

const router = express.Router();

router.get('/list', HinhThucKyLuatController.getListHinhThucKyLuat);
router.post('/add', HinhThucKyLuatController.TaoHinhThucKyLuat);
router.put('/update', HinhThucKyLuatController.SuaHinhThucKyLuat);
router.delete('/delete', HinhThucKyLuatController.XoaHinhThucKyLuat);
router.get('/export', HinhThucKyLuatController.ExportExcel);
router.get('/exporttemplate', HinhThucKyLuatController.ExportExcelTemplate);




module.exports = router;
