const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.get('/', postController.list);
// router.get('/edit', postController.edit);

router.get('/edit', postController.show);

router.get('/create', postController.create);

module.exports = router;