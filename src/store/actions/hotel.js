module.exports = {
  addHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: '/hotels',
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
  getHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
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
  removeHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHotelList(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotels',
      method:'GET',
      // headers: {
      //   'X-Current-Page': param.page || 1,
      //   'X-Page-Size': param.size || 0
      // },
      params: {
        keyword: param.searchVal
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
