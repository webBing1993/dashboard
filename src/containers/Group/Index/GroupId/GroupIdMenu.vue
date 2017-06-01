<template>
  <div>
    <aside>
      <router-link :to="'/group/' + groupId">基本信息</router-link>
      <router-link :to="'/group/' + groupId + '/brand'">品牌管理</router-link>
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
