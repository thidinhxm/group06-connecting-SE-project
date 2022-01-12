const {models} = require('../models');

exports.getUserByEmail = async (email) => {
    const user = await models.account.findOne({
        where: {
            email: email
        },
        raw: true
    });

    if (!user) {
        return null;
    }

    const student = await models.student.findOne({
        where: {
            student_id: user.account_id
        },
        raw: true
    });

    if (student) {
        return {...user, ...student};
    }

    const tutor = await models.tutor.findOne({
        where: {
            tutor_id: user.account_id
        },
        raw: true,
    });

    if (tutor) {
        return {...user, ...tutor};
    }

    return 'admin';
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

exports.getAccountByToken = async(token) =>{
    const account = await models.account.findOne({
        where: {
            token: token,
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

exports.createTutor = async (tutor) => {
    const newTutor = await models.tutor.create(tutor);
    return newTutor;
}

exports.getInforProfileByIDStudent = async(id_user) => {
    return await models.student.findOne({ 
            where:{
                student_id:id_user,
            },
            raw:true,
    });
}

exports.getInforProfileByIDTutor = async(id_user) => {
    return await models.tutor.findOne({ 
        where:{
            tutor_id:id_user,
        },
        raw:true,
});
}

exports.getAccForProfile = async(id_user) =>{
    return await models.account.findOne({
        where:{
            account_id: id_user,
        },
        raw:true,
    }
    );
}

exports.updatePassword = (email, pasword) =>{
    return models.account.update({
        password: pasword,
    },{
        where:{
            email: email,
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

exports.updateAccount = (account) => {
    return models.account.update(account, {
        where: {
            account_id: account.account_id,
        },
    });
}

exports.updateTutor = async(tutor) => {
    return await models.tutor.update(tutor, {
        where: {
            tutor_id: tutor.tutor_id,
        },
    });
}

exports.updateStudent = async(student) => {
    return await models.student.update(student, {
        where: {
            student_id: student.student_id,
        },
    });
}
