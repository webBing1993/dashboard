/**
 * 企业酒店管理action
 */
module.exports = {
  //酒店账户信息
  getHotelAccout(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/account/${param.hotelid}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //充值冲帐
  getHotelrecharge(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/account/charge/${param.hotelid}`,
      method: 'POST',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //查询账单列表
  demandBill(ctx,param){
    ctx.dispatch('resource', {
      url: `/hotel/account/bill/${param.hotelid}`,
      method: 'POST',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //修改酒店账户开票标记
  makeSign(ctx,param){
    ctx.dispatch('resource', {
      url: `/hotel/account/${param.hotelid}/invoiced`,
      method: 'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //支付类型code字典
    getHotelCode(ctx,param){
      ctx.dispatch('resource', {
        url: `/sys/dic/${param.code}`,
        method: 'GET',
        onSuccess: (body, headers) => {
          param.onsuccess ? param.onsuccess(body, headers) : null
        }
      })
    }

}
