import Vue from 'vue'
import Router from 'vue-router'

// 1级路由
import Auth from '@/containers/Auth'
import MainApp from '@/containers/MainApp'
// 2级路由
import Home from '@/containers/Home'
import Group from '@/containers/Group'
// 3级路由
import SearchGroup from '@/containers/Group/Index/SearchGroup.vue'
import SearchHotel from '@/containers/Group/Index/SearchHotel.vue'
import AddGroup from '@/containers/Group/Index/AddGroup.vue'
import AddHotel from '@/containers/Group/Index/AddHotel.vue'
import GroupMenu from '@/containers/Group/Index/GroupMenu.vue'
import GroupId from '@/containers/Group/Index/GroupId.vue'
import HotelId from '@/containers/Group/Index/HotelId.vue'
// 4级路由
import GroupList from '@/containers/Group/Index/GroupMenu/GroupList.vue'
import GroupHotel from '@/containers/Group/Index/GroupMenu/GroupHotel.vue'
import EditBrand from '@/containers/Group/Index/GroupId/EditBrand.vue'
import GroupIdMenu from '@/containers/Group/Index/GroupId/GroupIdMenu.vue'
import HotelMenu from '@/containers/Group/Index/HotelId/HotelMenu.vue'

// 5级路由
import GroupInfo from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupInfo.vue'
import Brand from '@/containers/Group/Index/GroupId/GroupIdMenu/Brand.vue'
import GroupHotelList from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupHotelList.vue'
import HotelInfo from '@/containers/Group/Index/HotelId/HotelMenu/HotelInfo.vue'
import Device from '@/containers/Group/Index/HotelId/HotelMenu/Device.vue'
import EditDevice from '@/containers/Group/Index/HotelId/HotelMenu/EditDevice.vue'
import Room from '@/containers/Group/Index/HotelId/HotelMenu/Room.vue'
import Config from '@/containers/Group/Index/HotelId/HotelMenu/Config.vue'
import ConfigSummary from '@/containers/Group/Index/HotelId/HotelMenu/ConfigSummary.vue'

Vue.use(Router)

const main = [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },{
      path: '/',
      name: 'MainApp',
      component: MainApp,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },{
          path: 'group',
          component: Group,
          children: [
            {
              path: 'searchgroup',
              name: 'SearchGroup',
              component: SearchGroup,
            },{
              path: 'searchhotel',
              name: 'SearchHotel',
              component: SearchHotel,
            },{
              path: 'addgroup',
              name: 'AddGroup',
              component: AddGroup,
            },{
              path: 'addhotel',
              name: 'AddHotel',
              component: AddHotel,
            },{
              path: '/',
              component: GroupMenu,
              children: [
                {
                  path: '/',
                  name: 'GroupList',
                  component: GroupList
                },{
                  path: 'hotel',
                  name: 'GroupHotel',
                  component: GroupHotel
                }
              ]
            },{
              path: ':id',
              component: GroupId,
              children: [{
                  path: 'editbrand',
                  name: 'EditBrand',
                  component: EditBrand,
                },{
                  path: 'addhotel',
                  name: 'GroupAddHotel',
                  component: AddHotel,
                },{
                  path: '/',
                  component: GroupIdMenu,
                  children: [
                    {
                      path: '/',
                      name: 'GroupInfo',
                      component: GroupInfo
                    },{
                      path: 'brand',
                      name: 'Brand',
                      component: Brand
                    },{
                      path: 'hotel',
                      name: 'GroupHotelList',
                      component: GroupHotelList
                    }
                  ]
                },{
                  path: 'hotel/:hotelid',
                  component: HotelId,
                  children: [
                    {
                      path: '/',
                      component: HotelMenu,
                      children: [
                        {
                          path: '/',
                          name: 'GroupHotelInfo',
                          component: HotelInfo
                        },{
                          path: 'device',
                          name: 'GroupDevice',
                          component: Device
                        },{
                          path: 'editdevice',
                          name: 'GroupEditDevice',
                          component: EditDevice
                        },{
                          path: 'room',
                          name: 'GroupRoom',
                          component: Room
                        },{
                          path: 'config',
                          name: 'GroupConfig',
                          component: Config
                        },{
                          path: 'configsummary',
                          name: 'GroupConfigSummary',
                          component: ConfigSummary
                        }
                      ]
                    }
                  ]
                }
              ]
            },{
              path: 'hotel/:hotelid',
              component: HotelId,
              children: [
                {
                  path: '/',
                  component: HotelMenu,
                  children: [
                    {
                      path: '/',
                      name: 'HotelInfo',
                      component: HotelInfo
                    },{
                      path: 'device',
                      name: 'Device',
                      component: Device
                    },{
                      path: 'editdevice',
                      name: 'EditDevice',
                      component: EditDevice
                    },{
                      path: 'room',
                      name: 'Room',
                      component: Room
                    },{
                      path: 'config',
                      name: 'Config',
                      component: Config
                    },{
                      path: 'configsummary',
                      name: 'ConfigSummary',
                      component: ConfigSummary
                    }
                  ]
                }
              ]
            }
          ]
        },{
          path: '*',
          redirect: '/auth'
        }
      ]
    }
  ]

export default new Router({
  routes: [...main]
})
