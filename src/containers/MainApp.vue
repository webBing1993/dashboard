<template>
  <div>
    <div class="nav-banner">
      <span class="logo">生态酒店总控平台</span>
      <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/group">企业账户</router-link>
        <router-link to="/system">系统设置</router-link>
        <div class="login-banner">
          <span>您好,{{userInfo.name}}</span>
          <a @click="logoutAction">退出</a>
        </div>
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
      ...mapState({
        userInfo: state => state.utils.userInfo
      }),
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
