const express = require('express');

const router = express.Router();

const searchController = require('../controller/searchController');


router.get('/search/:title', searchController.searchHome);
router.post('/search/favourites/:title', searchController.searchFavourites);

module.exports = router;