<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">门店管理</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="输入门店名称或门店子编码"/>
        <span class="_button" @click="getList">查询</span>
        <span class="_button" @click="regist">+ 添加企业门店</span>
      </div>
      <h3>最近操作的门店</h3>
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
  export default {
    name: 'GroupHotel',
    data () {
      return {
        searchVal: '',
        brandList: [],
        hotelList: [],
        page: 1,
        size: 10,
        total: 0
      }
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
      regist() {
        this.$router.push({
          name: 'AddHotel',
          params: {
            id: 0
          }
        })
      },
      detail(obj) {
        this.$router.push({
          name: 'HotelInfo',
          params: {
            id: obj.group_id,
            hotelid: obj.id
          }
        })
      },
      group(obj) {
        if (obj.group_id == '') return;
        this.$router.push({
          name: 'GroupInfo',
          params: {
            id: obj.group_id
          }
        })
      },
      config(obj) {
        this.$router.push({
          name: 'Config',
          params: {
            id: obj.group_id,
            hotelid: obj.group_id
          }
        })
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
          keyword: this.searchVal,
          page: this.page.toString(),
          size: this.size.toString(),
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
      }
    },
    mounted() {
      this.brangList();
      this.getList();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    position: relative;
    overflow-y: auto;
    h3 {
      font-size: 16px;
      color: #4A4A4A;
      padding: 0 20px 10px;
    }
    .title {
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
    }
    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 20px;
      box-sizing: border-box;
      input {
        width: 74%;
        line-height: 36px;
        font-size: 14px;
        outline: none;
        text-indent: 1em;
        color: #9B9B9B;
        background-color: #FBFBFB;
        border: solid 1px #AEAEAE;
      }
      ._button {
        margin-left: 14px;
      }
    }
    .content {
      //height: 100%;
      padding: 0 20px;
      overflow-y: auto;
    }
  }
</style>

