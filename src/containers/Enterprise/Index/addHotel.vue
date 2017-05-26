<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">添加企业门店</h3>
      <div class="content">
        <div class="store-info">
          <p>门店信息</p>
          <div class="info-content">
            <div class="content-item">
              <div class="content-select">
                <span>所属企业</span>
                <select v-model="groupId">
                  <option v-for="(obj, index) of groupList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
              <div class="content-select">
                <span>所属品牌</span>
                <select v-model="brandId">
                  <option v-for="(obj, index) of brandList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
              <div class="content-input">
                <label for="hotelCode">账户编码</label>
                <input type="text" id="hotelCode" v-model="hotelCode" />
              </div>
              <div class="content-input">
                <label for="storeName">门店名称</label>
                <input type="text" id="storeName" v-model="storeName" />
              </div>
              <div class="content-input">
                <label for="phone">前台电话</label>
                <input type="text" id="phone" v-model="storePhone" >
              </div>
              <div class="content-address">
                <span>门店地址</span>
                <select v-model="provinceCode">
                  <option v-for="(obj, index) of provinceList" :value="obj.code">{{obj.name}}</option>
                </select>
                <select v-model="cityCode">
                  <option v-for="(obj, index) of cityList" :value="obj.code" :selected="cityCode==obj.code?'selected':''">{{obj.name}}</option>
                </select>
                <select v-model="areaCode">
                  <option v-for="(obj, index) of areaList" :value="obj.code" :selected="areaCode==obj.code?'selected':''">{{obj.name}}</option>
                </select>
              </div>
              <div class="content-add">
                <input type="text" v-model="address" placeholder="地址（详细到门牌号）" />
              </div>
            </div>
            <div class="content-item">
              <div id="mapContainer">

              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <XButton primary :disabled="submitDisabled" value="添加" @onClick="regist"></XButton>
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
    name: 'HotelAdd',
    data () {
      return {
        groupList: [],
        groupId: '',
        brandList: [],
        brandId: '',
        hotelCode: '',
        storeName: '',
        storePhone: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        address: '',
        lat: '',
        lng: ''
      }
    },
    computed: {
      provinceList() {
        let arr = areaData.map(v => {
          return {code: v.region.code, name: v.region.name}
        })
        return arr;
      },
      cityList() {
        if (this.provinceCode == '' && this.provinceList[0]) this.provinceCode = this.provinceList[0].code;
        let obj = areaData.find(v => v.region.code == this.provinceCode);
        if (obj === undefined)
          return [];
        return obj.region.state;
      },
      areaList() {
        let obj = areaData.find(v => v.region.code == this.provinceCode);
        if (obj === undefined)
          return [];
        let cityObj = obj.region.state.find(v => v.code == this.cityCode);
        if (cityObj === undefined)
          return [];
        return cityObj.city;
      },
      submitDisabled() {
        if (this.hotelCode == '' || this.storeName == '' || this.storePhone == '' || this.address == '' || this.lat == '' || this.lng == '' || this.brandId == '')
          return true;
        return false;
      }
    },
    watch: {
      groupList(list) {
        //没有选择的时候给个默认值
        if (this.groupId == '' && this.groupList[0]) this.groupId = this.groupList[0].id;
      },
      brandList(brandList) {
        if (this.brandList[0]) this.brandId = this.brandList[0].id;
      },
      groupId(val) {
        if (val == '') return;
        this.getBrand();
      },
      provinceCode() {
        this.cityCode = this.cityList[0]?this.cityList[0].code:0;
        this.areaCode = this.areaList[0]?this.areaList[0].code:0;
        this.changeMapCenter();
      },
      cityCode() {
        this.areaCode = this.areaList[0]?this.areaList[0].code:0;

        this.changeMapCenter();
      }
    },
    methods: {
      ...mapActions([
        'getEnterpriseList',
        'getBrandList',
        'addHotel',
        'showtoast',
        'goto'
      ]),
      getGroupList() {
        this.getEnterpriseList({
          onsuccess: body => this.groupList = body.data
        })
      },
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.groupId,
          onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast('暂无品牌')
        })
      },
      regist() {
        if (this.submitDisabled) return;

        let obj = areaData.find(v => v.region.code == this.provinceCode);
        if (obj === undefined) obj = areaData[0];
        let state = obj.region.state.find(v => v.code == this.cityCode);
        if (state === undefined) state = obj.region.state[0];
        let city = state.city.find(v => v.code == this.areaCode);
        if (city === undefined) city = state.city[0];

        this.addHotel({
          group_id: this.groupId,
          brand_id: this.brandId,
          code: this.hotelCode,
          name: this.storeName,
          tel: this.storePhone,
          province: obj.region.name,
          city: state.name,
          area: city.name,
          address: this.address,
          longitude: this.lng,
          latitude: this.lat,
          onsuccess: body => this.goto(-1)
        })
      },
      initMap() {
        center = new qq.maps.LatLng(39.916527,116.397128);  //默认北京
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

        let self = this;
        let listener = qq.maps.event.addListener(
          map,
          'click',
          function(event) {
              // console.log('您点击的位置为:[' + event.latLng.getLat() +
              // ',' + event.latLng.getLng() + ']');

              self.$set(self, 'lat', event.latLng.getLat().toString());
              self.$set(self, 'lng', event.latLng.getLng().toString());

              if (marker) marker.setMap(null)

              marker = new qq.maps.Marker({
                position: new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng()),
                map: map
              });
          }
        );
        
        //设置地图中心
        citylocation = new qq.maps.CityService({
          map : map,
          complete : function(results){
            map.panTo(new qq.maps.LatLng(results.detail.latLng.lat, results.detail.latLng.lng));
          }
        });
      },
      changeMapCenter() {
        let state = this.cityList.find(v => v.code == this.cityCode);
        if (!state || !citylocation) return;
        citylocation.searchCityByName(state.name);
      }
    },
    mounted() {
      //初始化地区默认值
      if (this.provinceList[0]) {
        this.provinceCode = this.provinceList[0].code;
      }
      if (this.cityList[0]) {
        this.cityCode = this.cityList[0].code;
      }
      if (this.areaList[0]) {
        this.areaCode = this.areaList[0].code;
      }

      this.getGroupList();

      this.initMap();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 40px;
    border-bottom: 1px solid #ECECEC;
    font-weight: 400;
    font-size: 18px;
  }

  .content {
    padding: 30px 60px;
    .store-info {
      border: 1px solid #ECECEC;
      font-size: 16px;
      p {
        line-height: 45px;
        padding: 0 30px;
        background-color: #EAEDF0;
      }
      .info-content {
        display: flex;
        font-size: 14px;
        padding: 30px 60px;
        line-height: 46px;
        .content-item {
          flex: 1px;
          .content-select {
            select {
              width: 390px;
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
            }
          }
          .content-address {
            select {
              width: 116px;
              height: 35px;
              background-color: #ffffff;
              outline: none;
              margin-left: 16px;
            }
          }
          .content-add {
            margin-right: 20px;
            margin-bottom: 10px;
            input {
              outline: none;
              border: solid 1px #EAEDF0;
              font-size: 14px;
              text-indent: 4px;
              margin-top: 18px;
              margin-left: 76px;
              width: 390px;
              line-height: 35px;
            }
          }
        }
      }
    }
    
  }



  .error-info {
    width: 92px;
    color: red;
    font-size: 12px;
  }

  .table-content {
    padding: 10px 20px;
  }

  .contact-info {
    border: 1px solid #757575;
    margin-top: 20px;
  }

  .button-box {
    width: 40%;
    margin: 10px auto;
  }

  #mapContainer {
    height: 100%;
    width: 100%;
  }
</style>
