/*
企业上线状态管理action
 */

module.exports = {
  getHotelStaff(ctx, param) {
    ctx.dispatch('resource', {
      url: `/onlineTool/getOperatorsInfo/${param.hotel_id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  modifyStatus(ctx, param) {
    ctx.dispatch('resource', {
      url: `/onlineTool/updateOperatorStatus/${param.id}`,
      method:'POST',
      body: {
        status: param.status
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
