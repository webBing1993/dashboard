/*
* 企业门店配置管理action
* */
module.exports = {
  setRCconfig(ctx, param) {
    // ctx.dispatch('resource', {
    //   url: "/rcConfig",
    //   method:'post',
    //   headers:{"Content-Type":"application/json;charset=UTF-8"},
    //   // Content-Type:application/json;charset=UTF-8
    //   onSuccess: body => {
    //     // ctx.commit('CONFIGDATA', body.data)
    //     param.onsuccess ? param.onsuccess(body) : null
    //   }
    // })
    ctx.dispatch('resource', {
      url: "/rcConfig",
      method:'post',
      body: {
        // hotel_id: param.hotel_id,
        ...param.data
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type:'success'});

        let obj = {
          ...ctx.state.enterprise.configData
        }
        for(let key in body.data) {
          obj[key] = body.data[key];
        }
        ctx.commit('CONFIGDATA', obj)

        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getRCconfig(ctx, param) {
    ctx.dispatch('resource', {
      url: `/fileUpload/${param.hotel_id}`,
      method:'post',
      onSuccess: body => {
        // ctx.commit('CONFIGDATA', body.data)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
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
  deleteWxHotel(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotels/${param.hotel_id}/wxhotel/${param.wx_hotel_id}`,
      method: 'DELETE',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
    })
  },
  getlvyeTypeList(ctx, param) {//获取旅业系统配置
    ctx.dispatch('resource', {
      url: `/hotel/lvyetypes`,
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
    })
  },
  patchConfig(ctx, param) {
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
    } else if (param.data.pms_type == 2 || param.data.pms_type == 7) {
      urlQuery = `/hotel/${param.hotel_id}/pmsLyXr`;
    }
    else if (param.data.pms_type == 3) {
      urlQuery = `/hotel/${param.hotel_id}/pmsZhuZhe`;
    }
    else if (param.data.pms_type == 8) {
      urlQuery = `/hotel/${param.hotel_id}/pmsdc`;
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
  getMoreLvye(ctx, param) {
    console.log('zsj:' + param.hotel_id)
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'GET',
      onSuccess: body => {
        console.log("iiiiiiiiiiiiii")
        if (body.data) {
          let tempData = [];
          console.log("数据:" + JSON.stringify(body.data));
          body.data.forEach(function (item, index) {
            let obj = {
              id: item.id,
              lvyeName: item.name,
              reportChannel: item.report_channel,
              reportType: item.report_type,
              lvyeId: item.lvye_id,
              transitParam: item.transit_param,
              descrption: item.descrption,
              autoReport: item.auto_report === 1 ? true : false,
              enabledReport: item.enabled_report === 1 ? true : false
            }
            tempData.push(obj);
          });
          console.log("数据:" + JSON.stringify(tempData));
          ctx.commit('MORELVYEATA', tempData)
        }
        else {
          ctx.commit('MORELVYEATA', [])
        }
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
  modifyMoreLvye(ctx, param) {
    let obj = {lvye: param.data};
    ctx.dispatch('resource', {
      url: `/morelvye/${param.hotel_id}`,
      method: 'POST',
      body: obj,
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '配置成功', type: 'success'});
        ctx.commit('MORELVYEATA', param.data);
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  deleteMoreLvye(ctx, param) {
    ctx.dispatch('resource', {
      url: `/morelvye/${param.areaId}`,
      method: 'DELETE',
      body: param.data,
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
        //ctx.commit('MORELVYEATA', body.data)
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
  }
}
