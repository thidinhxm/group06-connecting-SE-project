const bcrypt = require('bcrypt');

const accountService = require('../services/account');

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
        const hashPassword = bcrypt.hashSync(password, 10);
        const account = await accountService.createAccount({email, hashPassword});
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

exports.forgotPassword = async(req, res, next) => {
    res.render('account/forgotPassword');
}

exports.logout = async(req, res, net) => {
    res.logout();
    res.redirect('/');
}

exports.profile = async(req, res, next) => { 
    var id_user = req.params.account_id;
    const profile = await accountService.getInforProfileByID(id_user);
    const profile_acc = await accountService.getAccForProfile(id_user);
    console.log("Đây là thông tin người dùng");
    console.log(profile);
    console.log(profile_acc);
    res.render('account/profile', {profile, profile_acc});
}

exports.changePassword = async(req, res, next) => { 
    var new_pw = req.body.new_password;
    const len = new_pw.length;
    const hashPassword = bcrypt.hashSync(new_pw, len);
    var present_pw = req.body.present_password;
    var email = req.body.email_for_cp;
    const pw = await accountService.getPassword(email);
    var account_id=pw.account_id;
    if(bcrypt.compareSync(present_pw, pw.password))
    {
        console.log("Mật khẩu đã được cập nhật.");
        await accountService.updatePassword(email, hashPassword);
        res.redirect('/profile/'+ account_id);
        console.log("Mật khẩu đã được cập nhật.");
    }
    else{
        res.redirect('/profile/'+ account_id);
        console.log("Sai mật khẩu vui lòng nhập lại.");
    }
}