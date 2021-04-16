const connection = require('../app/database')

class LabelService {
    async create (name) {
        const statement = `INSERT INTO label (name) VALUES (?);`
        const [res] = await connection.execute(statement, [name])
        return res
    }
    async hasLabel (name) {
        const statement = `SELECT * FROM label WHERE name = ?;`
        const [res] = await connection.execute(statement, [name])
        return res[0]
    }
    async getLabels (limit, offset) {
        const statement = `SELECT * FROM label LIMIT ?,?`
        const [res] = await connection.execute(statement, [offset, limit])
        return res
    }
}

module.exports = new LabelService()