const express = require('express');
const router = express.Router();

const requestController = require('../controllers/request');

router.get('/tutor-requests', requestController.listTutorRequests);
router.get('/tutor-requests/:id', requestController.showTutorRequest);

router.get('/student-requests', requestController.listStudentRequests);
router.get('/student-requests/:id', requestController.showStudentRequest);
router.post('/student-requests/cancel', requestController.cancel)
router.post('/tutor-requests/cancel', requestController.cancel)
router.post('/tutor-requests/accept', requestController.accept)
module.exports = router;
