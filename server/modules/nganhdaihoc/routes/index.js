const express = require('express');
const NganhDaiHocController = require('../Controllers/NganhDaiHocController');

const router = express.Router();

router.get('/list', NganhDaiHocController.getListNganhDaiHoc);
router.post('/add', NganhDaiHocController.TaoNganhDaiHoc);
router.post('/taonhieu', NganhDaiHocController.TaoNhieuNganhDaiHoc);
router.put('/update', NganhDaiHocController.SuaNganhDaiHoc);
router.delete('/delete', NganhDaiHocController.XoaNganhDaiHoc);
router.get('/export', NganhDaiHocController.ExportExcel);
router.get('/exporttemplate', NganhDaiHocController.ExportExcelTemplate);
router.post('/kiemTraNganh', NganhDaiHocController.KiemTraNganh);



module.exports = router;
