module.exports = {
  getConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/config`,
      method:'GET',
      onSuccess: body => {
        ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  patchConfig(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/config`,
      method:'PATCH',
      body: {
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getPMSBrandList(ctx, param){
    ctx.dispatch('resource', {
      url: '/pmsbrand',
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
