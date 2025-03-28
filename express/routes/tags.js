const express = require('express');

const router = express.Router();
const tagController = require('../controller/tagController')

router.get('/tags', tagController.getAllTags);
router.post('/addTag', tagController.addTag);


module.exports = router;