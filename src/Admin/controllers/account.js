const accountService = require('../services/account');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.profile = async(req, res, next) => { 
    try {
        // const user = req.user;
        console.log(req.user);
        res.render('account/profile', {
            error: req.flash('error'),
            success: req.flash('success'),
            // user: user,
        });
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
    try {
        const {present_password, new_password, confirm_password} = req.body;

        if (new_password !== confirm_password) {
            req.flash('error', 'Mật khẩu nhập lại không đúng');
            return res.redirect('/profile');
        }

        if (!bcrypt.compareSync(present_password, req.user.password)) {
            req.flash('error', 'Mật khẩu hiện tại không đúng');
            return res.redirect('/profile');
        }  

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(new_password, salt);

        await accountService.updatePassword(req.user.account_id, hashPassword);

        req.user = await accountService.getAdminByID(req.user.account_id);
        // res.locals.user = req.user;
        req.flash('success', 'Cật nhật mật khẩu thành công');
        res.redirect('/profile');
    }
    catch (err) {
		next(err);
	}
}

exports.changeInfo = async(req, res, next) => { 
    try {
        const {fullname, display_name} = req.body;
        const account_id = req.user.account_id;

        await accountService.updateInfo(account_id, fullname, display_name);

        const user = await accountService.getAdminByID(account_id);

        req.login(user, {}, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Cật nhật thông tin thành công');
            res.redirect('/profile');
        });
    }
    catch (err) {
		next(err);
	}
    
}
