const express = require('express');
const BaiThiController = require('../Controllers/BaiThiController');

const router = express.Router();

router.get('/listtui', BaiThiController.getListBaiThiTheoTui);
router.get('/listmon', BaiThiController.getListBaiThiTheoMon);
router.post('/update', BaiThiController.UpdateDiemThi);
router.post('/updatetheomon', BaiThiController.UpdateDiemThiTheoMon)
router.get('/thongtindanhphach', BaiThiController.getThongTinDanhPhach);
router.get('/checknhapdiem', BaiThiController.checkNhapDiemThi);

module.exports = router;
