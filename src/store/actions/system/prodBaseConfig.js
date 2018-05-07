/**
 * 产品版本基本配置
 */
module.exports = {
  getProdBaseList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/productLine/getFunCodeItem`,
      method: 'GET',
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setProdBaseList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/productLine/setControlUrl`,
      body: {
        code: param.code,
        control_url: param.control_url
      },
      method: 'post',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

}
