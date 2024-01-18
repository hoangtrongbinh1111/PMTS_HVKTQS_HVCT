const express = require('express');
const ThamSoHeThongController = require('../Controllers/ThamSoHeThongController');

const router = express.Router();

router.get('/getInfo', ThamSoHeThongController.getInfo);
router.post('/update', ThamSoHeThongController.update);

module.exports = router;
