const express = require('express');
const AuthController = require('../Controllers/AuthController');

const router = express.Router();

router.post('/loginMember', AuthController.loginMember);
router.post('/changePass', AuthController.changePass);

module.exports = router;
