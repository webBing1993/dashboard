import Vue from 'vue'
import Router from 'vue-router'

// 1级路由
import Auth from '@/containers/Auth'
import MainApp from '@/containers/MainApp'
// 2级路由
import Home from '@/containers/Home'
import Group from '@/containers/Group'
import System from '@/containers/System'
import Statistics from '@/containers/Statistics'
// 3级路由
import AddGroup from '@/containers/Group/Index/AddGroup.vue'
import GroupMenu from '@/containers/Group/Index/GroupMenu.vue'
import GroupId from '@/containers/Group/Index/GroupId.vue'
import AddMiniApp from '@/containers/System/Index/AddMiniApp.vue'
import AddWechatpay from '@/containers/System/Index/AddWechatpay.vue'
import AddServeMessage from '@/containers/System/Index/AddServeMessage.vue'
import SystemMenu from '@/containers/System/Index/SystemMenu.vue'
import OrderStatistics from '@/containers/Statistics/Index/OrderStatistics.vue'
// 4级路由
import HotelId from '@/containers/Group/Index/HotelId.vue'
import GroupList from '@/containers/Group/Index/GroupMenu/GroupList.vue'
import GroupHotel from '@/containers/Group/Index/GroupMenu/GroupHotel.vue'
import EditBrand from '@/containers/Group/Index/GroupId/EditBrand.vue'
import GroupIdMenu from '@/containers/Group/Index/GroupId/GroupIdMenu.vue'
import HotelMenu from '@/containers/Group/Index/HotelId/HotelMenu.vue'
import AddHotel from '@/containers/Group/Index/GroupId/AddHotel.vue'
import MiniAppList from '@/containers/System/Index/SystemMenu/MiniAppList.vue'
import WechatPayList from '@/containers/System/Index/SystemMenu/WechatPayList.vue'
import MiniAppMsg from '@/containers/System/Index/SystemMenu/MiniAppMsg.vue'
import QR_Code_create from '@/containers/System/Index/SystemMenu/QR_Code_Create.vue'
import ProdVersion from '@/containers/System/Index/SystemMenu/ProdVersion.vue'
import serve_message from '@/containers/System/Index/SystemMenu/ServeMessage.vue'

// 5级路由
import GroupInfo from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupInfo.vue'
import Brand from '@/containers/Group/Index/GroupId/GroupIdMenu/Brand.vue'
import GroupHotelList from '@/containers/Group/Index/GroupId/GroupIdMenu/GroupHotelList.vue'
import HotelInfo from '@/containers/Group/Index/HotelId/HotelMenu/HotelInfo.vue'
import Device from '@/containers/Group/Index/HotelId/HotelMenu/Device.vue'
import Room from '@/containers/Group/Index/HotelId/HotelMenu/Room.vue'
import RoomType from '@/containers/Group/Index/HotelId/HotelMenu/RoomType.vue'
import ReceptionArea from '@/containers/Group/Index/HotelId/HotelMenu/ReceptionArea.vue'
import Config from '@/containers/Group/Index/HotelId/HotelMenu/Config.vue'
import OnlineStatus from '@/containers/Group/Index/HotelId/HotelMenu/OnlineStatus.vue'
import manageProdVersion from '@/containers/Group/Index/HotelId/HotelMenu/manageProdVersion.vue'
import MiniAppMsgList from '@/containers/System/Index/SystemMenu/MiniAppMsg/MiniAppMsgList.vue'
import AddMiniAppMsg from '@/containers/System/Index/SystemMenu/MiniAppMsg/AddMiniAppMsg.vue'

// 6级路由
import DeviceList from '@/containers/Group/Index/HotelId/HotelMenu/Device/DeviceList.vue'
import EditDevice from '@/containers/Group/Index/HotelId/HotelMenu/Device/EditDevice.vue'
import RelationDevice from '@/containers/Group/Index/HotelId/HotelMenu/Device/RelationDevice.vue'
import ConfigInfo from '@/containers/Group/Index/HotelId/HotelMenu/Config/ConfigInfo.vue'
import ConfigSummary from '@/containers/Group/Index/HotelId/HotelMenu/Config/ConfigSummary.vue'
//7级路由
import MoreLvyeConfig from '@/containers/Group/Index/HotelId/HotelMenu/Config/ConfigItem/MoreLvyeConfig.vue'
Vue.use(Router)

