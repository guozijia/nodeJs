const Router = require('koa-router')

const noticeRouter = new Router()

const {
    verifyAuth
} = require('../middleware/auth.middleware')

const service = require('../service/moment.service')


noticeRouter.all('/notice/:uid', ctx => { //未读消息条数
    // ctx.websocket.send('Hello World1')
    // ctx.websocket.on('message', function (message) {
    //     // do something with the message from client
    //     console.log(message);
    //     ctx.websocket.send(message)
    // });
    console.log("有用户连接进来了")
    getNoticeCount(ctx)
    setInterval(getNoticeCount, 1000, ctx)
})


noticeRouter.all('/getNoticeDetail/:uid', ctx => {
    getNoticeDetail(ctx)
}) 
 
const getNoticeCount = async (ctx) => { 
    const uid = ctx.request.url.split('/')[2];
    //点赞
    const [like] = await service.likeDisRead(uid)
    //评论
    const [comment] = await service.commentDisRead(uid)
    const num = like.count + comment.count
    ctx.websocket.send(num)
} 

 
module.exports = noticeRouter;