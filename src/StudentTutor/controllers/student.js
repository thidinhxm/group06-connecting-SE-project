const tutorService = require('../services/tutor');
const requestService = require('../services/request');
const active = { student: true }
exports.sendRequest = async (req, res, next) => {
	try {
		const userID = req.user.account_id;
		res.render('students/request', { active });
	}
	catch (err) { console.log(err) }
};

exports.storeRequest = async (req, res, next) => {
	const classroom = req.body.classroom.toString()
	const subjects = req.body.subject.toString()
	const homeNumber = req.body.homeNumber;
	const ward = req.body.ward
	const road = req.body.road
	const city = req.body.city
	const address = homeNumber + ', ' + road + ', ' + ward + ', ' + city
	const salary = req.body.fee
	const phone = req.body.phone
	const time = req.body.time
	const other_request = req.body.different
	const studentID = req.user.account_id;

	const newStudentRequest = {
		student_id: studentID,
		address: address,
		phone: phone,
		salary: salary,
		grade: classroom,
		subject: subjects,
		time: time,
		other_request: other_request,
	};



	await requestService.createStudentRequest(newStudentRequest)
	res.redirect('/my-request');	
	// console.log(subjects.toString());
};



exports.listTutorsInfo = async (req, res, next) => {
	try {
		const tutorList = await tutorService.listTutorsInfo();
		res.render('students/tutorList', { tutorList });
	}
	catch (err) {
		next(err);
	}
};
