const active = { dashboard: true }

exports.index = (req, res) => {
    res.render('index',{active});
}