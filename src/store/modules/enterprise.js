
const state = {
  configData: {},
  pmsData: {},
  lvyeData: {},
  wechatAppData: [],
  tempGroupName: '',
  tempHotelName: ''
}

// mutations
const mutations = {
  CONFIGDATA(state,payload) {
    state.configData = payload;
  },
  PMSDATA(state,payload) {
    state.pmsData = payload;
  },
  LVYEATA(state,payload) {
    state.lvyeData = payload;
  },
  WECHATAPPDATA(state,payload) {
    state.wechatAppData = payload;
  },
  SETTEMPGROUPNAME(state,payload) {
    state.tempGroupName = payload;
  },
  SETTEMPHOTELNAME(state,payload) {
    state.tempHotelName = payload;
  }
}

module.exports = {
  state,
  mutations
}
