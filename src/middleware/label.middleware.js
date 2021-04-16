const service = require('../service/label.service')

const verifyLabel = async (ctx, next) => {
    const { labels } = ctx.request.body;
    let newLabels = []
    //取出labels中的标签
    for (let name of labels) {
        const isExist = await service.hasLabel(name);
        let label = { name }
        if (!isExist) {
            const res = await service.create(name)
            label.id = res.insertId
        }else{
            label.id = isExist.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels;
    await next()
}

module.exports = {
    verifyLabel
};