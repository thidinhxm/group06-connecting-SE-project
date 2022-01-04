const accountService = require('../services/account');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.profile = async(req, res, next) => { 
    try{
        const profile = await accountService.getInforProfileByID(req.user.account_id);
        const profile_acc = req.user;
        console.log(profile);
        console.log(profile_acc);
        res.render('account/profile', {profile, profile_acc, error: req.flash('error'),
        success: req.flash('success')});
    }
    catch (err) {
		next(err);
	}
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
    try{
        const pw = await accountService.getPassword(email);
        if(bcrypt.compareSync(present_pw, pw.password))
        {
            req.flash('success', 'Mật khẩu đã được cật nhật');
            await accountService.updatePassword(email, hashPassword);
            res.redirect('/profile');
        }
        else{
            req.flash('error', 'Sai mật khẩu vui lòng thử lại.');
            res.redirect('/profile');
        }
    }
    catch (err) {
		next(err);
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
    try{
        const update = await accountService.updateInfo(id, fullname, display_name);
        console.log(update);
    }
    catch (err) {
		next(err);
	}
    req.flash('success', 'Cật nhật tài khoản thành công');
    res.redirect('/profile');
}
