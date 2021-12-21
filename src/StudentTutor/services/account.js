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