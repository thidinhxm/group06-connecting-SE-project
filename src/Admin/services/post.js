const { models } = require('../models');

exports.listPosts = async () => {
	return await models.post.findAll({
		raw: true,
	});
};

exports.showPost = (id) => {
	return models.post.findOne({
		where: {
			post_id: id,
		},
		raw: true,
	});
};

exports.createPost = (post) => {
	return models.post.create(post);
};

exports.updatePost = (post) => {
	return models.post.update(post, {
		where: {
			post_id: post.post_id,
		},
	});
}