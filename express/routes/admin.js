const express = require('express');

const router = express.Router();
const adminController = require('../controller/adminController');


router.get('/admin/edit/:id_game', adminController.GetEditGames);
router.put('/admin/edit/:id_game', adminController.EditGames);
router.delete('/admin/edit/tags/:id_game', adminController.EditTagsDel);
router.post('/admin/edit/tags', adminController.EditTagsAdd);

module.exports = router;