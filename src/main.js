// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

// Mockdata
// import './mock';

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

// Components
Vue.component('XButton', require('./components/Displays/button.vue'))
Vue.component('Toast', require('./components/Layers/toast.vue'))
Vue.component('Alert', require('./components/Layers/alert.vue'))
Vue.component('popup', require('./components/Layers/popup'))
Vue.component('Group', require('./components/List/group.vue'))
Vue.component('XInput', require('./components/Forms/x-input.vue'))

Vue.component('xpage', require('./components/web-component-page.vue'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
