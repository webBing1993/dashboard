/**
 * 支付宝支付action
 */
module.exports = {
  //添加支付宝配置
  addAlipayConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: '/alipayConfig/save',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  updateAlipay(ctx, param) {
    ctx.dispatch('resource', {
      url: '/alipayConfig/update',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getAlipayById(ctx, param) {
    ctx.dispatch('resource', {
      url: `/alipayConfig/queryById/${param.id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getAlipayConfigList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/alipayConfig/page',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      method:'POST',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

}
