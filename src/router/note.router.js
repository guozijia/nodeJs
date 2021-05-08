const Router = require('koa-router')
const noteRouter = new Router({ prefix: '/note' })
const { list, create, saveNotePic, fileInfo } = require('../controller/note.controller')
const { notePicHandel } = require('../middleware/note.middleware')

noteRouter.get('/', list)
noteRouter.post('/create', create)
noteRouter.post('/upload/images', notePicHandel, saveNotePic)
noteRouter.get('/image/:filename', fileInfo)

module.exports = noteRouter;