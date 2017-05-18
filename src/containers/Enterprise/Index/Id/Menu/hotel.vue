<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <h3>企业门店</h3>
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
        <button @click="topPage">首页</button>
        <button @click="previousPage">上一页</button>
        <span>1</span>
        <button @click="nextPage">下一页</button>
        <button @click="endPage">尾页</button>
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
        list: [
          {
            "id":"酒店id",
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
            "status":"1"    //状态（只用在搜索接口返回）
          }
        ]
      }
    },
    components: {
      tableHotel
    },
    methods: {
      ...mapActions([
        'getHotelList'
      ]),
      detail(obj) {
        this.$router.push(`/enterprise/hotel/${obj.id}`)
      },
      group(obj) {
        this.$router.push(`${obj.id}`)
      },
      config(obj) {
        this.$router.push(`config`)
      },
      getList() {
        this.getHotelList({
          searchVal: this.searchVal,
          onsuccess: body => console.log(body.data)
        })
      },
      topPage() {

      },
      previousPage() {

      },
      nextPage() {

      },
      endPage() {

      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped>
  .content {
    padding: 0 20px;
  }
</style>

