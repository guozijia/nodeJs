const jwt = require('jsonwebtoken')
const { Private_key } = require('../app/config')


class AuthController {
    async login (ctx, next) {
        const { id, name,avatarUrl } = ctx.user //数据库查询到的基本信息
        const token = jwt.sign({ id, name }, Private_key, {
            expiresIn: 60 * 60 * 24 * 7,
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            name,
            token,
        }
    }

    async success (ctx,next){
        ctx.body = "验证成功"
    }
}
module.exports = new AuthController()