const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');


router.get('/:id?', customerController.list)
router.post('/save', customerController.save)
router.get('/delete/:id', customerController.delete)

module.exports = router;