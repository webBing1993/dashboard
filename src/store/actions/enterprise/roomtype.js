/**
 * 企业房型配置管理action
 */

module.exports = {
  // 对接情况下编辑
  patchRoomType(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/roomtype/${param.room_type_id}`,
      method:'PATCH',
      body: {
        room_type_id: param.room_type_id,
        ...param.data
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 非对接情况下编辑
  ChangeRoomType(ctx, param){
    ctx.dispatch('resource', {
      url: `/roomtype/config/${param.hotel_id}`,
      method:'put',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getRoomTypeLists(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/roomtype`,
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  // 判断是否pms对接
  checkPmsConnection(ctx, param){
    ctx.dispatch('resource', {
      url: `/roomtype/pms/${param.hotel_id}`,
      method:'GET',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 添加房型接口
  addRoomType(ctx, param){
    ctx.dispatch('resource', {
      url: `/roomtype/config/${param.hotel_id}`,
      method:'post',
      body:{
        name:param.name,
        max_guest_count:param.max_guest_count,
        pms_code:param.pms_code
      },
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 删除房型接口
  delCurrentRoomType(ctx, param){
    ctx.dispatch('resource', {
      url: `/roomtype/delete/${param.room_type_id}`,
      method:'delete',
      onSuccess: (body) => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
