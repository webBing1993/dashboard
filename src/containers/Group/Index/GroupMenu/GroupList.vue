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
        <table-enterprise :list="list" @detail="goDetail" @hotel="goHotel" @edit="goEdit"
                          @config="goConfig"></table-enterprise>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tableEnterprise from '@/modules/Tables/table-enterprise.vue';

  export default {
    name: 'GroupList',
    data () {
      return {
        searchVal: '',
        list: []
      }
    },
    components: {
      tableEnterprise
    },
    methods: {
      ...mapActions([
        'getGroupList',
      ]),
      regist() {
        this.$router.push('group/addgroup')
      },
      goDetail(obj) {
        this.$router.push(`group/${obj.id}`)
      },
      goHotel(obj) {
        if (obj.hotelNum == 0) return;
        this.$router.push(`group/${obj.id}/hotel`)
      },
      goEdit(obj) {
        // this.$router.push(`group/${obj.id}/edit`)
        this.$router.push(`group/${obj.id}`)
      },
      goConfig(obj) {
        this.$router.push(`group/${obj.id}/brand`)
      },
      getList() {
        this.getGroupList({
          onsuccess: body => this.list = body.data
        })
      },
      search() {
        this.$router.push(`group/searchGroup?group=${this.searchVal}`)
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

