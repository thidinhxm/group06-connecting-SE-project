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

exports.updatePassword = async(email_, new_pw) =>{
    await models.account.update({
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

exports.updateInfo = async(account_id, fullname, display_name, phone, birthday, address, grade, subject, time, area, min_salary, job) =>{
    const student = await models.student.update({
        fullname: fullname,
        display_name: display_name,
        phone: phone,
        birthday: birthday,
        address: address,
        
    }, {
        where: {
            student_id: account_id,
        },
});
    const tutor = await models.tutor.update({
        fullname: fullname,
        display_name: display_name,
        phone: phone,
        birthday: birthday,
        address: address,
        grade: grade,
        subject: subject,
        time: time,
        area: area,
        job: job,
        min_salary: min_salary,
    }, {
        where: {
            tutor_id: account_id,
        },
});
    if(student==null){
        return tutor;
    }
    else return student;
}
