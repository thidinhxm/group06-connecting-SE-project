const postService = require('../services/post');
const requestService = require('../services/request');
const active= {
	post: true
}
exports.list = async (req, res, next) => {
	const postList = await postService.listPosts();
	const subjectSearch = req.query.query;
	// posts return
    const posts = postList;
    if(subjectSearch != null){
    const posts = postList.filter(e =>{
        return e.subject.toUpperCase().includes(subjectSearch.toUpperCase());
    	})
    	res.render('posts/postList', {posts});
	}
    res.render('posts/postList', {posts});
};

exports.show = async (req, res, next) => {
	try {
		const post = await postService.showPost(req.params.postID);
		const postStatus = post['student_request.status'];

		res.render('posts/postDetail', { post, postStatus,active });
	}
	catch (err) {
		next(err);
	}
};

exports.create = async (req, res, next) => {
	try {
		console.log('query', req.query);
		const request = await requestService.showStudentRequest(req.query.requestId);
		res.render('posts/createPost', { request, active });
	}
	catch (err) {
		next(err);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { grade, subject, address, salary, time, other_request } = req.body;
		const student_request_id = req.query.student_request_id;
		await postService.createPost({
			student_request_id,
			grade,
			subject,
			address,
			salary,
			extra_fee: 30,
			time,
			other_request,
		});
		await requestService.updateStatus(student_request_id, 'Đã duyệt');

		res.redirect('/requests/student-requests');
	} catch (err) {
		next(err);
	}
};

