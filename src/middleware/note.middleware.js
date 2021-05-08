const Jimp = require('jimp')
const Multer = require('koa-multer')
const path = require('path')



const notePicUpload = Multer({
    dest: './uploads/note'
})
const notePicHandel = notePicUpload.array('notePic', 12);

module.exports = { notePicHandel };