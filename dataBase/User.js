const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    age:{
        type: Number,
        default: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = model('user', UserSchema);