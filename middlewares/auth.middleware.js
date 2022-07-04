const customError = require('../errors/CustomError');
const {verifyToken} = require("../service/token.service");
const {OAuth} = require("../dataBase");
const {authValidator} = require("../validators");
const {tokenTypeEnum} = require("../enums");
const {constants} = require("../config");

module.exports = {
    checkAccessToken: async (req,res,next) => {
        try{
            const authToken = req.get(constants.AUTHORIZATION);
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
            const authToken = req.get(constants.AUTHORIZATION);

            if(!authToken){
                return next(new customError('No token', 401));
            }

            verifyToken(authToken, tokenTypeEnum.REFRESH)

            const tokenInfo = await OAuth.findOne({refresh_token: authToken});

            if(!tokenInfo){
                return next(new customError('Token not valid', 401))
            }

            req.tokenInfo = tokenInfo;
            next()
        }catch (e){
            next(e)
        }
    },

    isLoginBodyValid: async (req,res,next) =>{
        try{
            const {error, value} = authValidator.login.validate(req.body);

            if(error){
                return next(new customError("Email or password is wrong", 400))
            }

            req.body = value;
            next()
        }catch (e) {
            next(e)
        }
    },

}