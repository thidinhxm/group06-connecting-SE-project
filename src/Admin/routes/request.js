const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request');

router.get('/tutor-requests', requestController.listTutorRequests);
router.get('/tutor-request/:id', requestController.showTutorRequest);

router.get('/student-requests', requestController.listStudentRequests);
router.get('/student-request/:id', requestController.showStudentRequest);

module.exports = router;