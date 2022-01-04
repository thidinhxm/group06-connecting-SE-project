const {models} = require('../models');

exports.getAdminByEmail = async (email) =>{
    try {
        const account = await models.account.findOne({
            where: {
                email: email,
            },
            raw: true,
        });
    
        if (!account) {
            return null;
        }
    
        const info = await models.admin.findOne({
            where: {
                admin_id: account.account_id,
            },
            raw: true,
        });
    
        if (!info) {
            return null;
        }
    
        return {...account, ...info};
    }
    catch (err) {
        throw err;
    }
}

exports.getAdminByID = async (account_id) => {
    try {
        const account = await models.account.findOne({
            where: {
                account_id: account_id,
            },
            raw: true,
        });
    
        if (!account) {
            return null;
        }
    
        const info = await models.admin.findOne({
            where: {
                admin_id: account.account_id,
            },
            raw: true,
        });
    
        if (!info) {
            return null;
        }
    
        return {...account, ...info};
    }
    catch (err) {
        throw err;
    }
}


exports.updatePassword = (account_id, newHashPassword) =>{
    return models.account.update({
        password: newHashPassword,
    }, {
        where: {
            account_id: account_id,
        },
    });
}

exports.updateInfo = (account_id, fullname, display_name) =>{
    return models.admin.update({
        fullname: fullname,
        display_name: display_name,
    }, {
        where: {
            admin_id: account_id,
        },
    });
;}