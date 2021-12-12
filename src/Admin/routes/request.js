const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request');

router.get('/tutor-request', requestController.listTutorRequests);
router.get('/tutor-request/:id', requestController.showTutorRequest);

router.get('/student-request', requestController.listStudentRequests);
router.get('/student-request/:id', requestController.showStudentRequest);

module.exports = router;