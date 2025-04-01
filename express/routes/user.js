const express = require('express');
// const { route } = require('./games');

const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/reg', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/user', authMiddleware.authMiddleware, userController.getUserData);

module.exports = router;