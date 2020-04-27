var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    role: { type: String, required: true, min: 3, max: 100, default: 'user' }
});

module.exports = mongoose.model('Role', RoleSchema);