
const state = {
  configData: {},
  pmsData: {},
  lvyeData: {},
  wechatAppData: []
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
  }
}

module.exports = {
  state,
  mutations
}
