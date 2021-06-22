const express = require('express');
const router = express.Router();
const userRolesController = require('../controllers/userRoleController');


router.get('/:user?/:customer?', userRolesController.list)
router.post('/save', userRolesController.save)
router.get('/delete/:id', userRolesController.delete)

module.exports = router;