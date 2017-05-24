module.exports = {
  TOAST(state, payload){
    state.Interface.toast = {...state.Interface.toast, ...payload}
  },
  LOADING(state, payload){
    state.Interface.loading.show = !!payload
  },
  ALERT(state, payload){
    state.Interface.alert = {...state.Interface.alert, ...payload}
  },
}
