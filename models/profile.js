var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    personal_info: {type:String, required: true},
    experience: [{type:String, required:true}],
    education: [{type:String, required:true}],
    education: [{type:String, required:true}],
    resume: [{type:String, required:true}],
    User: {type:Schema.Types.ObjectId, ref:'User', required: true}
})

module.exports = mongoose.model('Profile', ProfileSchema);