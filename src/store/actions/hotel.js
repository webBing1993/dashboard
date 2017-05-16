module.exports = {
  gethotelinfo(ctx, hotel_id){
    ctx.dispatch('resource', {
      url: '/hotel/' + hotel_id,
      onSuccess: body => ctx.commit('HOTEL', body.data)
    })
  }
}
