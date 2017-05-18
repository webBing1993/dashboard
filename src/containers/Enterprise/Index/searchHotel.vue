<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户搜索</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入门店的名称或子账户编码"/>
        <button @click="getList"> 查询 </button>
      </div>
      <div class="content">
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
        <xpage :showJump="true" :init-page="page" :total-page="totalPage" @go-page="goPage"></xpage>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableHotel from '@/components/Tables/table-hotel.vue'
  export default {
    name: 'SearchHotel',
    data () {
      return {
        searchVal: this.$route.params.searchVal == 'undefined' ? '' : this.$route.params.searchVal,
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
        ],
        page: 1,
        size: 10,
        totalPage: 10
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
      detail(obj) {
        this.$router.push(`/enterprise/hotel/${obj.id}`)
      },
      group(obj) {
        this.$router.push(`/enterprise/${obj.id}`)
      },
      config(obj) {
        this.$router.push(`/enterprise/${obj.id}/config`)
      },
      goPage(data) {
        this.page = data.page;
        this.getList();
      },
      getList() {
        this.getHotelList({
          page: this.page.toString(),
          size: this.size.toString(),
          searchVal: this.searchVal != 'undefined' ? this.searchVal : undefined,
          onsuccess: (body, headers) => {
            this.page = headers.map['X-Current-Page'];
            let total = headers.map['X-Total'];
            this.totalPage = Math.ceil(total / this.size);
            this.hotelList = body.data;
          }
        })
      },
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
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
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
  }

  .content {
    padding: 20px;
  }

  
</style>
