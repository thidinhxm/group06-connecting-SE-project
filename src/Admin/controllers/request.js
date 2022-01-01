const requestService = require('../services/request');
const active= {
    request: true
}
exports.listTutorRequests = async(req, res, next) => {
    const tutorRequests = await requestService.listTutorRequests();
    res.render('requests/tutorRequests/tutorRequestList', {tutorRequests,active});
};

exports.showTutorRequest = async (req, res, next) => {
    const tutorRequest = await requestService.showTutorRequest(req.params.id);
    res.render('requests/tutorRequests/tutorRequestDetail', {tutorRequest,active});
}

exports.listStudentRequests = async (req, res, next) => {
    const studentRequests = await requestService.listStudentRequests();
    res.render('requests/studentRequests/studentRequestList', {studentRequests,active});
};

exports.showStudentRequest = async (req, res, next) => {
    const studentRequest = await requestService.showStudentRequest(req.params.id);
    res.render('requests/studentRequests/studentRequestDetail', {studentRequest,active});
}

exports.cancel = async (req, res, next) => {
    var id = req.body.id;
    var userType = req.body.userType;
    if (userType=='student') {
        await requestService.updateCancelStudent(id);
        res.redirect('/requests/student-requests');
    } else {
        await requestService.updateCancelTutor(id);
        res.redirect('/requests/tutor-requests');
    }
}

exports.accept = async (req, res, next) =>{
    var id= req.body.id;
    console.log("Đây là id");
    console.log(id);
    await requestService.updateStatusAcceptRT(id, 'Đã duyệt');
    res.redirect('/requests/tutor-requests');
}