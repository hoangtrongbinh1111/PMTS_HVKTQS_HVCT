const express = require('express');
const router = express.Router();
const CapNhatThiSinhViPhamController = require('../Controllers/CapNhatThiSinhViPhamController');
router.get('/search', CapNhatThiSinhViPhamController.TimKiemThiSinh);
router.post('/create', CapNhatThiSinhViPhamController.AddDSViPham);
router.get('/list', CapNhatThiSinhViPhamController.ListDSViPham);
router.put('/update', CapNhatThiSinhViPhamController.SuaVipham);
router.get('/delete', CapNhatThiSinhViPhamController.DeleteViphamByMaHoSo);
module.exports = router;
