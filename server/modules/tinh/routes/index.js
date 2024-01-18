const express = require('express');
const TinhController = require('../Controllers/TinhController');

const router = express.Router();

router.get('/list', TinhController.getListTinh);
router.post('/add', TinhController.TaoTinh);
router.put('/update', TinhController.SuaTinh);
router.delete('/delete', TinhController.XoaTinh);
router.get('/export', TinhController.ExportExcel);
router.get('/exporttemplate', TinhController.ExportExcelTemplate);




module.exports = router;
