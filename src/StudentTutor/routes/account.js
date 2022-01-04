const express  = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
const passport = require('../middlewares/passport');
const accountAPI = require('../api/account');

router.get('/profile', accountController.profile);
router.get('/login', accountController.login);

router.get('/signup', accountController.signup);
router.get('/signup/student', accountController.signupStudent);
router.get('/signup/tutor', accountController.signupTutor);

router.get('/logout', accountController.logout);

router.get('/forgot-password', accountController.forgotPassword);
router.get('/reset-password', accountController.resetPassword);


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.post('/signup-student', accountController.signupStudentPost);

router.post('/api/check-exists-account', accountAPI.checkExistAccount);

router.post('/profile/change-password', accountController.changePassword);

router.post('/profile/change-info', accountController.changeInfor);

router.post('/signup-tutor', accountController.signupTutorPost);

router.get('/send', accountController.sendMailToVerifyAccount);

router.get('/verify', accountController.verifyAccount);

router.post('/forgot-password', accountController.forgotPasswordPost);

router.post('/reset-password', accountController.resetPasswordPost);

router.get('/forgot-password-authentication', accountController.forgotPasswordAuthentication);

module.exports = router;
