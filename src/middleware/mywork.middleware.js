const Jimp = require('jimp')
const Multer = require('koa-multer')
const path = require('path')

const picUpload = Multer({
    dest: './uploads/myworks'
})

const picHandel = picUpload.array('mywork', 12); //最多9张

// 图片处理
const picResize = async (ctx, next) => {
    // 获取所有文件信息
    const files = ctx.req.files
    // 处理文件（sharp/jimp）  jimp 比较小
    for (let file of files) {
        const desPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then(image => {
            image.resize(1280, Jimp.AUTO).write(`${desPath}-large`) //写入文件 
        })
    }
    await next()
} 

module.exports = { picHandel, picResize };