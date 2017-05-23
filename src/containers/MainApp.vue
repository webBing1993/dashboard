<template>
  <div>
    <div class="login-banner">
      <span>{{userInfo.name}},</span>
      <a @click="logoutAction">退出</a>
    </div>
    <div class="nav-banner">
      <span class="logo">生态酒店总控平台</span>
      <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/enterprise">企业账户</router-link>
      </nav>
    </div>
    <router-view class="second-router"/>
    <footer class="copy-right">
      <span>Powered By Fortrun.</span>
      <span>Copyright©2016-2017  All Rights Reserved.</span>
    </footer>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'MainApp',
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      ...mapActions([
        'logout',
        'goto'
      ]),
      logoutAction() {
        this.logout({
          onsuccess: body => {
            this.$router.replace('/auth');
            sessionStorage.clear();
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .login-banner {
    font-size: 15px;
    line-height: 45px;
    a {
      padding-left: 20px;
      cursor: pointer;
    }
  }
</style>
