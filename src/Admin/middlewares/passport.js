const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const accountService = require('../services/account');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {

        const admin = await accountService.getAdminByEmail(email);
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            return done(null, false);
        }

        return done(null, admin);
    } catch (err) {
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