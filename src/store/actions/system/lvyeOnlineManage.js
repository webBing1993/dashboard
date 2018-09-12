module.exports = {
  getLvyeCopList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/corporationLvye/list',
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  getLvyeStaffList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvyeStaff/list',
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  saveLvyeStaff(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvyeStaff/add',
      body: param.data,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  // 原来的增加
  // saveLvyeCopInfo(ctx, param) {
  //   ctx.dispatch('resource', {
  //     url: '/corporationLvye/add',
  //     body: param.data,
  //     method: 'POST',
  //     onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
  //   })
  // },
  // 新的增加和编辑请求路径：/rztlvye/get/{lvyecode}
  saveLvyeCopInfo(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rztlvye/get/${param.lvyecode}`,
      body: param.data,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  updateLvyeStaff(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvyeStaff/update',
      body: param.data,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  updateLvyeCopInfo(ctx, param) {
    ctx.dispatch('resource', {
      url: '/corporationLvye/update',
      body: param.data,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  delLvyeStaff(ctx, param) {
    ctx.dispatch('resource', {
      url: '/lvyeStaff/delete/' + param.userId,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  delLvyeCopInfo(ctx, param) {
    ctx.dispatch('resource', {
      url: '/corporationLvye/delete/' + param.code,
      method: 'POST',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },



  // 通过编码获取认证通模板列表
  haveSelectTemplateList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rztlvye/get/${param.lvyecode}`,
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },


}
