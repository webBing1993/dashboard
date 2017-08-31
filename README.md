# dashboard

> manke operation system

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

RouterMap:

App - Auth
    - MainApp - Home
              - Group   - AddGroup
                        - GroupMenu     - GroupList
                                        - GroupHotel
                                       
                        - GroupId       - EditBrand
                                        - AddHotel
                                        - GroupIdMenu  - GroupInfo
                                                       - Brand
                                                       - GroupHotelList

                                        - HotelMenu    - HotelInfo
                                                       - Device           - EditDevice
                                                                          - RelationDevice
                                                       - Room
                                                       - RoomType
                                                       - Config           - ConfigInfo
                                                                          - ConfigSummary
                                                       - OnlineStatus
              - System  - AddMiniApp
                        - AddWechatpay
                        - SystemMenu    - MiniAppList
                                        - WechatPayList