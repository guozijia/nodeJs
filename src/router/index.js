const fs = require('fs')

const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return
        const router = require(`./${file}`)
        if (file === 'notice.router.js') {
            app.ws.use(router.routes())
        }
        app.use(router.routes())
        app.use(router.allowedMethods())
        
    })
}

module.exports = useRoutes;
 