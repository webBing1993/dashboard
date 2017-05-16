import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/containers/Auth'
import Main from '@/containers/Main'
import Home from '@/containers/Home'

// 企业路由
import EnterpriseMain from '@/containers/Enterprise/main'
import EnterpriseAdd from '@/containers/Enterprise/add'
import EnterpriseEdit from '@/containers/Enterprise/edit'
import EnterpriseGroup from '@/containers/Enterprise/group'
import EnterpriseHotel from '@/containers/Enterprise/hotel'
// 企业详情路由
import EnterpriseGroupMain from '@/containers/Enterprise/Group/main'
import EnterpriseGroupDetail from '@/containers/Enterprise/Group/detail'
import EnterpriseGroupHotel from '@/containers/Enterprise/Group/hotel'

Vue.use(Router)

const main = [{
  path: '/login',
  name: 'Auth',
  component: Auth
}, {
  path: '/',
  component: Main,
  children: [{
    path: 'home',
    component: Home
  }, {
    path: 'enterprise',
    component: {
      name: 'Enterprise',
      template: `<router-view/>`
    },
    children: [{
      path: '/',
      component: EnterpriseMain,//企业菜单
      children: [{
        path: '/',
        component: EnterpriseGroup,
      }, {
        path: 'hotel',
        component: EnterpriseHotel
      }]
    }, {
      path: 'add',
      component: EnterpriseAdd,
    }, {
      path: ':id/edit',
      component: EnterpriseEdit,
    }, {
      path: ':id',
      component: EnterpriseGroupMain,//企业详情菜单
      children: [{
        path: '/',
        component: EnterpriseGroupDetail
      }, {
        path: 'hotel',
        component: EnterpriseGroupHotel
      }]
    }]
  }]
}]

export default new Router({
  routes: [...main]
})
