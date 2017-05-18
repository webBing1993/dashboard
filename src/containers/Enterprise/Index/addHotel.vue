<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">添加企业门店</h3>
      <div class="content">
        <div class="store-info">
          <p class="info-title">门店信息</p>
          <div class="info-content">
            <div>
              <span>所属企业</span>
              <select @change="enterpriseChange">
                <option v-for="(obj, index) of enterpriseList" :value="obj.id">{{obj.name}}</option>
              </select>
              <span>所属品牌</span>
              <select @change="brandChange">
                <option v-for="(obj, index) of brandList" :value="obj.id">{{obj.name}}</option>
              </select>
            </div>
            <div>
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="storeName"/>
            </div>
            <div>
              <label for="phone">前台电话</label>
              <input type="text" id="phone" v-model="storePhone"/>
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
            <div>
              <input type="text" v-model="address" placeholder="地址（详细到门牌号）"/>
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
        <div class="button-content">
          <button @click="regist">添加</button>
        </div>
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
      regist() {
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
<style scoped>
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
  }
  .content {
    padding: 20px 20px;
  }
  .info-content {
    padding: 10px 40px;
  }
  .table-content {
    padding: 10px 20px;
  }
  .info-title {
    line-height: 30px;
    padding: 0 20px;
    background-color: #EAEDF0;
    border-bottom: 1px solid #757575;
  }
  .store-info {
    border: 1px solid #757575;
  }
  .contact-info {
    border: 1px solid #757575;
    margin-top: 20px;
  }
  .button-content {
    margin-top: 20px;
  }
  button {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: 80px;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #0000FF;
    border: none;
  }
</style>
