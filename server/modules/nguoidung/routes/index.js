const express = require('express');
const NguoidungController = require('../Controllers/NguoidungController');

const router = express.Router();

router.get('/list', NguoidungController.getListUsers);
router.post('/add', NguoidungController.createUser);
router.put('/update', NguoidungController.updateUser);
router.delete('/delete', NguoidungController.deleteUser);
router.get('/export', NguoidungController.ExportExcel);
router.get('/exporttemplate', NguoidungController.ExportExcelTemplate);
router.get('/getRoleById', NguoidungController.getRoleById)
router.get('/getListRoles', NguoidungController.getListRoles)
router.post('/updateRole', NguoidungController.updateRole)
router.post('/uploadimage', NguoidungController.upLoadImage);
router.get('/getUserById', NguoidungController.getUserById);

module.exports = router;
