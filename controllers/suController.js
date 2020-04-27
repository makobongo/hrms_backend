// var Su = require('../models/su');

// exports.sign_up = (res, req, next) => {
//     res.status(200).json({
//         msg: 'success!'
//     })
    // var su = new Su({
    //     username: req.body.email,
    //     email: req.body.email,
    //     password: req.body.password,
    //     phone: req.body.phone
    // });
    // su.save()
    // .then(() => {
    //     res.status(201).json({
    //         msg: 'Success!'
    //     })
    // })
    // .catch(err => {
    //     res.status(500).json({
    //         msg: 'Error! could not create account'
    //     })
    // })
// }
var Su = require('../models/su');

exports.signup = (req, res, next) => {
    var applicant = new Su({
        username: req.body.email,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
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