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