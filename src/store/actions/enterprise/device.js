module.exports = {
  // addDevice(ctx, param) {
  //   ctx.dispatch('resource', {
  //     url: '/devices',
  //     method:'POST',
  //     body: {
  //       group_id: param.group_id,
  //       hotel_id: param.hotel_id,
  //       device_id: param.device_id,
  //       device_type: param.device_type,
  //       device_name: param.device_name,
  //       partner_id: param.partner_id,
  //       enabled: param.enabled
  //     },
  //     onSuccess: body => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // getDevice(ctx, param) {
  //   ctx.dispatch('resource', {
  //     url: `/devices/${param.device_id}`,
  //     method:'GET',
  //     onSuccess: body => {
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // modifyDevice(ctx, param) {
  //   ctx.dispatch('resource', {
  //     url: `/devices/${param.old_device_id}`,
  //     method:'PUT',
  //     body: {
  //       hotel_id: param.hotel_id,
  //       // group_id: param.group_id,
  //       // device_id: param.device_id,
  //       device_type: param.device_type,
  //       device_name: param.device_name,
  //       partner_id: param.partner_id,
  //       enabled: param.enabled
  //     },
  //     onSuccess: body => {
  //       ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // removeDevice(ctx, param) {
  //   console.log(param.device_id)
  //   ctx.dispatch('resource', {
  //     url: `/devices/${param.device_id}`,
  //     method:'DELETE',
  //     onSuccess: body => {
  //       ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  // getDeviceList(ctx, param){
  //   ctx.dispatch('resource', {
  //     url: '/devices',
  //     method:'GET',
  //     headers: {
  //       'X-Current-Page': param.page || '1',
  //       'X-Page-Size': param.size || '0'
  //     },
  //     params: {
  //       hotel_id: param.hotel_id
  //     },
  //     onSuccess: (body, headers) => {
  //       param.onsuccess ? param.onsuccess(body, headers) : null
  //     }
  //   })
  // }

  addDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: '/devices',
      method:'POST',
      body: {
        hotel_id: param.hotel_id,
        device_id: param.device_id,
        device_type: param.device_type,
        device_name: param.device_name,
        partner_id: param.partner_id,
        enabled: param.enabled
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/devices/${param.device_id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/devices/${param.device_id}`,
      method:'PUT',
      body: {
        hotel_id: param.hotel_id,
        device_type: param.device_type,
        device_name: param.device_name,
        partner_id: param.partner_id,
        enabled: param.enabled
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/devices/${param.device_id}`,
      method:'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getDeviceList(ctx, param){
    ctx.dispatch('resource', {
      url: '/devicesList',
      method:'POST',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      body: {
        hotel_id: param.hotel_id
      },
      onSuccess: (body, headers) => {
        ctx.commit('SETDEVICELIST', body.data || [])
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  vagrantList(ctx, param){
    ctx.dispatch('resource', {
      url: '/device/vagrant',
      method:'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
