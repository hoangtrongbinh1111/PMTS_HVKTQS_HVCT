const express = require('express');
const DotTuyenSinhController = require('../Controllers/DotTuyenSinhController');

const router = express.Router();

router.get('/list', DotTuyenSinhController.getListDotTuyenSinh);
router.post('/add', DotTuyenSinhController.createDotTuyenSinh);
router.post('/change', DotTuyenSinhController.switchDotTuyenSinh);
router.post('/changeByName', DotTuyenSinhController.switchDotTuyenSinhByName);
router.put('/update', DotTuyenSinhController.UpdateDotTuyenSinh);
router.delete('/delete', DotTuyenSinhController.DeleteDotTuyenSinh);

module.exports = router;
