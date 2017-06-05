module.exports = {
  getRoom(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotelId}/rooms/${param.roomId}`,
      method:'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getRoomList(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotelId}/rooms`,
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
