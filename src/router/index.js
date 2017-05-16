import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/containers/Auth'
import Main from '@/containers/Main'
import Home from '@/containers/Home'

// 企业路由
import EnterpriseAdd from '@/containers/Enterprise/add'
import EnterpriseEdit from '@/containers/Enterprise/edit'
import EnterpriseMain from '@/containers/Enterprise/List/main'
import EnterpriseGroup from '@/containers/Enterprise/List/group'
import EnterpriseHotel from '@/containers/Enterprise/List/hotel'
// 企业详情路由
import EnterpriseGroupMain from '@/containers/Enterprise/Detail/main'
import EnterpriseGroupDetail from '@/containers/Enterprise/Detail/detail'
import EnterpriseGroupHotel from '@/containers/Enterprise/Detail/hotel'

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
    children: [
      {
        path: '/',
        component: EnterpriseMain,//企业菜单
        children: [
          {
            path: '/',
            component: EnterpriseGroup,
          }, {
            path: 'hotel',
            component: EnterpriseHotel
          }]
      },
      {
        path: 'add',
        component: EnterpriseAdd,
      },
      {
        path: ':id/edit',
        component: EnterpriseEdit,
      },
      {
        path: ':id',
        component: EnterpriseGroupMain,//企业详情菜单
        children: [{
          path: '/',
          component: EnterpriseGroupDetail
        }, {
          path: 'hotel',
          component: EnterpriseGroupHotel
        }]
      }
    ]
  }]
}]

export default new Router({
  routes: [...main]
})
