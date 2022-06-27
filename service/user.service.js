const User = require('../dataBase/User');
module.exports = {
    findUsers: (params = {}) => {
        return User.find(params);
    },
    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user)
    },
    updateOneUser: () => {

    },
    deleteOneUser: () => {

    }
}