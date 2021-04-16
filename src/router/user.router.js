const Router = require('koa-router')

const userRouter = new Router({ prefix: '/users' });

const { createUser, avatarInfo, getUserInfo, getUserLike, getUserUnread } = require('../controller/user.controller')

const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const {
    verifyAuth,
} = require('../middleware/auth.middleware')

userRouter.post('/', verifyUser, handlePassword, createUser) //注册

userRouter.get('/info', verifyAuth, getUserInfo) //获取用户信息

userRouter.get('/:userId/avatar/:filename', avatarInfo)

userRouter.get('/likes', verifyAuth, getUserLike)

userRouter.get('/unread', verifyAuth, getUserUnread)

module.exports = userRouter;