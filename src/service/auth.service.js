//权限查询
const connection = require('../app/database')
class AuthService {
    async checkMoment (tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
        const res = await connection.execute(statement, [id, userId])
        return res[0].length
    }
}

module.exports = new AuthService()