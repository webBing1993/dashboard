<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">酒店编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p>酒店信息</p>
            <div>
              <el-button type="success" size="small" @click.native="remove">删除</el-button>
              <el-button type="success" size="small" :disabled="submitDisabled" @click.native="modify">修改</el-button>
            </div>
          </div>
          <div class="info-content">
            <div class="content-item">
              <div>
                <span>所属企业</span>
                <el-select class="el-right" v-model="groupId" placeholder="请选择所属企业">
                  <el-option
                    v-for="(obj, index) of groupList"
                    :key="obj.id"
                    :label="obj.name"
                    :value="obj.id">
                  </el-option>
                </el-select>
              </div>
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
                <el-input class="el-right" v-model="code" placeholder="请输入账户编码"></el-input>
              </div>
              <div>
                <span>门店名称</span>
                <el-input class="el-right" v-model="name" placeholder="请输入门店名称"></el-input>
              </div>
              <div>
                <span>前台电话</span>
                <el-input class="el-right" v-model="tel" placeholder="请输入前台电话"></el-input>
              </div>
              <div>
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
        groupList: [],
        brandList: [],
        provinceCode: '',
        cityCode: '',
        areaCode: ''
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
          this.cityCode = this.cityList[0]?this.cityList[0].code:0;
          this.areaCode = this.areaList[0]?this.areaList[0].code:0;
          this.changeMapCenter();
        }
      },
      cityCode(val, oldVal) {
        if (oldVal) {
          this.areaCode = this.areaList[0]?this.areaList[0].code:0;
          this.changeMapCenter();
        }
      },
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
      getGroupList() {
        this.getEnterpriseList({
          onsuccess: body => {
            this.groupList = body.data;
            
            //现有列表后有比对的Id,不然即使先给Id赋值，列表复制后v-model绑定的Id会变成undefined
            this.groupId = this.hotel.group_id;
          }
        })
      },
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.groupId,
          // onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast('暂无品牌')
          onsuccess: body => {
            if (body.data && body.data.length > 0) {
              this.brandList = body.data;
              //现有列表后有比对的brandId,不然即使先给brandId赋值，列表复制后v-model绑定的brandId会变成undefined
              this.brandId = this.hotel.brand_id;
              let index = this.brandList.findIndex(v => v.id == this.brandId)
              if (index == -1) {
                this.brandId = this.brandList[0].id;
              }
            } else {
              this.showtoast({text: '暂无品牌', type: 'warning'})
            }
          }
        })
      },
      getInfo() {
        this.getHotel({
          id: this.$route.params.id,
          onsuccess: body => {
            if (body.data) {
              this.getGroupList();

              this.hotel = body.data;

              // this.groupId = this.hotel.group_id;
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
              let stateObj = regionObj.state.find(v => v.name ==  this.city);
              if (stateObj === undefined) stateObj = this.cityList[0];
              this.cityCode = stateObj.code;
              
              let cityObj = stateObj.city.find(v => v.name ==  this.area);
              if (cityObj === undefined) cityObj = this.areaList[0];
              this.areaCode = cityObj.code;

              this.initMap();
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
            this.goto('/enterprise/hotel')
          }
        })
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
          group_id: this.groupId,
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
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      initMap() {
        
        let lat = this.latitude, lng = this.longitude;
        center = new qq.maps.LatLng(lat,lng);
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
          function(event) {
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
      this.getInfo();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
  }

  .content {
    padding: 20px 20px;
    .enterprise-info {
      border: 1px solid #EAEDF0;
      .title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 45px;
        padding: 0 20px;
        background-color: #EAEDF0;
        border-bottom: 1px solid #EAEDF0;
        box-sizing: border-box;
        p:nth-child(2) {
          cursor: pointer;
          font-size: 15px;
          &:hover {
            color: #586C94;
            text-decoration: underline;
          }
        }
      }
      .info-content {
        padding: 10px 40px;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        line-height: 42px;
        .content-item {
          flex: 1;
        }
      }
    }
    ._button {
      width: 160px;
      display: block;
      float: right;
      margin-top: 20px;
      font-size: 16px;
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

  #mapContainer {
    height: 400px;
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

  .content-add {
    width: 464px;
  }

</style>
