import qs from 'qs';
module.exports = {
  // 在线收银统计
  getTradeList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/payment/pre-authorization/page`,
      method: 'POST',
      body: param.data,
      headers: {
        'X-Current-Page': param.data.page || '1',
        'X-Page-Size': param.data.size || '0'
      },
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 人证通新增统计
  getRZTAddSta(ctx, param) {
    ctx.dispatch('resource', {
      url: `/statistic/rzt`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: qs.stringify(param.data),
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 酒店运营数据统计
  getHotelOperateSta(ctx, param) {
    ctx.dispatch('resource', {
      url: `/statistic/hotelData`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: qs.stringify(param.data),
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 酒店支付统计
  getHotelPaySta(ctx, param) {
    ctx.dispatch('resource', {
      url: `/statistic/pays`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: qs.stringify(param.data),
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  //获取酒店列表（酒店运营数据统计 酒店支付统计相关）
  getHotelListSta(ctx, param) {
    ctx.dispatch('resource', {
      url: `/statistic/hotels`,
      method: 'GET',
      onSuccess: body => {
        // ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
