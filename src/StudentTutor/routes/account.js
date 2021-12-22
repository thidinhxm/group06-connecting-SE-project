const express  = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');
const accountAPI = require('../api/account');

router.get('/profile', accountController.profile);
router.get('/login', accountController.login);

router.get('/signup', accountController.signup);
router.get('/signup/student', accountController.signupStudent);
router.get('/signup/tutor', accountController.signupTutor);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.post('/signup-student', accountController.signupStudentPost);

router.post('/api/check-account', accountAPI.checkAccount);

router.post('/api/check-exists-account', accountAPI.checkExistAccount);
module.exports = router;
