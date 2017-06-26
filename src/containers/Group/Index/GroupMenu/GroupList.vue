<template>
  <div>
    <div class="module-wrapper">
      <h3>企业管理（共{{total}}家企业）</h3>
      <div class="search-bar">
        <el-input class="el-right" v-model="searchVal" placeholder="输入企业名称或账户编码"></el-input>
        <el-button type="success" @click.native="getList">搜索</el-button>
        <el-button type="success" @click.native="regist">+ 添加企业</el-button>
      </div>
      <h3>最近操作的企业账户</h3>
      <div class="content_table">
        <table-group :list="list" :page="page" :size="size" @detail="goDetail" @hotel="goHotelList" @edit="goEdit"
                     @config="goConfig"></table-group>
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
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'GroupList',
    data () {
      return {
        searchVal: '',
        list: [],
        page: 1,
        size: 20,
        total: 0
      }
    },
    methods: {
      ...mapActions([
        'getGroupList',
        'goto'
      ]),
      regist() {
        this.goto({
          name: 'AddGroup'
        })
      },
      goDetail(obj) {
        this.goto({
          name: 'GroupInfo',
          params: {
            id: obj.id
          }
        })
      },
      goHotelList(obj) {
        if (obj.hotelNum == 0) return;
        this.goto({
          name: 'GroupHotelList',
          params: {
            id: obj.id
          }
        })
      },
      goEdit(obj) {
        this.goto({
          name: 'GroupInfo',
          params: {
            id: obj.id
          }
        })
      },
      goConfig(obj) {
        this.goto({
          name: 'Brand',
          params: {
            id: obj.id
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
        this.getGroupList({
          keyword: this.searchVal,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            this.list = body.data;
          }
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style lang="less">
  .module-wrapper {
    /*position: relative;*/
    /*overflow-y: auto;*/
    h3 {
      font-size: 16px;
      color: #4A4A4A;
      padding: 0 23px 16px 25px;
      &:nth-child(1) {
        line-height: 68px;
        padding-bottom: 0;
        border-bottom: 1px solid #ECECEC;
        font-size: 16px;
        color: #4A4A4A;
      }
    }
    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 23px 15px 25px;
      box-sizing: border-box;
      .el-input {
        width: 68%;
      }
      .el-button {
        margin-left: 17px;
        background-color: #39C240;
        min-width: 173px;
        line-height: 18px;
        font-size: 14px;
        border-radius: 0;
      }
    }

    .content_table {
      padding: 0 23px 0 25px;
      overflow-y: auto;
    }
  }
</style>

