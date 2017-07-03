module.exports = {
  getStatus(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/status/${param.hotel_id}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyStatus(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/status/${param.hotel_id}`,
      method:'PUT',
      body: {
        hotel_id: param.hotel_id,
        status: param.status,
        memo: param.memo
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
