<template>
  <div>
    <aside>
      <router-link :to="'/enterprise/' + enterpriseId">企业账户首页</router-link>
      <router-link :to="'/enterprise/' + enterpriseId + '/config'">配置管理</router-link>
      <router-link :to="'/enterprise/' + enterpriseId + '/hotel'">门店管理</router-link>
    </aside>
    <router-view class="fourth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'SubMenu',
    computed: {
      enterpriseId(){
        return this.$route.params.id
      }
    }
  }
</script>
