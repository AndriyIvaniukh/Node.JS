const jwt = require('jsonwebtoken');

const customError = require('../errors/CustomError');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACTION_TOKEN_SECRET} = require("../config/configs");
const {OAuth} = require("../dataBase");
const {tokenTypeEnum} = require("../enums");
const {FORGOT_PASSWORD} = require("../enums/email-action.enum");

function generateAuthToken(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

    return {
        access_token,
        refresh_token,
    }
}

function verifyToken(token = '', tokenType = tokenTypeEnum.ACCESS) {
    try {
        let secret;

        if(tokenType === tokenTypeEnum.ACCESS){secret = ACCESS_TOKEN_SECRET};
        if(tokenType === tokenTypeEnum.REFRESH){secret = REFRESH_TOKEN_SECRET};
        if(tokenType === tokenTypeEnum.ACTION){secret = ACTION_TOKEN_SECRET};

        return jwt.verify(token, secret);
    } catch (e) {
        throw new customError("Token is not valid", 401);
    }
}

function deleteTokensByID(params){
    return OAuth.deleteOne(params);
}

function generateActionToken(actionType, payload={}){
    let secretWord = '';
    let expiresIn = '7d';

    switch (actionType){
        case FORGOT_PASSWORD:{
            secretWord = ACTION_TOKEN_SECRET;
            break;
        }

        default:
            throw new customError('Wrong action type', 500);
    }

    return jwt.sign(payload, secretWord,{expiresIn});
}

module.exports = {
    verifyToken,
    generateActionToken,
    generateAuthToken,
    deleteTokensByID,
}