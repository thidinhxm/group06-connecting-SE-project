const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postController = require('../controllers/post');

router.get('/create', auth.isLogin, postController.create);

router.get('/',auth.isLogin, postController.list);

router.get('/edit/:postID',auth.isLogin, postController.show);
router.post('/edit/:postID',auth.isLogin, postController.edit);
router.post('/create',auth.isLogin, postController.createPost);

module.exports = router;
