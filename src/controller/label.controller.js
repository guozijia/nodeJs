const service = require('../service/label.service')

class LabelController {
    async create (ctx, next) {
        const { name } = ctx.request.body
        const res = await service.create(name)
        ctx.body = "εε»Ίζε"
    }
    async list (ctx, next) {
        const { limit, offset } = ctx.query
        const res = await service.getLabels(limit,offset)

        ctx.body = res
    }
}

module.exports = new LabelController()