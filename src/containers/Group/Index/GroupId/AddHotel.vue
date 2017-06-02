<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="store-info">
          <p>门店信息</p>
          <div class="info-content">
            <div class="content-item">
              <div>
                <span>所属品牌</span>
                <el-select class="el-right" v-model="brandId" placeholder="请选择所属品牌">
                  <el-option
                    v-for="(obj, index) of brandList"
                    :key="obj.id"
                    :label="obj.name"
                    :value="obj.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <span>账户编码</span>
                <el-input class="el-right" v-model="hotelCode" placeholder="请输入账户编码"></el-input>
              </div>
              <div>
                <span>门店名称</span>
                <el-input class="el-right" v-model="storeName" placeholder="请输入门店名称"></el-input>
              </div>
              <div>
                <span>前台电话</span>
                <el-input class="el-right" v-model="storePhone" placeholder="请输入前台电话"></el-input>
              </div>
              
              <div class="content-address">
                <span>门店地址</span>
                <el-select class="el-right-address" v-model="provinceCode" placeholder="请选择">
                  <el-option
                    v-for="(obj, index) of provinceList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <el-select class="el-right-address" v-model="cityCode" placeholder="请选择">
                  <el-option
                    v-for="(obj, index) of cityList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <el-select class="el-right-address" v-model="areaCode" placeholder="请选择">
                  <el-option
                    v-for="(obj, index) of areaList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
              </div>
              <div class="content-add">
                <el-input v-model="address" placeholder="地址（详细到门牌号）"></el-input>
              </div>
            </div>
            <div class="content-item">
              <div id="mapContainer">

              </div>
            </div>
            <p>请点击地图确认坐标 lat: {{lat}} lng: {{lng}}</p>
          </div>
        </div>
        <div class="store-info">
          <p>联系信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="请输入联系人姓名"></el-input>
            </div>
            <div class="content-msg">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="请输入联系人职务"></el-input>
            </div>
            <div class="content-msg">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
        </div>
        <div class="button-box">
          <el-button class="el-btn" type="success" :disabled="submitDisabled" @click.native="regist">添加</el-button>
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
    name: 'AddHotel',
    data () {
      return {
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
        lng: '',
        contactName: '',
        contactPhone: '',
        contactPosition: '',
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
        'getBrandList',
        'addHotel',
        'showtoast',
        'goto'
      ]),
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.groupId,
          onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast({text:'暂无品牌', type:'warning'})
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
          contact_name: this.groupName,
          contact_phone: this.contactPhone,
          contact_position: this.contactPosition,
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

      this.groupId = this.$route.params.id;

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
            // input {
            //   outline: none;
            //   border: solid 1px #EAEDF0;
            //   margin: 10px 20px;
            //   width: 390px;
            //   line-height: 35px;
            //   font-size: 14px;
            // }
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
            // margin-right: 10px;
            // margin-bottom: 10px;
            width: 464px;
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
    .el-btn {
      width: 100%;
      height: 46px;
    }
  }

  #mapContainer {
    height: 100%;
    width: 100%;
  }

  .el-right {
    width: 390px;
    margin-left: 16px;
  }

  .el-right-address {
    width: 116px;
    margin-left: 16px;
  }
</style>
