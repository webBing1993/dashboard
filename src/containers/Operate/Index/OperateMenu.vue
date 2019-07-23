<template>
  <div>
    <aside>
      <span class="account">运营中心</span>
      <router-link to="/operate" class="">连接</router-link>
      <router-link to="/operate/orderCheckIn" class="">订单入住</router-link>
      <router-link to="/operate/RZTStatistics" class="">人证通统计</router-link>
      <router-link to="/operate/xcxHotel" class="">小程序使用统计</router-link>

      <!--<router-link to="/system/wechatpay">微信支付</router-link>-->
      <!--&lt;!&ndash;<router-link to="/system/miniappmsg">小程序消息模板</router-link>&ndash;&gt;-->
      <!--<router-link to="/system/servemessage">服务消息模板管理</router-link>-->
      <!--<router-link to="/system/qrcodecreate">二维码生成</router-link>-->
      <!--<router-link to="/system/prodVersion">产品版本</router-link>-->
      <!--<span class="account">产品配置</span>-->
      <!--<router-link to="/system/prodBaseConfig">产品基本配置</router-link>-->

    </aside>
    <router-view class="fourth-router"/>
  </div>
</template>

<script>
  export default {
    name: 'SystemMenu'
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
