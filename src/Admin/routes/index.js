const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const indexController = require('../controllers/index');

router.get('/', auth.isLogin, indexController.index);

module.exports = router;
