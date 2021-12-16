const express = require('express');
const router = express.Router();

const tutorController = require('../controllers/tutor');

router.get('/send-request', tutorController.sendRequest);
router.get('/posts', tutorController.listPost);

module.exports = router;