import Vue from 'vue'
import Router from 'vue-router'

// 1级路由
import Auth from '@/containers/Auth'
import MainApp from '@/containers/MainApp'
// 2级路由
import Home from '@/containers/Home'
import Enterprise from '@/containers/Enterprise'
// 3级路由
import EnterpriseMenu from '@/containers/Enterprise/Index/menu'
import EnterpriseAdd from '@/containers/Enterprise/Index/add'
import HotelAdd from '@/containers/Enterprise/Index/addHotel'
import EnterpriseId from '@/containers/Enterprise/Index/id'
// 4级路由
import EnterpriseGroupList from '@/containers/Enterprise/Index/Menu/group'
import EnterpriseGroupHotel from '@/containers/Enterprise/Index/Menu/hotel'
import EnterpriseIdMenu from '@/containers/Enterprise/Index/Id/menu'
import EnterpriseIdEdit from '@/containers/Enterprise/Index/Id/edit'
import EnterpriseIdBrand from '@/containers/Enterprise/Index/Id/brand'
import HotelMenu from '@/containers/Enterprise/Index/Id/hotelMenu'
// 5级路由
import EnterpriseIdMenuIndex from '@/containers/Enterprise/Index/Id/Menu/index'
import EnterpriseIdMenuHotel from '@/containers/Enterprise/Index/Id/Menu/hotel'
import EnterpriseIdMenuConfig from '@/containers/Enterprise/Index/Id/Menu/config'
import HotelMenuIndex from '@/containers/Enterprise/Index/Id/HotelMenu/index'

Vue.use(Router)

const main = [{
  path: '/auth',
  name: 'Auth',
  component: Auth
}, {
  path: '/',
  component: MainApp,
  children: [{
    path: 'home',
    component: Home
  }, {
    path: 'enterprise',
    component: Enterprise,
    children: [{
      path: 'add',
      component: EnterpriseAdd,
    }, {
      path: 'addhotel',
      component: HotelAdd,
    }, {
      path: '/',
      component: EnterpriseMenu,
      children: [{
        path: '/',
        component: EnterpriseGroupList,
      }, {
        path: 'hotel',
        component: EnterpriseGroupHotel
      }]
    }, {
      path: ':id',
      component: EnterpriseId,
      children: [{
        path: '/',
        component: EnterpriseIdMenu,
        children: [{
          path: '/',
          component: EnterpriseIdMenuIndex
        }, {
          path: 'hotel',
          component: EnterpriseIdMenuHotel
        }, {
          path: 'config',
          component: EnterpriseIdMenuConfig
        }]
      }, {
        path: ':id',
        component: HotelMenu,
        children: [{
          path: '/',
          component: HotelMenuIndex
        }]
      }, {
        path: 'edit',
        component: EnterpriseIdEdit,
      }, {
        path: 'brand',
        component: EnterpriseIdBrand,
      }]
    }]
  }]
}]

export default new Router({
  routes: [...main]
})
