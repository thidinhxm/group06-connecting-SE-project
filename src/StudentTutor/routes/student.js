const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');
router.get('/send-request', studentController.sendRequest);
router.post('/store-request', studentController.storeRequest);

module.exports = router;