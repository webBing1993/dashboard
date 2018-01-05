/**
 * 小程序消息模板action
 */
module.exports = {
  modifyServeMesTemp(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatapp/templates/${param.id}`,
      method: 'PUT',
      body: {
        app_id: param.app_id,
        template_id: param.template_id,
        template_name: param.template_name,
        template_data: param.template_data
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  addServerMsgTem(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatapp/createData`,
      method: 'POST',
      body: {
        app_id: param.app_id,
        template_id: param.template_id,
        template_name: param.template_name,
        template_data: param.template_data
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  removeMiniAppMsg(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatapp/templates/${param.id}`,
      method: 'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 查询列表POST /wechatapp/templates?offset=0&limit=10

  getServMesTempList(ctx, param){
    ctx.dispatch('resource', {
      url: `/wechatapp/templates?offset=${param.page}&limit=${param.size}`,
      method: 'POST',
      body:{
        "search_key":param.search_key
      },
      // headers: {
      //   'X-Current-Page': param.page || '1',
      //   'X-Page-Size': param.size || '0'
      // },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  getMiniAppMsg(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatapp/templates/${param.id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
