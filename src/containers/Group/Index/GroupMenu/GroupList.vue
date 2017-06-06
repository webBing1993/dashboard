<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">账户管理（共{{total}}家企业）</h3>
      <div class="search-bar">
        <el-input v-model="searchVal" placeholder="请输入企业的名称或账户编码"></el-input>
        <el-button type="success" @click.native="getList">查询</el-button>
        <el-button type="success" @click.native="regist">+ 注册企业账户</el-button>
      </div>
      <h3>最近操作的企业账户</h3>
      <div class="content">
        <table-group :list="list" @detail="goDetail" @hotel="goHotelList" @edit="goEdit"
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

<style scoped lang="less">
  @import "./index.less";
</style>

