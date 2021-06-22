const express = require('express');
const router = express.Router();
const userRolesController = require('../controllers/userRolesController');


router.get('/', userRolesController.list)
router.post('/save', userRolesController.save)
router.get('/delete/:id', userRolesController.delete)

module.exports = router;