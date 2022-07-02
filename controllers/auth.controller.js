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

    refresh: async (req,res,next)=>{
        try {
            const {user} = req;
            const tokens = tokenService.generateAuthToken();
            await OAuth.create({
                userId:user._id,
                ...tokens
            })
            res.json({
                user: userPresenter(user),
                ...tokens
            })
        }catch (e) {
            next(e)
        }
    }
}