/**
 * 系统设置action出口
 */
module.exports = {
    ...require('./miniapp'),
    ...require('./wechatpay'),
    ...require('./miniappmsg'),
    ...require('./ServerMessage'),
    ...require('./prodVersion'),
    ...require('./prodBaseConfig'),
    ...require('./prodVersion'),
    ...require('./lvyeOnlineManage'),
    ...require('./rztTemplate'),
    ...require('./advConfig/aboutAdv'),
    ...require('./alipay'),
    ...require('./howmuch'),
}
