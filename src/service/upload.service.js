const connection = require('../app/database')

class UploadService {
    async saveAvatar (filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
        const [res] = await connection.execute(statement, [filename, mimetype, size, userId])
        return res
    }
    async saveCover (filename, mimetype, size, workId){
        const statement = `INSERT INTO mywork_cover (filename,mimetype,size,work_id) VALUES (?,?,?,?);`
        const [res] = await connection.execute(statement, [filename, mimetype, size, workId])
        return res
    }
    async createfile (filename, mimetype, size, momentId, userId) {
        const statement = `INSERT INTO file (filename,mimetype,size,moment_id,user_id) VALUES (?,?,?,?,?);`
        const [res] = await connection.execute(statement, [filename, mimetype, size, momentId, userId])
        return res
    }
    async createWorkfile (filename, mimetype, size, workId) {
        const statement = `INSERT INTO mywork_pic (filename,mimetype,size,work_id) VALUES (?,?,?,?);`
        const [res] = await connection.execute(statement, [filename, mimetype, size, workId])
        console.log(res)
        return res
    }
    async getFileInfoByFilename (filename) {
        const statement = `SELECT * FROM file WHERE filename = ?`
        const [res] = await connection.execute(statement, [filename])
        return res
    }
    async getFileInfoByWorkPicName (filename) {
        const statement = `SELECT * FROM mywork_pic WHERE filename = ?`
        const [res] = await connection.execute(statement, [filename])
        return res
    }
}

module.exports = new UploadService()
