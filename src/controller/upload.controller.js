const service = require('../service/upload.service')
const userservice = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class UploadController {
    async saveAvatar (ctx, next) {
        // 获取头像信息
        const { mimetype, filename, size } = ctx.req.file
        const { id } = ctx.user
        //将头像信息保存到数据库
        const res = await service.saveAvatar(filename, mimetype, size, id)
        //将头像链接保存到users表里
        const avaUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar/${filename}`
        await userservice.updateAvatar(avaUrl, id)

        ctx.body = {
            code: 200,
            message: '上传头像成功~'
        }
    }
    async savePicInfo (ctx, next) {
 
        const { id } = ctx.user
        const { momentId } = ctx.query
        
        //获取文件信息
        const files = ctx.req.files 
        console.log(files)

        //将文件信息保存到数据库
        for (let file of files) {
            const { mimetype, filename, size } = file
            await service.createfile(filename, mimetype, size, momentId, id)
        }
 
        ctx.body = "上传完成"
    }
}

module.exports = new UploadController()