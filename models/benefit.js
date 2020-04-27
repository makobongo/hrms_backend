var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var BenefitSchema = new Schema({
    name: {type: String, required: true},
    description: {type:String, required:true},
    hr:{type:Schema.Types.ObjectId, ref:'Hr', required:true},
    created: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Benefit', BenefitSchema);