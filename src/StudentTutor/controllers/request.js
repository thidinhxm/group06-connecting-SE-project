const { models } = require('../models');
const requestService = require('../services/request');

exports.RequestList = async (req, res, next) => {
    try {
        let requests, myRequests;
        
        if (req.user.student_id) {
            requests = await requestService.listStudentRequests();

            myRequests = requests.filter((request) => {
                return request.student_id == req.user.student_id;
            })

            return res.render('students/myRequests/myRequestList', {studentRequests: myRequests});
        } else if (req.user.tutor_id) {
            requests = await requestService.listTutorRequests();

            myRequests = requests.filter((request) => {
                return request.tutor_id == req.user.tutor_id;
            })

            return res.render('tutors/myRequests/myRequestList', {tutorRequests: myRequests});
        }
    } catch (error) {
        next(error);
    }
}


exports.RequestDetail = async (req, res, next) => {
    try {
        let requestDetail;

        if (req.user.student_id) {
            requestDetail = await requestService.showStudentRequest(req.params.id);

            if(req.user.student_id == requestDetail.student_id) {
                return res.render('students/myRequests/myRequestDetail', {studentRequest: requestDetail})
            }
            res.sendStatus(404);
        } else if (req.user.tutor_id) {
            requestDetail = await requestService.showTutorRequest(req.params.id);

            if (req.user.tutor_id == requestDetail.tutor_id){
                return res.render('tutors/myRequests/myRequestDetail', {tutorRequest: requestDetail})
            }
            res.sendStatus(404);
        }
        
    } catch (error) {
        next(error);
    }
}