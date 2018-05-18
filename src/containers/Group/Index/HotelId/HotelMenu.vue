<template>
  <div>
    <aside>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 12px;font-weight: 600">门店信息</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId">基本信息</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/room'">楼宇房间</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/roomtype'">房型配置</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/receptionArea'" v-if="showReception">接待区</router-link>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600">配置管理</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/config'">门店配置</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/config2'">门店配置2</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/ConfigProd'">开通产品配置</router-link>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600">门店设备</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/device'">设备管理</router-link>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600">上线管理</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/onlinestatus'">上线状态</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/hotelStaff'">酒店员工</router-link>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600">产品版本管理</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/manageProdVersion'">产品版本</router-link>
      <a style="color: #4A4A4A;font-size: 16px;margin-top: 10px;font-weight: 600">充值</a>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/rechargeDetail'">充值详情</router-link>
      <router-link :to="'/group/' + groupId + '/hotel/' + hotelId + '/withoutCardCheck'">无证核验使用详情</router-link>
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
