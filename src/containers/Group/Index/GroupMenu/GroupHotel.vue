<template>
  <div>
    <div class="module-wrapper">
      <h3>门店管理（{{total}}家门店）</h3>
      <div class="search-bar">
        <el-input v-model="searchVal" @keyup.13.native="getList" placeholder="请输入门店的名称或子账户编码"></el-input>
        <el-input v-model="device_id" @keyup.13.native="getList" placeholder="请输入deviceID查找"></el-input>
        <el-select v-model="version_name_value" placeholder="版本">
          <el-option
            v-for="(obj, index) in  versionOptions"
            :key="obj.version_name"
            :label="obj.version_name"
            :value="obj.version_name">
          </el-option>
        </el-select>
        <el-button type="success" @click.native="getList">搜索</el-button>
        <el-button type="success" @click.native="regist">+ 添加门店</el-button>
      </div>
      <h3>最近操作的门店</h3>
      <div class="content_grouphotel">
        <table-hotel :list="list" :page="page" :size="size"
                     @detail="detail" @group="group" @edit="detail" @config="config" @device="device"></table-hotel>
      </div>
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
      <el-dialog title="选择企业" :visible.sync="showDialog">
        <div class="dialog-content">
          <div>
            <span>所属企业</span>
            <el-select class="el-right" v-model="groupId" placeholder="请选择所属企业">
              <el-option
                v-for="(obj, index) in groupList"
                :key="obj.id"
                :label="obj.name"
                :value="obj.id">
              </el-option>
            </el-select>
          </div>
          <div class="group_btn">
            <el-button type="success" @click.native="chooseGroup">确定</el-button>
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
        device_id: '',
        brandList: [],
        hotelList: [],
        page: 1,
        size: 20,
        total: 0,
        showDialog: false,
        groupId: '',
        groupList: [],
        groupBrandList: [],
        versionOptions:[],
        version_name_value:''
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
        'getHotelList',
        'getVersionList',
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
            id: obj.group_id || undefined,
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
          device_id: this.device_id,
          hotel_version: this.version_name_value,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

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
      _getVersionList(){
        this.getVersionList({
          offset:0,
          limit:0,
          onsuccess: body => this.versionOptions = body.data

        })
      },
    },
    mounted() {
      this.getGroupLists();
      this.brangList();
      this.getList();
      this._getVersionList();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    h3 {
      padding: 15px 25px;
      &:nth-child(1) {
        padding: 0 25px;
      }
    }
    .search-bar {
      padding: 15px 23px 0 26px;
      .el-input{
        width: 30%;
      }
      .el-button--success{
       width: 100px;
      }
    }
    .content_grouphotel {
      padding: 0 23px 10px 25px;
      flex-grow: 1;
      overflow: auto;
      margin-bottom: 60px;
    }
    .el-pagination {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      line-height: 50px;
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

