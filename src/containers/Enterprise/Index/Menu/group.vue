<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">账户管理</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码"/>
        <button @click="getList"> 查询 </button>
        <button @click="regist"> + 注册企业账户</button>
      </div>
      <div class="content">
        <h3>最近操作的企业账户</h3>
        <table-enterprise :list="list" @detail="goDetail" @hotel="goHotel" @edit="goEdit"
                          @config="goConfig"></table-enterprise>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tableEnterprise from '@/components/Tables/table-enterprise.vue';
  export default {
    name: 'Group',
    data () {
      return {
        searchVal: '',
        list: [
          {
            "id": "xxxxxxxxxxxxxxxx",
            "name": "如家集团",
            "memo": "企业简介企业简介企业简介企业简介",
            "website": "http://www.baidu.com",
            "hotel_num": "23"   //门店数量（只用在搜索接口返回）
          }
        ]
      }
    },
    components: {
      tableEnterprise
    },
    methods: {
      ...mapActions([
        'getEnterpriseList'
      ]),
      regist() {
        this.$router.push('enterprise/add')
      },
      goDetail(obj) {
        this.$router.push(`enterprise/${obj.id}`)
      },
      goHotel(obj) {
        this.$router.push(`enterprise/${obj.id}/hotel`)
      },
      goEdit(obj) {
        this.$router.push(`enterprise/${obj.id}/edit`)
      },
      goConfig(obj) {
        this.$router.push(`enterprise/${obj.id}/config`)
      },
      getList() {
        this.getEnterpriseList({
          searchVal: this.searchVal,
          onsuccess: body => console.log(body.data)
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

