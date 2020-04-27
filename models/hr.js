var mongoose = require('mongoose')
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var HrSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        max: 100, 
        unique: true
    },
    first_name: {
        type:String, 
        required: true, 
        max:100
    },
    last_name: {
        type:String, 
        required: true, 
        max:100
    },
    phone: {
        type:String, 
        required: true, 
        unique: true
    },
    email: {
        type:String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true}]
})
// pre hook methods, is called and hashes the password
HrSchema.pre('save', async function(next) {
    // refering the current hr about to be saved 
    // this refers to the user being created
    const hr = this;
    const hash = await bcrypt.hash(this.password, 10);
    // replacing plain text password and then store it
    this.password = hash
    // indicated we are done and moves to the next middleware
    next()
})

module.exports = mongoose.model('Hr', HrSchema);