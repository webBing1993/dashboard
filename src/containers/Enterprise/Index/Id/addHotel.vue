<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">添加企业门店</h3>
      <div class="content">
        <div class="store-info">
          <p>门店信息</p>
          <div class="info-content">
            <div class="content-item">
              <div class="content-title">
                <span>所属企业</span>
                <span>{{group.name ? group.name : $route.params.id}}</span>
              </div>
              <div class="content-input">
                <label for="hotelCode">账户编码</label>
                <input type="text" id="hotelCode" v-model="hotelCode" @change="codeChange"/>
                <span v-show="codeError" class="error-info">* 请输入账户编码</span>
              </div>
              <div class="content-input">
                <label for="storeName">门店名称</label>
                <input type="text" id="storeName" v-model="storeName" @change="nameChange"/>
                <span v-show="nameError" class="error-info">* 请输入门店名称</span>
              </div>
              <div class="content-input">
                <label for="phone">前台电话</label>
                <input type="text" id="phone" v-model="storePhone" @change="phoneChange"/>
                <span v-show="phoneError" class="error-info">* 请输入前台电话</span>
              </div>
              <div class="content-address">
                <span>门店地址</span>
                <select @change="regionChange">
                  <option v-for="(obj, index) of regionList" :value="obj.code">{{obj.name}}</option>
                </select>
                <select @change="stateChange">
                  <option v-for="(obj, index) of stateList" :value="obj.code">{{obj.name}}</option>
                </select>
                <select @change="cityChange">
                  <option v-for="(obj, index) of cityList" :value="obj.code">{{obj.name}}</option>
                </select>
              </div>
              <div class="content-add">
                <input type="text" v-model="address" placeholder="地址（详细到门牌号）" @change="addressChange"/>
                <span v-show="addressError" class="error-info">* 请输入详细地址</span>
              </div>
            </div>
            <div class="content-item">
              <div class="content-select">
                <span>所属品牌</span>
                <select @change="brandChange">
                  <option v-for="(obj, index) of brandList" :value="obj.id">{{obj.name}}</option>
                </select>
                <span v-show="brandError" class="error-info">* 请选择品牌</span>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="contact-info">
          <p class="info-title">联系信息</p>
          <div class="info-content">
            <div>
              <label for="contactName">联系人姓名</label>
              <input type="text" id="contactName" v-model="contactName"/>
            </div>
            <div>
              <label for="contactPosition">联系人职务</label>
              <input type="text" id="contactPosition" v-model="contactPosition"/>
            </div>
            <div>
              <label for="contactPhone">联系电话</label>
              <input type="text" id="contactPhone" v-model="contactPhone"/>
            </div>
          </div>
        </div>-->
        <XButton primary value="添加" @onClick="regist"></XButton>
      </div>
    </div>
  </div>
</template>
<script>
  import areaData from '@/assets/source/areadata'
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'AddHotel',
    data () {
      return {
        brandList: [],
        group: {},
        brand: '',
        hotelCode: '',
        storeName: '',
        storePhone: '',
        regionCode: '',
        stateCode: '',
        cityCode: '',
        address: '',
        brandError: false,
        codeError: false,
        nameError: false,
        phoneError: false,
        addressError: false,
        // contactName: '',
        // contactPosition: '',
        // contactPhone: ''
      }
    },
    computed: {
      regionList() {
        // return areaData.map(v => Object.create({code: v.region.code, name: v.region.name})) || [];
        let aaa = areaData.map(v => {
          return {code: v.region.code, name: v.region.name}
        })
        return aaa;
      },
      stateList() {
        if (this.regionCode == '' && this.regionList[0]) this.regionCode = this.regionList[0].code;
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
      }
    },
    watch: {
      brandList(brandList) {
        if (this.brand == '' && this.brandList[0]) this.brand = this.brandList[0].id;
      }
    },
    methods: {
      ...mapActions([
        'getEnterprise',
        'getBrandList',
        'addHotel',
        'goto'
      ]),
      getInfo() {
        this.getEnterprise({
          id: this.$route.params.id,
          onsuccess: body => body.data ? this.group = body.data : this.showtoast({text: '数据不存在', type: 'warning'})
        })
      },
      getBrand() {
        this.brandList = [];
        this.getBrandList({
          group_id: this.$route.params.id,
          onsuccess: body => this.brandList = body.data
        })
      },
      brandChange(e) {
        this.brand = e.target.value;
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
      regist() {

        if (this.hotelCode == '') this.codeError = true;
        if (this.storeName == '') this.nameError = true;
        if (this.storePhone == '') this.phoneError = true;
        if (this.address == '') this.addressError = true;
        if (this.brand == '') this.brandError = true;
        if (this.hotelCode == '' || this.storeName == '' || this.storePhone == '' || this.address == '' || this.brand == '') return;

        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined) obj = areaData[0];
        let state = obj.region.state.find(v => v.code == this.stateCode);
        if (state === undefined) state = obj.region.state[0];
        let city = state.city.find(v => v.code == this.cityCode);
        if (city === undefined) city = state.city[0];

        this.addHotel({
          group_id: this.$route.params.id,
          brand_id: this.brand,
          code: this.hotelCode,
          name: this.storeName,
          tel: this.storePhone,
          province: obj.region.name,
          city: state.name,
          area: city.name,
          address: this.address,
          onsuccess: body => this.goto(-1)
        })
      }
    },
    mounted() {
      //初始化地区默认值
      if (this.regionList[0]) {
        this.regionCode = this.regionList[0].code;
      }
      if (this.stateList[0]) {
        this.stateCode = this.stateList[0].code;
      }
      if (this.cityList[0]) {
        this.cityCode = this.cityList[0].code;
      }

      this.getInfo();
      this.getBrand();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
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
          .content-title {
            span {
              margin-right: 16px;
            }
          }
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
            span {
              margin-left: 20px;
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

</style>
