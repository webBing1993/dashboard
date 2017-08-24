module.exports = {
  addBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: '/brands',
      method:'POST',
      body: {
        group_id: param.group_id,
        name: param.name,
        code: param.code,
        logo_url: param.logo_url
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: `/brands/${param.id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: `/brands/${param.id}`,
      method:'PUT',
      body: {
        group_id: param.group_id,
        logo_url: param.logo_url,
        name: param.name,
        code: param.code
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: `/brands/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getBrandList(ctx, param){
    ctx.dispatch('resource', {
      url: '/brands',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: {
        keyword: param.searchVal || '',
        group_id: param.group_id
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
