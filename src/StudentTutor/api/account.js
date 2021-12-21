const accountService = require('../services/account');
const bcrypt = require('bcrypt');
exports.checkAccount = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const account = await accountService.getUserByEmail(email, password);
        if (account && bcrypt.compareSync(password, account.password)) {
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