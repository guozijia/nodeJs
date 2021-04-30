const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const websockify = require('koa-websocket')

const app = websockify(new Koa())

const useRoutes = require('../router/index')

const errorHandle = require('./error-handle')

// app.use(async (ctx,next)=>{
//     console.log(ctx.request.path)
//     await next()
// })

app.use(bodyParser()) //json解析中间件

app.use(cors())

useRoutes(app) 


// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods())

// app.use(authRouter.routes()) 
// app.use(authRouter.allowedMethods())

app.on('error', errorHandle)//监听错误，执行事件

module.exports = app; 