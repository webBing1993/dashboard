<template>
  <div>
    <aside>
      <div>门店信息</div>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId">基本信息</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/room'">楼宇房间</router-link>
      <div>门店配置</div>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/config'">门店配置</router-link>
      <div>门店设备</div>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/device'">设备管理</router-link>
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
      },
      hotelId(){
        return this.$route.params.hotelid
      }
    }
  }
</script>
