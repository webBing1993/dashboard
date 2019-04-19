// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import VeeValidate from 'vee-validate';

// Vue.use(VeeValidate);
const config = {
  fieldsBagName: 'vee-fields'
}
Vue.use(VeeValidate, config)

// Mockdata
// import './mock';

Vue.config.productionTip = false

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

import tableGroup from '@/modules/Tables/table-group.vue'
import tableList from '@/modules/Tables/table-list.vue'
import tableHotel from '@/modules/Tables/table-hotel.vue'
import tableBrand from '@/modules/Tables/table-brand.vue'
import tableDevice from '@/modules/Tables/table-device.vue'
import tableRoom from '@/modules/Tables/table-room.vue'
import tableRoomType from '@/modules/Tables/table-roomtype.vue'
import tableMiniApp from '@/modules/Tables/table-miniapp.vue'
import tableWechatpay from '@/modules/Tables/table-wechatpay.vue'
import tableAlipay from '@/modules/Tables/table-alipay.vue'
import tableMiniappmsg from '@/modules/Tables/table-miniappmsg.vue'
import tableServerMassage from '@/modules/Tables/table-servermassage.vue'
import tableReceptionArea from '@/modules/Tables/table-receptionArea.vue'
import tableMoreLvyeConfig from '@/modules/Tables/table-moreLvyeConfig.vue'
import tableProdVersion from '@/modules/Tables/tabel-prodVersion.vue'
import tableRoomNumReview from '@/modules/Tables/table-roomNumReview.vue'
import tableLvyeCop from '@/modules/Tables/table-lvyeCop.vue'
import tableLvyeStaff from '@/modules/Tables/table-lvyeStaff.vue'

import tableProdBaseConfig from '@/modules/Tables/table-prodBaseConfig.vue'
// 运营中心
import tableLinkList from '@/modules/Tables/operate/table-LinkList.vue'
// 充值
import tableRechargeDetail from '@/modules/Tables/recharge/table-rechargedetail.vue'
import tableWithoutcard from '@/modules/Tables/recharge/table-withoutcard.vue'
//余额
import tablehotelMoney from '@/modules/Tables/table-hotelMoney.vue'
// import xcheckbox from '@/modules/forms/x-checkbox.vue'

// Vue.component('XCheckbox', XCheckbox)
Vue.component('table-group', tableGroup)
Vue.component('table-list', tableList)
Vue.component('table-hotel', tableHotel)
Vue.component('table-brand', tableBrand)
Vue.component('table-device', tableDevice)
Vue.component('table-room', tableRoom)
Vue.component('table-roomtype', tableRoomType)
Vue.component('table-miniapp', tableMiniApp)
Vue.component('table-wechatpay', tableWechatpay)
Vue.component('table-alipay', tableAlipay)
Vue.component('table-miniappmsg', tableMiniappmsg)
Vue.component('table-server-massage', tableServerMassage)
Vue.component('table-receptionArea',tableReceptionArea)
Vue.component('table-moreLvyeConfig',tableMoreLvyeConfig)
Vue.component('table-prodVersion',tableProdVersion)
Vue.component('table-roomNumReview',tableRoomNumReview)
Vue.component('table-lvyeCop',tableLvyeCop)
Vue.component('table-lvyeStaff',tableLvyeStaff)
Vue.component('table-prodBaseConfig',tableProdBaseConfig)
// 运营中心
Vue.component('table-LinkList',tableLinkList)
// 充值
Vue.component('table-RechargeDetail',tableRechargeDetail)
Vue.component('table-Withoutcard',tableWithoutcard)
Vue.component('table-hotelMoney',tablehotelMoney)
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



























