// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

// Mockdata
// import './mock';

Vue.config.productionTip = false

// Components
Vue.component('XButton', require('./components/Displays/button.vue'))
Vue.component('xpage', require('./components/web-component-page.vue'))
Vue.component('Toast', require('./components/Layers/toast.vue'))
Vue.component('alert', require('./components/Layers/alert.vue'))
Vue.component('popup', require('./components/Layers/popup'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
