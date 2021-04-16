const connection = require('../app/database')

class UserService {
    async createUser (user) {
        const statement = `INSERT INTO users (name,password) VALUES (?,?);`
        //将 user 写入数据库中
        const res = await connection.execute(statement, [user.username, user.password])
        return res
    };
    async getUserByName (name) { //查询用户是否存在
        const statement = `SELECT * FROM users WHERE name = ? ;`
        const res = await connection.execute(statement, [name])
        return res
    }
    async getAvatarByUserId (userId) {
        const statement = ` SELECT * FROM avatar WHERE user_id = ?
                            ORDER BY createAT DESC
                            LIMIT 1;`
        const [res] = await connection.execute(statement, [userId])
        return res[0]
    }
    async updateAvatar (avatarUrl, userId) {
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
        const [res] = await connection.execute(statement, [avatarUrl, userId])
        return res
    }
    async getUserInfo (userId) {
        const statement = `SELECT u.id id ,u.name name,u.avatar_url avatarUrl,
                            (SELECT COUNT(*) FROM moment m WHERE m.user_id = u.id ) momentCount
                            FROM users u WHERE id = ?`
        const [res] = await connection.execute(statement, [userId])
        return res
    }
    async getUserLike (userId) {
        const statement = `SELECT l.moment_id momentId FROM likes l WHERE user_id = ?;`
        const [res] = await connection.execute(statement, [userId])
        return res;
    }
    async getUserUnread (userId) {
        const statement1 = `SELECT
                            l.createAT time ,m.content moment ,
                            (SELECT JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) FROM users u WHERE l.user_id = u.id) userinfo
                            FROM likes l
                            LEFT JOIN users u ON l.user_id = u.id
                            LEFT JOIN moment m ON l.moment_id = m.id
                            WHERE l.author = ? AND  l.status = 0`
        const statement2 = `SELECT
                            c.content comment, c.createAT time ,m.content moment ,
                            (SELECT JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) FROM users u WHERE c.user_id = u.id) userinfo
                            FROM comment c
                            LEFT JOIN users u ON c.user_id = u.id
                            LEFT JOIN moment m ON c.moment_id = m.id
                            WHERE c.author = ? AND  c.status = 0`
        const [likes] = await connection.execute(statement1,[userId])
        const [comments] = await connection.execute(statement2, [userId])
        const res = likes.concat(comments)
        res.sort((a,b)=>{
           return a.time < b.time ? 1 : -1
        })
        
        return res
    }
}

module.exports = new UserService();