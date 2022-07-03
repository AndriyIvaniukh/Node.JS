const {generateAuthToken} = require("../service/token.service");
const {passwordService, tokenService} = require("../service");
const {userPresenter} = require("../presenters/user.presenter");
const {OAuth} = require("../dataBase");

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
    }
}