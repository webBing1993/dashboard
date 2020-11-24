<template>
  <div>
    <aside>
      <span class="account">微信配置</span>
      <router-link to="/system" class="">小程序</router-link>
      <router-link to="/system/wechatpay">微信支付</router-link>
      <router-link to="/system/alipay">支付宝支付</router-link>
      <router-link to="/system/howmuch">好码齐支付</router-link>
      <router-link to="/system/chinaums">银联支付</router-link>
      <router-link to="/system/paymentIcbc">工行支付</router-link>
      <!--<router-link to="/system/miniappmsg">小程序消息模板</router-link>-->
      <router-link to="/system/servemessage">服务消息模板管理</router-link>
      <router-link to="/system/qrcodecreate">二维码生成</router-link>
      <router-link to="/system/prodVersion">产品版本</router-link>
      <span class="account">产品配置</span>
      <router-link to="/system/prodBaseConfig">产品基本配置</router-link>
      <router-link to="/system/lvyeCop">旅业公司管理</router-link>
      <router-link to="/system/lvyeStaff">旅业员工管理</router-link>
      <router-link to="/system/materialTemp">人证通模板</router-link>
      <span class="account">广告配置</span>
      <router-link to="/system/advcont">广告商管理</router-link>
      <router-link to="/system/mattercont">素材管理</router-link>
      <router-link to="/system/groupcont">分组管理</router-link>
      <router-link to="/system/putIn">投放管理</router-link>
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
