const userService = require('../services/user');

exports.listTutors = async (req, res, next) => {
    try {
        const tutors = await userService.listTutors();
        res.render('users/tutors/tutorList', { tutors });
    }
    catch (err) {
        next(err);
    }
}

exports.showTutor = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const tutor = await userService.showTutor(req.params.id);
        
        if (tutor['tutor_account.is_locked']) {
            console.log('tutor is locked');
        }
        else {
            console.log('tutor is not locked');
        }
        res.render('users/tutors/tutorDetail', { tutor });
    }
    catch (err) {
        next(err);
    }
}

exports.listStudents = async (req, res, next) => {
    try {
        const students = await userService.listStudents();
        res.render('users/students/studentList', { students });
    }
    catch (err) {
        next(err);
    }
}


exports.showStudent = (req, res, next) => {
    try {
        const student = userService.showStudent(req.params.id);
        console.log(student);
        res.render('users/students/studentDetail', { student });
    }
    catch (err) {
        next(err);
    }   
}

exports.lock = async (req, res, next) => {
    try {
        const account = await userService.lock(req.params.id);
        const tutor = await userService.showTutor(req.params.id);
        console.log(tutor);
        if (tutor) {
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
        const account = await userService.unlock(req.params.id);
        const tutor = await userService.showTutor(req.params.id);
        console.log(tutor);

        if (tutor) {
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