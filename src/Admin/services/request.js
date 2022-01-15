const { models } = require('../models');
const { Op } = require('sequelize')
exports.listTutorRequests = async (page = 0, itemPerPage = 8) => {
	return await models.tutorrequest.findAndCountAll({
		raw: true,
		offset: page * itemPerPage,
    limit: itemPerPage,
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

exports.listStudentRequests =  (page = 0, itemPerPage = 8) => {
	return  models.studentrequest.findAndCountAll({
		raw: true,
		offset: page * itemPerPage,
    limit: itemPerPage,
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

exports.updateCancelStudent = (id) =>{
    return models.studentrequest.update({
        status: "Đã hủy",
    }, {
        where: {
            student_request_id: id,
        },
    });
}
exports.updateCancelTutor = (id) =>{
    return models.tutorrequest.update({
        status: "Đã hủy",
    }, {
        where: {
            tutor_request_id: id,
        },
    });
}
exports.updateStatus = (id, status) => {
	return models.studentrequest.update(
		{
			status: status,
		},
		{
			where: {
				student_request_id: id,
			},
		}
	);
};

exports.updateCancel = (id, userType) => {
	if (userType == 'student') {
		return models.studentrequest.update(
			{
				status: 'Đã hủy',
			},
			{
				where: {
					student_request_id: id,
				},
			}
		);
	} else if (userType == 'tutor') {
		return models.tutorrequest.update(
			{
				status: 'Đã hủy',
			},
			{
				where: {
					tutor_request_id: id,
				},
			}
		);
	} else {
	}
};

exports.updateStatusAcceptRT = (id, status, post_id) => {
	models.tutorrequest.update(
		{
			status: status,
		},
		{
			where: {
				tutor_request_id: id,
			},
		}
	);

	models.post.update(
		{
			status: 'Đã giao',
		},
		{
			where: {
				post_id: post_id,
			},
		}
	);
}

exports.listStudentRequestBySearch = (search_value,page = 0, itemPerPage = 8) => {
	return models.studentrequest.findAndCountAll({
		where: {
			[Op.or]: [{
				student_request_id:	{ [Op.substring]: '%' + search_value + '%' }
			}, {
				phone: { [Op.substring]: '%' + search_value + '%' }
			},{
				subject: { [Op.substring]: '%' + search_value + '%' }
			},{
				grade: { [Op.substring]: '%' + search_value + '%' }
			}, {
				time: { [Op.substring]: '%' + search_value + '%' }
			}]
		},
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	})
}

exports.listTutorRequestBySearch = (search_value, page = 0, itemPerPage = 8) => {
	return models.tutorrequest.findAndCountAll({
		where: {
			[Op.or]: [{
				tutor_request_id:{ [Op.substring]: '%' + search_value + '%' }
			},{
				post_id: { [Op.substring]: '%' + search_value + '%' }
			},{
				phone: { [Op.substring]: '%' + search_value + '%' }
			}, {
				status: { [Op.substring]: '%' + search_value + '%' }
			}]
		},
		raw: true,
		offset: page * itemPerPage,
		limit: itemPerPage,
	})
}
