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
import tableRoomType from '@/modules/Tables/table-roomtype.vue'
import tableMiniApp from '@/modules/Tables/table-miniapp.vue'
import tableWechatpay from '@/modules/Tables/table-wechatpay.vue'
import tableMiniappmsg from '@/modules/Tables/table-miniappmsg.vue'

Vue.component('table-group', tableGroup)
Vue.component('table-hotel', tableHotel)
Vue.component('table-brand', tableBrand)
Vue.component('table-device', tableDevice)
Vue.component('table-room', tableRoom)
Vue.component('table-roomtype', tableRoomType)
Vue.component('table-miniapp', tableMiniApp)
Vue.component('table-wechatpay', tableWechatpay)
Vue.component('table-miniappmsg', tableMiniappmsg)

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
