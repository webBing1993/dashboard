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

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'UUkuaL7PjyWWq8T8BeM6TbUD4LYlsTTG'
});

// Mockdata
import './mixins'
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
import tableFaceDevice from '@/modules/Tables/table-facedevice.vue'
import tableRoom from '@/modules/Tables/table-room.vue'
import tableRoomType from '@/modules/Tables/table-roomtype.vue'
import tableMiniApp from '@/modules/Tables/table-miniapp.vue'
import tableWechatpay from '@/modules/Tables/table-wechatpay.vue'
import tableAlipay from '@/modules/Tables/table-alipay.vue'
import tableChinaums from '@/modules/Tables/table-chinaums.vue'
import tableIcbc from '@/modules/Tables/table-icbc.vue'
import tableBank from '@/modules/Tables/table-bank.vue'
import tableHowmuch from '@/modules/Tables/table-howmuch.vue'
import tableMiniappmsg from '@/modules/Tables/table-miniappmsg.vue'
import tableServerMassage from '@/modules/Tables/table-servermassage.vue'
import tableReceptionArea from '@/modules/Tables/table-receptionArea.vue'
import tableMoreLvyeConfig from '@/modules/Tables/table-moreLvyeConfig.vue'
import tableProdVersion from '@/modules/Tables/tabel-prodVersion.vue'
import tableRoomNumReview from '@/modules/Tables/table-roomNumReview.vue'
import tableLvyeCop from '@/modules/Tables/table-lvyeCop.vue'
import tableLvyeStaff from '@/modules/Tables/table-lvyeStaff.vue'
import tableProdBaseConfig from '@/modules/Tables/table-prodBaseConfig.vue'
import tableVerify from '@/modules/Tables/table-verify.vue'
// ????????????
import tableLinkList from '@/modules/Tables/operate/table-LinkList.vue'
import tableOrderCheckIn from '@/modules/Tables/table-orderCheckIn.vue'
// ??????
import tableRechargeDetail from '@/modules/Tables/recharge/table-rechargedetail.vue'
import tableWithoutcard from '@/modules/Tables/recharge/table-withoutcard.vue'
//??????
import tablehotelMoney from '@/modules/Tables/table-hotelMoney.vue'
import tableBreakfast from '@/modules/Tables/table-brakfast.vue'
// import xcheckbox from '@/modules/forms/x-checkbox.vue'

// Vue.component('XCheckbox', XCheckbox)
Vue.component('table-group', tableGroup)
Vue.component('table-list', tableList)
Vue.component('table-hotel', tableHotel)
Vue.component('table-brand', tableBrand)
Vue.component('table-device', tableDevice)
Vue.component('table-facedevice', tableFaceDevice)
Vue.component('table-room', tableRoom)
Vue.component('table-roomtype', tableRoomType)
Vue.component('table-miniapp', tableMiniApp)
Vue.component('table-wechatpay', tableWechatpay)
Vue.component('table-alipay', tableAlipay)
Vue.component('table-chinaums', tableChinaums)
Vue.component('table-icbc', tableIcbc)
Vue.component('table-bank', tableBank)
Vue.component('table-howmuch', tableHowmuch)
Vue.component('table-miniappmsg', tableMiniappmsg)
Vue.component('table-server-massage', tableServerMassage)
Vue.component('table-receptionArea',tableReceptionArea)
Vue.component('table-moreLvyeConfig',tableMoreLvyeConfig)
Vue.component('table-prodVersion',tableProdVersion)
Vue.component('table-roomNumReview',tableRoomNumReview)
Vue.component('table-lvyeCop',tableLvyeCop)
Vue.component('table-lvyeStaff',tableLvyeStaff)
Vue.component('table-prodBaseConfig',tableProdBaseConfig)
Vue.component('table-verify',tableVerify)
// ????????????
Vue.component('table-LinkList',tableLinkList)
Vue.component('table-OrderCheckIn',tableOrderCheckIn)
// ??????
Vue.component('table-RechargeDetail',tableRechargeDetail)
Vue.component('table-Withoutcard',tableWithoutcard)
Vue.component('table-hotelMoney',tablehotelMoney)
Vue.component('table-breakfast',tableBreakfast)
// ????????????????????????????????? v-focus
Vue.directive('focus', {
  // ???????????????????????? DOM ??????
  inserted: function (el) {
    // ????????????
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



























