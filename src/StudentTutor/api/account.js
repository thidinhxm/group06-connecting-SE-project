const accountService = require('../services/account');

exports.checkExistAccount = async (req, res, next) => {
    try {
        const {email} = req.body;
        const account = await accountService.getAccountByEmail(email);
        if (account) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    }
    catch (err) {
        next(err);
    }
}