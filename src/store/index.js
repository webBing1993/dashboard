import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: require('./getters'),
  actions: require('./actions'),
  modules: {
    utils: require('./modules/utils'),
    enterprise: require('./modules/enterprise'),
    system: require('./modules/system')
  },
})
