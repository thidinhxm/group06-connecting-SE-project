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
    const profile = await accountService.getInforProfileByIDStudent(id_user);
    const profile_tutor = await accountService.getInforProfileByIDTutor(id_user);
    const profile_acc = await accountService.getAccForProfile(id_user);
    console.log("Đây là thông tin người dùng");
    console.log(profile);
    console.log(profile_tutor);
    console.log(profile_acc);
    res.render('account/profile', {profile, profile_tutor, profile_acc});
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
        await accountService.updatePassword(email, hashPassword);
        res.redirect('/profile/'+ account_id);
        console.log("Mật khẩu đã được cập nhật.");
    }
    else{
        res.redirect('/profile/'+ account_id);
        console.log("Sai mật khẩu vui lòng nhập lại.");
    }
}

exports.changeInfor = async(req, res, next) => { 
    var account_id = req.body.faccount_id;
    var fullname = req.body.ffullname;
    var display_name = req.body.fdisplayname;
    var phone = req.body.fphone;
    var birthday = req.body.fbirthday;
    var address = req.body.faddress;

    var grade = req.body.fgrade;
    var subject = req.body.fsubject;
    var time = req.body.ftime;
    var area = req.body.farea;
    var job = req.body.fjob;
    var min_salary = req.body.fmin_salary;
    
    const update = await accountService.updateInfo(account_id, fullname, display_name, phone, birthday, address, grade, subject, time, area, min_salary, job);
    res.redirect('/profile/'+ account_id);
}
