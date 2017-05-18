module.exports = {
  /** 
   * 以下部分还没写，只是复制粘贴
  */
  addBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: '/brands',
      method:'POST',
      body: {
        group_id: param.group_id,
        brand_id: param.brand_id,
        name: param.name,
        tel: param.tel,
        address: param.address,
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
        brand_id: param.brand_id,
        name: param.name,
        tel: param.tel,
        address: param.address,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeBrand(ctx, param) {
    ctx.dispatch('resource', {
      url: `/brands/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  /**
   * 这个接口是写好正在用的
   */
  getBrandList(ctx, param){
    ctx.dispatch('resource', {
      url: '/brands',
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
