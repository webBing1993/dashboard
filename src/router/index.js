import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/containers/Auth'
import Main from '@/containers/Main'
import Home from '@/containers/Home'

// 企业
import EnterpriseAdd from '@/containers/Enterprise/add'
import EnterpriseEdit from '@/containers/Enterprise/Detail/edit'
import EnterpriseBrand from '@/containers/Enterprise/Detail/brand'
// 企业菜单
import EnterpriseMain from '@/containers/Enterprise/List/main'
import EnterpriseGroup from '@/containers/Enterprise/List/group'
import EnterpriseHotel from '@/containers/Enterprise/List/hotel'
// 企业详情菜单
import EnterpriseGroupMain from '@/containers/Enterprise/Detail/main'
import EnterpriseGroupDetail from '@/containers/Enterprise/Detail/detail'
import EnterpriseGroupHotel from '@/containers/Enterprise/Detail/hotel'
import EnterpriseGroupConfig from '@/containers/Enterprise/Detail/config'

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
      template: `<router-view class="second-router"/>`
    },
    children: [{
      path: '/',
      component: EnterpriseMain,
      children: [
        {
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
      path: ':id',
      component: {
        name: 'Detail',
        template: `<router-view class="third-router"/>`
      },
      children: [{
        path: '/',
        component: EnterpriseGroupMain,
        children: [{
          path: '/',
          component: EnterpriseGroupDetail
        }, {
          path: 'hotel',
          component: EnterpriseGroupHotel
        }, {
          path: 'config',
          component: EnterpriseGroupConfig
        }]
      }, {
        path: 'edit',
        component: EnterpriseEdit,
      }, {
        path: 'brand',
        component: EnterpriseBrand,
      }]
    }]
  }]
}]

export default new Router({
  routes: [...main]
})
