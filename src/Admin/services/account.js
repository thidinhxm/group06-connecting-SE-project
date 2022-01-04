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

exports.getAdminByEmail = async(email) =>{
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
exports.getInforProfileByEmail = async() => {
    return await models.admin.findOne({ 
            raw: true,
    });
}
exports.getAccForProfile = async(id_admin) =>{
    return await models.account.findOne({
        where:{
            account_id: id_admin,
        },
        raw:true,
    }
    );
}

exports.updatePassword = async(email_, new_pw) =>{
    return models.account.update({
        password: new_pw,
    }, {
        where: {
            email: email_,
        },
});
}

exports.getPassword = async(email)=>{
    return await models.account.findOne({
        where:{
            email:email,
        },
        raw:true,
    });
}

exports.updateInfo = async(account_id, fullname, display_name) =>{
    return await models.admin.update({
        fullname: fullname,
        display_name: display_name,
    }, {
        where: {
            admin_id: account_id,
        },
});}