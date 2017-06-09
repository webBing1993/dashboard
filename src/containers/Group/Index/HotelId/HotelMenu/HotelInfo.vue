<template>
  <div>
    <div class="module-wrapper">
      <div class="content_hotelinfo">
        <div class="store-info">
          <p>门店信息<a @click="editInfo">修改</a></p>
          <div class="info-content">
            <div class="content-item">
              <div class="item">
                <span>所属品牌</span>
                <el-select class="el-right" v-model="brandId" placeholder="请选择所属品牌" :disabled="!isEditInfo">
                  <el-option
                    v-for="(obj, index) of brandList"
                    :key="obj.id"
                    :label="obj.name"
                    :value="obj.id">
                  </el-option>
                </el-select>
              </div>
              <div class="item">
                <span>账户编码</span>
                <el-input class="el-right" v-model="code" placeholder="请输入账户编码" :disabled="!isEditInfo"></el-input>
              </div>
              <div class="item">
                <span>门店名称</span>
                <el-input class="el-right" v-model="name" placeholder="请输入门店名称" :disabled="!isEditInfo"></el-input>
              </div>
              <div class="item">
                <span>前台电话</span>
                <el-input class="el-right" v-model="tel" placeholder="请输入前台电话" :disabled="!isEditInfo"></el-input>
              </div>

              <div class="content-address">
                <span>门店地址</span>
                <el-select class="el-right-address" v-model="provinceCode" placeholder="请选择" :disabled="!isEditInfo">
                  <el-option
                    v-for="(obj, index) of provinceList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <el-select class="el-right-address" v-model="cityCode" placeholder="请选择" :disabled="!isEditInfo">
                  <el-option
                    v-for="(obj, index) of cityList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
                <el-select class="el-right-address" v-model="areaCode" placeholder="请选择" :disabled="!isEditInfo">
                  <el-option
                    v-for="(obj, index) of areaList"
                    :key="index"
                    :label="obj.name"
                    :value="obj.code">
                  </el-option>
                </el-select>
              </div>
              <div class="content-add">
                <el-input v-model="address" placeholder="地址（详细到门牌号）" :disabled="!isEditInfo"></el-input>
              </div>
            </div>
            <div class="content-item">
              <div id="mapContainer"/>
              <span class="item-text">拖动坐标可以修改地理位置 <p>lat：{{latitude}} &nbsp lng: {{longitude}}</p></span>
            </div>
          </div>
          <div class="button-box" v-show="isEditInfo">
            <el-button type="success" :disabled="submitDisabled" @click.native="modify">确认修改</el-button>
            <el-button @click.native="cancelInfo">取消</el-button>
          </div>
        </div>
        <div class="store-info">
          <p>联系信息<a @click="editContact">修改</a></p>
          <div class="info-msg">
            <div class="item">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="选填，请输入联系人姓名"
                        :disabled="!isEditContact"></el-input>
            </div>
            <div class="item">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="选填，请输入联系人职务"
                        :disabled="!isEditContact"></el-input>
            </div>
            <div class="item">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="选填，请输入联系电话"
                        :disabled="!isEditContact"></el-input>
            </div>
          </div>
          <div class="button-box" v-show="isEditContact">
            <el-button type="success" :disabled="submitDisabled" @click.native="modify">确认修改</el-button>
            <el-button @click.native="cancelContact">取消</el-button>
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
        brandList: [],
        hotel: {},
        groupId: '',
        brandId: '',
        code: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        area: '',
        address: '',
        latitude: '',
        longitude: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        isEditInfo: false,
        isEditContact: false
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
        if (this.groupId == '' || this.brandId == '' || this.code == '' || this.name == '' || this.tel == '' || this.address == '' || this.latitude == '' || this.longitude == '')
          return true;
        return false;
      }
    },
    watch: {
      groupId() {
        this.getBrand();
      },
      provinceCode(val, oldVal) {
        if (oldVal) {
          this.cityCode = this.cityList[0] ? this.cityList[0].code : 0;
          this.areaCode = this.areaList[0] ? this.areaList[0].code : 0;
          this.changeMapCenter();
        }
      },
      cityCode(val, oldVal) {
        if (oldVal) {
          this.areaCode = this.areaList[0] ? this.areaList[0].code : 0;
          this.changeMapCenter();
        }
      },
    },
    methods: {
      ...mapActions([
        'getBrandList',
        'getHotel',
        'modifyHotel',
        'removeHotel',
        'goto',
        'showtoast'
      ]),
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.$route.params.id,
          // onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast('暂无品牌')
          onsuccess: body => {
            if (body.data && body.data.length > 0) {
              this.brandList = body.data;
              //现有列表后有比对的brandId,不然即使先给brandId赋值，列表复制后v-model绑定的brandId会变成undefined
              this.brandId = this.hotel.brand_id;
            } else {
              this.showtoast({text: '暂无品牌', type: 'warning'})
            }
          }
        })
      },
      getInfo() {
        this.getHotel({
          id: this.$route.params.hotelid,
          onsuccess: body => {
            if (body.data) {
              this.hotel = body.data;
              this.dealData();
            } else {
              this.showtoast({text: '数据不存在', type: 'warning'})
            }
          }
        })
      },
      remove() {
        this.removeHotel({
          id: this.hotel.id,
          onsuccess: body => {
            this.goto('/group/hotel')
          }
        })
      },
      cancelInfo() {
        this.isEditInfo = false;

        this.dealData();
      },
      cancelContact() {
        this.isEditContact = false;

        this.contactName = this.hotel.contact_name;
        this.contactPhone = this.hotel.contact_phone;
        this.contactPosition = this.hotel.contact_position;
      },
      editInfo() {
        this.isEditInfo = true;
      },
      editContact() {
        this.isEditContact = true;

      },
      modify() {
        if (this.submitDisabled) return;
        let obj = areaData.find(v => v.region.code == this.provinceCode);
        if (obj === undefined) return;
        let state = obj.region.state.find(v => v.code == this.cityCode);
        if (state === undefined) return;
        let city = state.city.find(v => v.code == this.areaCode);
        if (city === undefined) return;
        this.modifyHotel({
          id: this.hotel.id,
          group_id: this.hotel.group_id,
          brand_id: this.brandId,
          code: this.code,
          name: this.name,
          tel: this.tel,
          province: obj.region.name,
          city: state.name,
          area: city.name,
          address: this.address,
          longitude: this.longitude,
          latitude: this.latitude,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          contact_position: this.contactPosition,
          onsuccess: body => {
            this.isEditInfo = false;
            this.isEditContact = false;
            if (body.data) {
              this.hotel = body.data;
              this.dealData();
            } else {
              this.showtoast({text: '数据不存在', type: 'warning'})
            }
          }
        })
      },
      dealData() {
        this.groupId = this.hotel.group_id;
        // this.brandId = this.hotel.brand_id;
        this.code = this.hotel.code;
        this.name = this.hotel.name;
        this.tel = this.hotel.tel;
        this.province = this.hotel.province;
        this.city = this.hotel.city;
        this.area = this.hotel.area;
        this.address = this.hotel.address;
        this.longitude = this.hotel.longitude;
        this.latitude = this.hotel.latitude;
        this.contactName = this.hotel.contact_name;
        this.contactPhone = this.hotel.contact_phone;
        this.contactPosition = this.hotel.contact_position;

        let region = this.provinceList.find(v => v.name == this.province);
        if (region !== undefined) {
          this.provinceCode = region.code;
        } else {
          this.provinceCode = this.provinceList[0].code;
        }

        let regionObj, obj = areaData.find(v => v.region.code == this.provinceCode);
        if (obj === undefined) {
          regionObj = areaData[0].region;
        } else {
          regionObj = obj.region;
        }
        let stateObj = regionObj.state.find(v => v.name == this.city);
        if (stateObj === undefined) stateObj = this.cityList[0];
        this.cityCode = stateObj.code;

        let cityObj = stateObj.city.find(v => v.name == this.area);
        if (cityObj === undefined) cityObj = this.areaList[0];
        this.areaCode = cityObj.code;
        this.initMap();
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
        let state = this.cityList.find(v => v.code == this.cityCode);
        if (!state || !citylocation) return;
        citylocation.searchCityByName(state.name);
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    padding: 23px 36px 28px 24px;
    .content_hotelinfo {
      .store-info {
        overflow: hidden;
        border: 1px solid #ECECEC;
        font-size: 16px;
        margin-bottom: 24px;
        p {
          padding: 10px 24px;
          background-color: #EAEDF0;
          line-height: normal;
          a {
            float: right;
            cursor: pointer;
            font-size: 16px;
            color: #39C240;
          }
        }
        .info-content {
          display: flex;
          font-size: 14px;
          padding: 24px 27px 19px 21px;
          .content-item {
            flex: 1px;
            &:nth-child(1) {
              flex: 1.2;
              margin-right: 33px;
            }
            .item {
              display: flex;
              align-items: center;
              width: 100%;
              line-height: 48px;
              span {
                width: 60px;
                display: block;
                margin-right: 20px;
              }
              .el-select, .el-input {
                width: 80%;
                outline: none;
              }
            }

            .content-address {
              display: flex;
              align-items: center;
              width: 100%;
              line-height: 48px;
              span {
                width: 60px;
                display: block;
                margin-right: 16px;
              }
              .el-right-address {
                width: 26.4%;
                background-color: #ffffff;
                outline: none;
                margin-left: 4px;
              }
            }
            .content-add {
              margin-left: 78px;
              line-height: 48px;
              .el-input {
                width: 100%;
              }
            }
            #mapContainer {
              width: 100%;
              height: 82%;
            }
            .item-text {
              font-size: 14px;
              color: #4A4A4A;
              display: block;
              padding: 12px 0;
              p {
                padding: 0;
                background-color: transparent;
              }
            }
          }
        }
        .button-box {
          width: 100%;
          text-align: center;
          margin-bottom: 28px;
          .el-button {
            width: 28%;
            margin-right: 6px;
            line-height: 18px;
            border-radius: 0;
          }
          .el-button--success {
            background-color: #39C240;
            border-color: #39C240;
          }
        }
        .info-msg {
          padding: 21px 34px;
          .item {
            display: flex;
            align-items: center;
            width: 96%;
            font-size: 14px;
            line-height: 48px;
            span {
              width: 72px;
              display: block;
              margin-right: 14px;
            }
            .el-select {
              width: 100%;
            }
            .el-input {
              width: 60%;
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

  }

</style>
