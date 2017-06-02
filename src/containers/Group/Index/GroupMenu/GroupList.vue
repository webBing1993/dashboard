<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">账户管理（共{{total}}家企业）</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="输入企业名称或账户编码"/>
        <span class="_button" @click="getList">查询</span>
        <span class="_button" @click="regist">+ 注册企业账户</span>
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
          :page-sizes="[2,10, 20, 30]"
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
      ]),
      regist() {
        this.$router.push({
          name: 'AddGroup'
        })
      },
      goDetail(obj) {
        this.$router.push({
          name: 'GroupInfo',
          params: {
            id: obj.id
          }
        })
      },
      goHotelList(obj) {
        if (obj.hotelNum == 0) return;
        this.$router.push({
          name: 'GroupHotelList',
          params: {
            id: obj.id
          }
        })
      },
      goEdit(obj) {
        this.$router.push({
          name: 'GroupInfo',
          params: {
            id: obj.id
          }
        })
      },
      goConfig(obj) {
        this.$router.push({
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
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? this.total = +headers.map['x-total'][0] : null;
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

