const express = require('express');

const router = express.Router();
const gameController = require('../controller/gameController')

router.get('/games', gameController.getAllGames);
router.post('/addGame', gameController.AddGames);
router.delete('/admin/del/:id_game', gameController.delGames);
router.get('/games/:id/tags', gameController.getGameTags);

module.exports = router;