const express = require('express');
const NhomMonThiController = require('../Controllers/NhomMonThiController');

const router = express.Router();

router.get('/list', NhomMonThiController.getListNhomMonThi);
router.post('/add', NhomMonThiController.TaoNhomMonThi);
router.put('/update', NhomMonThiController.SuaNhomMonThi);
router.delete('/delete', NhomMonThiController.XoaNhomMonThi);
router.get('/export', NhomMonThiController.ExportExcel);
router.get('/exporttemplate', NhomMonThiController.ExportExcelTemplate);




module.exports = router;
