const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/:id?', userController.list);
router.post('/add', userController.save);
router.get('/delete/:id', userController.delete);

module.exports = router;