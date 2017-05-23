module.exports = {
  AppParams: {
    session: ''
  },
  Interface: {
    toast: {
      show: false,
      text: '操作成功'
    },
    loading: {
      show: false
    }
  },
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{"name": "复创"}')
}
