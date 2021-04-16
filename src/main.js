const app = require('./app/index')
const config = require('./app/config')

require('./app/database')

app.listen(config.APP_PORT, () => {
    console.log(`${APP_HOST + ':' + APP_PORT}服务器启动成功`)
}) 