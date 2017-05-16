<template>
  <div>
    <aside>
      <router-link to="/enterprise">账户</router-link>
      <router-link to="/enterprise/hotel">门店</router-link>
    </aside>
    <router-view class="fourth-router"/>
  </div>
</template>


<script>
  export default {
    name: 'Menu'
  }
</script>
