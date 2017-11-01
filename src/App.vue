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
      ...mapState({
        Interface: state => state.utils.Interface,
      }),
    },
    watch: {
//      'Interface.alert.show'(v) {
//        if (v) {
//          this.$alert(this.Interface.alert.content, this.Interface.alert.title, {
//            confirmButtonText: '确定',
//            callback: action => {
//              this.$store.state.utils.Interface.alert.show = false;
//              if (this.Interface.alert.code == 401) this.goto({path: '/auth'})
//            }
//          });
//        }
//      },
      'Interface.toast.show'(v) {
        if (v) {
          this.Interface.toast.show = false;
          console.log("哈哈哈哈");
          this.$message({
            showClose: true,
            message: this.Interface.toast.text,
            type: this.Interface.toast.type
          });
        }
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  @import "./assets/styles/index.less";
</style>
