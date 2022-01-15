const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const accountService = require('../services/account');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.login = (req, res, next) => {
    res.render('account/login', {
        error: req.flash('error'),
        success: req.flash('success')
    });
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
        const account = (await accountService.createAccount({email, password: hashPassword})).get({plain: true});
        await accountService.createStudent({
            student_id: account.account_id,
            display_name: displayName,
            fullname,
            phone,
            address,
            birthday,
            gender: parseInt(gender)
        });
        
        res.redirect(`/send?email=${email}&type=student`);
    }
    catch(err) {
        next(err);
    }
}

exports.signupTutorPost = async (req, res, next) => {
    try {
        const {
            email, password, fullname, displayName, phone, 
            address, birthday, gender, job, salary, grade, 
            subject, time, fgrade, fsubject, ftime, area, farea
        } = req.body;
        console.log(req.body)
        const gradeString = (Array.isArray(grade)? grade.join(', ') : grade) + (fgrade ? (', ' + fgrade) : '');
        const subjectString = (Array.isArray(subject)? subject.join(', ') : subject) + (fsubject ? (', ' + fsubject) : '');
        const timeString = (Array.isArray(time)? time.join(', ') : time) + (ftime ? (', ' + ftime) : '');
        const areaString = (Array.isArray(area)? area.join(', ') : area) + (farea ? (', ' + farea) : '');
        
        const hashPassword = bcrypt.hashSync(password, 10);
        
        const account = (await accountService.createAccount({email, password: hashPassword})).get({ plain: true });

        await accountService.createTutor({
            tutor_id: account.account_id,
            display_name: displayName,
            fullname,
            phone,
            address,
            birthday,
            gender: parseInt(gender),
            job,
            min_salary: salary,
            grade: gradeString,
            subject: subjectString,
            time: timeString,
            area: areaString
        });
        
        res.redirect(`/send?email=${email}&type=tutor`);
    }
    catch(err) {
        next(err);
    }
}

exports.sendMailToVerifyAccount = async(req, res, next) => {
    try {
        const {email, type} = req.query;
        const account = await accountService.getAccountByEmail(email);
        if(!account) {
            req.flash('error', 'Email không tồn tại');
            res.redirect(`/signup/${type}`);
        }
        else {
            account.token = crypto.randomBytes(64).toString('hex');
            account.expired_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await accountService.updateAccount(account);
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            const url = `${req.protocol}://${req.get('host')}/verify?token=${account.token}&type=${type}`;
            const mailOptions = {
                from: 'Connecting Kết nối gia sư và học sinh',
                to: email,
                subject: '[Connecting Kết nối gia sư và học sinh] Xác nhận tài khoản',
                html: `<p>Chào bạn,</p>
                <p>Ai đó đã gửi yêu đăng kí tài khoản tại Connecting Kết nối gia sư và học sinh.</p>
                <p>Tên đăng kí: ${email}</p>
                <p>Nếu đây là một thao tác nhầm lẫn, bạn chỉ cần bỏ qua email này. Sẽ không có vấn đề gì xảy ra với tài khoản của bạn.</p>
                <p>Nếu đây là thao tác đúng lẽ, bạn cần bấm vào đường link bên dưới để xác nhận tài khoản:</p>
                <a href='${url}'>Xác nhận tài khoản</a>
                <p>Nếu bạn không biết về thao tác này, có lẽ ai đó đã cố gắng truy cập vào tài khoản của bạn. Vui lòng không gửi đường link này cho bất cứ ai</p>`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(info);
                }
            });
            req.flash('success', 'Để chắc chắn đây là tài khoản của bạn, vui lòng vào email để xác nhận tài khoản');
            res.redirect('/login');
        }
    }
    catch(err) {
        next(err);
    }
}

exports.verifyAccount = async(req, res, next) => {
    try {
        const {token} = req.query;
        const account = await accountService.getAccountByToken(token);
        if(!account) {
            req.flash('error', 'Tài khoản cần xác thực không tồn tại');
            res.redirect('/login');
        }
        else {
            if(account.expired_at < new Date()) {
                req.flash('error', 'Link xác thực tài khoản đã hết hạn');
                res.redirect('/login');
            }
            else {
                account.is_verified = true;
                account.token = null;
                account.expired_at = null;
                await accountService.updateAccount(account);
                req.flash('success', 'Tài khoản đã được xác nhận');
                res.redirect('/login');
            }
        }
    }
    catch(err) {
        next(err);
    }
}

exports.logout = async(req, res, net) => {
    req.logout();
    res.redirect('/');
}

exports.profile = async(req, res, next) => { 
    try{
        if(req.user.student_id != null){
            res.render('account/profileStudent', {error: req.flash('error'),
            success: req.flash('success')});
        }
        else{
            res.render('account/profileTutor', {error: req.flash('error'),
            success: req.flash('success')});
        }
    }
    catch(err) {
        next(err);
    }
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

        await accountService.updatePassword(req.user.email, hashPassword);

        const email = req.user.email;
        const user = await accountService.getUserByEmail(email);

        req.login(user, {}, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Cật nhật mật khẩu thành công');
            res.redirect('/profile');
        });
    }
    catch (err) {
		next(err);
	}
}


