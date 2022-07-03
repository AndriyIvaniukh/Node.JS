const customError = require('../errors/CustomError');
const {verifyToken} = require("../service/token.service");
const {OAuth} = require("../dataBase");

module.exports = {
    checkAccessToken: async (req,res,next) => {
        try{
            const authToken = req.get('Authorization');
            if(!authToken){
                return next(new customError('No token', 401))
            }
            verifyToken(authToken);

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

            verifyToken(authToken, 'refresh')

            const tokenInfo = await OAuth.findOne({refresh_token: authToken});

            if(!tokenInfo){
                return next(new customError('Token not valid', 401))
            }

            req.tokenInfo = tokenInfo;
            next()
        }catch (e){
            next(e)
        }
    }

}