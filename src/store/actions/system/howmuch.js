/**
 * 好码齐支付action
 */
module.exports = {
  //添加支付宝配置
  addHowmuchPayConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: '/howmuchPayConfig/save',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  updateHowmuch(ctx, param) {
    ctx.dispatch('resource', {
      url: '/howmuchPayConfig/update',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  delHowmuch(ctx, param) {
    ctx.dispatch('resource', {
      url: `/howmuchPayConfig/delete/${param.id}`,
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHowmuchById(ctx, param) {
    ctx.dispatch('resource', {
      url: `/howmuchPayConfig/${param.id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHowmuchList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/howmuchPayConfig/page',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      method:'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  getHowmuchAll(ctx, param) {
    ctx.dispatch('resource', {
      url: '/howmuchPayConfig/all',
      method:'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },



}
