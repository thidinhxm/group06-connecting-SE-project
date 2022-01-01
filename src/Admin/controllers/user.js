const userService = require('../services/user');
const active= {
    user: true
}
exports.listTutors = async (req, res, next) => {
    try {
        const tutors = await userService.listTutors();
        res.render('users/tutors/tutorList', { tutors,active });
    }
    catch (err) {
        next(err);
    }
}

exports.showTutor = async (req, res, next) => {
    try {
        const tutor = await userService.showTutor(req.params.id);
        res.render('users/tutors/tutorDetail', { tutor,active });
    }
    catch (err) {
        next(err);
    }
}

exports.listStudents = async (req, res, next) => {
    try {
        const students = await userService.listStudents();
        res.render('users/students/studentList', { students,active });
    }
    catch (err) {
        next(err);
    }
}


exports.showStudent = async (req, res, next) => {
    try {
        const student = await userService.showStudent(req.params.id);
        res.render('users/students/studentDetail', { student,active });
    }
    catch (err) {
        next(err);
    }
}

exports.lock = async (req, res, next) => {
    try {
        await userService.lock(req.params.id);
        if (req.body.userType == 'tutor') {
            res.redirect('/users/tutors');
        }
        else {
            res.redirect('/users/students');
        }
    }
    catch (err) {
        next(err);
    }
}


exports.unlock = async (req, res, next) => {
    try {
        await userService.unlock(req.params.id);
        if (req.body.userType == 'tutor') {
            (res.redirect('/users/tutors'));
        }
        else {
            (res.redirect('/users/students'));
        }
    }
    catch (err) {
        next(err);
    }
}