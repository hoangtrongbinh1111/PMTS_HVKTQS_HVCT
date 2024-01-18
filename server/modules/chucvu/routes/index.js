const express = require('express');
const ChucVuController = require('../Controllers/ChucVuController');

const router = express.Router();

router.get('/list', ChucVuController.getListChucVu);
router.post('/add', ChucVuController.TaoChucVu);
router.put('/update', ChucVuController.SuaChucVu);
router.delete('/delete', ChucVuController.XoaChucVu);
router.get('/export', ChucVuController.ExportExcel);
router.get('/exporttemplate', ChucVuController.ExportExcelTemplate);




module.exports = router;
