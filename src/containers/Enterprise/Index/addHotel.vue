<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">添加企业门店</h3>
      <div class="content">
        <div class="store-info">
          <p>门店信息</p>
          <div class="info-content">
            <div class="content-title">
              <div class="title-msg">
                <span>所属企业</span>
                <select @change="enterpriseChange">
                  <option v-for="(obj, index) of enterpriseList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
              <div class="title-msg">
                <span>所属品牌</span>
                <select @change="brandChange">
                  <option v-for="(obj, index) of brandList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
            </div>
            <div class="content-input">
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="storeName" @change="nameChange" />
              <span v-show="nameError" class="error-info">* 请输入门店名称</span>
            </div>
            <div class="content-input">
              <label for="phone">前台电话</label>
              <input type="text" id="phone" v-model="storePhone" @change="phoneChange" />
              <span v-show="phoneError" class="error-info">* 请输入前台电话</span>
            </div>
            <div>
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
              <input type="text" v-model="address" placeholder="地址（详细到门牌号）" @change="addressChange" />
              <span v-show="addressError" class="error-info">* 请输入详细地址</span>
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
        <XButton value="添加" @onClick="regist"></XButton>
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
        enterpriseList: [{
          "id":"xxxxxxxxxxxxxxxx",
          "name": "如家集团",
          "memo": "企业简介企业简介企业简介企业简介",
          "website": "http://www.baidu.com",
          "hotel_num":23   //门店数量（只用在搜索接口返回）
        },{
          "id":"xxxxxxxxxxxxxxxx",
          "name": "四季集团",
          "memo": "企业简介企业简介企业简介企业简介",
          "website": "http://www.baidu.com",
          "hotel_num":23   //门店数量（只用在搜索接口返回）
        }],
        enterprise: '',
        brandList: [{  
          "id":"xxxxxxxx",
          "group_id": "所属集团id",
          "pms_id": "pms内部编码",
          "pms_code": "pms外部编码",
          "name": "名称",
          "logo_url": "上传到服务器地址url"
        },{  
          "id":"xxxxxxxx",
          "group_id": "所属集团id",
          "pms_id": "pms内部编码",
          "pms_code": "pms外部编码",
          "name": "名名",
          "logo_url": "上传到服务器地址url"
        }],
        brand: '',
        storeName: '',
        storePhone: '',
        regionCode: '',
        stateCode: '',
        cityCode: '',
        address: '',
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
        return areaData.map(v => Object.create({code: v.region.code, name: v.region.name})) || [];
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
    methods: {
      ...mapActions([
        'getEnterpriseList',
        'getBrandList',
        'addHotel'
      ]),
      getEnterprise() {
        this.getEnterpriseList({
          onsuccess: body => this.enterpriseList = body.data
        })
      },
      getBrand() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      enterpriseChange(e) {
        this.enterprise = e.target.value;
      },
      brandChange(e) {
        this.brand = e.target.value;
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
        if (this.storeName == '') this.nameError = true;
        if (this.storePhone == '') this.phoneError = true;
        if (this.address == '') this.addressError = true;
        if (this.storeName == '' || this.storePhone == '' || this.address == '') return;

        let obj = areaData.find(v => v.region.code == this.regionCode);
        if (obj === undefined) obj = areaData[0];
        let state = obj.region.state.find(v => v.code == this.stateCode);
        if (state === undefined) state = obj.region.state[0];
        let city = state.city.find(v => v.code == this.cityCode);
        if (city === undefined) city = state.city[0];
        
        this.addHotel({
          group_id: this.enterprise,
          brand_id: this.brand,
          name: this.storeName,
          tel: this.storePhone,
          address: `${obj.region.name}${state.name}${city.name}${this.address}`,
          onsuccess: body => console.log(body)
        })
      }
    },
    mounted() {
      this.enterpriseList[0] ? this.enterprise = this.enterpriseList[0].id : null;
      this.brandList[0] ? this.brand = this.brandList[0].id : null;

      this.regionList[0] ? this.regionCode = this.regionList[0].code : null;
      this.stateList[0] ? this.stateCode = this.stateList[0].code : null;
      this.cityList[0] ? this.cityCode = this.cityList[0].code : null;
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
    padding: 20px 20px;
    .store-info {
      border: 1px solid #ECECEC;
      font-size: 16px;
      p {
        line-height: 40px;
        padding: 0 20px;
        background-color: #EAEDF0;
      }
      .info-content {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        padding: 10px 40px;
        .content-title {
          display: flex;
          .title-msg {
            flex: 1;
            align-items: center;
          }
        }
        .content-input {
          display: flex;
          align-items: center;
          font-size: 14px;
          input {
            outline: none;
            border: none;
            border-bottom: solid 1px #EAEDF0;
            margin: 10px 20px;
            padding: 4px;
            flex: 1;
            font-size: 14px;
          }
        }
        .content-add {
          margin-right: 20px;
          margin-bottom: 10px;
          input {
            width: 100%;
            outline: none;
            border: none;
            border-bottom: solid 1px #EAEDF0;
            padding: 16px 0;
            flex: 1;
            font-size: 14px;
          }
        }
        span {
          padding-right: 8px;
        }
        select {
          min-width: 60px;
          height: 25px;
          outline: none;
        }
      }
    }
    .weui-btn_default {
      margin-top: 30px;
      color: #576b95;
    }
  }

  .error-info {
    color: red;
  }

  /*.table-content {*/
  /*padding: 10px 20px;*/
  /*}*/

  /*.contact-info {*/
  /*border: 1px solid #757575;*/
  /*margin-top: 20px;*/
  /*}*/

</style>
