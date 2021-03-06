import Vue from 'vue'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

/**
 * 工具action
 */
import axios from 'axios'

import router from '../../router'

module.exports = {
  formatdate:(ctx, param,status)=>{
    if (param) {
      var date = new Date(param);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      if(status=='YYYY-MM-DD'){
        return Y+M+D
      }else {
        return Y+M+D+h+m+s;
      }

    }
  },
  //路由跳转
  goto: (ctx, param) => {
      if (typeof param === 'number') {
        router.go(param)
      } else if (typeof param === 'string') {
        router.push(param)
      } else if (typeof param === 'object' && param.path) {
        router.push({
          path: param.path,
          query: {
            ...param.query
          },
          params: {
            ...param.params
          }
        })
      } else if (typeof param === 'object' && param.name) {
        router.push({
          name: param.name,
          query: {
            ...param.query
          },
          params: {
            ...param.params
          }
        })
      }
  },
  replaceto: (ctx, param) => {
    if (typeof param === 'string') {
        router.replace(param)
      } else if (typeof param === 'object' && param.path) {
        router.replace({
          path: param.path,
          query: {
            ...param.query
          },
          params: {
            ...param.params
          }
        })
      } else if (typeof param === 'object' && param.name) {
        router.replace({
          name: param.name,
          query: {
            ...param.query
          },
          params: {
            ...param.params
          }
        })
      }
  },
  //地址请求
  urlquery(ctx) {
    let o = {}
    decodeURIComponent(window.location.search).split('&').forEach(i => i ? o[i.split(/=/)[0].replace(/\?/, '')] = i.split(/=/)[1] : null)
  },
  // _fetch: async (ctx, param) => {
  //   ctx.commit('LOADING', 1);

  //   //headers
  //   let headers = new Headers({
  //     ...param.headers
  //   });
  //   if (!headers.has("Content-Type")) {
  //     headers.append('Content-Type', 'application/json;charset=UTF-8'); //默认为json
  //   }
  //   if (!param.url.match(/register/) && !param.url.match(/login/) ) {
  //     headers.append('Session', sessionStorage.getItem('session_id'));
  //   }

  //   //url, url params
  //   let urlStr = param.url == '/cos/get_sign' ? '/libra' + param.url : '/virgo' + param.url;
  //   let url = new URL(`${window.location.protocol}//${window.location.host}${urlStr}`);
  //   // let url = new URL(param.url == '/cos/get_sign' ? '/libra' + param.url : '/virgo' + param.url);
  //   if (param.params) {
  //     Object.keys(param.params).forEach(key => url.searchParams.append(key, param.params[key]))
  //   }

  //   let body;
  //   if (param.formData) {
  //     body = Object.keys(param.formData).map((key) => {
  //       return encodeURIComponent(key) + '=' + encodeURIComponent(param.formData[key]);
  //     }).join('&');
  //   } else if (param.body) {
  //     body = JSON.stringify(param.body) || null;
  //   }

  //   let requestParam = {
  //     method: param.method || "GET",
  //     headers: headers,
  //     body: body,
  //     mode: 'cors',
  //     // credentials: 'include',
  //     // cache: 'default'
  //   }

  //   let request = new Request(url, requestParam);

  //   try {
  //     ctx.commit('LOADING')
  //     let response = await _fetchRequest(fetch(request), param.timeout || 5000);
  //     // console.log(response)

  //     if (response.ok) {
  //       param.method != 'GET' && !param.url.match(/getInfo/) && !param.url.match(/login/) && !param.url.match(/\/cos\/get_sign/) ? ctx.dispatch('showtoast',{type: 'success'}) : null
  //       if (+response.status === 200) {
  //         let data = await response.json();
  //         param.onSuccess ? param.onSuccess(data, response.headers) : null
  //       } else if (+response.status === 204) {
  //         param.onSuccess ? param.onSuccess(null, response.headers) : null
  //       }
  //     } else {
  //       if (+response.status === 401) {
  //         ctx.dispatch('showalert', {
  //           code: +response.status,
  //           content: '登录失效!'
  //         });
  //       } else if (+response.status === 400) {
  //         ctx.dispatch('showtoast', {text: 'Bad Request', type: 'error'});
  //       } else if (+response.status === 404) {
  //         ctx.dispatch('showtoast', {text: 'Not Found', type: 'error'});
  //       } else if (+response.status === 500) {
  //         ctx.dispatch('showtoast', {text: 'Internal Server Error', type: 'error'});
  //       } else {
  //         ctx.dispatch('showtoast', {text: 'Request Error', type: 'error'});
  //       }
  //       if (param.url.match(/getInfo/) && param.onFail) {
  //         param.onFail({name: '获取失败'})
  //       }
  //     }
  //   } catch(e) {
  //     ctx.commit('LOADING')
  //     /**按照 MDN 的 说法 ，fetch 只有在遇到网络错误的时候才会 reject 这个 promise，比如用户断网或请求地址的域名无法解析等。
  //      * 只要服务器能够返回 HTTP 响应（甚至只是 CORS preflight 的 OPTIONS 响应），promise 一定是 resolved 的状态。 */
  //     console.log("Oops, error", e);
  //     ctx.dispatch('showtoast', {text: 'Request Error', type: 'error'});
  //   }
  // },

  // resource: (ctx, param) => {
  //   let headers = param.headers || {};
  //   if (!param.url.match(/register/) && !param.url.match(/login/) ) {
  //     headers.Session = sessionStorage.getItem('session_id');
  //   }
  //   ctx.commit('LOADING', 1)
  //   Vue.http({
  //     url: param.url == '/cos/get_sign' ? '/libra' + param.url : '/virgo' + param.url,
  //     body: param.body || null,
  //     headers: headers,
  //     params: param.params || null,
  //     method: param.method || "GET",
  //     timeout: param.timeout || 5000,
  //     credentials: false,
  //     emulateHTTP: false,
  //     emulateJSON: false,
  //   }).then(
  //     response => {
  //       if (+response.body.errcode === 0 || +response.status == 204) {
  //         param.method != 'GET' && !param.url.match(/getInfo/) && !param.url.match(/login/) && !param.url.match(/\/cos\/get_sign/) ? ctx.dispatch('showtoast',{type: 'success'}) : null
  //         param.onSuccess ? param.onSuccess(response.body, response.headers) : null
  //       } else {
  //         //ctx.dispatch('showtoast', 'errcode:' + response.body.errcode + ';\n errmsg:' + response.body.errmsg);
  //         ctx.dispatch('showtoast', {text: response.body.errmsg, type:'warning'});
  //         param.onFail ? param.onFail(response) : null
  //       }
  //     }
  //   ).catch(
  //     error => {
  //       //ErrorCallback
  //       if (error.status === 401) {
  //         ctx.dispatch('showalert', {
  //           code: error.status,
  //           content: '登录失效!'
  //         });
  //       } else if (error.status === 400) {
  //         ctx.dispatch('showtoast', {text: 'Bad Request', type: 'error'});
  //       } else if (error.status === 404) {
  //         ctx.dispatch('showtoast', {text: 'Not Found', type: 'error'});
  //       } else if (error.status === 500) {
  //         ctx.dispatch('showtoast', {text: 'Internal Server Error', type: 'error'});
  //       } else {
  //         // console.log(error)
  //         ctx.dispatch('showtoast', {text: 'Request Error', type: 'error'});
  //       }
  //       if (param.url.match(/getInfo/) && param.onFail) {
  //         param.onFail({name: '获取失败'})
  //       }
  //     }
  //   ).finally(
  //     final => {
  //       ctx.commit('LOADING')
  //     }
  //   )
  // }

  /*
   * 请求数据交互
   */
  resource: (ctx, param) => {
    let headers = param.headers || {};
    if (!param.url.match(/register/) && !param.url.match(/login/) ) {
      headers.Session = sessionStorage.getItem('session_id');
    }
    ctx.commit('LOADING', 1)

    axios({
      url: param.url == '/cos/get_sign' ? '/libra' + param.url : '/virgo' + param.url,
      method: param.method || "GET",
      baseURL: param.baseURL || null,
      headers: headers,
      params: param.params || null,
      data: param.body || null,
      timeout: param.timeout || 30000,
    }).then(
      response => {
        // console.log(response.status)
        ctx.commit('LOADING')
        if (+response.data.errcode == 0 || +response.status == 204) {
          if (response.data.errcode != '') {
            param.method != 'GET' && !param.url.match(/getInfo/)&& !param.url.match(/lvye/) && !param.url.match(/login/)&& !param.url.match(/howmuchPayConfig\/all/)&& !param.url.match(/hotelConfigDetail/)&& !param.url.match(/hotelFunItemConfig/)&& !param.url.match(/hotelRoomTypeConfig/) && !param.url.match(/\/cos\/get_sign/) ? ctx.dispatch('showtoast',{type: 'success'}) : null;
          }else {
            ctx.dispatch('showtoast', {text: response.data.errmsg, type:'warning'});
          }
          param.onSuccess ? param.onSuccess(response.data, response.headers) : null
        } else {
          ctx.dispatch('showtoast', {text: response.data.errmsg, type:'warning'});
          param.onFail ? param.onFail(response) : null
        }
      }
    ).catch(
      error => {
        ctx.commit('LOADING')
        // console.log(error)

        for(let key in error) {
          console.log(key,error[key])
        }

        if (!error.response && error.code === 'ECONNABORTED') {
          ctx.dispatch('showtoast', {text: '请求超时', type: 'error'});
          return;
        }
        if(!error.response){
          return;
        }
        let status = error.response.status;

        //ErrorCallback
        if (status === 401) {
          ctx.dispatch('showalert', {
            code: status,
            content: '登录失效!'
          });
          router.push('/auth')
        } else if (status === 400) {
          ctx.dispatch('showtoast', {text: 'Bad Request', type: 'error'});
        } else if (status === 404) {
          ctx.dispatch('showtoast', {text: 'Not Found', type: 'error'});
        } else if (status === 500) {
          ctx.dispatch('showtoast', {text: 'Internal Server Error', type: 'error'});
        } else {
          // console.log(error)
          ctx.dispatch('showtoast', {text: 'Request Error', type: 'error'});
        }
        if (param.url.match(/getInfo/) && param.onFail) {
          param.onFail({name: '获取失败'})
        }
      }
    )
  },
  request: (ctx, param) => {
    // ctx.dispatch ('showLoading', true);
    ctx.commit('LOADING', 1)
    let headers = param.headers || {};
    // headers.Session = sessionStorage.getItem('session_id');
    axios({
      url: '/report-service'+param.url,
      method: param.method || 'GET',
      baseURL: '',
      // baseURL: ':9201',
      headers: headers,
      params: param.params || null,
      data: param.body || null,
      timeout: param.timeout || 60000,
    }).then(response => {
      console.log("response",response);
      ctx.commit('LOADING')
      // ctx.dispatch ('showLoading', false);
      if (response.config.url.match('export')) {
        param.onSuccess && param.onSuccess(response)
      }
      else if (+response.data.errcode === 0 || +response.status === 204) {
        param.onSuccess && param.onSuccess(response.data, response.headers)
      } else if(response.data.errcode ==2){
        param.onSuccess && param.onSuccess(response.data, response.headers)

      }
      else if (response.data.errcode !== 0) {
        param.onFail && param.onFail(response)
      }
      else {
        param.onFail && param.onFail(response)
      }
    }).catch(
      error => {
        // ctx.dispatch ('showLoading', false);
        ctx.commit('LOADING')
        if(error){
          console.log("error",error)
        }
        let status = error.response.status;
        if (status === 401) {
          router.push('/login')
        }
      }
    )
  },
}


// function _fetchRequest(fetch_promise, timeout) {
//       let abort_fn = null;

//       //这是一个可以被reject的promise
//       let abort_promise = new Promise(function(resolve, reject) {
//              abort_fn = function() {
//                 reject('abort promise');
//              };
//       });

//       //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
//        let abortable_promise = Promise.race([
//              fetch_promise,
//              abort_promise
//        ]);

//        setTimeout(function() {
//              abort_fn();
//         }, timeout);

//        return abortable_promise;
//   }
