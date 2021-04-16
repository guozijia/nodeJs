const Router = require('koa-router')
const momentRouter = new Router({ prefix: '/moment' })

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const { verifyLabel } = require('../middleware/label.middleware')

const {
    create,
    detail,
    list,
    update,
    remove,
    addlabels,
    fileInfo,
    like
} = require('../controller/moment.controller')

momentRouter.post('/', verifyAuth, create)

momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

//给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabel, addlabels)

//动态配图的服务
momentRouter.get('/images/:filename', fileInfo)

//点赞功能
momentRouter.get('/like/:momentId', verifyAuth,  like)

module.exports = momentRouter;