const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');


router.get('/:ticketId', responseController.list);
router.post('/save', responseController.save);
router.get('/delete/:id', responseController.delete);

module.exports = router;