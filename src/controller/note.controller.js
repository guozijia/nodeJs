const { saveNote, createfile, getFileInfoByFilename, getNoteList } = require('../service/note.service')
const { APP_HOST, APP_PORT } = require('../app/config')
const fs = require('fs')
class NoteController {
    async list (ctx, next) {
        const { offset, size } = ctx.query;
        const res = await getNoteList(offset, size)
        ctx.body = res
    }
    async create (ctx, next) {
        const { title, content } = ctx.request.body
        const res = await saveNote(title, content)
        ctx.body = "ok"
    }
    async fileInfo (ctx, next) {
        let { filename } = ctx.params
        const [res] = await getFileInfoByFilename(filename)
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.createReadStream(`./uploads/note/${filename}`)
    }
    async saveNotePic (ctx, next) {
        const files = ctx.req.files
        let data = []
        for (let file of files) {  
            const { mimetype, filename, size } = file
            await createfile(filename, mimetype, size)
            data.push({
                url: `${APP_HOST}:${APP_PORT}/note/image/${filename}`
            })
        }
        ctx.body = {
            errno: 0,
            data
        }
    }
}

module.exports = new NoteController()