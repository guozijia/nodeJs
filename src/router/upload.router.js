const Router = require('koa-router')

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const {
    avatarHandel,
    picHandel,
    picResize
} = require('../middleware/upload.middleware')

const {
    saveAvatar,
    savePicInfo
} = require('../controller/upload.controller')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/avatar', verifyAuth, avatarHandel, saveAvatar)// 上传头像
uploadRouter.post('/pic', verifyAuth, picHandel, picResize, savePicInfo) //上传多个

module.exports = uploadRouter; 