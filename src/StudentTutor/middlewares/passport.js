const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const accountService = require('../services/account');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await accountService.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false);
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
