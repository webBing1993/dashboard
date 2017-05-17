<template>
  <div>
    <aside>
      <router-link :to="'/enterprise/' + enterpriseId + '/hotelhome'">门店管理</router-link>
    </aside>
    <router-view class="fifth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    computed: {
      enterpriseId(){
        return this.$route.params.id
      }
    }
  }
</script>
