var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    address: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    vision: {
        type: String
    },
    mission: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'Hr',
        required: true
    }
})

module.exports = mongoose.model('Organization', OrganizationSchema);