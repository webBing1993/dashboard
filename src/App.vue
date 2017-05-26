<template>
  <div class="app-content">
    <router-view v-loading.body="Interface.loading.show" id="app" class="first-router"></router-view>
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
    watch: {
      'Interface.alert.show'(v) {
        if (v) {
          this.$alert(this.Interface.alert.content, this.Interface.alert.title, {
            confirmButtonText: '确定',
            callback: action => {
              if (this.Interface.alert.code == 401) this.goto('/auth')
            }
          });
        }
      },
      'Interface.toast.show'(v) {
        if (v) {
          this.$store.state.Interface.toast.show = false;
          this.$message(this.Interface.toast.text);
        }
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
