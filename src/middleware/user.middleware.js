//结果验证中间件
const service = require('../service/user.service')
const errorTypes = require('../constants/error-types')
const { md5password } = require('../utils/password')

const verifyUser = async (ctx, next) => {

    const { username, password } = ctx.request.body
    //判断用户名密码不能为空
    if (!username || !password || username === '' || password === '') {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx) //发射事件
    }


    //判断用户名是否注册过
    const res = await service.getUserByName(username)
    console.log(res[0])
    if (res[0].length) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS);
        return ctx.app.emit('error', error, ctx) //发射事件
    }

    await next()
}

const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body
    ctx.request.body.password = md5password(password)//密码加密
    await next()
}

module.exports = { verifyUser, handlePassword };