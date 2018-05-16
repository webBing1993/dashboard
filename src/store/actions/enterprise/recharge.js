/**
 * 充值
 */
module.exports = {
  // 充值记录列表接口
  getRechargeList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rechargelist/${param.hotel_id}/?offset=` + param.offset + `&limit=` + param.limit,
      method: 'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      // x-total-count
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  // 无证核验使用详情
  getwithoutCardList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/undocumented/list`,
      method: 'post',
      body:{
        hotelId:param.hotelId,
        startDate:param.startDate,
        endDate:param.endDate,
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
