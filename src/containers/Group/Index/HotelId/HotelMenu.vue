<template>
  <div>
    <aside>
      <router-link :to="'/group/hotel/' + hotelId">基本信息</router-link>
      <router-link :to="'/group/hotel/' + hotelId + '/room'">楼宇房间</router-link>
      <router-link :to="'/group/hotel/' + hotelId + '/config'">门店配置</router-link>
      <router-link :to="'/group/hotel/' + hotelId + '/device'">设备管理</router-link>
    </aside>
    <router-view class="fifth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    computed: {
      hotelId(){
        return this.$route.params.hotelid
      }
    }
  }
</script>
