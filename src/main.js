// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

// Mockdata
// import './mock';

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

import tableGroup from '@/modules/Tables/table-group.vue'
import tableHotel from '@/modules/Tables/table-hotel.vue'
import tableBrand from '@/modules/Tables/table-brand.vue'
import tableDevice from '@/modules/Tables/table-device.vue'
import tableRoom from '@/modules/Tables/table-room.vue'

Vue.component('table-group', tableGroup)
Vue.component('table-hotel', tableHotel)
Vue.component('table-brand', tableBrand)
Vue.component('table-device', tableDevice)
Vue.component('table-room', tableRoom)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
