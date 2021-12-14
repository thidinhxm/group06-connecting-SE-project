const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/tutors', userController.listTutors);
router.get('/tutors/:id', userController.showTutor);

router.get('/students', userController.listStudents);
router.get('/students/:id', userController.showStudent);

router.post('/tutors/:id/lock', userController.lock);
router.post('/tutors/:id/unlock', userController.unlock);

module.exports = router;
