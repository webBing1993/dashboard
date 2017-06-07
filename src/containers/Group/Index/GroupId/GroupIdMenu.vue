<template>
  <div>
    <aside>
      <div>企业设置</div>
      <router-link :to="'/group/' + groupId">基本信息</router-link>
      <router-link :to="'/group/' + groupId + '/brand'">品牌管理</router-link>
      <div>门店管理</div>
      <router-link :to="'/group/' + groupId + '/hotel'">门店管理</router-link>
    </aside>
    <router-view class="fifth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    computed: {
      groupId(){
        return this.$route.params.id
      }
    }
  }
</script>
