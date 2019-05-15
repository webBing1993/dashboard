import qs from 'qs'
/*
 * 微前台2.0配置action
 * */
module.exports = {
  //酒店状态列表
  getHotelServer(ctx, params) {
    ctx.dispatch('resource', {
      url: '/hotelconfig/hotelConfigDetail',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:qs.stringify(params.data),
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  getHotelServiceConfigs(ctx, params) {
    ctx.dispatch('resource', {
      url: '/hotelconfig/hotelRoomTypeConfig',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
  //服务状态修改
  getHotelIdsStatus(ctx, params) {
    ctx.dispatch('resource', {
      url: '/hotelconfig/update',
      method: 'post',
      body: params.data,
      onSuccess: (body) => {
        params.onsuccess && params.onsuccess(body)
      },
      onFail: body => {
        params.onfail && params.onfail(body)
      }
    })
  },
}
