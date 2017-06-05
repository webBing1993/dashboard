<template>
  <div>
    <div class="module-wrapper">
      <div class="search-bar">
        <h3>共{{total}}家门店</h3>
        <el-input v-model="searchVal" placeholder="输入该集团下的门店名称或门店子编码"></el-input>
        <el-button type="success" @click.native="getList">查询</el-button>
        <el-button type="success" @click.native="regist">+ 注册企业账户</el-button>
      </div>
      <div class="content">
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
        <el-pagination
          v-show="total > size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30]"
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
    name: 'GroupHotelList',
    data () {
      return {
        searchVal: '',
        brandList: [],
        hotelList: [],
        page: 1,
        size: 20,
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
          name: 'GroupAddHotel'
        })
      },
      detail(obj) {
        this.$router.push({
          name: 'HotelInfo',
          params: {
            hotelid: obj.id
          }
        })
      },
      group(obj) {
        this.$router.push({
          name: 'GroupInfo',
          params: {
            id: obj.group_id
          }
        })
      },
      config(obj) {
        this.$router.push({
          name: 'GroupConfig',
          params: {
            hotelid: obj.id
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
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      getList() {
        this.getHotelList({
          keyword: this.searchVal,
          group_id: this.$route.params.id,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? this.total = +headers.map['x-total'][0] : null;

            this.hotelList = body.data;
          }
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
    padding: 0 20px;
    .search-bar {
      display: flex;
      align-items: center;
      margin: 19px 0;
      h3 {
        font-size: 16px;
        font-weight: normal;
        color: #4A4A4A;
        width: 380px;
      }
      .el-input {
        font-size: 14px;
      }

      .el-button {
        min-width: 173px;
        margin-left: 17px;
      }
    }
    .content {
      width: 100%;
      align-items: center;
      .v-table {
        line-height: 45px;
      }
    }
    .content-bot {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      button {
        width: 100px;
        line-height: 32px;
        margin: 0 8px;
      }
    }
  }
</style>