exports.forgotPassword = async(req, res, next) => {
    res.render('account/forgotPassword', {
        error: req.flash('error'),
        success: req.flash('success')
    });
}

exports.forgotPasswordPost = async(req, res, next) => {
    const email = req.body.email;
    const account = await accountService.getAccountByEmail(email);
    if(account) {
        account.token = crypto.randomBytes(64).toString('hex');
        account.expired_at = Date.now() + 300000; // 5 minutes
        const url = `${req.protocol}://${req.get('host')}/forgot-password-authentication?token=${account.token}&email=${email}`;
        await accountService.updateAccount(account);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: 'Connecting Kết nối gia sư và học sinh',
            to: email,
            subject: '[Connecting Kết nối gia sư và học sinh]Quên mật khẩu',
            html: `<p>Chào bạn,</p>
            <p>Ai đó đã gửi yêu cầu khôi phục mật khẩu tại Connecting Kết nối gia sư và học sinh.</p>
            <p>Tên đăng nhập: ${email}</p>
            <p>Nếu đây là một thao tác nhầm lẫn, bạn chỉ cần bỏ qua email này. Sẽ không có vấn đề gì xảy ra với tài khoản của bạn.</p>
            <p>Nếu đây là thao tác đúng lẽ, bạn cần bấm vào đường link bên dưới để đổi mật khẩu mới:</p>
            <a href='${url}'>Đổi mật khẩu</a>
            <p>Nếu bạn không biết về thao tác này, có lẽ ai đó đã cố gắng truy cập vào tài khoản của bạn. Vui lòng không gửi đường link này cho bất cứ ai</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
        req.flash('success', 'Vui lòng kiểm tra email để đổi mật khẩu trong vòng 5 phút');
        res.redirect('/forgot-password');

    }
    else {
        req.flash('error', 'Không thể đổi mật khẩu');
        res.redirect('/forgotPassword');
    }
}

exports.forgotPasswordAuthentication = async(req, res, next) => {
    try {
        const token = req.query.token;
        const email = req.query.email;
        const account = await accountService.getAccountByEmail(email);
        if(account) {
            if(account.token === token && account.expired_at > Date.now()) {
                account.expired_at = Date.now() + 300000; // 5 minutes
                req.flash('success', 'Vui lòng đổi mật khẩu trong vòng 5 phút');
                req.flash('email', email);
                req.flash('token', token);
                res.redirect('/reset-password');
            }
            else {
                req.flash('error', 'Link không đúng hoặc đã hết hạn, vui lòng nhập email để gửi lại');
                res.redirect('/forgot-password');
            }
        }
    }
    catch(err) {
        next(err);
    }
}

exports.resetPassword = (req, res, next) => {
    const email = req.flash('email')[0];
    const token = req.flash('token')[0];
    if (email && token) {
        res.render('account/resetPassword', {
            error: req.flash('error'),
            success: req.flash('success'),
            email: email,
            token: token
        });
    }
    else {
        res.redirect('/forgot-password');
    }
}

exports.resetPasswordPost = async(req, res, next) => {
    try {
        const {password, retypePassword, token, email} = req.body;
        const account = await accountService.getAccountByEmail(email);
        if(account) {
            if(account.token === token && account.expired_at > Date.now()) {
                if(password === retypePassword) {
                    console.log(password);
                    console.log(retypePassword)
                    console.log(req.body)
                    account.password = bcrypt.hashSync(password, 10);
                    account.token = null;
                    account.expired_at = null;
                    await accountService.updateAccount(account);
                    req.flash('success', 'Đặt lại khẩu thành công');
                    res.redirect('/login');
                }
                else {
                    req.flash('error', 'Mật khẩu không khớp');
                    req.flash('email', email);
                    req.flash('token', token);
                    res.redirect('/reset-password');
                }
            }
            else {
                req.flash('error', 'Link không đúng hoặc đã hết hạn, vui lòng nhập email để gửi lại');
                res.redirect('/forgot-password');
            }
        }
    }
    catch(err) {
        next(err);
    }
}
exports.changeInfor = async(req, res, next) => { 
    try{
        const user_get = req.body;
        if(user_get.tutor_id!=null){
            await accountService.updateTutor(user_get);
        }
        else{
            await accountService.updateStudent(user_get);
        }
        const email = req.user.email;
        const user = await accountService.getUserByEmail(email);

        req.login(user, {}, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Cật nhật thông tin thành công');
            res.redirect('/profile');
        });
        // req.user=
        // req.flash('success', 'Cật nhật tài khoản thành công');
        // res.redirect('/profile');
    }
    catch(err) {
        next(err);
    }
}


exports.changeAvatarTutor = async(req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async(err, fields, files) => {
            if (err) {
                next(err);
            }

            const { avatar } = files;

            if (!avatar || !avatar['size']) {
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
                    await accountService.updateAvatarTutor(req.user.account_id, result.url);
                    const user = await accountService.getUserByID(req.user.account_id);
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

exports.changeAvatarStudent = async(req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async(err, fields, files) => {
            if (err) {
                next(err);
            }

            const { avatar } = files;

            if (!avatar || !avatar['size']) {
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
                    await accountService.updateAvatarStudent(req.user.account_id, result.url);
                    const user = await accountService.getUserByID(req.user.account_id);
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