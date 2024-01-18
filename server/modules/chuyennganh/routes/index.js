const express = require('express');
const ChuyenNganhController = require('../Controllers/ChuyenNganhController');

const router = express.Router();

router.get('/list', ChuyenNganhController.getListChuyenNganh); 
router.post('/add', ChuyenNganhController.TaoChuyenNganh);
router.put('/update', ChuyenNganhController.SuaChuyenNganh);
router.put('/updatemulti', ChuyenNganhController.SuaNhieuChuyenNganh);
router.put('/updatediemchuan', ChuyenNganhController.SuaDiemChuan);

router.delete('/delete', ChuyenNganhController.XoaChuyenNganh);
router.get('/export', ChuyenNganhController.ExportExcel); 
router.get('/exporttemplate', ChuyenNganhController.ExportExcelTemplate);

module.exports = router;
