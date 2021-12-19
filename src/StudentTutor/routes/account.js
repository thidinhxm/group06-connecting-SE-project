const express  = require('express');
const router = express.Router();

const accountController = require('../controllers/account');

router.get('/profile', accountController.profile);
router.get('/login', accountController.login);
router.get('/signup', accountController.signup);
router.get('/signupTutor', accountController.signupTutor);

module.exports = router;
