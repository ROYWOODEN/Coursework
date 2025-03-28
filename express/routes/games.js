const express = require('express');

const router = express.Router();
const gameController = require('../controller/gameController')

router.get('/games', gameController.getAllGames);

module.exports = router;