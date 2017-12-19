/**
 * 接待区action
 */
module.exports = {
  getRecpetion(ctx, param) {
    ctx.dispatch('resource', {
      url: `/receptionArea/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  saveRecpetion(ctx, param) {
    ctx.dispatch('resource', {
      url: `/receptionArea/${param.hotel_id}`,
      method: 'POST',
      body: {
        name: param.name,
        address: param.address,
        tel: param.tel,
        room_type: param.roomTypeList,
        lvye_config_id: param.lvyeConfigId
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  searchRoomType() {
    ctx.dispatch('resource', {
      url: `/roomtype/${param.hotel_id}`,
      method: 'GET',
      body: {
        area_id: param.areaId
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  searchLvye(){
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
