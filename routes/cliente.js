const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.send('holaaaaa');
})


module.exports = router;