//热点新闻接口
const Router = require('koa-router')
const { getHotNews } = require('../controller/hotnews.controller')

const hotNewsRouter = new Router({ prefix: '/hot' });

hotNewsRouter.get('/', getHotNews)

module.exports = hotNewsRouter;