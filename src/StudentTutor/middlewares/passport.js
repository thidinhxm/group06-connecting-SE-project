const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const accountService = require('../services/account');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await accountService.getUserByEmail(email);
        if (!user) {
            return done(null, false, req.flash('error', 'Email không tồn tại'));
        }
        if (user === 'admin') {
            return done(null, false, req.flash('error', 'Không thể đăng nhập với tài khoản admin'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, req.flash('error', 'Mật khẩu không đúng'));
        }

        if (user.is_locked) {
            return done(null, false, req.flash('error', 'Tài khoản đã bị khóa'));
        }

        if (!user.is_verified) {
            return done(null, false, req.flash('error', 'Tài khoản chưa được xác thực'));
        }

        return done(null, user);
    }
    catch (err) {
        console.log(err);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});

module.exports = passport;
