<template>
  <div>
    <div class="module-wrapper">
      <span class="title">门店管理（{{total}}家门店）</span>
      <div class="search-bar">
        <el-input v-model="searchVal" placeholder="请输入门店的名称或子账户编码"></el-input>
        <el-button type="success" @click.native="getList">查询</el-button>
        <el-button type="success" @click.native="regist">+ 添加企业门店</el-button>
      </div>
      <h3>最近操作的门店</h3>
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
          <el-button type="success" @click.native="chooseGroup">确定</el-button>
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
        'getBrandList',
        'getGroupList',
      ]),
      regist() {
        this.getGroupLists();
        this.showDialog = true;
      },
      chooseGroup() {
        this.$router.push({
          name: 'AddHotel',
          params: {
            id: this.groupId
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
    .title {
      line-height: 50px;
      padding: 0 20px;
      display: block;
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
      ._button {
        width: 160px;
        margin-left: 40px;
      }
    }
    h3 {
      font-weight: 300;
      font-size: 20px;
      padding: 0 20px 10px;
      &:before {
        content: '';
        border-left: solid 4px #8f8f8f;
        padding-right: 8px;
      }
    }
    .content {
      padding: 0 20px;
      height: 70%;
      /*overflow-y: scroll;*/
    }
  }
</style>

