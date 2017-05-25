<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span @click="_goback"></span>
        <h3>酒店编辑</h3>
      </div>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p>酒店信息</p>
            <p class="info-modify" @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div class="content-item">
              <div class="content-select">
                <span>所属企业</span>
                <select @change="enterpriseChange">
                  <option v-for="(obj, index) of enterpriseList" :value="obj.id"
                          :selected="obj.id==hotel.group_id?'selected':''">{{obj.name}}
                  </option>
                </select>
                <span v-show="groupError" class="error-info">* 请选择企业</span>
              </div>
              <div class="content-input">
                <label for="hotelCode">账户编码</label>
                <input type="text" id="hotelCode" v-model="hotel.code" @change="codeChange"/>
                <span v-show="codeError" class="error-info">* 请输入账户编码</span>
              </div>
              <div class="content-input">
                <label for="storeName">门店名称</label>
                <input type="text" id="storeName" v-model="hotel.name" @change="nameChange"/>
                <span v-show="nameError" class="error-info">* 请输入门店名称</span>
              </div>
              <div class="content-input">
                <label for="phone">前台电话</label>
                <input type="text" id="phone" v-model="hotel.tel" @change="phoneChange"/>
                <span v-show="phoneError" class="error-info">* 请输入前台电话</span>
              </div>
              <div class="content-address">
                <span>门店地址</span>
                <select @change="regionChange">
                  <option v-for="(obj, index) of regionList" :selected="obj.name==hotel.province?'selected':''"
                          :value="obj.code">{{obj.name}}
                  </option>
                </select>
                <select @change="stateChange">
                  <option v-for="(obj, index) of stateList" :selected="obj.name==hotel.city?'selected':''"
                          :value="obj.code">{{obj.name}}
                  </option>
                </select>
                <select @change="cityChange">
                  <option v-for="(obj, index) of cityList" :selected="obj.name==hotel.area?'selected':''"
                          :value="obj.code">{{obj.name}}
                  </option>
                </select>
              </div>
              <div class="content-input">
                <label>门店地址</label>
                <!--<input type="text" v-model="address" placeholder="地址（详细到门牌号）" @change="addressChange" />-->
                <input type="text" v-model="hotel.address" placeholder="地址（详细到门牌号）" @change="addressChange"/>
                <span v-show="addressError" class="error-info">* 请输入详细地址</span>
              </div>
            </div>
            <div class="content-item content-item-end">
              <div class="content-select">
                <span>所属品牌</span>
                <select @change="brandChange">
                  <option v-for="(obj, index) of brandList" :value="obj.id"
                          :selected="obj.id==hotel.brand_id?'selected':''">{{obj.name}}
                  </option>
                </select>
                <span v-show="brandError" class="error-info">* 请选择品牌</span>
              </div>
            </div>
          </div>
        </div>
        <!--<XButton value="删除" @onClick="remove"></XButton>-->
        <span class="_button" @click="remove">删除</span>
      </div>
    </div>
  </div>
