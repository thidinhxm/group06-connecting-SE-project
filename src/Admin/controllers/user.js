exports.listTutors = (req, res, next) => {
    res.render('users/tutors/tutorList');
}

exports.showTutor = (req, res, next) => {
    res.render('users/tutors/tutorDetail');
}

exports.listStudents = (req, res, next) => {
    res.render('users/students/studentList');
}


exports.showStudent = (req, res, next) => {
    res.render('users/students/studentDetail');
}