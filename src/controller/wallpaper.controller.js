const axios = require('axios') ;

// const LRU = require('lru-cache')

// const unsplashCache =new LRU({ max: 1, maxAge: 1000 * 60 * 60 })

const unsplashClientId = ''

class WallpaperController {
    async wallpaper(ctx,next){
        const wallpaperAPI = unsplashClientId 
            ? 'https://api.unsplash.com/photos/random?orientation=landscape&count=1&client_id=' + unsplashClientId
            : 'https://cn.bing.com/HPImageArchive.aspx?format=js&n=1'

        // const cache = unsplashCache.get('one')
        // console.log(cache)
        // if (cache) {
        //     ctx.body = cache
            
        //     return
        // }

        try {
            const res = await axios.get(wallpaperAPI)
            ctx.body = unsplashClientId /* istanbul ignore next */
                ? { type: 'unsplash', data: res.data }
                : { type: 'bing', data: res.data.images }
        } catch (error) {
            ctx.body = ctx.util.resuccess({
                type: 'bing',
                data: [{
                    url: '/az/hprichbg/rb/SWFC_ZH-CN9558503653_1920x1080.jpg',
                    copyrightlink: '/search?q=%e4%b8%8a%e6%b5%b7%e4%b8%96%e7%95%8c%e9%87%91%e8%9e%8d%e4%b8%ad%e5%bf%83&form=hpcapt&mkt=zh-cn'
                }]
            })
        }
    }
}

module.exports = new WallpaperController();