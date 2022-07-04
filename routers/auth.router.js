const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    userMiddleware.isUserPresentByEmail,
    authController.login);
authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);
authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

module.exports = authRouter;