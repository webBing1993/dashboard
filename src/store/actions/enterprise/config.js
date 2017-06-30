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
        let obj = {
          ...ctx.state.configData
        }
        for(let key in body.data) {
          obj[key] = body.data[key];
        }
        ctx.commit('CONFIGDATA', obj)
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
        ctx.commit('PMSDATA', body.data ? body.data : {})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyPMS(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/pms`,
      method:'PUT',
      body: {
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
        ctx.commit('LVYEATA', body.data ? body.data : {})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyLvye(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/lvye`,
      method:'PUT',
      body: {
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
        ctx.commit('LVYEATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //同步房间
  syncPMSData(ctx, param) {
    ctx.dispatch('resource', {
      url: '/pms',
      method:'POST',
      body: {
        hotel_id: param.hotel_id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  syncPMSTime(ctx, param) {
    ctx.dispatch('resource', {
      url: `/synpms/${param.hotel_id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
