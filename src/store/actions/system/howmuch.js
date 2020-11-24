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
  getIcbcAll(ctx, param) {
    ctx.dispatch('resource', {
      url: '/icbcPay/all',
      method:'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //银联支付
  getChinaumsList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/chinaumsConfig/search',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0',
        "Content-Type": "application/json;charset=UTF-8"
      },
      method:'POST',
      body: {},
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //添加银联配置
  addChinaumsPayConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: '/chinaumsConfig',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //修改银联支付
  updateChinaums(ctx, param) {
    ctx.dispatch('resource', {
      url: `/chinaumsConfig/${param.chinaumsId}`,
      method:'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 工行支付
  getIcbcPayList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/icbcPay/page',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0',
        "Content-Type": "application/json;charset=UTF-8"
      },
      method:'POST',
      body: {},
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  // 添加工行支付
  addIcbcPayConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: '/icbcPay/save',
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 修改工行支付
  updateIcbc(ctx, param) {
    ctx.dispatch('resource', {
      url: `/icbcPay/update`,
      method:'POST',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 工行支付详情
  icbcDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: `/icbcPay/`+param.id,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