</template>
<script>
  import areaData from '@/assets/source/areadata'
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'EditHotel',
    data () {
      return {
        hotel: {},
        enterpriseList: [],
        brandList: [],
        regionCode: '',
        stateCode: '',
        cityCode: '',
        address: '',
        groupError: false,
        brandError: false,
        codeError: false,
        nameError: false,
        phoneError: false,
        addressError: false
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
    },
    watch: {
      enterpriseList(v) {

      },
      brandList(list) {

      },
      hotel() {
        if (!this.hotel.id) return;

        this.getBrand();

        let region = this.regionList.find(v => v.name == this.hotel.province);

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
        let stateObj = regionObj.state.find(v => v.name == this.hotel.city);
        if (stateObj === undefined) stateObj = this.stateList[0];
        this.stateCode = stateObj.code;

        let cityObj = stateObj.city.find(v => v.name == this.hotel.area);
        if (cityObj === undefined) cityObj = this.cityList[0];
        this.cityCode = cityObj.code;
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
      enterpriseChange(e) {
        this.hotel.group_id = e.target.value;
        if (e.target.value != '')
          this.groupError = false;
        else
          this.groupError = true;
        this.getBrand();
      },
      brandChange(e) {
        this.hotel.brand_id = e.target.value;
        if (e.target.value != '')
          this.brandError = false;
        else
          this.brandError = true;
      },
      regionChange(e) {
        this.regionCode = e.target.value;
      },
      stateChange(e) {
        this.stateCode = e.target.value;
      },
      cityChange(e) {
        this.cityCode = e.target.value;
      },
      codeChange(e) {
        if (e.target.value != '')
          this.codeError = false;
        else
          this.codeError = true;
      },
      nameChange(e) {
        if (e.target.value != '')
          this.nameError = false;
        else
          this.nameError = true;
      },
      phoneChange(e) {
        if (e.target.value != '')
          this.phoneError = false;
        else
          this.phoneError = true;
      },
      addressChange(e) {
        if (e.target.value != '')
          this.addressError = false;
        else
          this.addressError = true;
      },
      getEnterprise() {
        this.getEnterpriseList({
          onsuccess: body => this.enterpriseList = body.data
        })
      },
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.hotel.group_id,
          // onsuccess: body => body.data && body.data.length > 0 ? this.brandList = body.data : this.showtoast('暂无品牌')
          onsuccess: body => {
            if (body.data && body.data.length > 0) {
              this.brandList = body.data;
              let index = this.brandList.findIndex(v => v.id == this.hotel.brand_id)
              console.log(index)
              if (index == -1) {
                this.hotel.brand_id = this.brandList[0].id;
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
        if (this.hotel.group_id == '') this.groupError = true;
        if (this.hotel.brand_id == '') this.brandError = true;
        if (this.hotel.name == '') this.nameError = true;
        if (this.hotel.code == '') this.codeError = true;
        if (this.hotel.tel == '') this.phoneError = true;
        // if (this.hotel.name == '' || this.hotel.tel == '' || this.address == '') return;
        if (this.hotel.address == '') this.addressError = true;
        if (this.hotel.group_id == '' || this.hotel.brand_id == '' || this.hotel.code == '' || this.hotel.name == '' || this.hotel.tel == '' || this.hotel.address == '') return;

        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined) return;
        let state = obj.region.state.find(v => v.code == this.stateCode);
        if (state === undefined) return;
        let city = state.city.find(v => v.code == this.cityCode);
        if (city === undefined) return;

        this.modifyHotel({
          id: this.hotel.id,
          group_id: this.hotel.group_id,
          brand_id: this.hotel.brand_id,
          code: this.hotel.code,
          name: this.hotel.name,
          tel: this.hotel.tel,
          province: obj.region.name,
          city: state.name,
          area: city.name,
          address: this.hotel.address,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      }
    },
    mounted() {
      this.getInfo();
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
        width: 24px;
        height: 24px;
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
          left: 10px;
          top: 8px;
          transform: rotate(45deg);
        }
      }
    }
    .content {
      padding: 30px 60px;
      .enterprise-info {
        border: 1px solid #ECECEC;
        font-size: 16px;
        .title-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          border-bottom: 1px solid #EAEDF0;
          line-height: 50px;
          font-size: 18px;
          font-weight: 400;
          .info-modify {
            cursor: pointer;
            font-size: 15px;
            &:hover {
              color: #586C94;
              text-decoration: underline;
            }
          }
        }

        .info-content {
          display: flex;
          font-size: 14px;
          padding: 30px 20px;
          line-height: 46px;
          .content-item {
            flex: 1px;
            min-width: 300px;
            .content-select {
              select {
                width: 280px;
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
                width: 280px;
                line-height: 32px;
                font-size: 14px;
              }
              span {
                font-size: 12px;
              }
            }
            .content-address {
              span {
                margin-right: 12px;
              }
              select {
                width: 90px;
                height: 32px;
                background-color: #ffffff;
                outline: none;
                margin-left: 4px;
              }
            }
            .content-add {
              span {
                margin-left: 10px;
              }
              input {
                outline: none;
                border: solid 1px #EAEDF0;
                font-size: 14px;
                text-indent: 4px;
                margin-top: 12px;
                margin-left: 76px;
                width: 285px;
                line-height: 32px;
              }
            }
          }
          .content-item-end {
            width: 200px;
          }
        }
      }
      ._button {
        float: right;
        width: 120px;
        line-height: 38px;
        margin-top: 16px;
      }
    }
  }

  .table-content {
    padding: 10px 20px;
  }

  .error-info {
    color: red;
  }
</style>
