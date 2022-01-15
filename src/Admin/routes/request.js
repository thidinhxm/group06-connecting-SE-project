const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const requestController = require('../controllers/request');

router.get('/tutor-requests',auth.isLogin, requestController.listTutorRequests);
router.get('/tutor-requests/:id',auth.isLogin, requestController.showTutorRequest);

router.get('/student-requests',auth.isLogin, requestController.listStudentRequests);
router.get('/student-requests/:id',auth.isLogin, requestController.showStudentRequest);
router.post('/student-requests/cancel',auth.isLogin, requestController.cancel)
router.post('/tutor-requests/cancel',auth.isLogin, requestController.cancel)
router.post('/tutor-requests/accept',auth.isLogin, requestController.accept)
module.exports = router;
