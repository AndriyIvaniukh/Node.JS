const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getByID);
userRouter.put('/', userController.updateUserByID);
userRouter.post('/', userController.createUser);
userRouter.delete('/:id', userController.deleteUserByID);

module.exports = userRouter;
