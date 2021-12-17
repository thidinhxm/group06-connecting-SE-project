exports.list = (req, res, next) => {
    res.render('posts/postList');


}

exports.show = (req, res, next) => {
    res.render('posts/postDetail');
}

exports.create = (req, res, next) => {
    res.render('posts/createPost');
}


