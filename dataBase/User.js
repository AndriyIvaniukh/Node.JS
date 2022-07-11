const {Schema, model} = require('mongoose');
const {comparePassword} = require("../service/password.service");

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

UserSchema.methods = {
    async comparePasswords(password) {
        await comparePassword(password, this.password);
    }
}

UserSchema.statics = {
    createWithHashPassword: async function (userToSave) {
        const hashedPassword = await passwordService.hashPassword(userToSave.password);

        return this.create({...userToSave, password: hashedPassword})
    }
}

module.exports = model('user', UserSchema);