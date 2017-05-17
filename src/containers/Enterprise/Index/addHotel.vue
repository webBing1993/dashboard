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
        <div class="contact-info">
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
        </div>
        <div class="button-content">
          <button @click="regist">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AddHotel',
    data () {
      return {
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
      modify(obj) {
        
      },
      remove(obj) {

      },
      regist() {

      }
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
