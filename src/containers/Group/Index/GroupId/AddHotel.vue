<template>
  <div>
    <div class="module-wrapper">
      <div class="content_addhotel">
        <div class="store-info">
          <p>门店信息</p>
          <div class="info-content">
            <div class="content-item">
              <div class="item">
                <span>所属品牌</span>
                <el-select class="el-right" v-model="brandId" name="brandId" v-validate="'required'"
                           :class="{'is-danger': errors.has('brandId') }" placeholder="请选择所属品牌">
                  <el-option
                    v-for="(obj, index) of brandList"
                    :key="obj.id"
                    :label="obj.name"
                    :value="obj.id">
                  </el-option>
                </el-select>
              </div>
              <span class="help is-danger" v-show="errors.has('brandId')">请选择所属品牌!</span>

              <div class="item">
                <span>门店名称</span>
                <el-input class="el-right" v-model="storeName" name="storeName" v-validate="'required'"
                          :class="{'is-danger': errors.has('storeName') }" placeholder="请输入门店名称"></el-input>
              </div>
              <span class="help is-danger" v-show="errors.has('storeName')">门店名称不能为空!</span>

              <div class="item">
                <span>门店编码</span>
                <el-input class="el-right" v-model="hotelCode" :maxlength="10" name="hotelCode" v-validate="'required'"
                          :class="{'is-danger': errors.has('hotelCode') }" placeholder="请输入门店编码"></el-input>
              </div>
              <span class="help is-danger" v-show="errors.has('hotelCode')">门店编码不能为空!</span>

              <div class="content-address">
                <span>门店地址</span>
                <el-select class="el-right-address" v-model="provinceCode" name="provinceCode" v-validate="'required'"
                           :class="{'is-danger': errors.has('provinceCode') }" placeholder="请选择省份">
                  <el-option
                    v-for="(obj, index) of provinceList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <span class="help is-danger" v-show="errors.has('provinceCode')">请选择省份!</span>
                <el-select class="el-right-address" v-model="cityCode" name="cityCode" v-validate="'required'"
                           :class="{'is-danger': errors.has('cityCode') }" placeholder="请选择城市">
                  <el-option
                    v-for="(obj, index) of cityList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <span class="help is-danger" v-show="errors.has('cityCode')">请选择城市!</span>
                <el-select class="el-right-address" v-model="areaCode" name="areaCode" v-validate="'required'"
                           :class="{'is-danger': errors.has('areaCode') }" placeholder="请选择地区">
                  <el-option
                    v-for="(obj, index) of areaList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <span class="help is-danger" v-show="errors.has('areaCode')">请选择地区!</span>
              </div>

              <div class="item">
                <span>详细地址</span>
                <el-input class="el-right" v-model="address" name="address" v-validate="'required'"
                          :class="{'is-danger': errors.has('address') }" placeholder="地址（详细到门牌号）"></el-input>
              </div>
              <span class="help is-danger" v-show="errors.has('address')">详细地址不能为空!</span>

              <div class="item">
                <span>地址编码</span>
                <el-input class="el-right" v-model="addressCode" name="addressCode" v-validate="'required'"
                          :class="{'is-danger': errors.has('addressCode') }" placeholder="请输入地址编码"></el-input>
              </div>
              <span class="help is-danger" v-show="errors.has('addressCode')">地址编码不能为空!</span>

              <div class="item">
                <span>前台电话</span>
                <el-input class="el-right" v-model="storePhone" name="storePhone" v-validate="'required'"
                          :class="{'is-danger': errors.has('storePhone') }" placeholder="请输入前台电话"></el-input>
              </div>
              <span class="help is-danger" v-show="errors.has('storePhone')">前台电话不能为空!</span>

            </div>
            <div class="content-item">
              <div id="mapContainer"></div>
              <span class="map-text">请点击地图确认坐标 lat: {{lat}} lng: {{lng}}</span>
              <span class="help is-danger" style="margin-left: 0" v-show="!isChooseLocation">请选择坐标!</span>
            </div>
          </div>
        </div>
        <div class="store-info">
          <p>联系信息</p>
          <div class="info-msg">
            <div class="item">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="选填，请输入联系人姓名"></el-input>
            </div>
            <div class="item">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="选填，请输入联系人职务"></el-input>
            </div>
            <div class="item">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="选填，请输入联系电话"></el-input>
            </div>
          </div>
        </div>
        <div class="button-box">
          <el-button class="el-btn" type="success" @click.native="nextStep">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import areaData from '@/assets/source/areadata'
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  let map, center, citylocation, marker;
  import tool from '@/assets/tools/tool.js'
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
        addressCode: '',
        lat: '',
        lng: '',
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        isChooseLocation: true
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
    },
    watch: {
      groupId(val) {
        if (val == '') return;
        this.getBrand();
      },
      provinceCode() {
        this.cityCode = this.cityList[0] ? this.cityList[0].code : 0;
        this.areaCode = this.areaList[0] ? this.areaList[0].code : 0;
        this.changeMapCenter();
      },
      cityCode() {
        this.areaCode = this.areaList[0] ? this.areaList[0].code : 0;

        this.changeMapCenter();
      },
      lat() {
        if (this.lat != '' && this.lng != '') {
          this.isChooseLocation = true;
        } else {
          this.isChooseLocation = false;
        }
      },
      lng() {
        if (this.lat != '' && this.lng != '') {
          this.isChooseLocation = true;
        } else {
          this.isChooseLocation = false;
        }
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
          onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast({
            text: '暂无品牌',
            type: 'warning'
          })
        })
      },
      nextStep() {
        if (tool.isBlank(this.lat) || tool.isBlank(this.lng)) {
          this.isChooseLocation = false;
          return;
        }
        this.$validator.validateAll().then(() => {
          this.regist();
        }).catch(() => {
        });
      },
      regist() {
        
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
          address_code: this.addressCode,
          longitude: this.lng,
          latitude: this.lat,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          contact_position: this.contactPosition,
          onsuccess: body => this.goto(-1)
        })
      },
      initMap() {
        center = new qq.maps.LatLng(39.916527, 116.397128);  //默认北京
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
          function (event) {
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
          map: map,
          complete: function (results) {
            map.panTo(new qq.maps.LatLng(results.detail.latLng.lat, results.detail.latLng.lng));
          }
        });
      },
      changeMapCenter() {
        let state = this.cityList.find(v => v.code == this.cityCode);
        if (!state || !citylocation) return;
        citylocation.searchCityByName(state.name);
        map.zoomTo(10);
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
<style lang="less">
  .module-wrapper {
    .content_addhotel {
      padding: 23px 37px 28px 39px;
      .store-info {
        border: 1px solid #ECECEC;
        font-size: 16px;
        margin-bottom: 30px;
        p {
          line-height: 45px;
          padding-left: 22px;
          background-color: #EAEDF0;
        }
        .info-content {
          display: flex;
          font-size: 16px;
          color: #4A4A4A;
          padding: 17px 15px 23px 54px;
          .content-item {
            flex: 1px;
            &:nth-child(1) {
              margin-right: 23px;
              flex: 1.2;
            }
            .item {
              display: flex;
              align-items: center;
              line-height: 48px;
              span {
                width: 64px;
                display: block;
                margin-right: 20px;
                font-size: 15px;
              }
              .el-select, .el-input {
                width: 80%;
                outline: none;
                .el-input {
                  width: 100%;
                }
              }
            }
            .help {
              display: block;
              position: relative;
              /*min-width: 110px;*/
              line-height: 40px;
              text-align: left;
              font-size: 14px;
              margin: -10px 0 0 80px;
              color: #D0011B;
              &:before {
                content: '*';
                position: absolute;
                top: 4px;
                left: -14px;
                font-size: 22px;
              }
            }
            .help.is-danger {
              color: #ff3860;
            }

            .content-address {
              display: flex;
              align-items: center;
              line-height: 46px;
              span {
                margin-right: 14px;
                width: 66px;
                display: block;
                font-size: 15px;
              }
              .el-select {
                width: 26%;
                outline: none;
                margin-left: 5px;
              }
            }
            .content-add {
              margin-left: 84px;
              line-height: 46px;
              .el-input {
                width: 98%;
                .el-input__inner {
                  background-color: #FBFBFB;
                  border: solid 1px #D0D0D0;
                  border-radius: 0;
                  font-size: 14px;
                  color: #000000;
                  height: 40px;
                }
              }
              input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: #9B9B9B;
              }
            }
            #mapContainer {
              width: 100%;
              min-height: 260px;
            }
            .map-text {
              width: 100%;
              display: inline-block;
              font-size: 12px;
              color: #4A4A4A;
              padding: 10px 0;
            }
          }
        }
        .info-msg {
          padding: 19px 0 19px 39px;
          .item {
            display: flex;
            align-items: center;
            width: 66%;
            font-size: 14px;
            line-height: 48px;
            span {
              width: 72px;
              display: block;
              margin-right: 20px;
              text-align: end;
            }
            .el-select {
              width: 80%;
            }
            .el-input {
              width: 80%;
            }
          }
        }
      }
      .button-box {
        width: 246px;
        margin: 0 auto;
        .el-btn {
          width: 100%;
          line-height: 18px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          color: #ffffff;
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

  .el-right-address {
    width: 116px;
    margin-left: 16px;
  }

  .is-danger .el-input__inner {
    border-color: #ff3860;
  }

  .is-danger .el-input__inner:focus {
    outline: 0;
    border-color: #ff3860;
  }

  .is-danger .el-input__inner:hover {
    border-color: #ff3860;
  }

  .help {
    display: block;
    font-size: 11px;
    margin-top: 5px;
  }

  .help.is-danger {
    color: #ff3860;
  }
</style>
