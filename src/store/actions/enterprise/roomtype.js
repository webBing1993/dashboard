module.exports = {
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
  getRoomTypeList(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/roomtype`,
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
