const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const tutorController = require('../controllers/tutor');

router.get('/send-request', auth.isLoggedIn,  tutorController.sendRequest);
router.post('/store-request', auth.isLoggedIn, tutorController.storeRequest);
router.get('/posts', tutorController.listPost);

module.exports = router;