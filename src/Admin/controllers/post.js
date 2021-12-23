const postService = require('../services/post');

exports.list = async (req, res, next) => {
    const posts = await postService.listPosts();

    res.render('posts/postList', {posts});
}

exports.show = async (req, res, next) => {
    const post = await postService.showPost(req.params.postID);
    const postStatus = post['student_request.status'];

    res.render('posts/postDetail', {post, postStatus});
}

exports.create = async (req, res, next) => {
    res.render('posts/createPost');
}


