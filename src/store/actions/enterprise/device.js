/**
 * 企业设备管理action
 */
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
        mac_address: param.mac_address,
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
  saveIsShowPadName(ctx, param){
    ctx.dispatch('resource', {
      url:`/hotel/${param.hotel_id}/setDeviceNameShow`,
      body:{
          "enabled_mirror_show_device_name":param.data.toString()
      },
      method:'PATCh',
      onSuccess:body=>{
          param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getShowDeviceNameStatus(ctx, param){
    ctx.dispatch('resource', {
      url:`/hotel/getShowDeviceNameStatus/${param.hotel_id}`,
      method:'GET',
      onSuccess:body=>{
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
        mac_address: param.mac_address,
        partner_id: param.partner_id,
        enabled: param.enabled
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
//     周桂桃 5-28 上午11:07
//     post  /devices/deleteDevice
// 周桂桃 5-28 上午11:08
// {
//   "hotelId":"0864f6731acb11e780ad5cb9018d9b5c", //酒店ID
//   "deviceType":"",//设备类型 21 人证通,22 发卡机 ,31 - 底座,32 - PAD
//   "deviceId:""//设备Id
// }

removeDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/devices/deleteDevice`,
      method:'DELETE',
      body: {
        hotelId: param.hotelId,
        deviceType: param.device_type,
        deviceId: param.device_id,
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 获取设备类型列表
  getDeviceTypeList(ctx, param){
    ctx.dispatch('resource', {
      url: '/deviceType/getAll',
      method:'get',
      onSuccess: (body,) => {
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
        hotel_id: param.hotel_id,
      },
      onSuccess: (body, headers) => {
        ctx.commit('SETDEVICELIST', body.data || [])
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  vagrantList(ctx, param){
    ctx.dispatch('resource', {
      url: '/devices/vagrant',
      method:'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
