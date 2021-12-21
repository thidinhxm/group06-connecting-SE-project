const express  = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');

router.get('/profile', accountController.profile);
router.get('/login', accountController.login);
router.get('/signup', accountController.signup);
router.get('/signupTutor', accountController.signupTutor);


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

module.exports = router;
