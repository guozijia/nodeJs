const fs = require('fs')

const service = require('../service/moment.service')
const fileservice = require('../service/upload.service')

class MomentController {
    async create (ctx, next) {
        //获取数据 
        const userId = ctx.user.id
        const { content } = ctx.request.body;
        const res = await service.createMoment(userId, content)
        ctx.body = {
            flag: true,
            msg: '发布成功！',
            momentId: res[0].insertId
        }
    }
    async detail (ctx, next) {
        const momentId = ctx.params.momentId //获取id
        const res = await service.getMomentById(momentId)
        ctx.body = res
    }
    async list (ctx, next) {
        const { offset, size } = ctx.query;
        const res = await service.getMomentList(offset, size)
        const [total] = await service.getTotalMomentCount()
        ctx.body = {
            total: total.total,
            res
        }
    }
    async update (ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const { id } = ctx.user
        const res = await service.updateMoment(content, momentId)
        ctx.body = {
            message: 'update success~'
        }
    }
    async remove (ctx, next) {
        const { momentId } = ctx.params
        const res = await service.removeMoment(momentId)
        ctx.body = {
            message: 'remove success~'
        }
    }
    async addlabels (ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params;
        // 在关系表 添加动态所有标签
        for (let label of labels) {
            const labelId = label.id
            // 判断动态是否有了某个标签
            const islabel = await service.haslabel(momentId, labelId)

            if (!islabel) {
                await service.addLabel(momentId, labelId)
            }
        }
        ctx.body = '添加标签成功'
    }
    async fileInfo (ctx, next) {
        let { filename } = ctx.params
        const [res] = await fileservice.getFileInfoByFilename(filename)

        const { type } = ctx.query
        const types = ['large', 'small', 'middle', 'nomal']
        if (types.some(item => item === type)) {
            filename = filename + '-' + type;
        }

        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
    }
    async like (ctx, next) {
        const { id } = ctx.user
        const { momentId } = ctx.params
        const { userId } = ctx.query
        let status = id === parseInt(userId) ? 1 : 0
        const res = await service.likeMoment(momentId, id, status, userId)
        ctx.body = '点赞成功~'
    }
     
} 

module.exports = new MomentController()