var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    hr: {type:Schema.Types.ObjectId, ref:'Hr', required: true}
});

module.exports = mongoose.model('Department', DepartmentSchema);