/**
 * 小程序action
 */
module.exports = {
  getList(ctx, param){
    ctx.dispatch('resource', {
      url: '/order/orderNumber?hotel_id=31dff23aa6d04f2c8a3d0597995b218a&bigin_time=2019-01-17',
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //订单入住筛选
  getStatistics(ctx,param){
    ctx.dispatch('resource',{
      url:'/cur/getStatistics?hotelId='+param.hotelId+'&startTime='+param.dateTime+'&endTime='+param.endTime,
      method:'GET',
      onSuccess:body=>{
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // //获得酒店列表
  // getHotelList1(ctx,param){
  //   ctx.dispatch('resource',{
  //     url:'/cur/getHotel?page='+param.page+'&pageSize='+param.pageSize,
  //     method:'GET',
  //     onSuccess:body=>{
  //       param.onsuccess ? param.onsuccess(body) : null
  //     }
  //   })
  // },
  //获得人证通统计列表
  getRZTStatistics(ctx,param){
    ctx.dispatch('resource',{
      url:'/cur/getWitnessCard?hotelId='+param.hotelId,
      method:'GET',
      onSuccess:body=>{
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //获得pms酒店
  getPMSHotelList(ctx,param){
    ctx.dispatch('resource',{
      url:'/cur/getPmsSystem',
      method:'GET',
      onSuccess:body=>{
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 获取小程序使用酒店
  getxcxHotelList(ctx,param){
    ctx.dispatch('resource',{
      url: '/cur/getSmallProgram?hotelId='+param.hotelId+'&startTime='+param.startTime+'&endTime='+param.endTime,
      method: 'GET',
      onSuccess:body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
