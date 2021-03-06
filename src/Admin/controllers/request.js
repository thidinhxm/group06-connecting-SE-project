const requestService = require('../services/request');
const postService = require('../services/post');
const active = {
    request: true
}
exports.listTutorRequests = async (req, res, next) => {
    try {
        const itemPerPage = 8;
        let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const search_name = req.query.query;
        if (search_name) {
            const tutorRequests = await requestService.listTutorRequestBySearch(search_name, page);
            let Pages = Math.round(tutorRequests.count / itemPerPage);
			Pages < tutorRequests.count / itemPerPage ? Pages+=1 : Pages;
            let next = page < Pages - 1 ? page + 2 : Pages;
            let previous = page > 0 ? page : 1;

            res.render('requests/tutorRequests/tutorRequestList', {
                tutorRequests: tutorRequests.rows,
                search_name,
                Pages,
                next,
                previous,
                indexpage: page,
                active
            });
        }
        else {
            const tutorRequests = await requestService.listTutorRequests(page);
            let Pages = Math.round(tutorRequests.count / itemPerPage);
			Pages < tutorRequests.count / itemPerPage ? Pages+=1 : Pages;
            let next = page < Pages - 1 ? page + 2 : Pages;
            let previous = page > 0 ? page : 1;
            res.render('requests/tutorRequests/tutorRequestList', {
                tutorRequests: tutorRequests.rows,
                Pages,
                next,
                previous,
                indexpage: page,
                active
            });

        }
    }
    catch (err) { console.log(err); }
};

exports.showTutorRequest = async (req, res, next) => {
    const tutorRequest = await requestService.showTutorRequest(req.params.id);
    const post_detail = await postService.showPost(tutorRequest.post_id);
    res.render('requests/tutorRequests/tutorRequestDetail', {tutorRequest, post_detail, active});
}

exports.listStudentRequests = async (req, res, next) => {
    try {
        const itemPerPage = 8;
        let page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const search_name = req.query.query;
        if (search_name) {
            const studentRequests = await requestService.listStudentRequestBySearch(search_name, page);
            let Pages = Math.round(studentRequests.count / itemPerPage);
			Pages < studentRequests.count / itemPerPage ? Pages+=1 : Pages;
            let next = page < Pages - 1 ? page + 2 : Pages;
            let previous = page > 0 ? page : 1;

            res.render('requests/studentRequests/studentRequestList', {
                studentRequests: studentRequests.rows,
                search_name,
                Pages,
                next,
                previous,
                indexpage: page,
                active
            });
        }
        else {
            const studentRequests = await requestService.listStudentRequests(page);
            let Pages = Math.round(studentRequests.count / itemPerPage);
			Pages < studentRequests.count / itemPerPage ? Pages+=1 : Pages;
            let next = page < Pages - 1 ? page + 2 : Pages;
            let previous = page > 0 ? page : 1;
            console.log(studentRequests.count)
            console.log(Pages)
            res.render('requests/studentRequests/studentRequestList', {
                studentRequests: studentRequests.rows,
                Pages,
                next,
                previous,
                indexpage: page,
                active
            });

        }
    }
    catch (err) { console.log(err); }
};

exports.showStudentRequest = async (req, res, next) => {
    const studentRequest = await requestService.showStudentRequest(req.params.id);
    res.render('requests/studentRequests/studentRequestDetail', { studentRequest, active });
}

exports.cancel = async (req, res, next) => {
    var id = req.body.id;
    var userType = req.body.userType;
    if (userType == 'student') {
        await requestService.updateCancelStudent(id);
        res.redirect('/requests/student-requests');
    } else {
        await requestService.updateCancelTutor(id);
        res.redirect('/requests/tutor-requests');
    }
}

exports.accept = async (req, res, next) =>{
    var id= req.body.id;
    const detailRequest = await requestService.showTutorRequest(id);
    requestService.updateStatusAcceptRT(id, '???? duy???t', detailRequest.post_id);
    res.redirect('/requests/tutor-requests');
}