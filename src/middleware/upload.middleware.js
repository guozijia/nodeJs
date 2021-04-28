const Jimp = require('jimp')
const Multer = require('koa-multer')
const path = require('path')

const avatarUpload = Multer({
    dest: './uploads/avatar'
})
const avatarHandel = avatarUpload.single('avatar');

const coverUpload = Multer({
    dest: './uploads/covers'
})
const coverHandel = coverUpload.single('cover');

const picUpload = Multer({
    dest: './uploads/picture'
})
const picHandel = picUpload.array('picture', 9); //最多9张

const workPicUpload = Multer({
    dest: './uploads/myworks'
})
const workPicHandel = workPicUpload.array('mywork', 12);

// 图片处理
const picResize = async (ctx, next) => {
    // 获取所有文件信息
    const files = ctx.req.files
 
    // 处理文件（sharp/jimp）  jimp 比较小
    for (let file of files) {
        const desPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then(image => {
            const { width, height } = image.bitmap
            image.resize(1280, Jimp.AUTO).write(`${desPath}-large`) //写入文件 
            image.resize(640, Jimp.AUTO).write(`${desPath}-middle`)
            image.resize(320, Jimp.AUTO).write(`${desPath}-small`)
            if (width >= height) {
                image.resize(Jimp.AUTO, 200).crop(((width / height) * 200 - 200) / 2, 0, 200, 200).write(`${desPath}-nomal`)
            } else {
                image.resize(200, Jimp.AUTO).crop(0, ((height / width) * 200 - 200) / 2, 200, 200).write(`${desPath}-nomal`)
            }
        })
    }
    await next()
}

const workPicResize = async (ctx, next) => {
    // 获取所有文件信息
    const files = ctx.req.files

    // 处理文件（sharp/jimp）  jimp 比较小
    for (let file of files) {
        const desPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then(image => {
            //const { width, height } = image.bitmap
            image.resize(1280, Jimp.AUTO).write(`${desPath}`) //写入文件 
        })
    }
    await next()
}

module.exports = { avatarHandel, picHandel, coverHandel, workPicHandel, picResize, workPicResize };