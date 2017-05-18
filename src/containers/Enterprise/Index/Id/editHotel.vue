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
              <select>
                <option v-for="(obj, index) of enterpriseList" v-model="enterprise">{{obj}}</option>
              </select>
              <span>所属品牌</span>
              <select>
                <option v-for="(obj, index) of brandList" v-model="brand">{{obj}}</option>
              </select>
            </div>
            <div>
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="storeName"/>
            </div>
            <div>
              <label for="phone">前台电话</label>
              <input type="text" id="phone" v-model="storeName"/>
            </div>
            <div>
              <span>门店地址</span>
              <select>
                <option v-for="(obj, index) of provinceList" v-model="province">{{obj}}</option>
              </select>
              <select>
                <option v-for="(obj, index) of cityList" v-model="city">{{obj}}</option>
              </select>
              <select>
                <option v-for="(obj, index) of areaList" v-model="area">{{obj}}</option>
              </select>
            </div>
            <div>
              <input type="text" v-model="address" placeholder="地址（详细到门牌号）"/>
            </div>
          </div>
        </div>
        <button @click="remove">删除</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'EditHotel',
    data () {
      return {
        hotel: {
            "group_id": "所属集团id",
            "brand_id": "所属品牌id",
            "name": "门店名称",
            "tel": "021-213232132",
            "address": "广东省深圳市南山区xxxx",
            "longitude": "234.34",
            "latitude": "23.34",
            "pms_type": "1",
            "pms_proxy_id": "",
            "contactName": "联系人",
            "contactPhone": "13120933434",
            "contactPosition": "前台经理",
          },
        enterprise: '',
        enterpriseList: ['a', 'b', 'c', 'd'],
        brand: '',
        brandList: ['a', 'b', 'c', 'd'],
        storeName: '',
        provinceList: ['a', 'b', 'c', 'd'],
        province: '',
        cityList: ['a', 'b', 'c', 'd'],
        city: '',
        areaList: ['a', 'b', 'c', 'd'],
        area: '',
        address: '',
        contactName: '',
        contactPosition: '',
        contactPhone: ''
      }
    },
    methods: {
      ...mapActions([
        'getHotel',
        'modifyHotel',
        'removeHotel'
      ]),
      getInfo() {
        this.getHotel({
          id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
        })
      },
      modify() {
        this.modifyHotel({
          id: this.hotel.id,
          name: this.hotel.name,
          memo: this.hotel.memo,
          website: this.hotel.website,
          onsuccess: body => console.log(body.data)
        })
      },
      remove() {
        this.removeHotel({
          id: this.hotel.id,
          onsuccess: body => console.log(body.data)
        })
      }
    },
    mounted() {
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
</style>
