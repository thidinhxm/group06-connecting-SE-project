const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');

router.get('/profile', accountController.profile);

router.get('/login', accountController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.get('/logout', auth.isLogin, accountController.logout);

router.post('/profile/change-password', auth.isLogin, accountController.changePassword);

router.post('/profile/change-info',auth.isLogin, accountController.changeInfo);

router.post('/profile/change-avatar',auth.isLogin, accountController.changeAvatar);

module.exports = router;

