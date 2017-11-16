/**
 * 总action出口
 */
module.exports = {
  ...require('./utils'),
  ...require('./auth'),
  ...require('./ui'),
  ...require('./enterprise'),
  ...require('./system')
}
