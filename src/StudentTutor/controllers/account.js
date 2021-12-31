const bcrypt = require('bcrypt');

const accountService = require('../services/account');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
    var id_user = req.params.account_id;
    const profile = await accountService.getInforProfileByIDStudent(id_user);
    const profile_tutor = await accountService.getInforProfileByIDTutor(id_user);
    const profile_acc = await accountService.getAccForProfile(id_user);
    console.log('Đây là thông tin người dùng');
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
    try{
        const pw = await accountService.getPassword(email);
        var account_id=pw.account_id;

        if(bcrypt.compareSync(present_pw, pw.password))
        {
            await accountService.updatePassword(email, hashPassword);
            res.redirect('/profile/'+ account_id);
            console.log('Mật khẩu đã được cập nhật.');
        }
        else{
            res.redirect('/profile/'+ account_id);
            console.log('Sai mật khẩu vui lòng nhập lại.');
    }}
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

exports.resetPassword = async(req, res, next) => {
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
    try{
        const update = await accountService.updateInfo(account_id, fullname, display_name, phone, birthday, address, grade, subject, time, area, min_salary, job);
    }
    catch (err) {
		next(err);
	}
    res.redirect('/profile/'+ account_id);
}
