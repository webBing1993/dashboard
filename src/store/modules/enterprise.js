
const state = {
  configData: {},
  pmsData: {},
  lvyeData: {},
  wechatAppData: [],
  tempGroupName: '',
  tempHotelName: '',
  deviceList: [],
  // faceIdentify:{}
  // wxhotelCityser:{}
}

// mutations
const mutations = {
  // FACEIDENTIFY(state,payload){
  //   state.faceIdentify=payload;
  // },
  // WXHOTELCITYSER(state,payload) {
  //   state.wxhotelCityser = payload;
  // },
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
  },
  SETDEVICELIST(state,payload) {
    state.deviceList = payload;
  }
}

module.exports = {
  state,
  mutations
}
