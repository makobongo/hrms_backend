var Hr = require('../models/hr');
var Role = require('../models/role');
var Organization = require('../models/organization');
var Job = require('../models/job');
var Benefit = require('../models/benefit');
var Department = require('../models/department');
var User = require('../models/user');
var async = require('async');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.hr_signup = (req, res, next) => {
    Hr.findOne({ username: req.body.username }, ( err, result) => {
        if (err) {
            res.status(500).json({
                msg: 'Error!'
            })
        }
        if (result) {
            res.status(409).json({
                msg: 'User already created!'
            })
        } else {
            var hr = new Hr({
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.email,
                email: req.body.password,
                password: req.body.password,
                role: req.body.role
            });
            hr.save()
            .then(() => {
                res.status(201).json({
                    msg: 'Success!'
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Could not save user!'
                })
            })
        }
    });
}
exports.hr_list = (req, res, next) => {
    Hr.find()
    // .populate('role')
    .sort([['last_name', 'ascending']])
    .exec((err, hr_lists)=> {
        if(err){
            return next(err)
        }
        // Success, so
        res.status(200).json({
            msg: hr_lists
        })
    })
}

exports.hr_detail = (req, res, next) => {
    async.parallel({
        hr: (callback) => {
            Hr.findById(req.params.id)
            .exec(callback)
        },
        hr_role: (callback) => {
            Role.find({'Role': req.params.id}, 'role')
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            res.status(500).json({
                msg: 'Error!'
            })
        }
        if(results.hr == 'null'){
            res.status(404).json({
                msg: 'No hr available'
            })
        }
        // Successful,
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_login = async (req, res, next) => {
    // checking if the if the user is already in the database
    const hr = await Hr.findOne({username: req.body.username});
    if(!hr){
        return res.status(401).json({
            msg: 'Account not established!'
        })
    } else {
        // validating to ensure password provided matches the one in the database
        const isValidPassword = await bcrypt.compare(req.body.password, hr.password);
        if(!isValidPassword){
            return res.status(401).json({
                msg: 'Wrong Username or Password!'
            })
        }
        // creating and assigning token
        const token  = jwt.sign({ _id: hr._id, username: hr.username }, process.env.TOP_SECRET);
        res.header('x-access-token', token).send(token);
        // res.status(200).json({
        //     msg: token
        // })
    }
}

exports.logged_in_hr = async (req, res, next) => {
    Hr.findById(req.user._id)
    .exec()
    .then(user => {
        res.status(200).json({
            msg: user
        })
    })
    .catch(err=> {
        res.status(500).json({
            msg: err
        })
    })
}

exports.hr_create_organization = (req, res, next) => {
    var organization = new Organization({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        address: req.body.address,
        created: req.body.created,
        vision: req.body.vision,
        mission: req.body.mission,
        user: req.user._id
    });
    organization.save()
    .then(response => {
        res.status(201).json({
            msg: 'Success',
            org: response
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error!'
        })
    })
}

exports.hr_organizations_list = (req, res, next) => {
    Organization.find({user: req.user._id})
    .exec((err, organizations_list) => {
        if(err){
            return next(err)
        }
        // Success
        res.status(200).json({
            msg: organizations_list
        })
    })
}

exports.hr_create_job = (req, res, next) => {
    var job = new Job({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        closing_date: req.body.closing_date,
        hr: req.user._id
    });
    job.save()
    .then(() => {
        res.status(201).json({
            msg: 'Success!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error!'
        })
    })
}

exports.hr_job_list = (req, res, next) => {
    Job.find()
    .populate('hr')
    // .sort[['name', 'ascending']]
    .exec()
    .then(jobs => {
        res.status(200).json({
            msg: jobs
        })
    })
    .catch(err => {
        res.status(500).json({
            msg: 'Error!'
        })
    })
}

exports.hr_job_view_detail = (req, res, next) => {
    async.parallel({
        job:(callback) => {
            Job.findById(req.params.id)
            .exec(callback)
        },
        job_creator: (callback) => {
            Hr.find({'hr': req.params._id}, 'username email')
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err)
        }
        // Successful
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_delete_job = (req, res, next) => {
    Job.findByIdAndDelete({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            msg: 'Successfully deleted!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error!'
        })
    })
}

exports.hr_update_job = (req, res, next) => {
    Job.findByIdAndUpdate({_id: req.params.id}, req.body)
    .exec()
    .then(() => {
        res.status(200).json({
            msg: 'Successul update!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error!'
        })
    })

}


exports.hr_create_department = (req, res, next) => {
    var department = new Department({
        name: req.body.name,
        description: req.body.description,
        hr: req.user._id
    })
    department.save()
    .then(() => {
        res.status(200).json({
            msg: 'Success'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error'
        })
    })
}

exports.hr_list_department = (req, res, next) => {
    Department.find()
    .populate('hr')
    .exec((err, results) => {
        if(err){
            return next(err)
        }
        //Successful
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_list_department_detail = (req, res, next) => {
    async.parallel({
        department: (callback) => {
            Department.findById({'_id': req.params.id}, 'name description')
            .exec(callback)
        },
        department_creator: (callback) =>{
            Hr.find({'hr': req.body.id}, 'username email')
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err)
        }
        // Successful
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_create_user = (req, res, next) => {
    var users = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        hr: req.user._id
    })
    users.save()
    .then(()=>{
        res.status(201).json({
            msg: 'Success!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error'
        })
    })
}

exports.hr_list_users = (req, res, next) => {
    User.find()
    .exec((err, results) => {
        if(err){
            return next(err)
        }
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_list_users_detail = (req, res, next) => {
    async.parallel({
        user:(callback) => {
            User.findById(req.params.id)
            .exec(callback)
        },
        user_creator: (callback) => {
            Hr.find({'hr': req.body.id}, 'username email')
            .exec(callback)
        },
        user_deparment: (callback) => {
            Department.find({'department': req.params.id}, 'name')
            .exec(callback)
        }
    }, function(err, results){
        if(err){
            return next(err)
        }
        //Successful
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_create_benefit = (req, res, next) => {
    var benefit = new Benefit({
        name: req.body.name,
        description: req.body.description,
        hr:req.user._id
    })
    benefit.save()
    .then(()=>{
        res.status(201).json({
            msg: 'Success'
        })
    })
    .catch(err=>{
        res.status(500).json({
            msg: 'Error!'
        })
    })
}

exports.hr_list_benefits = (req, res, next) => {
    Benefit.find()
    .populate('hr')
    .exec((err, results)=>{
        if(err){
            return next(err)
        }
        //Successful
        res.status(200).json({
            msg: results
        })
    })
}

exports.hr_list_benefit_detail = (req, res, next) => {
    async.parallel({
        benefit:(callback) => {
            Benefit.findById(req.params.id)
            .exec(callback)
        },
        benefit_creator:(callback) => {
            Hr.find({'hr': req.body.id}, 'username email created')
            .exec(callback)
        }
    }, function(err, results) {
        if (err) {
            return next(err)
        }
        // Successful
        res.status(200).json({
            msg: results
        })
    })
}
