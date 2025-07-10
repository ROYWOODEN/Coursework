const express = require('express');

const router = express.Router();

const searchController = require('../controller/searchController');

const authMiddleware = require('../middleware/authMiddleware');


router.get('/search/:title', searchController.searchHome);
router.get('/search/favourites/:title', authMiddleware.authMiddleware, searchController.searchFavourites);

module.exports = router;