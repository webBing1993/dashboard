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
      body: {
        hotel_id: param.hotel_id,
        room_id: param.room_id,
        building_name: param.building_name,
        floor_name: param.floor_name,
        room_num: param.room_num,
        room_type_name: param.room_type_name,
        roomfeature_desc: param.roomfeature_desc,
        room_lock_sn: param.room_lock_sn
      },
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
