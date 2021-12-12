const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');

router.get('/profile', accountController.profile);

router.get('/login', accountController.login);

module.exports = router;