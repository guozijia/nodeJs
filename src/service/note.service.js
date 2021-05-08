const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

class NoteService {
    async getNoteList (offset, size) {
        const statement = `SELECT * FROM note ORDER BY id DESC LIMIT ?,?;`
        const [res] = await connection.execute(statement, [offset, size])
        return res;
    }
    async saveNote (title, content) {
        const statement = `INSERT INTO note (title,content) VALUES (?,?)`
        const [res] = await connection.execute(statement, [title, content])
        return res;
    }
    async createfile (filename, mimetype, size) {
        const statement = `INSERT INTO note_pic (filename,mimetype,size) VALUES (?,?,?);`
        const [res] = await connection.execute(statement, [filename, mimetype, size])
        return res
    }
    async getFileInfoByFilename (filename) {
        const statement = `SELECT * FROM note_pic WHERE filename = ?`
        const [res] = await connection.execute(statement, [filename])
        return res
    }
}

module.exports = new NoteService()