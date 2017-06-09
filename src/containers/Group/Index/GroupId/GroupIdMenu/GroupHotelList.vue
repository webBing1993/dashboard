<template>
  <div>
    <div class="module-wrapper">
      <div class="content_title">
        <span>共{{total}}家门店</span>
        <el-input v-model="searchVal" placeholder="输入该集团下的门店名称或门店子编码"></el-input>
        <el-button type="success" @click.native="getList">查询</el-button>
        <el-button type="success" @click.native="regist">+ 添加门店</el-button>
      </div>
      <div class="content_grouphotellist">
        <table-hotel :list="list" @detail="detail" @group="group" @edit="detail" @config="config"
                     @device="device"></table-hotel>
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
        groupList: [],
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
          let group, brand;

          let groupObj = this.groupList.find(v => {
            group = v;
            return group.id == hotel.group_id
          });
          if (groupObj === undefined) {
            hotel.group_name = '';
          } else {
            hotel.group_name = group.name;
          }

          let brandObj = this.brandList.find(v => {
            brand = v;
            return brand.id == hotel.brand_id
          });
          if (brandObj === undefined) {
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
        'getGroupList',
        'getHotelList',
        'getBrandList',
        'goto'
      ]),
      regist() {
        this.goto({
          name: 'AddHotel'
        })
      },
      detail(obj) {
        this.goto({
          name: 'HotelInfo',
          params: {
            hotelid: obj.id
          }
        })
      },
      group(obj) {
        this.goto({
          name: 'GroupInfo',
          params: {
            id: obj.group_id
          }
        })
      },
      config(obj) {
        this.goto({
          name: 'ConfigInfo',
          params: {
            id: obj.group_id,
            hotelid: obj.id
          }
        })
      },
      device(obj) {
        this.goto({
          name: 'DeviceList',
          params: {
            id: obj.group_id,
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
      getGroupLists() {
        this.getGroupList({
          onsuccess: body => this.groupList = body.data
        })
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
            headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            this.hotelList = body.data;
          }
        })
      }
    },
    mounted() {
      this.getGroupLists();
      this.brangList();
      this.getList();
    }
  }
</script>

<style lang="less">
  .module-wrapper {
    .content_title {
      display: flex;
      align-items: center;
      padding: 20px 23px 0 24px;
      span {
        font-size: 16px;
        font-weight: normal;
        color: #4A4A4A;
        width: 260px;
      }
      .el-input {
        font-size: 13px;
        margin-right: 17px;
      }
      .el-button {
        width: 246px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        span {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .content_grouphotellist {
      padding: 19px 20px;
    }
  }
</style>

