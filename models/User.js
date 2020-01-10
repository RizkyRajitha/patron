const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
    // type: {
    //     type: String,
    //     required: true,
    //     default: 'Requester'
    // }
});


//DB collection name
module.exports = mongoose.model('User', UserSchema);