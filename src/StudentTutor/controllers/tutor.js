const postService = require('../services/post');
const {models} = require('../models');
const active = { tutor: true }
exports.sendRequest = function(req, res, next) {

    res.render('tutors/request');
}

exports.listPost = async function(req, res, next) {
    const Listposts = await postService.listPosts();
    const posts = Listposts.filter(e => {
        return e.status.includes('Chưa giao');
    });
    const roleTutor = await isTutor(req.user.account_id);
    console.log(roleTutor)


    res.render('tutors/postList', {posts,active,roleTutor});
}


exports.storeRequest = async (req, res, next) => {
    const tutorID = req.user.account_id; // maybe change when login complete
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

const isTutor = async (id) => {
    const test =  await models.tutor.findOne({
        where: {
            tutor_id: id,
        },
        raw: true,
    })
    return test != null && test.length != 0
}


