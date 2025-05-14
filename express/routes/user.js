const express = require('express');
// const { route } = require('./games');

const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const FavouritesControllet = require('../controller/FavouritesController');



router.post('/reg', upload.single('avatar'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/user', authMiddleware.authMiddleware, userController.getUserData);


router.post('/favourites', authMiddleware.authMiddleware, FavouritesControllet.AddGamesFavorite);
router.delete('/favourites/del/:id', authMiddleware.authMiddleware, FavouritesControllet.DelGamesFavorite);
router.get('/favourites/games', authMiddleware.authMiddleware, FavouritesControllet.GetGamesFovorite);
router.get('/favourites/check/:id_game', authMiddleware.authMiddleware, FavouritesControllet.CheckGamesFavorite);

module.exports = router;