const connection = require('../app/database')
class CommentService {
    async create (momentId, content, id, author,status) {
        const statement = ` INSERT INTO comment (content,moment_id,user_id,author,status) VALUES (?,?,?,?,?);`
        const [res] = await connection.execute(statement, [content, momentId, id, author,status])
        return res;
    }
    async reply (momentId, content, id, commentId) {
        const statement = ` INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`
        const [res] = await connection.execute(statement, [content, momentId, id, commentId])
        return res;
    }
    async update (commentId, content) {
        const statement = ` UPDATE comment SET content = ? WHERE id = ?;`
        const [res] = await connection.execute(statement, [content, commentId])
        return res;
    }
    async remove (commentId) {
        const statement = ` DELETE FROM comment WHERE id = ?;`
        const [res] = await connection.execute(statement, [commentId])
        return res;
    }
    async getCommentList (momentId) {
        const statement = `SELECT c.id id,c.content content,c.createAT datetime,c.comment_id commentId,
                            (SELECT JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) FROM users u WHERE c.user_id = u.id) userinfo
                            FROM comment c
                            WHERE c.moment_id = ?
                            ORDER BY c.createAT DESC;`
        const [res] = await connection.execute(statement, [momentId])
        return res;
    }
}

module.exports = new CommentService();