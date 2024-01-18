const express = require('express');
const LoaiHinhDaoTaoController = require('../Controllers/LoaiHinhDaoTaoController');

const router = express.Router();

router.get('/list', LoaiHinhDaoTaoController.getListLoaiHinhDaoTao);
router.post('/add', LoaiHinhDaoTaoController.TaoLoaiHinhDaoTao);
router.put('/update', LoaiHinhDaoTaoController.SuaLoaiHinhDaoTao);
router.delete('/delete', LoaiHinhDaoTaoController.XoaLoaiHinhDaoTao);
router.get('/export', LoaiHinhDaoTaoController.ExportExcel);
router.get('/exporttemplate', LoaiHinhDaoTaoController.ExportExcelTemplate);




module.exports = router;
