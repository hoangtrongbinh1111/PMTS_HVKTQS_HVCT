const express = require('express');
const NhomnguoidungController = require('../Controllers/NhomnguoidungController');
const { route } = require('../../dottuyensinh/routes');

const router = express.Router();

router.get('/list', NhomnguoidungController.getListGroups);
router.post('/add', NhomnguoidungController.createOneGroups);
router.put('/update', NhomnguoidungController.UpdateGroupsUser);
router.delete('/delete', NhomnguoidungController.DeleteGroupsUser);
router.get('/export', NhomnguoidungController.ExportExcel);
router.get('/exporttemplate', NhomnguoidungController.ExportExcelTemplate);
router.get('/getRoleById', NhomnguoidungController.getRoleById)
router.get('/getListRoles', NhomnguoidungController.getListRoles)
router.post('/updateRole', NhomnguoidungController.updateRole)



module.exports = router;
