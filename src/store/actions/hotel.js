module.exports = {
  getHotelList(ctx, param){
    ctx.dispatch('resource', {
      url: 'http://localhost:8080/',
      method:'GET',
      params: {
        search: param.searchVal,
        id: param.id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
