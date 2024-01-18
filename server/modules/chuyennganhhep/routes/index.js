const express = require('express');
const ChuyenNganhHepController = require('../Controllers/ChuyenNganhHepController');

const router = express.Router();

router.get('/list', ChuyenNganhHepController.getListChuyenNganhHep);
router.post('/add', ChuyenNganhHepController.TaoChuyenNganhHep);
router.put('/update', ChuyenNganhHepController.SuaChuyenNganhHep);
router.delete('/delete', ChuyenNganhHepController.XoaChuyenNganhHep);
router.get('/export', ChuyenNganhHepController.ExportExcel);
router.get('/exporttemplate', ChuyenNganhHepController.ExportExcelTemplate);

module.exports = router;
