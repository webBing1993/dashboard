import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from '../../router'

module.exports = {
  goto: (ctx, param) => {
    typeof param === 'number'
      ? router.go(param)
      : router.push(param)
  },
  replaceto: (ctx, param) => {
    router.replace(param)
  },
  urlquery(ctx) {
    let o = {}
    decodeURIComponent(window.location.search).split('&').forEach(i => i ? o[i.split(/=/)[0].replace(/\?/, '')] = i.split(/=/)[1] : null)
  },
  resource: (ctx, param) => {
    let headers = param.headers || {};
    if (param.url != '/register' && param.url != '/login' ) {
      headers.Session = sessionStorage.getItem('session_id');
    }

    Vue.http({
      url: param.url == '/cos/get_sign' ? '/libra' + param.url : '/virgo' + param.url,
      body: param.body || null,
      headers: headers,
      params: param.params || null,
      method: param.method || "GET",
      timeout: param.timeout || 5000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: false,
    }).then(
      response => {
        if (+response.body.errcode === 0) {
          param.onSuccess ? param.onSuccess(response.body, response.headers) : null
        } else {
          param.onFail ? param.onFail(response.body) : alert(response.body.errmsg)
        }
      }
    ).catch(
      error => {
        //ErrorCallback
        if (+error.status === 401) {
          alert('登录过期');
          router.replace('/auth')
        } else {
          alert("操作失败 : " + error.statusText);
        }
      }
    ).finally(
      final => {
        //FinalCallback
      }
    )
  }
}
