exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.profile = (req, res, next) => {
    res.render('account/profile');
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}