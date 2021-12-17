const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
const passport = require('../middlewares/passport');
const auth = require('../middlewares/auth');

router.get('/profile', accountController.profile);

router.get('/login', accountController.login);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?message=Login failed',
    failureFlash: true,
}));

router.get('/logout', auth.isLogin, accountController.logout);

module.exports = router;