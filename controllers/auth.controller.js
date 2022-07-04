const {generateAuthToken} = require("../service/token.service");
const {passwordService, tokenService} = require("../service");
const {userPresenter} = require("../presenters/user.presenter");
const {OAuth} = require("../dataBase");
const {constants} = require("../config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: HashPassword, _id} = req.user
            const {password} = req.body;

            await passwordService.comparePassword(password, HashPassword);

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
        try{
            const access_token = req.get(constants.AUTHORIZATION);
            await OAuth.deleteOne({access_token});

            res.status(201).json('user was logout');
        }catch (e) {
            next(e)
        }
    }
}