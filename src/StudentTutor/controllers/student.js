const { models } = require('../models');
const tutorService = require('../services/tutor');
const active = { student: true }
exports.sendRequest = async (req, res, next) => {
	try {
		const userID = req.user.account_id;
		const roleStudent = await isStudent(userID);
		console.log(roleStudent)
		res.render('students/request', { active, roleStudent });
	}
	catch (err) { console.log(err) }
};

exports.storeRequest = async (req, res, next) => {
	const classroom = 'Lớp ' + req.body.classroom.toString()
	const subjects = req.body.subject.toString()
	const homeNumber = req.body.homeNumber;
	const ward = req.body.ward
	const road = req.body.road
	const city = req.body.city
	const address = homeNumber + ',' + road + ',' + ward + ',' + city
	const salary = req.body.fee
	const phone = req.body.phone
	const time = req.body.time
	const other_request = req.body.different

	const studentID = req.user.account_id;// maybe change when login complete


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



	await models.studentrequest.create(newStudentRequest)
	res.redirect('/my-request');
	// console.log(subjects.toString());
};


const isStudent = async (id) => {
	const test = await models.student.findOne({
		where: {
			student_id: id,
		},
		raw: true,
	})
	return (test != null && test.length != 0)
}

exports.listTutorsInfo = async (req, res, next) => {
	try {
		const tutorList = await tutorService.listTutorsInfo();
		res.render('students/tutorList', { tutorList });
	}
	catch (err) { 
		next(err); 
	}
};