var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApplicantSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type:String, required:true},
    personal_info: {type:String},
    experience: [{type:String}],
    education: [{type:String}],
    resume: [{type:String}],
    reference: [{type:String}]
});

module.exports = mongoose.model('Applicant', ApplicantSchema);