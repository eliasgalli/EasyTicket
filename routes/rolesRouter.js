const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


router.get('/:id?', roleController.list)
router.post('/save', roleController.save)
router.get('/delete/:id', roleController.delete)

module.exports = router;