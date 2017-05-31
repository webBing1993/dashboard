<template>
  <div>
    <aside>
      <router-link to="/group" class="">账户管理</router-link>
      <router-link to="/group/hotel">门店管理</router-link>
    </aside>
    <router-view class="fourth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'GroupMenu'
  }
</script>

<style scoped lang="less">
  .list-item {
    position: relative;
    &:before {
      content: "";
      width: 12px;
      height: 12px;
      border: none;
      transform: rotate(45deg);
      background-color: #8f8f8f;
      position: absolute;
      left: 18px;
      top: 16px;
    }
  }
</style>
