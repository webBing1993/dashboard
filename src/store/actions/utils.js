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
    ctx.commit('LOADING', 1)
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
          param.method && !param.url.match(/getInfo/) && !param.url.match(/login/) ? ctx.dispatch('showtoast') : null
          param.onSuccess ? param.onSuccess(response.body, response.headers) : null
        } else {
          ctx.dispatch('showtoast', 'errcode:' + response.body.errcode + ';\n errmsg:' + response.body.errmsg);
        }
      }
    ).catch(
      error => {
        //ErrorCallback
        ctx.dispatch('showtoast', error.status === 401 ? '登录失效!' : 'Request Error');
      }
    ).finally(
      final => {
        ctx.commit('LOADING')
      }
    )
  }
}
