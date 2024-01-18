const express = require('express');
const MonThiController = require('../Controllers/MonThiController');

const router = express.Router();

router.get('/list', MonThiController.getListMonThi);
router.post('/add', MonThiController.TaoMonThi);
router.put('/update', MonThiController.SuaMonThi);
router.delete('/delete', MonThiController.XoaMonThi);
router.get('/thongkephongmon', MonThiController.ThongKeSoLuongPhongMon);
router.get('/thongkemonphong', MonThiController.ThongKeSoLuongMonPhong);
router.get('/thongketheomon', MonThiController.ThongKeSoLuongTheoMonThi);
router.get('/export', MonThiController.ExportExcel);
router.get('/exporttemplate', MonThiController.ExportExcelTemplate);

module.exports = router;
