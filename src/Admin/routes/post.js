const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.get('/create', postController.create);

router.get('/', postController.list);

router.get('/:id', postController.show);
router.post('/create', postController.createPost);

module.exports = router;
