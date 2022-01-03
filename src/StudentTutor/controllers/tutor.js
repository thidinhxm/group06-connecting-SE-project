const postService = require('../services/post');
const {models} = require('../models');
const active = { tutor: true }

exports.sendRequest = function(req, res, next) {
    res.render('tutors/request');
}

exports.listPost = async function(req, res, next) {
    const Listposts = await postService.listPosts();
    const posts_copy = Listposts.filter(e => {
        return e.status.includes('Chưa giao');
    });
    const t = req.query.query;
    const posts= posts_copy;
    if(t!=null){
    const posts = posts_copy.filter(e =>{
        return e.subject.toUpperCase().includes(t.toUpperCase());
    })
    res.render('tutors/postList', {posts,active});}
    res.render('tutors/postList', {posts,active});
}

exports.storeRequest = async (req, res, next) => {
    const tutorID = 1002; // maybe change when login complete
    const other_request = req.body.different
    const payment_option = req.body.payMethod
    const currentTutor = await models.tutor.findOne({where: {tutor_id: tutorID }, raw: true})
    const phone = currentTutor.phone;
    const newTutorRequest = {
        post_id: 1001,
        tutor_id: tutorID,
        phone: phone,
        payment_option:payment_option,
        other_request:other_request ,
      };

    await models.tutorrequest.create(newTutorRequest)
    res.json(req.body);
};



