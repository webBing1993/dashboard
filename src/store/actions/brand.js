module.exports = {
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
  getBrandList(ctx, param){
    ctx.dispatch('resource', {
      url: '/brands',
      method:'GET',
      params: {
        keyword: param.searchVal
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
