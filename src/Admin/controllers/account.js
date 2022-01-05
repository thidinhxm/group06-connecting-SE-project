const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const accountService = require('../services/account');
const bcrypt = require('bcrypt');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.login = (req, res, next) => {
    res.render('account/login');
}

exports.profile = async(req, res, next) => { 
    try {
        res.render('account/profile', {
            error: req.flash('error'),
            success: req.flash('success'),
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
        
        if (!bcrypt.compareSync(present_password, req.user.password)) {
            req.flash('error', 'Mật khẩu hiện tại không đúng');
            return res.redirect('/profile');
        }  

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(new_password, salt);

        await accountService.updatePassword(req.user.account_id, hashPassword);

        req.user = await accountService.getAdminByID(req.user.account_id);
        
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

exports.changeAvatar = async(req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async(err, fields, files) => {
            if (err) {
                next(err);
            }

            const { avatar } = files;

            if (!avatar) {
                req.flash('error', 'Bạn chưa chọn hình ảnh');
                return res.redirect('/profile');
            }

            await cloudinary.uploader.upload(avatar['filepath'], {
                folder: 'avatar',
            }, async (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    await accountService.updateAvatar(req.user.account_id, result.url);
                    const user = await accountService.getAdminByID(req.user.account_id);
                    req.login(user, {}, (err) => {
                        if (err) {
                            return next(err);
                        }
                        req.flash('success', 'Cật nhật avatar thành công');
                        res.redirect('/profile');
                    });
                }
            });
        });
    }
    catch(err) {
        next(err);
    }
}
