const { models } = require('../models');

exports.listTutorRequests = async () => {
	return await models.tutorrequest.findAll({
		raw: true,
	});
};

exports.showTutorRequest = async (id) => {
	return await models.tutorrequest.findOne({
		where: {
			tutor_request_id: id,
		},
		raw: true,
	});
};

exports.listStudentRequests = async () => {
	return await models.studentrequest.findAll({
		raw: true,
	});
};

exports.showStudentRequest = async (id) => {
	return await models.studentrequest.findOne({
		where: {
			student_request_id: id,
		},
		raw: true,
	});
};

exports.createTutorRequest = async(newTutorRequest) => {
	try{
    await models.tutorrequest.create(newTutorRequest)

	}
	catch(err){console.log(err);}
}
exports.createStudentRequest = async(newStudentRequest) => {
	try{
    await models.studentrequest.create(newStudentRequest)
	}
	catch(err){console.log(err);}
}
exports.updateStatus = async(id) => {
	try{
		await models.studentrequest.update(
			{status: 'Chờ chấp thuận'},
			{where: {
				student_request_id: id
			}
		})

	}
	catch(err){console.log(err);}
}