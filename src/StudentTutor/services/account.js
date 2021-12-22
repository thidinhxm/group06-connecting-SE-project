const {models} = require('../models');

exports.getUserByEmail = async (email) => {
    const user = await models.account.findOne({
        include: [{
            model: models.student,
            as: 'student_account',
            attributes: [],
        }, {
            model: models.tutor,
            as: 'tutor_account',
            attributes: [],
        }],
        where: {
            is_locked: false,
            email: email,
        },
        raw: true,
    });
    return user;
}

exports.getAccountByEmail = async (email) => {
    const account = await models.account.findOne({
        where: {
            email: email,
        },
        raw: true,
    });
    return account;
}

exports.createAccount = async (account) => {
    const newAccount = await models.account.create(account);
    return newAccount;
}

exports.createStudent = async (student) => {
    const newStudent = await models.student.create(student);
    return newStudent;
}