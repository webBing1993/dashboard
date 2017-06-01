<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">账户管理</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码"/>
        <span class="_button" @click="search">查询</span>
        <span class="_button" @click="regist">+ 注册企业账户</span>
      </div>
      <h3>最近操作的企业账户</h3>
      <div class="content">
        <table-group :list="list" @detail="goDetail" @hotel="goHotelList" @edit="goEdit"
                          @config="goConfig"></table-group>
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
        list: []
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
      getList() {
        this.getGroupList({
          onsuccess: body => this.list = body.data
        })
      },
      search() {
        this.$router.push({
          name: 'SearchGroup',
          query: {
            group: this.searchVal
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

