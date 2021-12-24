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