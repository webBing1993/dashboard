/*
 * 企业门店配置管理action
 * */
module.exports = {
  getConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/config`,
      method: 'GET',
      onSuccess: body => {
        ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  setRCconfig(ctx, param) {
    ctx.dispatch('resource', {
      url: "/rcConfig",
      method: 'post',
      body: param.data,
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
    // ctx.dispatch('resource', {
    //   url: "/rcConfig",
    //   method:'post',
    //   body: {
    //     // hotel_id: param.hotel_id,
    //     ...param.data
    //   },
    //   onSuccess: body => {
    //     ctx.dispatch('showtoast', {text: '配置成功', type:'success'});
    //
    //     let obj = {
    //       ...ctx.state.enterprise.configData
    //     }
    //     for(let key in body.data) {
    //       obj[key] = body.data[key];
    //     }
    //     ctx.commit('CONFIGDATA', obj)
    //
    //     param.onsuccess ? param.onsuccess(body) : null
    //   }
    // })
  },
  RCconfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/fileUpload/${param.hotel_id}`,
      method: 'post',
      onSuccess: body => {
        ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //拉已配置的RC数据
  getRCConfiged(ctx, param) {
    ctx.dispatch('resource', {
      url: `/rcConfig/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        // ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //总配置接口
  patchConfig(ctx, param) {
    console.log('wwwwh:', param.data)
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/config`,
      method: 'PATCH',
      body: {
        hotel_id: param.hotel_id,
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type: 'success'});

        let obj = {
          ...ctx.state.enterprise.configData
        }
        for (let key in body.data) {
          obj[key] = body.data[key];
        }
        ctx.commit('CONFIGDATA', obj)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //微信生态酒店注册
  WxhotelRegister(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/config`,
      method: 'PATCH',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      body: {
        hotel_id: param.hotel_id,
        route_code: param.route_code
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
        // ctx.dispatch('showtoast', {text: '注册成功', type:'success'});

      }
    })
  },
  //删除微信生态酒店
  deleteWxHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/wxhotel/${param.wx_hotel_id}`,
      method: 'DELETE',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
    })
  },
  //获取微信生态酒店城市列表
  getWxhotelCityser(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/wxhotelcityservice`,
      method: 'GET',
      onSuccess: body => {
        // ctx.commit('WXHOTELCITYSER', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: () => null
    })
  },
  //获取旅业系统配置
  getlvyeTypeList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/lvyetypes`,
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
    })
  },
  //获取底座配置
  getDeskList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/bottomdevice/${param.hotel_id}`,
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
    })
  },
  //PMS
  getPMS(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/pms`,
      method: 'GET',
      onSuccess: body => {
        ctx.commit('PMSDATA', body.data ? body.data : {})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyPMS(ctx, param) {
    let urlQuery = ``;
    if (param.data.pms_type == 1) {
      urlQuery = `/hotel/${param.hotel_id}/pmsBYH`;
    } else if (param.data.pms_type == 2 || param.data.pms_type == 7 || param.data.pms_type == 11 || param.data.pms_type == 14) {
      urlQuery = `/hotel/${param.hotel_id}/pmsLyXr`;
    }
    else if (param.data.pms_type == 3) {
      urlQuery = `/hotel/${param.hotel_id}/pmsZhuZhe`;
    }
    else if (param.data.pms_type == 8) {
      urlQuery = `/hotel/${param.hotel_id}/pmsdc`;
    }
    else if (param.data.pms_type == 12) {
      urlQuery = `/hotel/${param.hotel_id}/pmsCloudXr`;
    }
    else {
      urlQuery = `/hotel/${param.hotel_id}/pmsJxdQlmYst`;
    }
    ;

    ctx.dispatch('resource', {
      url: urlQuery,
      method: 'PUT',
      body: {
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type: 'success'});
        ctx.commit('PMSDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getPMSBrandList(ctx, param) {
    ctx.dispatch('resource', {
      url: '/pmsbrand',
      method: 'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  //旅业
  getLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/lvye`,
      method: 'GET',
      onSuccess: body => {
        ctx.commit('LVYEATA', body.data ? body.data : {})
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  modifyLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/${param.hotel_id}/lvye`,
      method: 'PUT',
      body: {
        ...param.data
      },
      onSuccess: body => {
        // console.log(param)
        ctx.dispatch('showtoast', {text: '配置成功', type: 'success'});
        ctx.commit('LVYEATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //获取多旅业数据
  getMoreLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        if (body.data && body.data.length > 0) {
          ctx.commit('SHOWMORELVYE', true)
        }
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //保存多旅业数据
  modifyMoreLvye(ctx, param) {
    let obj = {lvye: param.data};
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'POST',
      body: param.data,
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //删除多旅业数据
  deleteMoreLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/morelvye/${param.lvyeId}`,
      method: 'DELETE',
      body: param.data,
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  //同步房间
  syncPMSData(ctx, param) {
    ctx.dispatch('resource', {
      url: '/pms',
      method: 'POST',
      body: {
        hotel_id: param.hotel_id
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      }
    })
  },
  syncPMSTime(ctx, param) {
    ctx.dispatch('resource', {
      url: `/synpms/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  saveScriptUpload(ctx, param){
    ctx.dispatch('resource', {
      url: `/script/${param.hotel_id}`,
      method: 'POST',
      body: param.body,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getServiceTypeScript(ctx, param){
    ctx.dispatch('resource', {
      url: `/script/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getPADMarkConfig(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/gethotelitem/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  savePADMarkConfig(ctx, param){
    ctx.dispatch('resource', {
      url: `/hotel/savehotelhint`,
      method: 'POST',
      body: param.data,
      onSuccess: body => {
        console.log('param.data:', param.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getRoomNum(ctx, param){
    ctx.dispatch('resource', {
      url: `/morelvyemapper/${param.hotel_id}`,
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
  saveReviewRoomNum(ctx, param){
    ctx.dispatch('resource', {
      url: `/morelvyemapper/${param.hotel_id}`,
      body: param.data,
      method: 'POST',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
