// 认证通模板
module.exports = {
  tempList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/rzt/getall',
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

  addTemplate(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rzt/add`,
      body: param.data,
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      method: 'POST',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '保存成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  modifiTemp(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rzt/update/${param.tempId}`,
      body: param.data,
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      method: 'POST',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '保存成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
