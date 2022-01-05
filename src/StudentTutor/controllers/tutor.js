const postService = require('../services/post');
const {models} = require('../models');
const active = { tutor: true }
exports.sendRequest = function(req, res, next) {

    res.render('tutors/request');
}

exports.listPost = async function(req, res, next) {
    const Listposts = await postService.listPosts(); 
    //posts đã đọc chưa giao
    const posts_ = Listposts.filter(e => {
        return e.status.includes('Chưa giao');
    });
    const subjectSearch = req.query.query; 
    if(subjectSearch != null) {
        const posts = posts_.filter(e =>{
            return e.subject.toUpperCase().includes(subjectSearch.toUpperCase());
        })
        res.render('tutors/postList', {posts,active});
    }
    else{
        //post_ là post là lọc status chưa giao
        const posts = posts_
        res.render('tutors/postList', {posts,active});
    }
}

exports.storeRequest = async (req, res, next) => {
    const tutorID = req.user.account_id;
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


