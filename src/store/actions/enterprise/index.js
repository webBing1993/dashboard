/*
* 企业账户action出口
* */
module.exports = {
  ...require('./group'),
  ...require('./hotel'),
  ...require('./brand'),
  ...require('./config'),
  ...require('./device'),
  ...require('./room'),
  ...require('./online'),
  ...require('./roomtype'),
  ...require('./receptionArea'),
  ...require('./hotelStaff'),
  ...require('./prodConfig'),
  ...require('./recharge'),
  ...require('./hotelAccount'),
  ...require('./configMicro')
}
