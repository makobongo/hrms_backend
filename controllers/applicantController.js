var Applicant = require('../models/applicant');

exports.applicant_signup = (req, res, next) => {
    var applicant = new Applicant({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        personal_info: req.body.personal_info,
        experience: req.body.experience,
        education: req.body.education,
        resume: req.body.resume,
        reference: req.body.reference
    })
    applicant.save()
    .then( () => {
        res.status(201).json({
            msg: 'Success!'
        })
    })
    .catch(err => {
        res.status(500).json({
            msg: 'Sorry! error while creating account'
        })
    })
}