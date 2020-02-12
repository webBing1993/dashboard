/**
 * 企业设备管理action
 */
module.exports = {
  getFaceDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/${param.hotelId}/roomdevices`,
      method:'get',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  addFaceDevice(ctx, param) {
    ctx.dispatch('resource', {
      url: `/${param.hotelId}/roomdevices`,
      method:'put',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  deleteDevice(ctx, param){
    ctx.dispatch('resource', {
      url: `/${param.hotelId}/roomdevices`,
      method:'delete',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
