module.exports = {
  showtoast(ctx, text){
    ctx.commit('TOAST',
      {
        show: true,
        text: text ? text : '操作成功'
      }
    )
  },
  showalert(ctx, param){
    ctx.commit('ALERT',
      {
        show: true,
        code: param.code || 0,
        title: param.title || '提示',
        content: param.content || ''
      }
    )
  }
}