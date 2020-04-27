var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SuSchema = new Schema({
    username: { type: String},
    email: { type: String},
    password: { type: String},
    phone: {type:String}
});

module.exports = mongoose.model('Su', SuSchema);