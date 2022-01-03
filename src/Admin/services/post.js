const { models } = require('../models');

exports.listPosts = async () => {
	return await models.post.findAll({
		include: [
			{
				model: models.studentrequest,
				as: 'student_request',
				attributes: ['status'],
			},
		],
		raw: true,
	});
};

exports.showPost = (id) => {
	return models.post.findOne({
		include: [
			{
				model: models.studentrequest,
				as: 'student_request',
				attributes: ['status'],
			},
		],
		where: {
			post_id: id,
		},
		raw: true,
	});
};

exports.createPost = (post) => {
	return models.post.create(post);
};
