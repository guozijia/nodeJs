const errorTypes = require('../constants/error-types')

const errorHandle = (error, ctx) => {
    let status, message;
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "用户名密码不能为空~";
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409;
            message = "用户名已注册~";
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400;
            message = "用户不存在~";
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400;
            message = "密码错误~";
            break;
        case errorTypes.UN_AUTHORIZATION:
            status = 401;
            message = "未授权token~";
            break;
        case errorTypes.UN_PERMISSION:
            status = 401;
            message = "么有修改权限~";
            break;
        default:
            status = 404;
            message = "NOT FOUND";
    }
    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandle;
