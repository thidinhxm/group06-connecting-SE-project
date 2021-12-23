const postService = require('../services/post');

exports.sendRequest = function(req, res, next) {
    res.render('tutors/request');
}

exports.listPost = async function(req, res, next) {
    const Listposts = await postService.listPosts();
    const posts = Listposts.filter(e => {
        return e.status.includes('Chưa giao');
    });

    res.render('tutors/postList', {posts});
}
