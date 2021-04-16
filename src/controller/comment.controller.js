const service = require('../service/comment.service')

class CommentController {
    async create (ctx, next) {
        const { momentId, content, author } = ctx.request.body
        const { id } = ctx.user
        let status = id === parseInt(author) ? 1 : 0
        const res = await service.create(momentId, content, id, author,status)
        ctx.body = '发表评论成功'
    }
    async reply (ctx, next) {
        const { momentId, content } = ctx.request.body
        const { commentId } = ctx.params
        const { id, name } = ctx.user

        const res = await service.reply(momentId, content, id, commentId)
        ctx.body = `评论${name}成功`
    }
    async update (ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;

        const res = await service.update(commentId, content)
        ctx.body = "修改了评论"
    }
    async remove (ctx, next) {
        const { commentId } = ctx.params;
        const res = await service.remove(commentId)
        ctx.body = "删除了评论"
    }
    async list (ctx, next) {
        const { momentId } = ctx.query
        const res = await service.getCommentList(momentId)
        ctx.body = res
    }
}

module.exports = new CommentController();