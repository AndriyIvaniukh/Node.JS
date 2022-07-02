const customError = require('../errors/CustomError');
const {checkAccessToken, checkRefreshToken} = require("../service/token.service");
const {OAuth} = require("../dataBase");
const {tokenService} = require("../service");

module.exports = {
    checkAccessToken: async (req,res,next) => {
        try{
            const authToken = req.get('Authorization');
            if(!authToken){
                return next(new customError('No token', 401))
            }
            checkAccessToken(authToken);

            const tokenInfo = OAuth.findOne({access_token: authToken}).populate('userId');

            if(!tokenInfo){
                return next(new customError('Token not valid', 401))
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    checkRefreshToken: async (req,res,next) => {
        try{
            const authToken = req.get('Authorization');

            if(!authToken){
                return next(new customError('No token', 401));
            }

            checkRefreshToken(authToken)

            const tokenInfo = await OAuth.findOne({refresh_token: authToken}).populate('userId');

            if(!tokenInfo){
                return next(new customError('Token not valid', 401))
            }

            req.user = tokenInfo.userId;
            await tokenService.deleteTokensByID(tokenInfo._id);

            next()
        }catch (e){
            next(e)
        }
    }

}