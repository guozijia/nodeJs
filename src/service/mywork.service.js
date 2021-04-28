const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

class MyworkService {
    async createWork (title, content, type) {
        const statement = `INSERT INTO myworks (title,content,type) VALUES (?,?,?)`
        //将 user 写入数据库中
        const res = await connection.execute(statement, [title, content, type])
        return res
    }
    async getCoverByWorkId (workId) {
        const statement = ` SELECT * FROM mywork_cover WHERE work_id = ?
                            ORDER BY createAT DESC
                            LIMIT 1;`
        const [res] = await connection.execute(statement, [workId])
        return res[0]
    }
    async getWorkList () {
        const statement = `SELECT * FROM myworks LIMIT 0,20;`
        const [res] = await connection.execute(statement)
        return res
    }
    async getWorkDetail (workId) {
        const statement = `SELECT
                            m.id id,m.content content,m.type type,m.title title,m.createAt time,
                            (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/work/images/',mp.filename)) FROM mywork_pic mp WHERE m.id = mp.work_id) images
                            FROM myworks m
                            LEFT JOIN mywork_pic mp ON m.id = mp.work_id
                            WHERE m.id = ?
                            GROUP BY m.id`
        const [res] = await connection.execute(statement, [workId])
        return res
    }
}
 
module.exports = new MyworkService()