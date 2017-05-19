module.exports = {
  addEnterprise(ctx, param) {
    ctx.dispatch('resource', {
      url: '/groups',
      method:'POST',
      body: {
        name: param.name,
        memo: param.memo,
        website: param.website,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: err => {
        param.onFail ? param.onFail(err) : null
      }
    })
  },
  getEnterprise(ctx, param) {
    ctx.dispatch('resource', {
      url: `/groups/${param.id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyEnterprise(ctx, param) {
    ctx.dispatch('resource', {
      url: `/groups/${param.id}`,
      method:'PUT',
      body: {
        name: param.name,
        memo: param.memo,
        website: param.website,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: err => {
        param.onFail ? param.onFail(err) : null
      }
    })
  },
  removeEnterprise(ctx, param) {
    ctx.dispatch('resource', {
      url: `/groups/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getEnterpriseList(ctx, param){
    ctx.dispatch('resource', {
      url: '/groups',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: {
        keyword: param.searchVal || ''
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
