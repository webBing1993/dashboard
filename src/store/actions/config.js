module.exports = {
  getConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotelId}/config`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  patchConfig(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotelId}/config`,
      method:'PATCH',
      body: {
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
