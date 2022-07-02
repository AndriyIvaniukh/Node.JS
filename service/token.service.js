const jwt = require('jsonwebtoken');

const customError = require('../errors/CustomError');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../config/configs");
const {OAuth} = require("../dataBase");

function generateAuthToken(payload = {}) {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return {
        access_token,
        refresh_token,
    }
}

function checkAccessToken(access_token = '') {
    try {
        return jwt.verify(access_token, ACCESS_TOKEN_SECRET);
    } catch (e) {
        throw new customError("Token is not valid", 401);
    }
}

function checkRefreshToken(refresh_token = ''){
    try {
        return jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
    }catch (e) {
        throw new customError('Token is not valid', 401)
    }
}

function deleteTokensByID(params){
    return OAuth.deleteOne(params);
}

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    generateAuthToken,
    deleteTokensByID,
}