const express = require('express');
const PhongThiController = require('../Controllers/PhongThiController');

const router = express.Router();

router.get('/list', PhongThiController.getListPhongThi);
router.post('/add', PhongThiController.TaoPhongThi);
router.put('/update', PhongThiController.SuaPhongThi);
router.delete('/delete', PhongThiController.XoaPhongThi);
router.get('/export', PhongThiController.ExportExcel);
router.get('/exporttemplate', PhongThiController.ExportExcelTemplate);

module.exports = router;
