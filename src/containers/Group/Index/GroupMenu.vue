<template>
  <div>
    <aside>
      <span class="account">企业账户</span>
      <router-link to="/group" class="">企业管理</router-link>
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
  .account {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    padding-left: 46px;
    box-sizing: border-box;
    color: #4A4A4A;
    line-height: 39px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
    &:before {
      content: "";
      width: 22px;
      height: 19px;
      background: url("../../../assets/images/building.png") no-repeat;
      vertical-align: middle;
      background-size: 22px 19px;
      position: absolute;
      left: 14px;
      top: 8px;
    }
  }
</style>
