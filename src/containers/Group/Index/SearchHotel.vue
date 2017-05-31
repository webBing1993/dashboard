<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">门店子账户搜索</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入门店的名称或子账户编码"/>
        <span class="_button" @click="getList">查询</span>
      </div>
      <div class="content">
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
        <el-pagination
          v-show="total > size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableHotel from '@/modules/Tables/table-hotel.vue'
  export default {
    name: 'SearchHotel',
    data () {
      return {
        searchVal: this.$route.query.hotel || '',
        brandList: [],
        hotelList: [],
        page: 1,
        size: 10,
        total: 0
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
        this.$router.push(`/group/hotel/${obj.id}`)
      },
      group(obj) {
        this.$router.push(`/group/${obj.id}`)
      },
      config(obj) {
        this.$router.push(`/group/hotel/${obj.group_id}/config`)
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList() {
        this.getHotelList({
          page: this.page.toString(),
          size: this.size.toString(),
          searchVal: this.searchVal != 'undefined' ? this.searchVal : undefined,
          onsuccess: (body, headers) => {
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? this.total = +headers.map['x-total'][0] : null;

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
      this.brangList();
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
    ._button {
      margin: 0 55px;
    }
  }

  .content {
    padding: 20px;
  }
</style>
