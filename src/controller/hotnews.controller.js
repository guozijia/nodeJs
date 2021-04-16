const axios = require('axios')

class HotNewsController {
    async getHotNews (ctx, next) {

        const key = "773b74a59cee6b61fd3695ea5dcf5d76"

        let date = new Date();

        let month = date.getMonth()+1;
        let strDate = date.getDate();
        let currentDate = month +'/'+ strDate

        const hotNewsAPI = `http://api.tianapi.com/txapi/weibohot/index?key=${key}`
        const res = await axios.get(hotNewsAPI)
        ctx.body = res.data
    } 
}

module.exports = new HotNewsController()