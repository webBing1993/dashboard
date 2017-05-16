<template>
  <div class="page-wrapper">
    <div class="login-banner">
      <span>username,</span>
      <a>退出</a>
    </div>
    <nav>
      <span>微信生态酒店</span>
      <router-link to="/home">home</router-link>
      <router-link to="/enterprise">enterprise</router-link>
    </nav>
    <router-view class="main-wrapper"/>
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
