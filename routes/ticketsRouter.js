const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


router.get('/:id?', ticketController.list);
router.post('/save', ticketController.save);
router.get('/delete/:id', ticketController.delete);

module.exports = router;