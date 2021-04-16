const Router = require('koa-router')
const workRouter = new Router()
const { mywork } = require('../controller/mywork.controller')

workRouter.get('/mywork', mywork)

module.exports = workRouter;