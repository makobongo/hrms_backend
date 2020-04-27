var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    location:{type:String, required: true},
    closing_date: {type:String, required: true},
    hr: {type:Schema.Types.ObjectId, ref:'Hr', required: true}
});

module.exports = mongoose.model('Job', JobSchema);