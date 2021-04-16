const dotenv = require('dotenv')
dotenv.config();

const path = require('path')

const fs = require('fs')

const Private_key = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const Public_key = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    APP_HOST
} = process.env

module.exports.Private_key = Private_key;
module.exports.Public_key = Public_key