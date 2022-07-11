const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");
const {ACTION} = require("../enums/token-types.enum");

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
authRouter.post('/forgotPassword/set',
    authMiddleware.checkActionToken(ACTION),
    authMiddleware.isPasswordValid,
    authController.setNewPassword
);

module.exports = authRouter;