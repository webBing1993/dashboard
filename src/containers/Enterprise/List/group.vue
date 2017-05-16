<template>
  <div>
    <h1>账户管理</h1>
    <div>
      <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码" />
      <button @click="getList"> 查询 </button>
      <button @click="regist"> + 注册企业账户</button>
    </div>
    <div>
      <h3>最近操作的企业账户</h3>
      <table-enterprise :list="list" @detail="goDetail" @edit="goEdit" @config="goConfig"></table-enterprise>
    </div>
  </div>
</template>
<script>
  import tableEnterprise from '@/components/Tables/table-enterprise.vue'
  export default {
    name: 'EnterpriseGroup',
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
      regist() {
        this.$router.push('enterprise/add')
      },
      goDetail(obj) {
        // this.$router.push(`enterprise/${666}`)
        console.log('goDetail')
      },
      goEdit(obj) {
        console.log('goEdit')
      },
      goConfig(obj) {
        console.log('goConfig')
      },
      getList() {
        
      }
    }
  }
</script>

