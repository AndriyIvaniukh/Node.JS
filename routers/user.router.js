const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");

userRouter.get('/',
    userMiddleware.isUserQueryValid,
    userController.getAll);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUniq,
    userController.createUser);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getByID);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    authMiddleware.checkAccessToken,
    userController.updateUserByID);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    authMiddleware.checkAccessToken,
    userController.deleteUserByID);

module.exports = userRouter;
