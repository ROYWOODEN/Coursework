const express = require('express');
// const { route } = require('./games');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/reg', userController.registerUser);

module.exports = router;