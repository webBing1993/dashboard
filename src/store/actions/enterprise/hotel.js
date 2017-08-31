module.exports = {
  addHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: '/hotels',
      method:'POST',
      body: {
        group_id: param.group_id,
        brand_id: param.brand_id,
        code: param.code,
        corp_id: param.corp_id,
        province: param.province,
        city: param.city,
        area: param.area,
        name: param.name,
        tel: param.tel,
        address: param.address,
        address_code: param.address_code,
        longitude: param.longitude,
        latitude: param.latitude,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        contact_position: param.contact_position
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
        code: param.code,
        corp_id: param.corp_id,
        province: param.province,
        city: param.city,
        area: param.area,
        name: param.name,
        tel: param.tel,
        address: param.address,
        address_code: param.address_code,
        longitude: param.longitude,
        latitude: param.latitude,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        contact_position: param.contact_position
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHotelList(ctx, param){
    ctx.dispatch('resource', {
      url: '/hotels',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: {
        group_id: param.group_id || '',
        keyword: param.keyword || ''
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
