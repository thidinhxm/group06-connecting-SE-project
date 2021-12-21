const {models} = require('../models');

exports.listTutorRequests = async () => {
    return await models.tutorrequest.findAll({
        raw: true,
    });
}

exports.showTutorRequest = async (id) => {
    return await models.tutorrequest.findOne({
        include : [{
            model: models.request,
            as: 'tutor_request',
        }],
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
        include: [{
                model: models.request,
                as: 'student_request',
            }, {
                model: models.gradesubject,
                as: 'student_request',
            }, 
            {
                model: models.subject,
                as: 'subject',
            }, {
                model: models.grade,
                as: 'grade',
            }],
        where: {
            student_request_id: id
        }
    });
}