/**
 * 小程序action
 */
module.exports = {
  addMiniApp(ctx, param) {
    ctx.dispatch('resource', {
      url: '/wechatapp',
      method:'POST',
      body: {
        app_id: param.app_id,
        app_secret: param.app_secret,
        app_type: param.app_type,
        original_id: param.original_id,
        app_name: param.app_name,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        wechat_pay_config_id: param.wechat_pay_config_id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyMiniApp(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatapp/${param.app_id}`,
      method:'PUT',
      body: {
        app_id: param.app_id,
        app_secret: param.app_secret,
        original_id: param.original_id,
        app_type: param.app_type,
        app_name: param.app_name,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        wechat_pay_config_id: param.wechat_pay_config_id
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getMiniAppList(ctx, param){
    ctx.dispatch('resource', {
      url: '/wechatapp',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
