/**
 * 微信支付action
 */
module.exports = {
  addWechatpay(ctx, param) {
    ctx.dispatch('resource', {
      url: '/wechatpay',
      method:'POST',
      body: {
        mch_id: param.mch_id,
        mch_key: param.mch_key,
        mch_type: param.mch_type,
        mch_name: param.mch_name,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyWechatpay(ctx, param) {
    ctx.dispatch('resource', {
      url: `/wechatpay/${param.id}`,
      method:'PUT',
      body: {
        id: param.id,
        mch_id: param.mch_id,
        mch_key: param.mch_key,
        mch_type: param.mch_type,
        mch_name: param.mch_name,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getWechatpayList(ctx, param){
    ctx.dispatch('resource', {
      url: '/wechatpay',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  getWechatpayProvider(ctx, param){
    ctx.dispatch('resource', {
      url: '/wechatpay/provider',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: {
        provider: param.provider || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
