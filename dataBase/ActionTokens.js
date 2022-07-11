const {Schema, model} = require('mongoose');

const actionTypes = require('../enums/email-action.enum')
const ActionTokenSchema = new Schema({
    userId:{
        type: String,
        ref: 'user',
        require: true,
    },
    actionToken:{
        type: String,
        require: true
    },
    actionTypes:{
        type:String,
        enum: Object.values(actionTypes),
        require:true
    }

}, {timestamps: true});

module.exports = model('action-tokens', ActionTokenSchema);