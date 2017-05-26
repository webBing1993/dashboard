<template>
  <div class="app-content">
    <router-view id="app" class="first-router"></router-view>
    <Toast v-model="Interface.toast.show" :title="Interface.toast.text"/>
    <Toast v-model="Interface.loading.show" loading/>
    <Alert v-model="Interface.alert.show" :title="Interface.alert.title" @on-show="onShow" @on-hide="onHide">{{ Interface.alert.content }}</Alert>
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
    methods: {
      ...mapActions([
        'goto'
      ]),
      onShow() {
        // console.log('onShow')
      },
      onHide() {
        if (this.Interface.alert.code == 401) this.goto('/auth')
      },
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
