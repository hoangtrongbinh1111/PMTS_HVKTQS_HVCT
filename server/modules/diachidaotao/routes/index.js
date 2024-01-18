const express = require('express');
const DiaChiDaoTaoController = require('../Controllers/DiaChiDaoTaoController');

const router = express.Router();

router.get('/list', DiaChiDaoTaoController.getListDiaChiDaoTao);
router.post('/add', DiaChiDaoTaoController.TaoDiaChiDaoTao);
router.put('/update', DiaChiDaoTaoController.SuaDiaChiDaoTao);
router.delete('/delete', DiaChiDaoTaoController.XoaDiaChiDaoTao);
router.get('/export', DiaChiDaoTaoController.ExportExcel);
router.get('/exporttemplate', DiaChiDaoTaoController.ExportExcelTemplate);




module.exports = router;
