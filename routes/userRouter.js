const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/:id?', userController.list);
router.post('/save', userController.save);
router.get('/delete/:id', userController.delete);
router.post('/login', userController.login)

module.exports = router;