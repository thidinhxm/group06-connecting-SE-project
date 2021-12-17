const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');
const auth = require('../middlewares/auth');

router.get('/', auth.isLogin, postController.list);
// router.get('/edit', postController.edit);

router.get('/edit', auth.isLogin, postController.show);

router.get('/create', auth.isLogin, postController.create);

module.exports = router;