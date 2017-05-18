<template>
  <div>
    <div class="module-wrapper">
      <div class="top-content">
        <h3>门店</h3>
        <p @click="edit">编辑</p>
      </div>
      <div class="content">
        <div class="content-input">
          <label for="enterpriseCode">门店子账户编码</label>
          <input disabled="disabled" type="text" id="enterpriseCode" v-model="hotel.id"/>
        </div>
        <div class="content-input">
          <label for="enterpriseName">门店名称</label>
          <input disabled="disabled" type="text" id="enterpriseName" v-model="hotel.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'HotelIndex',
    data() {
      return {
        hotel: {
          "id": "酒店id",
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
          "contactPosition": "前台经理"
        }
      }
    },
    methods: {
      ...mapActions([
        'getHotel'
      ]),
      getInfo() {
        this.getHotel({
          id: this.$route.params.hotelid,
          onsuccess: body => console.log(body.data)
        })
      },
      edit() {
        this.$router.push(`/enterprise/hotel/${this.hotel.id}/edit`)
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style scoped lang="less">
  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    border-bottom: 1px solid #ECECEC;
    line-height: 50px;
    font-size: 16px;
    p {
      padding-right: 20px;
      color: #576b95;
    }
  }

  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    .content-input {
      display: flex;
      line-height: 40px;
      label {
        width: 120px;
      }
      input {
        flex: 1;
        outline: none;
        border: none;
        border-bottom: solid 1px #EAEDF0;
        font-size: 14px;
      }
    }
  }
</style>
