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
import AddBrand from '@/containers/Group/Index/GroupId/AddBrand.vue'
import EditBrand from '@/containers/Group/Index/GroupId/EditBrand.vue'
import GroupIdMenu from '@/containers/Group/Index/GroupId/GroupIdMenu.vue'
import HotelMenu from '@/containers/Group/Index/HotelId/HotelMenu.vue'

// 5级路由
import GroupInfo from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupInfo.vue'
import Brand from '@/containers/Group/Index/GroupId/GroupIdMenu/Brand.vue'
import GroupHotelList from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupHotelList.vue'
import HotelInfo from '@/containers/Group/Index/HotelId/HotelMenu/HotelInfo.vue'
import Device from '@/containers/Group/Index/HotelId/HotelMenu/Device.vue'
import AddDevice from '@/containers/Group/Index/HotelId/HotelMenu/AddDevice.vue'
import EditDevice from '@/containers/Group/Index/HotelId/HotelMenu/EditDevice.vue'
import Room from '@/containers/Group/Index/HotelId/HotelMenu/Room.vue'
import Config from '@/containers/Group/Index/HotelId/HotelMenu/Config.vue'
import ConfigSummary from '@/containers/Group/Index/HotelId/HotelMenu/ConfigSummary.vue'

Vue.use(Router)

const main = [
    {
      path: '/auth',
      component: Auth
    },{
      path: '/',
      component: MainApp,
      children: [
        {
          path: 'home',
          component: Home
        },{
          path: 'group',
          component: Group,
          children: [
            {
              path: 'searchgroup',
              component: SearchGroup,
            },{
              path: 'searchhotel',
              component: SearchHotel,
            },{
              path: 'addgroup',
              component: AddGroup,
            },{
              path: 'addhotel',
              component: AddHotel,
            },{
              path: '/',
              component: GroupMenu,
              children: [
                {
                  path: '/',
                  component: GroupList
                },{
                  path: 'hotel',
                  component: GroupHotel
                }
              ]
            },{
              path: ':id',
              component: GroupId,
              children: [
                {
                  path: 'addbrand',
                  component: AddBrand,
                },{
                  path: 'editbrand/:brandid',
                  component: EditBrand,
                },{
                  path: 'addhotel',
                  component: AddHotel,
                },{
                  path: '/',
                  component: GroupIdMenu,
                  children: [
                    {
                      path: '/',
                      component: GroupInfo
                    },{
                      path: 'brand',
                      component: Brand
                    },{
                      path: 'hotel',
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
                          component: HotelInfo
                        },{
                          path: 'device',
                          component: Device
                        },{
                          path: 'adddevice',
                          component: AddDevice
                        },{
                          path: 'editdevice',
                          component: EditDevice
                        },{
                          path: 'room',
                          component: Room
                        },{
                          path: 'config',
                          component: Config
                        },{
                          path: 'configsummary',
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
                      component: HotelInfo
                    },{
                      path: 'device',
                      component: Device
                    },{
                      path: 'adddevice',
                      component: AddDevice
                    },{
                      path: 'editdevice',
                      component: EditDevice
                    },{
                      path: 'room',
                      component: Room
                    },{
                      path: 'config',
                      component: Config
                    },{
                      path: 'configsummary',
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
