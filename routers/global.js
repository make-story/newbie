const path = require('path'); 
const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
    response.render('index.html');
});
router.get('/detail', function(request, response) {
    response.render('detail.html');
});

module.exports = router;
