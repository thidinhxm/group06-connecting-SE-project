const {models} = require('../models');

exports.listPosts = async () => {
    return await models.post.findAll({
        raw: true,
    });
}