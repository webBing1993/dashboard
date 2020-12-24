/**
 * 企业楼宇房间管理action
 */

module.exports = {
  getRoom(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/rooms/${param.roomId}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyRoom(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/rooms/${param.room_id}`,
      method:'PUT',
      body: param.data,
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getRoomList(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/rooms`,
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
