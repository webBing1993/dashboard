<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">门店子账户搜索</h3>
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
        hotelList: [],
        page: 1,
        size: 10,
        totalPage: 0
      }
    },
    components: {
      tableHotel
    },
    computed: {
      list() {
        return this.hotelList.map(hotel => {
          let brand;
          let obj = this.brandList.find(v => {
            brand = v;
            return brand.id == hotel.brand_id
          });
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
            let total = 0;
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? total = +headers.map['x-total'][0] : null;
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
  .search-bar {
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-top: 20px;
    input {
      flex: 1px;
      line-height: 42px;
      text-indent: 1em;
      outline: none;
    }
    button {
      width: 280px;
      line-height: 42px;
      margin: 0 30px 0 60px;
    }
  }

  .content {
    padding: 20px;
  }
</style>
