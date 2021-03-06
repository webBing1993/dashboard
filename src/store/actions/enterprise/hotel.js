/**
 * 企业酒店管理action
 */
module.exports = {
  addHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: '/hotels',
      method: 'POST',
      body: {
        group_id: param.group_id,
        brand_id: param.brand_id,
        code: param.code,
        alias:param.alias,
        device_numbers:param.device_numbers,
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
        contact_position: param.contact_position,
        type: param.type
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method: 'GET',
      onSuccess: body => {
        if (body.data && body.data.type === "UNION") {
          ctx.commit('SHOWRECEPTION', true);
        } else {
          ctx.commit('SHOWRECEPTION', false);
        }
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

    getCorpids(ctx, param){
        ctx.dispatch('resource', {
            url: `/corpids`,
            method: 'GET',
            onSuccess: body => {
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
  modifyHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method: 'PUT',
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
        alias:param.alias,
        device_numbers:param.device_numbers,
        longitude: param.longitude,
        latitude: param.latitude,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        contact_position: param.contact_position,
        type: param.type
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null;
        if (param.type === "UNION") {
          ctx.commit('SHOWRECEPTION', true);
        } else {
          ctx.commit('SHOWRECEPTION', false);
        }
      }
    })
  },
  removeHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.id}`,
      method: 'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getHotelList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/hotels',
      method: 'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: {
        device_id: param.device_id || '',
        group_id: param.group_id || '',
        keyword: param.keyword || '',
        hotel_version: param.hotel_version || ''
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  getVersionList(ctx, param){
    ctx.dispatch('resource', {
      url: `/grayrelease?offset=`+param.offset+`&limit=`+param.limit,
      method:'GET',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
