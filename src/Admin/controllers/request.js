const e = require("express");

exports.listTutorRequests = (req, res, next) => {
    res.render('requests/tutorRequests/tutorRequestList');
};

exports.showTutorRequest = (req, res, next) => {
    res.render('requests/tutorRequests/tutorRequestDetail');
}

exports.listStudentRequests = (req, res, next) => {
    res.render('requests/studentRequests/studentRequestList');
};

exports.showStudentRequest = (req, res, next) => {
    res.render('requests/studentRequests/studentRequestDetail');
}