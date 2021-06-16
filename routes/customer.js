const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');


router.get('/', customerController.list)
router.post('/add', customerController.add)
router.get('/delete/:id', customerController.delete)

module.exports = router;