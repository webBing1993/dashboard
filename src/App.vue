<template>
  <div>
    <router-view id="app" class="first-router"></router-view>
    <Toast v-model="Interface.toast.show" :title="Interface.toast.text"/>
    <Toast v-model="Interface.loading.show" loading/>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapState([
        'Interface',
      ]),
    },
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
