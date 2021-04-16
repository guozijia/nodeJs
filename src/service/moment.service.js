const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

class MomentService {
    async createMoment (userID, content) {
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?)`
        //将 user 写入数据库中
        const res = await connection.execute(statement, [content, userID])
        return res
    };
    async getMomentById (id) {
        const statement = `SELECT
                            m.id id, m.content content, m.createAT createTime, m.updateAT updateTime,
                            JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) userinfo,
                            (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content' ,c.content,'commentId',c.comment_id,'createtime',c.createAt ,'user',
                            JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url)
                            )) ,NULL) FROM comment c JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
                            IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
                            (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
                            FROM moment m
                            LEFT JOIN users u ON m.user_id = u.id
                            LEFT JOIN moment_label ml ON m.id = ml.moment_id
                            LEFT JOIN label l ON ml.label_id = l.id
                            WHERE m.id = ?
                            GROUP BY m.id;
                            `
        //查询内容
        const res = await connection.execute(statement, [id])
        return res[0]
    }
    async getMomentList (offset, size) {
        const statement = `SELECT
                            m.id id, m.content content, m.createAT createTime, m.updateAT updateTime,
                            JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) userinfo,
                            (SELECT COUNT(*) FROM comment c WHERE m.id = c.moment_id ) commentcount,
                            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
                            (SELECT COUNT(*) FROM likes l WHERE m.id = l.moment_id ) likecount,
                            (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
                            FROM moment m LEFT JOIN users u ON m.user_id = u.id
                            ORDER BY m.id DESC
                            LIMIT ?,?;`
        //查询内容
        const res = await connection.execute(statement, [offset, size])
        return res[0]
    }
    async getTotalMomentCount () {
        const statement = ` SELECT COUNT(*) total FROM moment`
        const res = await connection.execute(statement)
        return res[0]
    }
    async updateMoment (content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`
        const res = await connection.execute(statement, [content, momentId])
        return res[0]
    }
    async removeMoment (id) {
        const statement = `DELETE FROM moment WHERE id = ?;`
        const res = await connection.execute(statement, [id])
        return res[0]
    }
    async haslabel (momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
        const [res] = await connection.execute(statement, [momentId, labelId])
        return res[0] ? true : false;
    }
    async addLabel (momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)`
        const [res] = await connection.execute(statement, [momentId, labelId])
        return res
    }

    async likeMoment (momentId, userId, status, author) {
        const statement = `INSERT INTO likes (moment_id,user_id,status,author) VALUES (?,?,?,?)`
        const [res] = await connection.execute(statement, [momentId, userId, status, author])
        return res;
    }
    async likeDisRead (userId) {
        const statement = ` SELECT COUNT(*) count FROM likes l WHERE l.author = ? AND l.status = 0;`
        const [res] = await connection.execute(statement, [userId])
        return res;
    }
    async commentDisRead (userId){
        const statement = ` SELECT COUNT(*) count FROM comment c WHERE c.author = ? AND c.status = 0;`
        const [res] = await connection.execute(statement, [userId])
        return res;
    }
}

module.exports = new MomentService();