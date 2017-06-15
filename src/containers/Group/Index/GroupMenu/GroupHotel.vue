<template>
  <div>
    <div class="module-wrapper">
      <h3>门店管理（{{total}}家门店）</h3>
      <div class="search-bar">
        <el-input v-model="searchVal" placeholder="请输入门店的名称或子账户编码"></el-input>
        <el-button type="success" @click.native="getList">搜索</el-button>
        <el-button type="success" @click.native="regist">+ 添加门店</el-button>
      </div>
      <h3>最近操作的门店</h3>
      <div class="content_grouphotel">
        <table-hotel :list="list" :page="page" :size="size" @detail="detail" @group="group" @edit="detail" @config="config"
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
      <el-dialog
        title="选择企业"
        :visible.sync="showDialog"
      >
        <div class="dialog-content">
          <div>
            <span>所属企业</span>
            <el-select class="el-right" v-model="groupId" placeholder="请选择所属企业">
              <el-option
                v-for="(obj, index) of groupList"
                :key="obj.id"
                :label="obj.name"
                :value="obj.id">
              </el-option>
            </el-select>
          </div>
          <div class="group_btn">
            <el-button type="success" :disabled="groupBrandList.length == 0" @click.native="chooseGroup">确定</el-button>
          </div>
        </div>
      </el-dialog>
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
        size: 20,
        total: 0,
        showDialog: false,
        groupId: '',
        groupList: [],
        groupBrandList: []
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
    watch: {
      groupId() {
        this.getBrand();
      }
    },
    methods: {
      ...mapActions([
        'getHotelList',
        'getBrandList',
        'getGroupList',
        'showtoast',
        'goto'
      ]),
      regist() {
        this.showDialog = true;
      },
      chooseGroup() {
        this.goto({
          name: 'AddHotel',
          params: {
            id: this.groupId
          }
        })
      },
      detail(obj) {
        this.goto({
          name: 'HotelInfo',
          params: {
            id: obj.group_id,
            hotelid: obj.id
          }
        })
      },
      group(obj) {
        if (obj.group_id == '') return;
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
      getList() {
        this.getHotelList({
          keyword: this.searchVal,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            headers.get('x-total') ? this.total = +headers.get('x-total') : null;
            this.hotelList = body.data;
          }
        })
      },
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      getBrand() {
        this.groupBrandList = [];
        this.getBrandList({
          group_id: this.groupId,
          onsuccess: body => body.data && body.data.length > 0 ? this.groupBrandList = body.data : this.showtoast({
            text: '暂无品牌',
            type: 'warning'
          })
        })
      },
    },
    mounted() {
      this.getGroupLists();
      this.brangList();
      this.getList();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    h3 {
      padding: 15px 25px;
      &:nth-child(1) {
        padding: 0 25px;
      }
    }
    .search-bar {
      padding: 15px 23px 0 26px;
    }
    .content_grouphotel {
      padding: 0 23px 0 25px;
      overflow-y: hidden;
    }
    .dialog-content {
      span {
        font-size: 16px;
        color: #4A4A4A;
      }
      .el-select {
        min-width: 300px;
        margin-left: 20px;
      }
      .group_btn {
        width: 100%;
        margin: 40px auto 0;
        text-align: center;
        .el-button {
          width: 246px;
          line-height: 18px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
        }
      }
    }
  }
</style>

