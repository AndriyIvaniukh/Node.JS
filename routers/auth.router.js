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
authRouter.post('/logoutAllDevice',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevice);
authRouter.post('/forgotPassword',
    authMiddleware.isEmailValid,
    userMiddleware.isUserPresentByEmail,
    authController.forgotPassword);

module.exports = authRouter;