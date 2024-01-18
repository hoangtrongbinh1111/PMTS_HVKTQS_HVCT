const express = require('express');
const DiaDiemToChucThiController = require('../Controllers/DiaDiemToChucThiController');

const router = express.Router();

router.get('/list', DiaDiemToChucThiController.getListDiaDiemToChucThi);
router.post('/add', DiaDiemToChucThiController.TaoDiaDiemToChucThi);
router.put('/update', DiaDiemToChucThiController.SuaDiaDiemToChucThi);
router.delete('/delete', DiaDiemToChucThiController.XoaDiaDiemToChucThi);
router.get('/export', DiaDiemToChucThiController.ExportExcel);
router.get('/exporttemplate', DiaDiemToChucThiController.ExportExcelTemplate);




module.exports = router;
