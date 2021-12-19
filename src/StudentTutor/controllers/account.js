exports.profile = (req, res, next) => {
    res.render('account/profile');
}

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.signup = (req, res, next) => {
    res.render('account/signup');
}

exports.signupTutor = (req, res, next) => {
    res.render('account/signupTutor');
}
