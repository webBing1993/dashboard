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
      headers: {
        'content-type':'application/json;charset=UTF-8'
      },
      body:{
        "amount":param.amount,  //金额
        "businessType":param.businessType,   //消费类型 REVERSE:冲账,CHARGE:充值
        "transactionNumber":param.transactionNumber, //交易单号
        "contractNumber":param.contractNumber, //合同号
        "remark":param.remark, //备注
        "payType":param.payType, // 支付方式
      },
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
        'X-Page-Size': param.size || '0',
        'content-type':'application/json;charset=UTF-8'
      },
      body:{
        "transactionNumber":param.transactionNumber,
        "businessTypes":param.businessTypes,//消费类型
        "invoiced":param.invoiced,//已开票
        "createTimeStart":param.createTimeStart,//时间区间 - 开始
        "createTimeEnd":param.createTimeEnd,//时间区间 - 结束

      },
      emulateJSON: false,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //修改酒店账户开票标记
  makeSign(ctx,param){
    ctx.dispatch('resource', {
      url: `/hotel/expense/record/${param.hotelid}/invoiced`,
      method: 'POST',
      headers: {
        'content-type':'application/json;charset=UTF-8'
      },
      body:{
       "ids":param.ids
      },
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
    },
  //消费记录列表
  getHotelExpense(ctx,param){
    ctx.dispatch('resource', {
      url: `/hotel/expense/record/${param.hotelid}`,
      method: 'POST',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0',
        'content-type':'application/json;charset=UTF-8'
      },
      body:{
        "transactionNumber":param.transactionNumber,
        "businessTypes":param.businessTypes,//消费类型
        "payerTypes":param.payerTypes,  //支付放类型
        "invoiced":param.invoiced,//已开票
        "createTimeStart":param.createTimeStart,//时间区间 - 开始
        "createTimeEnd":param.createTimeEnd,//时间区间 - 结束

      },
      emulateJSON: false,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }

}
