const express = require('express');
const ThuTuDonTuiController = require('../Controllers/ThuTuDonTuiController');

const router = express.Router();

router.get('/list', ThuTuDonTuiController.getListThuTuDon);
router.get('/listmon', ThuTuDonTuiController.ThuTuDonTheoMon);
router.get('/listprint', ThuTuDonTuiController.ThuTuDonToPrint);
router.post('/add', ThuTuDonTuiController.TaoThuTuDon);
router.delete('/delete', ThuTuDonTuiController.XoaThuTuDon);

module.exports = router;
