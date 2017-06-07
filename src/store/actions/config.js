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
        hotel_id: param.hotel_id,
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //PMS
  getPMS(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/pms`,
      method:'GET',
      onSuccess: body => {
        ctx.commit('PMSDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  patchPMS(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/pms`,
      method:'PATCH',
      body: {
        hotel_id: param.hotel_id,
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('PMSDATA', body.data)
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
  },
  //旅业
  getLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/lvye`,
      method:'GET',
      onSuccess: body => {
        ctx.commit('LVYEATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  patchLvye(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/lvye`,
      method:'PATCH',
      body: {
        hotel_id: param.hotel_id,
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('LVYEATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //小程序
  getWechatApp(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/wechatapp`,
      method:'GET',
      onSuccess: body => {
        ctx.commit('WECHATAPPDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  patchWechatApp(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/wechatapp`,
      method:'PATCH',
      body: {
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('WECHATAPPDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
