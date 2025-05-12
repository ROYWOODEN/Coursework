const express = require('express');

const router = express.Router();

const BasketController = require('../controller/basketController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/basket', authMiddleware.authMiddleware, BasketController.GetBasketGames);
router.get('/basket/check/:id_game', authMiddleware.authMiddleware, BasketController.CheckBasketGames);

router.post('/basket/add', authMiddleware.authMiddleware, BasketController.AddBasketGames);
router.delete('/basket/del/:id_game', authMiddleware.authMiddleware, BasketController.DelBasketGames);


module.exports = router;