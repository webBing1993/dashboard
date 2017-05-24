<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">酒店编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p>酒店信息</p>
            <p @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div class="content-title">
              <div class="title-msg">
                <span>所属企业</span>
                <select @change="enterpriseChange">
                  <option v-for="(obj, index) of chooseEnterpriseList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
              <div class="title-msg">
                <span>所属品牌</span>
                <select @change="brandChange">
                  <option v-for="(obj, index) of chooseBrandList" :value="obj.id">{{obj.name}}</option>
                </select>
              </div>
            </div>
            <div class="content-msg">
              <label for="hotelCode">账户编码</label>
              <input type="text" id="hotelCode" v-model="hotel.code" @change="codeChange"/>
              <span v-show="codeError" class="error-info">* 请输入账户编码</span>
            </div>
            <div class="content-msg">
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="hotel.name" @change="nameChange"/>
              <span v-show="nameError" class="error-info">* 请输入门店名称</span>
            </div>
            <div class="content-msg">
              <label for="phone">前台电话</label>
              <input type="text" id="phone" v-model="hotel.tel" @change="phoneChange"/>
              <span v-show="phoneError" class="error-info">* 请输入前台电话</span>
            </div>
            <div>
              <span>门店地址</span>
              <select @change="regionChange">
                <option v-for="(obj, index) of regionList" :selected="obj.name==hotel.province?'selected':''" :value="obj.code">{{obj.name}}</option>
              </select>
              <select @change="stateChange">
                <option v-for="(obj, index) of stateList" :selected="obj.name==hotel.city?'selected':''" :value="obj.code">{{obj.name}}</option>
              </select>
              <select @change="cityChange">
                <option v-for="(obj, index) of cityList" :selected="obj.name==hotel.area?'selected':''" :value="obj.code">{{obj.name}}</option>
              </select>
            </div>
            <div class="content-msg">
              <label>门店地址</label>
              <!--<input type="text" v-model="address" placeholder="地址（详细到门牌号）" @change="addressChange" />-->
              <input type="text" v-model="hotel.address" placeholder="地址（详细到门牌号）" @change="addressChange"/>
              <span v-show="addressError" class="error-info">* 请输入详细地址</span>
            </div>
          </div>
        </div>
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
        brandSlectList: [],
        regionCode: '',
        stateCode: '',
        cityCode: '',
        address: '',
        codeError: false,
        nameError: false,
        phoneError: false,
        addressError: false,
        chooseEnterpriseList: [],
        chooseBrandList: []
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
        let list = [].concat(v);
        let index = list.findIndex(v => v.id == this.hotel.group_id);
        if (index == -1) {
          this.chooseEnterpriseList = list;
          return;
        }
        let obj = list.splice(index, 1)[0];
        if (obj == undefined) {
          this.chooseEnterpriseList = list;
          return;
        }
        list.unshift(obj);
        this.chooseEnterpriseList = list;
      },
      brandList() {
        if (!this.hotel.group_id) return;
        let list = [].concat(this.brandList);
        if (!list.length || list.length == 0) return;

        let index = list.findIndex(v => v.id == this.hotel.brand_id);
        if (index == -1) {
          this.chooseBrandList = list;
          return;
        }
        let obj = list.splice(index, 1)[0];
        if (obj == undefined) {
          this.chooseBrandList = list;
          return;
        }
        list.unshift(obj);
        this.chooseBrandList = list;
      },
      hotel() {
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
        let stateObj = regionObj.state.find(v => v.name ==  this.hotel.city);
        if (stateObj === undefined) stateObj = this.stateList[0];
        this.stateCode = stateObj.code;
        
        let cityObj = stateObj.city.find(v => v.name ==  this.hotel.area);
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
      enterpriseChange(e) {
        this.hotel.group_id = e.target.value;
        this.getBrand();
      },
      brandChange(e) {
        this.hotel.brand_id = e.target.value;
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
        this.chooseBrandList = [];
        this.getBrandList({
          group_id: this.hotel.group_id,
          onsuccess: body => this.brandList = body.data
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
        if (this.hotel.name == '') this.nameError = true;
        if (this.hotel.code == '') this.codeError = true;
        if (this.hotel.tel == '') this.phoneError = true;
        // if (this.hotel.name == '' || this.hotel.tel == '' || this.address == '') return;
        if (this.hotel.address == '') this.addressError = true;
        if (this.hotel.code == '' || this.hotel.name == '' || this.hotel.tel == '' || this.hotel.address == '') return;

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
      this.getEnterprise();
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
        flex-direction: column;
        font-size: 14px;
        line-height: 42px;
        .content-title {
          display: flex;
          .title-msg {
            flex: 1;
            align-items: center;
            span {
              margin-right: 10px;
            }
          }
        }
        .content-msg {
          display: flex;
          align-items: center;
          font-size: 14px;
          label {
            width: 90px;
          }
          input {
            outline: none;
            border: none;
            border-bottom: solid 1px #EAEDF0;
            margin: 10px;
            padding: 8px;
            flex: 1;
            font-size: 14px;
          }
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
</style>
