module.exports = {
  USER_INFO(state,payload){
    sessionStorage.setItem('userInfo', JSON.stringify(payload))
    state.userInfo = payload;
  }
}