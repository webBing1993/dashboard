<template>
  <div>
    <div class="module-wrapper">
      <a @click="goSummary">查看配置汇总</a>
      <div>
        <button @click="PMSConfig">pms对接配置</button>
        <button @click="lvyeReportTypeConfig">旅业系统配置</button>
        <button @click="unknown">门锁配置</button>
        <button @click="faceinPassConfig">人脸识别配置</button>
        <button @click="unknown">微信支付配置</button>
        <button @click="wxHotelConfig">生态酒店配置</button>
        <button @click="unknown">小程序配置</button>
      </div>
      <div>
        <button @click="signConfig">电子签名</button>
        <button @click="unknown">电话取消订单</button>
        <button @click="unknown">发票申请</button>
        <button @click="preCheckinConfig">预登记</button>
        <button @click="delayedPaymentConfig">到店支付</button>
        <button @click="autoCheckoutConfig">自动退房</button>
        <button @click="autoRefundConfig">自动退款</button>
        <button @click="unknown">无证入住</button>
      </div>
      <div>
        <button @click="roomCardConfig">房卡配置</button>
        <button @click="cashPledgeConfig">押金配置</button>
        <button @click="breakfastStemFromConfig">早餐券配置</button>
        <button @click="maxAllowRoomcountConfig">可选房数量</button>
        <button @click="syncSpaceTimeConfig">PMS同步频率</button>
        <button @click="prepayKeywordConfig">自动确认预付款</button>
        <button @click="isSupportVdConfig">脏房配置</button>
        <button @click="roomfeatureDescConfig">房间标签配置</button>
      </div>
      <el-dialog 
        :title="showType" 
        :visible.sync="showDialog" 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div class="dialog-content">
          <h1>这里是内容</h1>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfigInfo',
    data() {
      return {
        showType: 'PMS信息',
        showDialog: false
      }
    },
    methods: {
      goSummary() {
        //这里需要判断是否有group_id,再决定跳哪个路由
        this.$router.push({
          name: 'ConfigSummary'
        })
      },
      hideDialog() {
        this.showDialog = false;
      },
      submitDialog() {
        this.showDialog = false;
      },
      unknown() {
        console.log('unknown')
      },
      PMSConfig() {
        console.log('PMSConfig')
        this.showDialog = true;
      },
      lvyeReportTypeConfig() {
        console.log('lvyeReportTypeConfig')
      },
      faceinPassConfig() {
        console.log('faceinPassConfig')
      },
      wxHotelConfig() {
        console.log('wxHotelConfig')
      },
      signConfig() {
        console.log('signConfig')
      },
      preCheckinConfig() {
        console.log('preCheckinConfig')
      },
      delayedPaymentConfig() {
        console.log('delayedPaymentConfig')
      },
      autoCheckoutConfig() {
        console.log('autoCheckoutConfig')
      },
      autoRefundConfig() {
        console.log('autoRefundConfig')
      },
      unknown() {
        console.log('unknown')
      },
      roomCardConfig() {
        console.log('roomCardConfig')
      },
      cashPledgeConfig() {
        console.log('cashPledgeConfig')
      },
      breakfastStemFromConfig() {
        console.log('breakfastStemFromConfig')
      },
      maxAllowRoomcountConfig() {
        console.log('maxAllowRoomcountConfig')
      },
      syncSpaceTimeConfig() {
        console.log('syncSpaceTimeConfig')
      },
      prepayKeywordConfig() {
        console.log('prepayKeywordConfig')
      },
      isSupportVdConfig() {
        console.log('isSupportVdConfig')
      },
      roomfeatureDescConfig() {
        console.log('roomfeatureDescConfig')
      },
    }
  }
</script>