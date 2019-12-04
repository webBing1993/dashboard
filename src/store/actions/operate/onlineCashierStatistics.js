module.exports = {
  getTradeList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/payment/pre-authorization/page`,
      method: 'POST',
      body: param.data,
      headers: {
        'X-Current-Page': param.data.page || '1',
        'X-Page-Size': param.data.size || '0'
      },
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
