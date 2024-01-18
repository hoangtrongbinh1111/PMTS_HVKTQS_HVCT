const express = require('express');
const NganhTuyenSinhController = require('../Controllers/NganhTuyenSinhController');

const router = express.Router();

router.get('/list', NganhTuyenSinhController.getListNganhTuyenSinh);
router.post('/add', NganhTuyenSinhController.TaoNganhTuyenSinh);
router.put('/update', NganhTuyenSinhController.SuaNganhTuyenSinh);
router.delete('/delete', NganhTuyenSinhController.XoaNganhTuyenSinh);
router.get('/export', NganhTuyenSinhController.ExportExcel);
router.get('/exporttemplate', NganhTuyenSinhController.ExportExcelTemplate);

module.exports = router;