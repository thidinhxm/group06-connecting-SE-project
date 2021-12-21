const requestService = require('../services/request');

exports.listTutorRequests = async(req, res, next) => {
    const tutorRequests = await requestService.listTutorRequests();
    res.render('requests/tutorRequests/tutorRequestList', {tutorRequests});
};

exports.showTutorRequest = async (req, res, next) => {
    const tutorRequest = await requestService.showTutorRequest(req.params.id);
    res.render('requests/tutorRequests/tutorRequestDetail', {tutorRequest});
}

exports.listStudentRequests = async (req, res, next) => {
    const studentRequests = await requestService.listStudentRequests();
    res.render('requests/studentRequests/studentRequestList', {studentRequests});
};

exports.showStudentRequest = async (req, res, next) => {
    const studentRequest = await requestService.showStudentRequest(req.params.id);
    console.log(studentRequest);
    res.render('requests/studentRequests/studentRequestDetail', {studentRequest});
}