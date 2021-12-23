const {models} = require('../models');

exports.listPosts = async () => {
    return await models.post.findAll({
        include : [{
            model: models.studentrequest,
            as: 'student_request',
            attributes: ['status'],
        }],
        raw: true,
    });
},

exports.showPost = async (id) => {
    return await models.post.findOne({
        include : [{
            model: models.studentrequest,
            as: 'student_request',
            attributes: ['status'],
        }],
        where: {
            post_id: id
        },
        raw: true,
    });
}