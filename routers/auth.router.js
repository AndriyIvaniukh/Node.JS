const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

authRouter.post('/login', userMiddleware.isUserPresentByEmail, authController.login);
authRouter.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = authRouter;