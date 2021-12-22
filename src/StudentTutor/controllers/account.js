const bcrypt = require('bcrypt');

const accountService = require('../services/account');

exports.profile = (req, res, next) => {
    res.render('account/profile');
}

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.signup = (req, res, next) => {
    res.render('account/signup');
}

exports.signupStudent = (req, res, next) => {
    res.render('account/signupStudent');
}

exports.signupTutor = (req, res, next) => {
    res.render('account/signupTutor');
}

exports.signupStudentPost = async (req, res, next) => {
    try {
        const {email, password, fullname, displayName, phone, address, birthday, gender} = req.body;
        console.log(req.body)
        const account = await accountService.createAccount({email, password});
        const student = await accountService.createStudent({
            student_id: account.account_id,
            display_name: displayName,
            fullname,
            phone,
            address,
            birthday,
            gender: parseInt(gender)
        });
        
        res.redirect('/');
    }
    catch(err) {
        next(err);
    }
}
