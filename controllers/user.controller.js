const {userService, passwordService} = require("../service");

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
        const {id} = req.params;
        const updatedUser = await userService.updateOneUser({_id: id}, req.body);
        res.status(201).send(updatedUser);
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        const hashedPassword = await passwordService.hashPassword(req.body.password);
        const newUser = await userService.createUser({...req.body, password: hashedPassword})
        res.status(201).json(newUser);
    } catch (e) {
        next(e);
    }
}

async function deleteUserByID(req, res, next) {
    try {
        const {id} = req.params;
        await userService.deleteOneUser({_id: id});
        res.status(201).json(`Deleted User with id - ${id}`);
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