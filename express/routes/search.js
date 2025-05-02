const express = require('express');

const router = express.Router();

const searchController = require('../controller/searchController');


router.get('/search/:title', searchController.searchItems);

module.exports = router;