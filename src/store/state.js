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
    },
    alert: {
      show: false,
      code: 0,
      title: '提示',
      content: ''
    }
  },
  userInfo: JSON.parse(sessionStorage.getItem('userInfo') || '{"name": "复创"}')
}
