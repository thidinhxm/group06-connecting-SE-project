const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const requestController = require('../controllers/request');

router.get('/:id', auth.isLoggedIn, requestController.RequestDetail);
router.get('/', auth.isLoggedIn, requestController.RequestList);

module.exports = router;