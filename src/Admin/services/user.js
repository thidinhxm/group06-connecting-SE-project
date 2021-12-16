const {models} = require('../models');

exports.listTutors = async () => {
    const tutors = await models.tutor.findAll({
        include: [{
            model: models.account,
            as: 'tutor_account',
            attributes: ['is_locked'],
        }],
        raw: true,
    });
    tutors.forEach(tutor => {
        tutor.is_locked = tutor['tutor_account.is_locked'];
    });

    return tutors;
}

exports.showTutor = async (id) => {
    const tutor = await models.tutor.findOne({
        where: {
            tutor_id: id,
        },
        include: [{
            model: models.account,
            as: 'tutor_account',
            attribute: ['email'],
        }],
        raw: true,
    });
    tutor.is_locked = tutor['tutor_account.is_locked'];
    return tutor;
}

exports.listStudents = async () => {
    const students = await models.student.findAll({
        include: [{
            model: models.account,
            as: 'student_account',
            attributes: ['is_locked'],
        }],
        raw: true,
    });

    students.forEach(student => {
        student.is_locked = student['student_account.is_locked'];
    });
    return students;
}

exports.showStudent = async (id) => {
    const student = await models.student.findOne({
        where: {
            student_id: id,
        },
        include: [{
            model: models.account,
            as: 'student_account',
            attribute: ['email'],
        }],
        raw: true,
    });
    student.is_locked = student['student_account.is_locked'];
    return student;
}

exports.lock = (id) => {
    return models.account.update({
        is_locked: true,
    }, {
        where: {
            account_id: id,
        },
    });
}

exports.unlock = (id) => {
    return models.account.update({
        is_locked: false,
    }, {
        where: {
            account_id: id,
        },
    });
}
