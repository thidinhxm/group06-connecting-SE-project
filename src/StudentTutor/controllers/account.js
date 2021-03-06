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
            req.flash('error', 'Email kh??ng t???n t???i');
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
                from: 'Connecting K???t n???i gia s?? v?? h???c sinh',
                to: email,
                subject: '[Connecting K???t n???i gia s?? v?? h???c sinh] X??c nh???n t??i kho???n',
                html: `<p>Ch??o b???n,</p>
                <p>Ai ???? ???? g???i y??u ????ng k?? t??i kho???n t???i Connecting K???t n???i gia s?? v?? h???c sinh.</p>
                <p>T??n ????ng k??: ${email}</p>
                <p>N???u ????y l?? m???t thao t??c nh???m l???n, b???n ch??? c???n b??? qua email n??y. S??? kh??ng c?? v???n ????? g?? x???y ra v???i t??i kho???n c???a b???n.</p>
                <p>N???u ????y l?? thao t??c ????ng l???, b???n c???n b???m v??o ???????ng link b??n d?????i ????? x??c nh???n t??i kho???n:</p>
                <a href='${url}'>X??c nh???n t??i kho???n</a>
                <p>N???u b???n kh??ng bi???t v??? thao t??c n??y, c?? l??? ai ???? ???? c??? g???ng truy c???p v??o t??i kho???n c???a b???n. Vui l??ng kh??ng g???i ???????ng link n??y cho b???t c??? ai</p>`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(info);
                }
            });
            req.flash('success', '????? ch???c ch???n ????y l?? t??i kho???n c???a b???n, vui l??ng v??o email ????? x??c nh???n t??i kho???n');
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
            req.flash('error', 'T??i kho???n c???n x??c th???c kh??ng t???n t???i');
            res.redirect('/login');
        }
        else {
            if(account.expired_at < new Date()) {
                req.flash('error', 'Link x??c th???c t??i kho???n ???? h???t h???n');
                res.redirect('/login');
            }
            else {
                account.is_verified = true;
                account.token = null;
                account.expired_at = null;
                await accountService.updateAccount(account);
                req.flash('success', 'T??i kho???n ???? ???????c x??c nh???n');
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
            req.flash('error', 'M???t kh???u hi???n t???i kh??ng ????ng');
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
            req.flash('success', 'C???t nh???t m???t kh???u th??nh c??ng');
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
            from: 'Connecting K???t n???i gia s?? v?? h???c sinh',
            to: email,
            subject: '[Connecting K???t n???i gia s?? v?? h???c sinh]Qu??n m???t kh???u',
            html: `<p>Ch??o b???n,</p>
            <p>Ai ???? ???? g???i y??u c???u kh??i ph???c m???t kh???u t???i Connecting K???t n???i gia s?? v?? h???c sinh.</p>
            <p>T??n ????ng nh???p: ${email}</p>
            <p>N???u ????y l?? m???t thao t??c nh???m l???n, b???n ch??? c???n b??? qua email n??y. S??? kh??ng c?? v???n ????? g?? x???y ra v???i t??i kho???n c???a b???n.</p>
            <p>N???u ????y l?? thao t??c ????ng l???, b???n c???n b???m v??o ???????ng link b??n d?????i ????? ?????i m???t kh???u m???i:</p>
            <a href='${url}'>?????i m???t kh???u</a>
            <p>N???u b???n kh??ng bi???t v??? thao t??c n??y, c?? l??? ai ???? ???? c??? g???ng truy c???p v??o t??i kho???n c???a b???n. Vui l??ng kh??ng g???i ???????ng link n??y cho b???t c??? ai</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
        req.flash('success', 'Vui l??ng ki???m tra email ????? ?????i m???t kh???u trong v??ng 5 ph??t');
        res.redirect('/forgot-password');

    }
    else {
        req.flash('error', 'Kh??ng th??? ?????i m???t kh???u');
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
                req.flash('success', 'Vui l??ng ?????i m???t kh???u trong v??ng 5 ph??t');
                req.flash('email', email);
                req.flash('token', token);
                res.redirect('/reset-password');
            }
            else {
                req.flash('error', 'Link kh??ng ????ng ho???c ???? h???t h???n, vui l??ng nh???p email ????? g???i l???i');
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
                    req.flash('success', '?????t l???i kh???u th??nh c??ng');
                    res.redirect('/login');
                }
                else {
                    req.flash('error', 'M???t kh???u kh??ng kh???p');
                    req.flash('email', email);
                    req.flash('token', token);
                    res.redirect('/reset-password');
                }
            }
            else {
                req.flash('error', 'Link kh??ng ????ng ho???c ???? h???t h???n, vui l??ng nh???p email ????? g???i l???i');
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
            req.flash('success', 'C???t nh???t th??ng tin th??nh c??ng');
            res.redirect('/profile');
        });
        // req.user=
        // req.flash('success', 'C???t nh???t t??i kho???n th??nh c??ng');
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
                req.flash('error', 'B???n ch??a ch???n h??nh ???nh');
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
                        req.flash('success', 'C???t nh???t avatar th??nh c??ng');
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
                req.flash('error', 'B???n ch??a ch???n h??nh ???nh');
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
                        req.flash('success', 'C???t nh???t avatar th??nh c??ng');
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