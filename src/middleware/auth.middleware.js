const jwt = require('jsonwebtoken')


const service = require('../service/user.service')
const authservice = require('../service/auth.service')
const errorTypes = require('../constants/error-types')
const { md5password } = require('../utils/password')

const { Public_key } = require('../app/config')

const verifyLogin = async (ctx, next) => {

    //1 获取用户密码
    const { username, password } = ctx.request.body
    //2 判断用户名密码是否为空
    if (!username || !password) {
        const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx) //发射事件
    }
    //3 判断用户是否存在
    const res = await service.getUserByName(username)
    const user = res[0][0]
    // console.log(user)
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx) //发射事件
    }
    //4 判断密码是否正确(需要加密)
    if (md5password(password) != user.password) {
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user
    await next()
}

const verifyAuth = async (ctx, next) => { //token 验证
    const authorization = ctx.headers.authorization
    if (!authorization) { //如果没有传入token
        const err = new Error(errorTypes.UN_AUTHORIZATION)
        return ctx.app.emit('error', err, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    //验证token
    try {
        const res = jwt.verify(token, Public_key, {
            algorithms: ['RS256']
        })
        ctx.user = res;
        await next()
    } catch (error) {
        const err = new Error(errorTypes.UN_AUTHORIZATION)
        ctx.app.emit('error', err, ctx)
    }
}

const verifyPermission = async (ctx, next) => {
    //验证用户是否能修改内容 用户id = moment的user_id
    const { id } = ctx.user;

    // 获取请求参数里的key
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id','')

    const resourceId = ctx.params[resourceKey]

    const isPermission = await authservice.checkMoment(tableName, resourceId, id)

    if (!isPermission) {
        const err = new Error(errorTypes.UN_PERMISSION)
        return ctx.app.emit('error', err, ctx)
    }
    await next()
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}