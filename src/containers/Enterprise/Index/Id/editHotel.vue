<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span @click="_goback"></span>
        <h3>酒店编辑</h3>
      </div>
      <div class="content">
        <div class="store-info">
          <div class="title-bar">
            <p>酒店信息</p>
            <div>
              <XButton primary mini :disabled="submitDisabled" value="修改" @click.native="modify"></XButton>
              <XButton primary mini value="删除" @click.native="remove"></XButton>
            </div>
          </div>
          <div class="info-content">
            <div class="content-item">
              <div class="content-select">
                <span>所属企业</span>
                <select v-model="group_id">
                  <option v-for="(obj, index) of enterpriseList" :value="obj.id"
                          :selected="obj.id==group_id?'selected':''">{{obj.name}}
                  </option>
                </select>
              </div>
              <div class="content-input">
                <label for="hotelCode">账户编码</label>
                <input type="text" id="hotelCode" v-model="code"/>
              </div>
              <div class="content-input">
                <label for="storeName">门店名称</label>
                <input type="text" id="storeName" v-model="name"/>
              </div>
              <div class="content-input">
                <label for="phone">前台电话</label>
                <input type="text" id="phone" v-model="tel"/>
              </div>
              <div class="content-address">
                <span>门店地址</span>
                <select v-model="regionCode" @change="regionCodeChange">
                  <option v-for="(obj, index) of regionList" :selected="obj.name==province?'selected':''"
                          :value="obj.code">{{obj.name}}
                  </option>
                </select>
                <select v-model="stateCode" @change="stateCodeChange">
                  <option v-for="(obj, index) of stateList" :selected="obj.name==city?'selected':''" :value="obj.code">
                    {{obj.name}}
                  </option>
                </select>
                <select v-model="cityCode">
                  <option v-for="(obj, index) of cityList" :selected="obj.name==area?'selected':''" :value="obj.code">
                    {{obj.name}}
                  </option>
                </select>
              </div>
              <div class="content-add">
                <input type="text" v-model="address" placeholder="地址（详细到门牌号）"/>
              </div>
            </div>
            <div class="content-item">
              <div class="content-select">
                <span>所属品牌</span>
                <select v-model="brand_id">
                  <option v-for="(obj, index) of brandList" :value="obj.id" :selected="obj.id==brand_id?'selected':''">
                    {{obj.name}}
                  </option>
                </select>
              </div>
              <div id="mapContainer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import areaData from '@/assets/source/areadata'
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  let map, center, citylocation, marker;
  export default {
    name: 'EditHotel',
    data () {
      return {
        hotel: {},
        group_id: '',
        brand_id: '',
        code: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        area: '',
        address: '',
        latitude: '',
        longitude: '',
        enterpriseList: [],
        brandList: [],
        regionCode: '',
        stateCode: '',
        cityCode: ''
      }
    },
    computed: {
      regionList() {
        let arr = areaData.map(v => {
          return {code: v.region.code, name: v.region.name}
        })
        return arr;
      },
      stateList() {
        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined)
          return [];
        return obj.region.state;
      },
      cityList() {
        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined)
          return [];
        let cityObj = obj.region.state.find(v => v.code == this.stateCode);
        if (cityObj === undefined)
          return [];
        return cityObj.city;
      },
      submitDisabled() {
        if (this.group_id == '' || this.brand_id == '' || this.code == '' || this.name == '' || this.tel == '' || this.address == '' || this.latitude == '' || this.longitude == '')
          return true;
        return false;
      }
    },
    watch: {
      hotel() {
        if (!this.hotel.id) return;

        this.group_id = this.hotel.group_id;
        console.log(this.group_id)
        this.brand_id = this.hotel.brand_id;
        this.code = this.hotel.code;
        this.name = this.hotel.name;
        this.tel = this.hotel.tel;
        this.province = this.hotel.province;
        this.city = this.hotel.province;
        this.area = this.hotel.province;
        this.address = this.hotel.address;
        this.longitude = this.hotel.longitude;
        this.latitude = this.hotel.latitude;

        this.getBrand();

        let region = this.regionList.find(v => v.name == this.province);

        if (region !== undefined) {
          this.regionCode = region.code;
        } else {
          this.regionCode = this.regionList[0].code;
        }

        let regionObj, obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined) {
          regionObj = areaData[0].region;
        } else {
          regionObj = obj.region;
        }
        let stateObj = regionObj.state.find(v => v.name == this.city);
        if (stateObj === undefined) stateObj = this.stateList[0];
        this.stateCode = stateObj.code;

        let cityObj = stateObj.city.find(v => v.name == this.area);
        if (cityObj === undefined) cityObj = this.cityList[0];
        this.cityCode = cityObj.code;

        this.initMap();
      },
      group_id() {
        this.getBrand();
      }
    },
    methods: {
      ...mapActions([
        'getEnterpriseList',
        'getBrandList',
        'getHotel',
        'modifyHotel',
        'removeHotel',
        'goto',
        'showtoast'
      ]),
      _goback(){
        this.goto(-1);
      },
      regionCodeChange(e) {
        this.stateCode = this.stateList[0] ? this.stateList[0].code : 0;
        this.changeMapCenter();
      },
      stateCodeChange(e) {
        this.cityCode = this.cityList[0] ? this.cityList[0].code : 0;
        this.changeMapCenter();
      },
      getEnterprise() {
        this.getEnterpriseList({
          onsuccess: body => {
            this.enterpriseList = body.data;
            this.getInfo();
          }
        })
      },
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.group_id,
          // onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast('暂无品牌')
          onsuccess: body => {
            if (body.data && body.data.length > 0) {
              this.brandList = body.data;
              let index = this.brandList.findIndex(v => v.id == this.brand_id)
              if (index == -1) {
                this.brand_id = this.brandList[0].id;
              }
            } else {
              this.showtoast('暂无品牌')
            }
          }
        })
      },
      getInfo() {
        this.getHotel({
          id: this.$route.params.id,
          onsuccess: body => body.data ? this.hotel = body.data : this.showtoast('数据不存在')
        })
      },
      remove() {
        this.removeHotel({
          id: this.hotel.id,
          onsuccess: body => {
            this.goto('/enterprise/hotel')
          }
        })
      },
      modify() {
        if (this.submitDisabled) return;

        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined) return;
        let state = obj.region.state.find(v => v.code == this.stateCode);
        if (state === undefined) return;
        let city = state.city.find(v => v.code == this.cityCode);
        if (city === undefined) return;

        this.modifyHotel({
          id: this.hotel.id,
          group_id: this.group_id,
          brand_id: this.brand_id,
          code: this.code,
          name: this.name,
          tel: this.tel,
          province: obj.region.name,
          city: state.name,
          area: city.name,
          address: this.address,
          longitude: this.longitude,
          latitude: this.latitude,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      initMap() {

        let lat = this.latitude, lng = this.longitude;
        center = new qq.maps.LatLng(lat, lng);
        map = new qq.maps.Map(document.getElementById("mapContainer"), {
          center: center,
          zoom: 10,
          panControl: false,
          zoomControl: false,
          mapTypeControlOptions: {
            //设置控件的地图类型ID，ROADMAP显示普通街道地图，SATELLITE显示卫星图像，HYBRID显示卫星图像上的主要街道透明层
            mapTypeIds: [
              // qq.maps.MapTypeId.ROADMAP,
              // qq.maps.MapTypeId.SATELLITE,
              // qq.maps.MapTypeId.HYBRID
            ],
          }
        });

        marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(lat, lng),
          map: map
        });

        let self = this;
        let listener = qq.maps.event.addListener(
          map,
          'click',
          function (event) {
            // console.log('您点击的位置为:[' + event.latLng.getLat() +
            // ',' + event.latLng.getLng() + ']');

            self.$set(self, 'latitude', event.latLng.getLat().toString());
            self.$set(self, 'longitude', event.latLng.getLng().toString());

            if (marker) marker.setMap(null)

            marker = new qq.maps.Marker({
              position: new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng()),
              map: map
            });
          }
        );

        //设置地图中心
        citylocation = new qq.maps.CityService({
          map: map,
          complete: function (results) {
            map.panTo(new qq.maps.LatLng(results.detail.latLng.lat, results.detail.latLng.lng));
          }
        });
      },
      changeMapCenter() {
        let state = this.stateList.find(v => v.code == this.stateCode);
        if (!state || !citylocation) return;
        citylocation.searchCityByName(state.name);
      }
    },
    mounted() {

      this.getEnterprise();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    .title {
      display: flex;
      align-items: center;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #0D0D0D;
      }
      span {
        display: block;
        width: 22px;
        height: 22px;
        background-color: #C8C8CD;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          display: block;
          border-left: solid 1px #ffffff;
          border-bottom: solid 1px #ffffff;
          position: absolute;
          left: 9px;
          top: 7px;
          transform: rotate(45deg);
        }
      }
    }
    .content {
      padding: 20px 40px;
      .store-info {
        border: 1px solid #ECECEC;
        font-size: 16px;
        min-height: 500px;
        .title-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: 35px;
          padding: 0 10px 0 20px;
          background-color: #EAEDF0;
          .weui-btn_primary {
            line-height: 35px;
            width: 85px;
            outline: none;
            margin-right: 10px;
          }
        }
        .info-content {
          display: flex;
          font-size: 14px;
          padding: 30px 40px;
          line-height: 46px;
          .content-item {
            flex: 1px;
            .content-select {
              select {
                min-width: 390px;
                height: 35px;
                background-color: #ffffff;
                outline: none;
                margin-left: 16px;
              }
            }
            .content-input {
              display: flex;
              align-items: center;
              font-size: 14px;
              input {
                outline: none;
                border: solid 1px #EAEDF0;
                margin: 10px 20px;
                width: 390px;
                line-height: 35px;
                font-size: 14px;
                text-indent: 8px;
              }
            }
            .content-address {
              span {
                margin-right: 10px;
              }
              select {
                width: 124px;
                height: 35px;
                background-color: #ffffff;
                outline: none;
                margin-left: 6px;
              }
            }
            .content-add {
              input {
                outline: none;
                border: solid 1px #EAEDF0;
                font-size: 14px;
                text-indent: 8px;
                margin-top: 18px;
                margin-left: 76px;
                width: 390px;
                line-height: 35px;
              }
            }
          }
          #mapContainer {
            width: 500px;
            height: 100%;
            margin-top: 14px;
            /*width: 100%;*/
            /*height: 400px;*/
          }
        }
      }
    }
  }

  .table-content {
    padding: 10px 20px;
  }

  .info-modify {
    cursor: pointer;
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 10px;
  }

  .error-info {
    color: red;
  }


</style>
