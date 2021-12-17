const {models} = require('../models');

exports.getAdminAccountByEmail = async (email) => {
    const admin = await models.account.findOne({
        include: [{
            model: models.admin,
            as: 'admin_account',
            attributes: [],
        }],
        where: {
            is_locked: false,
            email: email,
        },
        raw: true,
    });
    return admin;
}

