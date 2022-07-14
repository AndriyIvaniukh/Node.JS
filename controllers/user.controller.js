const {userService, emailService, smsService, awsService} = require("../service");
const {userPresenter} = require("../presenters/user.presenter");
const {emailActionEnum, smsActionEnum} = require("../enums");
const {Users} = require("../dataBase");
const {smsTemplateBuilder} = require("../common");
const {uploadFine} = require("../service/aws.service");
const {findUsers} = require("../service/user.service");

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

        const user = await userService.findOneUser({_id: id})

        // Delete avatar from AWS
        const fileName = user.avatar.split('/').pop();
        await awsService.deleteFile(fileName, 'user', user._id);

        const bodyForUpdate = {...req.body, avatar: ''};
        const updatedUser = await userService.updateOneUser({_id: id}, bodyForUpdate, {new: true});

        const userForResponse = userPresenter(updatedUser);
        res.status(201).send(userForResponse);
    } catch (e) {
        next(e);
    }
}

async function createUser(req, res, next) {
    try {
        const {email, password, name, phone} = req.body;

        // const hashedPassword = await passwordService.hashPassword(password);
        // const newUser = await userService.createUser({...req.body, password: hashedPassword})

        let newUser = await Users.createWithHashPassword(req.body);

        const {Location} = await uploadFine(req.files.avatar, 'user', newUser._id);

        const newUserWithAvatar = await Users.findOneAndUpdate({_id: newUser._id}, {avatar: Location}, {new: true});

        await emailService.sendMail(email, emailActionEnum.WELCOME, {name})

        const message = smsTemplateBuilder[smsActionEnum.WELCOME]({name});
        // await smsService.sendSMS('+380982759659', message);
        await smsService.sendSMS(phone, message);

        const userForResponse = userPresenter(newUserWithAvatar);
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