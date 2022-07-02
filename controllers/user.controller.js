const {userService, passwordService} = require("../service");
const {userPresenter} = require("../presenters/user.presenter");

async function getAll(req, res, next) {
    try {
        const users = await userService.findUsers(req.query).exec();
        const usersForResponse = users.map(user => userPresenter(user));
        res.json(usersForResponse);
    } catch (e) {
        next(e);
    }

}

async function getByID(req, res, next) {
    try {
        const {user} = req;
        const userForResponse = userPresenter(user);
        res.json(userForResponse);
    } catch (e) {
        next(e);
    }
}

async function updateUserByID(req, res, next) {
    try {
        const {id} = req.params;
        const updatedUser = await userService.updateOneUser({_id: id}, req.body);
        const userForResponse = userPresenter(updatedUser);
        res.status(201).send(userForResponse);
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        const hashedPassword = await passwordService.hashPassword(req.body.password);
        const newUser = await userService.createUser({...req.body, password: hashedPassword})
        const userForResponse = userPresenter(newUser);
        res.status(201).json(userForResponse);
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