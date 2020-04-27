var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    first_name: {type:String, required: true, max:100},
    last_name: {type:String, required: true, max:100},
    phone: { type:String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true, default:'password123'},
    hr: {type:Schema.Types.ObjectId, ref:'User', required: true},
    department: [{ type: Schema.Types.ObjectId, ref: 'Department', required: true, default: null}]
})

//pre hook method
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next();
})

module.exports = mongoose.model('User', UserSchema);