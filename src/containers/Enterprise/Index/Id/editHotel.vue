<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">酒店编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">酒店信息</p>
            <p class="info-modify" @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div>
              <span>所属企业</span>
              <select @change="enterpriseChange">
                <option v-for="(obj, index) of chooseEnterpriseList" :value="obj.id">{{obj.name}}</option>
              </select>
              <span>所属品牌</span>
              <select @change="brandChange">
                <option v-for="(obj, index) of chooseBrandList" :value="obj.id">{{obj.name}}</option>
              </select>
            </div>
            <div>
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="hotel.name" @change="nameChange" />
              <span v-show="nameError" class="error-info">* 请输入门店名称</span>
            </div>
            <div>
              <label for="phone">前台电话</label>
              <input type="text" id="phone" v-model="hotel.tel" @change="phoneChange" />
              <span v-show="phoneError" class="error-info">* 请输入前台电话</span>
            </div>
            <div>
              <span>门店地址</span>
              <!--<select @change="regionChange">
                <option v-for="(obj, index) of regionList" :value="obj.code">{{obj.name}}</option>
              </select>
              <select @change="stateChange">
                <option v-for="(obj, index) of stateList" :value="obj.code">{{obj.name}}</option>
              </select>
              <select @change="cityChange">
                <option v-for="(obj, index) of cityList" :value="obj.code">{{obj.name}}</option>
              </select>-->
            </div>
            <div>
              <!--<input type="text" v-model="address" placeholder="地址（详细到门牌号）" @change="addressChange" />-->
              <input type="text" v-model="hotel.address" placeholder="地址（详细到门牌号）" @change="addressChange" />
              <span v-show="addressError" class="error-info">* 请输入详细地址</span>
            </div>
          </div>
        </div>
        <button @click="remove">删除</button>
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
        nameError: false,
        phoneError: false,
        addressError: false,
        chooseEnterpriseList: [],
        chooseBrandList: []
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
      // chooseEnterpriseList() {
      //   let list = [].concat(this.enterpriseList);
      //   let index = list.findIndex(v => v.id == this.hotel.group_id);
      //   if (index == -1) return list;
      //   let obj = list.splice(index, 1)[0];
      //   if (obj == undefined) return list;
      //   list.unshift(obj);
      //   return list;
      // },
      // chooseBrandList() {
      //   let list = [].concat(this.brandList);
      //   let index = list.findIndex(v => v.id == this.hotel.brand_id);
      //   if (index == -1) return list;
      //   let obj = list.splice(index, 1)[0];
      //   if (obj == undefined) return list;
      //   list.unshift(obj);
      //   return list;
      // },
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
      brandList(v) {
        let list = [].concat(v);
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
        return list;
      }
    },
    methods: {
      ...mapActions([
        'getEnterpriseList',
        'getBrandList',
        'getHotel',
        'modifyHotel',
        'removeHotel',
        'goto'
      ]),
      enterpriseChange(e) {
        console.log(e.target.value)
        this.hotel.group_id = e.target.value;
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
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      getInfo() {
        this.getHotel({
          id: this.$route.params.id,
          onsuccess: body => body.data ? this.hotel = body.data : alert('数据不存在')
        })
      },
      remove() {
        this.removeHotel({
          id: this.hotel.id,
          onsuccess: body => this.goto('/enterprise/hotel')
        })
      },
      modify() {
        if (this.hotel.name == '') this.nameError = true;
        if (this.hotel.tel == '') this.phoneError = true;
        // if (this.address == '') this.addressError = true;
        // if (this.hotel.name == '' || this.hotel.tel == '' || this.address == '') return;
        if (this.hotel.address == '') this.addressError = true;
        if (this.hotel.name == '' || this.hotel.tel == '' || this.hotel.address == '') return;

        // let obj = areaData.find(v => v.region.code == this.regionCode);
        // if (obj === undefined) return;
        // let state = obj.region.state.find(v => v.code == this.stateCode);
        // if (state === undefined) return;
        // let city = state.city.find(v => v.code == this.cityCode);
        // if (city === undefined) return;

        this.modifyHotel({
          id: this.hotel.id,
          group_id: this.hotel.group_id,
          brand_id: this.hotel.brand_id,
          name: this.hotel.name,
          tel: this.hotel.tel,
          // address: `${obj.region.name}${state.name}${city.name}${this.address}`,
          address: this.address,
          onsuccess: body => alert('修改成功')
        })
      }
    },
    mounted() {
      if (this.regionList[0]) {
        this.regionCode = this.regionList[0].code;
      }
      if (this.stateList[0]) {
        this.stateCode = this.stateList[0].code;
      }
      if (this.cityList[0]) {
        this.cityCode = this.cityList[0].code;
      }

      this.getEnterprise();
      this.getBrand();
      this.getInfo();
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
  }
  .enterprise-info {
    border: 1px solid #757575;
  }
  .title-bar {
    position: relative;
    width: 100%;
    padding: 0 20px;
    background-color: #EAEDF0;
    border-bottom: 1px solid #757575;
    box-sizing: border-box;
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
