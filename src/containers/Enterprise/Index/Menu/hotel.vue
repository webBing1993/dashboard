<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">门店管理</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入门店的名称或子账户编码"/>
        <button @click="getList"> 查询 </button>
        <button @click="regist"> + 添加企业门店</button>
      </div>
      <div class="content">
        <h3>最近操作的门店</h3>
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableHotel from '@/components/Tables/table-hotel.vue'
  export default {
    name: 'Hotel',
    data () {
      return {
        searchVal: '',
        brandList: [],
        hotelList: [
          {
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
            "contactPosition": "前台经理",
            "status": "1"    //状态（只用在搜索接口返回）
          }
        ]
      }
    },
    components: {
      tableHotel
    },
    computed: {
      list() {
        return this.hotelList.map(hotel => {
          let obj = this.brandList.find(brand => brand.id == v.brand_id);
          if (obj === undefined) {
            hotel.brand_name = '';
          } else {
            hotel.brand_name = brand.name;
          }
          return hotel;
        });
      }
    },
    methods: {
      ...mapActions([
        'getHotelList',
        'getBrandList'
      ]),
      regist() {
        this.$router.push('addhotel')
      },
      detail(obj) {
        this.$router.push(`hotel/${obj.id}`)
      },
      group(obj) {
        this.$router.push(`${obj.id}`)
      },
      config(obj) {
        this.$router.push(`${obj.id}/config`)
      },
      getList() {
        this.getHotelList({
          searchVal: this.searchVal,
          onsuccess: body => this.hotelList = body.data
        })
      },
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      }
    },
    mounted() {
      this.getList();
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

  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    input {
      width: 65%;
      height: 40px;
      font-size: 14px;
      outline: none;
      text-indent: 1em;
    }
    button {
      line-height: 42px;
      width: 120px;
      color: #ffffff;
      cursor: pointer;
      background-color: #8f8f8f;
      font-size: 15px;
      outline: none;
      border: none;
      margin-left: 40px;
    }
    button:last-child {
      margin-left: 60px;
      width: 140px;
    }
  }

  .content {
    padding: 0 20px;
    h3 {
      font-weight: 300;
      font-size: 20px;
      padding-bottom: 10px;
      &:before {
        content: '';
        border-left: solid 4px #8f8f8f;
        padding-right: 8px;
      }
    }
  }
</style>

