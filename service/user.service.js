const {Users} = require('../dataBase');

module.exports = {
    findUsers: (params = {}) => {
        return Users.find(params);
    },
    findOneUser: (params = {}) => {
        return Users.findOne(params);
    },
    createUser: (user) => {
        return Users.create(user)
    },
    updateOneUser: (params, userData, options = {new:true}) => {
        return Users.findOneAndUpdate(params, userData, options)
    },
    deleteOneUser: (params) => {
        return Users.deleteOne(params);
    }
}