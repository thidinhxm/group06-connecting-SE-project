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
        const tutor = await userService.showTutor(parseInt(req.params.id));
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
        const student = userService.showStudent(parseInt(req.params.id));
        console.log(student);
        res.render('users/students/studentDetail', { student });
    }
    catch (err) {
        next(err);
    }   
}