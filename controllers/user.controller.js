const User = require('../dataBase/User');
const {userService} = require("../service");

async function getAll(req, res, next) {
    try {
        const users = await userService.findUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }

}

async function getByID(req, res, next) {
    try {
        const {user} = req;
        res.json(user);
    } catch (e) {
        next(e);
    }
}

async function updateUserByID(req, res, next) {
    try {
        const {id, name} = req.body;

        const user = await userService.updateOneUser();
        user.name = name;
        user.save();

        res.send('good')
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
}

async function deleteUserByID(req, res, next) {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id})

        res.send(`Deleted User with id - ${id}`)
    } catch (e) {
        next(e);
    }
}


module.exports = {
    getAll,
    getByID,
    updateUserByID,
    createUser,
    deleteUserByID
}