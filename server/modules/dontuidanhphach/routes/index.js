const express = require('express');
const DonTuiDanhPhachController = require('../Controllers/DonTuiDanhPhachController');

const router = express.Router();

router.post('/generate', DonTuiDanhPhachController.TaoPhachDonTui);
router.get('/check', DonTuiDanhPhachController.GetListBaiThiTuiThi);
router.post('/taophach', DonTuiDanhPhachController.TaoPhach);
// router.post('/add', MonThiController.TaoMonThi);
// router.put('/update', MonThiController.SuaMonThi);
// router.delete('/delete', MonThiController.XoaMonThi);
// router.get('/export', MonThiController.ExportExcel);
// router.get('/exporttemplate', MonThiController.ExportExcelTemplate);

module.exports = router;
