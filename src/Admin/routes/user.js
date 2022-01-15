const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userController = require('../controllers/user');

router.get('/tutors',auth.isLogin, userController.listTutors);
router.get('/tutors/:id',auth.isLogin, userController.showTutor);

router.get('/students',auth.isLogin, userController.listStudents);
router.get('/students/:id',auth.isLogin, userController.showStudent);

router.post('/:id/lock',auth.isLogin, userController.lock);
router.post('/:id/unlock',auth.isLogin, userController.unlock);

module.exports = router;
