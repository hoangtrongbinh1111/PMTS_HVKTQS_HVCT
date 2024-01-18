const express = require('express');
const HuongDanDonTuiController = require('../Controllers/HuongDanDonTuiController');

const router = express.Router();

router.get('/listtui', HuongDanDonTuiController.getTuiThiByMonThi);
router.get('/listhuongdan', HuongDanDonTuiController.getHuongDanDonTui);
router.get('/listsophachtheomon', HuongDanDonTuiController.getSophachTheoMon);

module.exports = router;
