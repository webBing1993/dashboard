/**
 * 系统设置action出口
 */
module.exports = {
    ...require('./miniapp'),
    ...require('./wechatpay'),
    ...require('./miniappmsg'),
    ...require('./ServerMessage'),
}
