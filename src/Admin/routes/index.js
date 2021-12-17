const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const auth = require('../middlewares/auth');

router.get('/', auth.isLogin, indexController.index);

module.exports = router;