const main = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'MainApp',
    component: MainApp,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'group',
        component: Group,
        children: [
          {
            path: 'add',
            name: 'AddGroup',
            component: AddGroup,
          },
          {
            path: '/',
            component: GroupMenu,
            children: [
              {
                path: '/',
                name: 'GroupList',
                component: GroupList
              },
              {
                path: 'hotel',
                name: 'GroupHotel',
                component: GroupHotel
              }
            ]
          },
          {
            path: ':id',
            component: GroupId,
            children: [
              {
                path: 'editbrand',
                name: 'EditBrand',
                component: EditBrand,
              },
              {
                path: '/',
                component: GroupIdMenu,
                children: [
                  {
                    path: '/',
                    name: 'GroupInfo',
                    component: GroupInfo
                  },
                  {
                    path: 'brand',
                    name: 'Brand',
                    component: Brand
                  },
                  {
                    path: 'hotel',
                    name: 'GroupHotelList',
                    component: GroupHotelList
                  }
                ]
              },
              {
                path: 'hotel',
                component: HotelId,
                children: [
                  {
                    path: 'add',
                    name: 'AddHotel',
                    component: AddHotel,
                  },
                  {
                    path: ':hotelid',
                    component: HotelMenu,
                    children: [
                      {
                        path: '/',
                        name: 'HotelInfo',
                        component: HotelInfo
                      },
                      {
                        path: 'device',
                        component: Device,
                        children: [
                          {
                            path: '/',
                            name: 'DeviceList',
                            component: DeviceList
                          },
                          {
                            path: 'editdevice',
                            name: 'EditDevice',
                            component: EditDevice
                          },
                          {
                            path: 'relationvevice',
                            name: 'RelationDevice',
                            component: RelationDevice
                          }
                        ]
                      },
                      {
                        path: 'room',
                        name: 'Room',
                        component: Room
                      },
                      {
                        path: 'roomtype',
                        name: 'RoomType',
                        component: RoomType
                      },
                      {
                        path: 'receptionArea',
                        name: 'ReceptionArea',
                        component: ReceptionArea
                      },
                      {
                        path: 'config',
                        component: Config,
                        children: [
                          {
                            path: '/',
                            name: 'ConfigInfo',
                            component: ConfigInfo
                          },
                          {
                            path: 'configsummary',
                            name: 'ConfigSummary',
                            component: ConfigSummary
                          },
                          {
                            path: 'moreLvyeConfig',
                            name: 'moreLvyeConfig',
                            component: MoreLvyeConfig
                          }
                        ]
                      },
                      {
                        path: 'onlinestatus',
                        name: 'OnlineStatus',
                        component: OnlineStatus
                      },
                      {
                        path: 'manageProdVersion',
                        name: 'manageProdVersion',
                        component: manageProdVersion
                      },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'system',
        component: System,
        children: [{
          path: 'addminiapp',
          name: 'AddMiniApp',
          component: AddMiniApp,
        },
          {
            path: 'addwechatpay',
            name: 'AddWechatpay',
            component: AddWechatpay,
          },
          {
            path: 'addServeMessage',
            name: 'AddServeMessage',
            component: AddServeMessage,
          },
          {
            path: '/',
            component: SystemMenu,
            children: [
              {
                path: '/',
                name: 'MiniAppList',
                component: MiniAppList
              },
              {
                path: 'wechatpay',
                name: 'WechatPayList',
                component: WechatPayList
              },
              {
                path: 'miniappmsg',
                component: MiniAppMsg,
                children: [
                  {
                    path: '/',
                    name: 'MiniAppMsgList',
                    component: MiniAppMsgList
                  },
                  {
                    path: 'addminiappmsg',
                    name: 'AddMiniAppMsg',
                    component: AddMiniAppMsg
                  }
                ]
              },
              {
                path: 'qrcodecreate',
                name: 'QR_Code_create',
                component: QR_Code_create
              },
              {
                path: 'prodVersion',
                name: 'prodVersion',
                component: ProdVersion
              },
              {
                path: 'servemessage',
                name: 'serve_message',
                component: serve_message
              }
            ]
          }]
      },
      {
        path:'statistics',
        component:Statistics,
        children:[{
            path:'orderStatistics',
            name:'OrderStatistics',
            component:OrderStatistics
        },
            {
                path:'orderStatistics',
                name:'OrderStatistics',
                component:OrderStatistics
            },
            {
                path:'orderStatistics',
                name:'OrderStatistics',
                component:OrderStatistics
            }
            ]
      }
    ]
  }
]

const router = new Router({
  routes: [...main]
})

import tool from '@/assets/tools/tool.js';

router.beforeEach((to, from, next) => {
  let sessionId = sessionStorage.getItem('session_id');
  if (to.name === 'Auth' || tool.isNotBlank(sessionId)) {
    next();
  } else {
    next('/auth')
  }
})

export default router
