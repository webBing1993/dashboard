<template>
  <div>
    <div class="login-banner">
      <span>username,</span>
      <a>退出</a>
    </div>
    <div class="nav-banner">
      <span class="logo">生态酒店总控平台</span>
      <nav>
        <router-link to="/home">首页</router-link>
        <router-link to="/enterprise">企业账户</router-link>
      </nav>
    </div>
    <router-view/>
    <footer class="copy-right">
      <span>Powered By Fortrun.</span>
      <span>Copyright©2016-2017  All Rights Reserved.</span>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard'
  }
</script>
