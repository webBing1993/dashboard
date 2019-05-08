
/*
 * 微前台2.0配置action
 * */
module.exports = {
  //酒店状态列表
  getHotelServer(ctx, params) {
    ctx.dispatch('resource', {
      url: 'hotelServiceConfigs/hotelId?hotelId='+params.data.hotelId,
      method: 'post',
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
      url: 'hotelServiceConfigs/hotelserviceconfig',
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
      url: '/hotelServiceConfigs/hotelIds',
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
