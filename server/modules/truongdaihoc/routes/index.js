const express = require('express');
const TruongDaiHocController = require('../Controllers/TruongDaiHocController');

const router = express.Router();

router.get('/list', TruongDaiHocController.getListTruongDaiHoc);
router.post('/add', TruongDaiHocController.TaoTruongDaiHoc);
router.put('/update', TruongDaiHocController.SuaTruongDaiHoc);
router.delete('/delete', TruongDaiHocController.XoaTruongDaiHoc);
router.get('/export', TruongDaiHocController.ExportExcel);
router.get('/exporttemplate', TruongDaiHocController.ExportExcelTemplate);




module.exports = router;
