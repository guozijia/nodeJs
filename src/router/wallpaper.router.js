//壁纸接口
const Router = require('koa-router')
const { wallpaper } = require('../controller/wallpaper.controller')

const wallpaperRouter = new Router({ prefix: '/wallpaper' });

wallpaperRouter.get('/', wallpaper)

module.exports = wallpaperRouter;