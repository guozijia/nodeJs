const service = require('../service/mywork.service')
const fileservice = require('../service/upload.service')
const fs = require('fs')
class MyworkController {
    async create (ctx, next) {
        const { title, content, type } = ctx.request.body;
        const res = await service.createWork(title, content, type)
        ctx.body = {
            flag: true,
            msg: '发布成功！',
            workId: res[0].insertId
        }
    }
    async list (ctx, next) {
        const res = await service.getWorkList()
        ctx.body = res
    }
    async coverInfo (ctx, next) {
        const { workId } = ctx.params
        const res = await service.getCoverByWorkId(workId)
        ctx.response.set('content-type', res.mimetype) // 设置浏览器响应类型
        ctx.body = fs.createReadStream(`./uploads/covers/${res.filename}`)//下载文件
    }
    async detail (ctx, next) {
        const { workId } = ctx.query
        const res = await service.getWorkDetail(workId)
        ctx.body = res
    }
    async workpic (ctx, next){
        let { filename } = ctx.params
        const [res] = await fileservice.getFileInfoByWorkPicName(filename)
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.createReadStream(`./uploads/myworks/${filename}`)
    }
}

module.exports = new MyworkController()