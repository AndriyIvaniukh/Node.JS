const jwt = require('jsonwebtoken');

const customError = require('../errors/CustomError');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../config/configs");
const {OAuth} = require("../dataBase");
const {tokenTypeEnum} = require("../enums");

function generateAuthToken(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return {
        access_token,
        refresh_token,
    }
}

function verifyToken(access_token = '', tokenType = tokenTypeEnum.ACCESS) {
    try {
        let secret;

        if(tokenType === tokenTypeEnum.ACCESS){secret = ACCESS_TOKEN_SECRET};
        if(tokenType === tokenTypeEnum.REFRESH){secret = REFRESH_TOKEN_SECRET};

        return jwt.verify(access_token, secret);
    } catch (e) {
        throw new customError("Token is not valid", 401);
    }
}

function deleteTokensByID(params){
    return OAuth.deleteOne(params);
}

module.exports = {
    verifyToken,
    generateAuthToken,
    deleteTokensByID,
}