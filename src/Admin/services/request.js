const {models} = require('../models');

exports.listTutorRequests = async () => {
    return await models.tutorrequest.findAll({
        raw: true,
    });
}

exports.showTutorRequest = async (id) => {
    return await models.tutorrequest.findOne({
        where: {
            tutor_request_id: id
        },
        raw: true,
    });
}

exports.listStudentRequests = async () => {
    return await models.studentrequest.findAll({
        raw: true,
    });
}

exports.showStudentRequest = async (id) => {
    return await models.studentrequest.findOne({
        where: {
            student_request_id: id
        },
        raw: true
    });
}

exports.updateCancel = (id, userType) =>{
    if(userType=="student"){
        return models.studentrequest.update({
            status: "Đã hủy",
        }, {
            where: {
                student_request_id: id,
            },
    });}
    else if (userType=="tutor") {
        return models.tutorrequest.update({
            status: "Đã hủy",
        }, {
            where: {
                tutor_request_id: id,
            },
    });
    } else {
    }
}