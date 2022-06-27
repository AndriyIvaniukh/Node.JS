const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const {commonMiddleware, userMiddleware} = require("../middlewares");

userRouter.get('/', userController.getAll);
userRouter.post('/', userMiddleware.isUserValidForCreate, userController.createUser);

userRouter.get('/:id', commonMiddleware.isIdValid, userMiddleware.isUserPresent,  userController.getByID);
userRouter.put('/:id', commonMiddleware.isIdValid, userMiddleware.checkUserOnUpdate, userController.updateUserByID);
userRouter.delete('/:id', commonMiddleware.isIdValid, userController.deleteUserByID);

module.exports = userRouter;
