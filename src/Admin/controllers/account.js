const accountService = require('../services/account');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.profile = async(req, res, next) => { 
    const profile = await accountService.getInforProfileByEmail();
    const profile_acc = await accountService.getAccForProfile(profile.admin_id);
    console.log(profile);
    console.log(profile_acc);
    res.render('account/profile', {profile, profile_acc});
}
exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
}

exports.changePassword = async(req, res, next) => { 
    var new_pw = req.body.new_password;
    const len = new_pw.length;
    const hashPassword = bcrypt.hashSync(new_pw, len);
    var present_pw = req.body.present_password;
    var email = req.body.email_for_cp;
    const pw = await accountService.getPassword(email);
    if(bcrypt.compareSync(present_pw, pw.password))
    {
        console.log('Mật khẩu đã được cập nhật.');
        await accountService.updatePassword(email, hashPassword);
        res.redirect('/profile');
        console.log('Mật khẩu đã được cập nhật.');
    }
    else{
        res.redirect('/profile');
        console.log('Sai mật khẩu vui lòng nhập lại.');
    }
}

exports.changeInfo = async(req, res, next) => { 
    var id = req.body.account_id;
    var fullname = req.body.ffullname;
    var display_name = req.body.fdisplayname;

    console.log("Xuất ra");
    console.log(id);
    console.log(fullname);
    console.log(display_name);

    const update = await accountService.updateInfo(id, fullname, display_name);
    console.log(update);

    res.redirect('/profile');
}
