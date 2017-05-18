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
                <select>
                  <option v-for="(obj, index) of enterpriseList" v-model="enterprise">{{obj}}</option>
                </select>
              </div>
              <div class="title-msg">
                <span>所属品牌</span>
                <select>
                  <option v-for="(obj, index) of brandList" v-model="brand">{{obj}}</option>
                </select>
              </div>
            </div>
            <div class="content-input">
              <label for="storeName">门店名称</label>
              <input type="text" id="storeName" v-model="storeName"/>
            </div>
            <div class="content-input">
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
            <div class="content-add">
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
        <XButton value="添加" @onClick="regist"></XButton>
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

  /*.table-content {*/
  /*padding: 10px 20px;*/
  /*}*/

  /*.contact-info {*/
  /*border: 1px solid #757575;*/
  /*margin-top: 20px;*/
  /*}*/

</style>
