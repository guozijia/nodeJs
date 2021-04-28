const service = require('../service/user.service')
const fs = require('fs')

class UserContorller {
    async createUser (ctx, next) {
        //获取用户传递来的参数
        const user = ctx.request.body
        //查询数据库
        const res = await service.createUser(user)
        //返回数据
        ctx.body = res
    }
    async avatarInfo (ctx, next) {
        const { userId } = ctx.params
        const res = await service.getAvatarByUserId(userId)
        //console.log(res)
        ctx.response.set('content-type', res.mimetype) // 设置浏览器响应类型
        ctx.body = fs.createReadStream(`./uploads/avatar/${res.filename}`)//下载文件
    } 
    async getUserInfo(ctx,next){
        
        const {id} = ctx.user
        const [res] = await service.getUserInfo(id)
        ctx.body =res
    }
    async getUserLike(ctx,next){
        const {id} = ctx.user
        const res = await service.getUserLike(id)
        let likes = []
        res.map(item=>{
            likes.push(item.momentId)
        })
        ctx.body = likes 
    } 
    async getUserUnread(ctx){
        const {id} = ctx.user
        const res = await service.getUserUnread(id)
        ctx.body = res
    }
}

module.exports = new UserContorller(); 