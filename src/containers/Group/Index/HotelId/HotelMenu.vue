<template>
  <div>
    <aside>
      <a class="side_a">门店信息</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId">基本信息</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/room'">楼宇房间</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/roomtype'">房型配置</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/receptionArea'" v-if="showReception">接待区</router-link>
      <a class="side_b">配置管理</a>
      <!--<router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/config'">门店配置</router-link>-->
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigSysInfo'">酒店系统配置</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigBusnessInfo'">酒店业务配置</router-link>
      <!--<router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigHotelInfo'">门店酒店配置</router-link>-->
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigMicro'">小程序相关配置</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigProd'">微前台产品开通</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/config2'">待删除</router-link>
      <a class="side_b">门店设备</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/device'">设备管理</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/faceDevice'">刷脸设备管理</router-link>
      <a class="side_b">上线管理</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/onlinestatus'">上线状态</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/hotelStaff'">酒店员工</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/veriffication'">核验信息</router-link>
      <a class="side_b">产品版本管理</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/manageProdVersion'">产品版本</router-link>
      <!--<router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/rechargeDetail'">充值详情</router-link>-->
      <!--<router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/withoutCardCheck'">无证核验使用详情</router-link>-->
      <a class="side_b">酒店账户</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/hotelMoney'">余额</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/consumptionRecord'">消费记录</router-link>
    </aside>

    <router-view class="fifth-router"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'Menu',
    computed: {
      ...mapState({
        'showReception':state => state.enterprise.showReception
      }),
      groupId(){
        return this.$route.params.id
      },
      hotelId(){
        return this.$route.params.hotelid
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .side_a {
    color: #4A4A4A;
    font-size: 16px;
    margin-top: 12px;
    font-weight: 600
  }
  .side_b {
    color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600
  }
</style>
