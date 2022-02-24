const express = require('express');
const userRouter = express.Router();
const { getUsers, getUserById, createUser, updateUser, updateUserAvatar } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', express.json(), createUser);
userRouter.patch('/me', express.json(), updateUser);
userRouter.patch('/me/avatar', express.json(), updateUserAvatar);


module.exports = userRouter;