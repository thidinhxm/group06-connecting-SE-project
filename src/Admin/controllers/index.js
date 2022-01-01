exports.index = (req, res, next) => {
    const active= {
        dashboard: true
    }
    res.render('index',{active});
}