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
              - Enterprise - SearchGroup
                           - SearchHotel
                           - Add
                           - AddHotel
                           - GroupMenu - Group
                                       - Hotel
                                       
                           - Id        - Brand
                                       - EditBrand
                                       - AddBrand
                                       - AddHotel
                                       - Edit
                                       - IdMenu - Index
                                                - Hotel
                                                - Config
                           - Hotel     - EditHotel
                                       - HotelMenu - Index