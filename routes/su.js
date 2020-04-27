var express = require('express');
var router = express.Router();
var su = require('../controllers/suController')

router.post('/signup', su.signup);

module.exports = router;
