module.exports = {
  getEnterpriseList(ctx, param){
    ctx.dispatch('resource', {
      url: '/groups',
      method:'GET',
      params: {
        keyword: param.searchVal
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getEnterpriseInfo(ctx, param){
    ctx.dispatch('resource', {
      url: 'http://localhost:8080/',
      method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getBrandList(ctx, param){
    ctx.dispatch('resource', {
      url: 'http://localhost:8080/',
      method:'GET',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeBrand(ctx, param){
    ctx.dispatch('resource', {
      url: 'http://localhost:8080/',
      method:'DELETE',
      params: {
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
