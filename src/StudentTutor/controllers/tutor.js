
exports.sendRequest = function(req, res, next) {
    res.render('tutors/request');
}

exports.listPost = function(req, res, next) {
    res.render('tutors/postList');
}
