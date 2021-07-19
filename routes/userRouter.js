const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id?', userController.list);
router.post('/save', userController.save);
router.get('/delete/:id', userController.delete);


module.exports = router;