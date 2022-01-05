const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const studentController = require('../controllers/student');
router.get('/send-request', auth.isLoggedIn, studentController.sendRequest);
router.post('/store-request', auth.isLoggedIn, studentController.storeRequest);

router.get('/tutors-info', studentController.listTutorsInfo);

module.exports = router;