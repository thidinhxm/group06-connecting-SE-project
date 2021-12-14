const {models} = require('../models');

exports.listTutors = () => {
    return models.tutor.findAll({
        raw: true,
    });
}

exports.showTutor = (id) => {
    return models.tutor.findOne({
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
}

exports.listStudents = () => {
    return models.student.findAll({
        raw: true,
    });
}

exports.showStudent = (id) => {
    return models.student.findOne({
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
