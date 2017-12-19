/**
 * 接待区action
 */
module.exports = {
  getRecpetion(ctx, param) {
    ctx.dispatch('resource', {
      url: `/receptionArea/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        // console.log("getRecpetion:" + JSON.stringify(body.data));
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  saveRecpetion(ctx, param) {
    ctx.dispatch('resource', {
      url: `/receptionArea/${param.hotel_id}`,
      method: 'POST',
      body: {
        id: param.id,
        name: param.name,
        address: param.address,
        tel: param.tel,
        room_type: param.room_type,
        lvye_config_id: param.lvyeConfigId
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  searchRoomType(ctx, param) {
    ctx.dispatch('resource', {
      url: `/roomtype/${param.hotel_id}?area_id=${param.areaId}`,
      method: 'GET',
      onSuccess: body => {
        // console.log("searchRoomType:" + JSON.stringify(body))
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  searchLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        // console.log("searchLvye:" + JSON.stringify(body))
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
