const Router = require('koa-router')

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const {
    avatarHandel,
    picHandel,
    coverHandel,
    workPicHandel,
    picResize,
    workPicResize
} = require('../middleware/upload.middleware')

const {
    saveAvatar,
    savePicInfo,
    saveCover,
    saveWorkPic
} = require('../controller/upload.controller')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/avatar', verifyAuth, avatarHandel, saveAvatar)// 上传头像
uploadRouter.post('/pic', verifyAuth, picHandel, picResize, savePicInfo) //上传多个

uploadRouter.post('/cover', verifyAuth, coverHandel, saveCover)
uploadRouter.post('/workPic', verifyAuth, workPicHandel, workPicResize,saveWorkPic)

module.exports = uploadRouter;