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
        const adminAccount = await accountService.getAdminAccountByEmail(email);
        if (!adminAccount || !bcrypt.compareSync(password, adminAccount.password)) {
            return done(null, false);
        }
        return done(null, adminAccount);
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