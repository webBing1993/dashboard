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
        :title="typeTitles[showType]" 
        :visible.sync="showDialog" 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div class="dialog-content">
          <div v-if="showType === enumShowType.PMS">
            <div>
              <span>PMS品牌</span>
              <el-select class="el-right" v-model="PMSBrand" placeholder="请选择PMS品牌">
                <el-option
                  v-for="(obj, index) of PMSBrandList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>酒店PMS编码</span>
              <el-input class="el-right" v-model="PMSCode" placeholder="请输入酒店PMS编码"></el-input>
            </div>
            <div>
              <span>酒店服务地址</span>
              <el-input class="el-right" v-model="hotelService" placeholder="请输入酒店服务地址"></el-input>
            </div>
            <div>
              <span>账单服务地址</span>
              <el-input class="el-right" v-model="billService" placeholder="请输入账单服务地址"></el-input>
            </div>
            <div>
              <span>CRM服务地址</span>
              <el-input class="el-right" v-model="CRMService" placeholder="请输入CRM服务地址"></el-input>
            </div>
            <div>
              <span>订单服务地址</span>
              <el-input class="el-right" v-model="orderService" placeholder="请输入订单服务地址"></el-input>
            </div>
            <div>
              <span>渠道标识</span>
              <el-input class="el-right" v-model="channelFlag" placeholder="请输入渠道标识"></el-input>
            </div>
            <div>
              <span>渠道凭证编码</span>
              <el-input class="el-right" v-model="channelCode" placeholder="请输入渠道凭证编码"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.lvye">
            <div>
              <span>旅业系统类型</span>
              <el-select class="el-right" v-model="lvyeType" placeholder="请选择旅业系统类型">
                <el-option
                  v-for="(obj, index) of lvyeTypeList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
            </div>
            <div v-if="lvyeType != ''">
              <div>
                <span>酒店公安ID</span>
                <el-input class="el-right" v-model="policeId" placeholder="请输入酒店公安ID"></el-input>
              </div>
              <div>
                <span>公安类型</span>
                <el-input class="el-right" v-model="policeType" placeholder="请输入公安类型"></el-input>
              </div>
              <div v-if="lvyeType == 'LOCAL'">
                <div>
                  <span>公安参数</span>
                  <el-input class="el-right" v-model="policeParam" placeholder="请输入公安参数"></el-input>
                </div>
              </div>
            </div>
          </div>
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

  const enumShowType = {
    init: 0,
    PMS: 1,
    lvye: 2
  }

  const typeTitles = [' ', 'PMS信息', '旅业系统配置'];

  export default {
    name: 'ConfigInfo',
    data() {
      return {
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        //PMS配置
        PMSBrandList: [],
        PMSBrand: '',
        PMSCode: '',
        hotelService: '',
        billService: '',
        CRMService: '',
        orderService: '',
        channelFlag: '',
        channelCode: '',
        // 旅业配置
        lvyeTypeList: [{id: 'LOCAL', name: '本地'}, {id: 'CLOUD', name: '云端'}],
        lvyeType: '',
        policeId: '',
        policeType: '',
        policeParam: '',
        //
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

        if (this.showType === enumShowType.PMS) {
          console.log('PMSType submit')
        } else if (this.showType === enumShowType.lvye) {
          console.log('lvyeType submit')
        }
      },
      unknown() {
        console.log('unknown')
      },
      PMSConfig() {
        console.log('PMSConfig')
        this.showType = enumShowType.PMS
        this.showDialog = true;
      },
      lvyeReportTypeConfig() {
        console.log('lvyeReportTypeConfig')
        this.showType = enumShowType.lvye
        this.showDialog = true;
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
<style scoped lang="less">
  .el-right {
    width: 300px;
    margin-left: 16px;
  }
</style>