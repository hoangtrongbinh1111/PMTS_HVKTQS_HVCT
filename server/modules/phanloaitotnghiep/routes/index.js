const express = require('express');
const PhanLoaiTotNghiepController = require('../Controllers/PhanLoaiTotNghiepController');

const router = express.Router();

router.get('/list', PhanLoaiTotNghiepController.getListPhanLoaiTotNghiep);
router.post('/add', PhanLoaiTotNghiepController.TaoPhanLoaiTotNghiep);
router.put('/update', PhanLoaiTotNghiepController.SuaPhanLoaiTotNghiep);
router.delete('/delete', PhanLoaiTotNghiepController.XoaPhanLoaiTotNghiep);
router.get('/export', PhanLoaiTotNghiepController.ExportExcel);
router.get('/exporttemplate', PhanLoaiTotNghiepController.ExportExcelTemplate);




module.exports = router;
