const Router = require('koa-router')
const workRouter = new Router()
const { create, list, coverInfo, detail, workpic, download } = require('../controller/mywork.controller')
const { picHandel } = require('../middleware/mywork.middleware')

workRouter.post('/mywork',create)
// workRouter.post('/mywork/uploadpic', picHandel)
workRouter.get('/mywork/:workId/cover/:filename', coverInfo)
workRouter.get('/myworks', list)
workRouter.post('/mywork/detail',detail)
workRouter.get('/work/images/:filename', workpic)
workRouter.get('/download',download)

module.exports = workRouter;