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
        <table-enterprise :list="list" @detail="goDetail" @hotel="goHotel" @edit="goEdit" @config="goConfig"></table-enterprise>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableEnterprise from '@/components/Tables/table-enterprise.vue'
  export default {
    name: 'Group',
    data () {
      return {
        searchVal: '',
        list: [{code: 'E01', name: '如家酒店集团', num: 15}]
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
        this.$router.push(`enterprise/${666}`)
      },
      goHotel(obj) {
        this.$router.push(`enterprise/${666}/hotel`)
      },
      goEdit(obj) {
        this.$router.push(`enterprise/${666}/edit`)
      },
      goConfig(obj) {
        this.$router.push(`enterprise/${666}/config`)
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
<style scoped>
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
  }
  .search-bar {
    width: 100%;
    padding: 8px, 20px;
    box-sizing: border-box;
  }
  input {
    width: 50%;
    height: 40px;
    font-size: 18px;
  }
  button {
    cursor: pointer;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #0000FF;
    border: none;
  }
  .content {
    padding: 0 20px;
  }
</style>

