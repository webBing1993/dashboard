
// /productLine/{hotel_id}/hotelFunItemConfig
module.exports = {
  // 开通产品配置
  getProdConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/productLine/${param.hotel_id}/hotelFunItemConfig`,
      method: 'get',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setProdConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/productLine/${param.hotel_id}/hotelFunItemConfig`,
      method: 'post',
      // body: param.data,
      body: {
        code:param.code,
        status:param.status,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })

  },
}
