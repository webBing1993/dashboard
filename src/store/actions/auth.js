module.exports = {
  regist(ctx, param){
    ctx.dispatch('resource', {
      url: '/register',
      method:'POST',
      body: {
        userName: param.userName,
        password: param.password,
        name: param.name,
        email: param.email,
        mobile: param.mobile,
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  login(ctx, param){
    ctx.dispatch('resource', {
      url: '/login',
      method:'POST',
      body: {
        userName: param.userName,
        password: param.password
      },
      onSuccess: body => {
        sessionStorage.setItem('session_id', body.data.session_id)
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  logout(ctx, param){
    ctx.dispatch('resource', {
      url: '/logout',
      method:'POST',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
}
