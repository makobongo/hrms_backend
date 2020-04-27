var express = require('express');
var router = express.Router();
var signup = require('../controllers/applicantController')

router.post('/signup', signup.applicant_signup);

module.exports = router;
