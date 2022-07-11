const {generateAuthToken} = require("../service/token.service");
const {passwordService, tokenService, emailService} = require("../service");
const {userPresenter} = require("../presenters/user.presenter");
const {OAuth, ActionTokens, Users} = require("../dataBase");
const {WELCOME, FORGOT_PASSWORD} = require("../enums/email-action.enum");
const {emailActionEnum} = require("../enums");
const {ACTION_TOKEN_SECRET} = require("../config/configs");
const {hashPassword} = require("../service/password.service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: HashPassword, _id, name} = req.user
            const {password} = req.body;

            await emailService.sendMail('andriyivaniukh@gmail.com', WELCOME, {name});

            await req.user.comparePasswords(password);
            // await passwordService.comparePassword(password, HashPassword);

            const userForPresents = userPresenter(req.user);
            const tokens = generateAuthToken();

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({
                user: userForPresents,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token, userId} = req.tokenInfo;

            const tokens = tokenService.generateAuthToken();
            await tokenService.deleteTokensByID({refresh_token});

            await OAuth.create({userId, ...tokens})
            res.json({...tokens})
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            // const access_token = req.get(constants.AUTHORIZATION);
            const {access_token, userId} = req.userInfo;
            const {email, name} = userId

            await OAuth.deleteOne({access_token});

            await emailService.sendMail(email, emailActionEnum.LOGOUT, {name, count: 1});

            res.status(201).json('user was logout');
        } catch (e) {
            next(e)
        }
    },

    logoutAllDevice: async (req, res, next) => {
        try {
            const {email, name, _id} = req.userInfo.userId;

            const {deletedCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionEnum.LOGOUT, {name, count: deletedCount});


            res.status(201).json('user was logout')
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {email, name, _id} = req.user;

            await OAuth.deleteMany({userId: _id});

            const actionToken = await tokenService.generateActionToken(FORGOT_PASSWORD);

            await ActionTokens.create({userId: _id, actionToken, actionType: FORGOT_PASSWORD});

            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {name, actionToken});

            res.status(201).json('Email for reset password was sanded')
        } catch (e) {
            next(e)
        }
    },

    setNewPassword: async (req,res,next)=>{
        try{
            const {password, user} = req.body;

            const hashedPassword = await hashPassword(password);

            await Users.updateOne({_id: user.userId}, {password: hashedPassword});

            res.status(201).json('Password was changed')
        }catch (e) {
            next(e)
        }
    }
}