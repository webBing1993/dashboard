<template>
  <div>
    <div class="module-wrapper">
      <a @click="goSummary">查看配置汇总</a>
      <div>
        <button @click="dialogConfig(enumShowType.PMS)">pms对接配置</button>
        <button @click="dialogConfig(enumShowType.lvyeReportType)">旅业系统配置</button>
        <button @click="dialogConfig(enumShowType.doorLock_unknown)">门锁配置</button>
        <button @click="dialogConfig(enumShowType.facein)">人脸识别配置</button>
        <button @click="dialogConfig(enumShowType.wechatPay)">微信支付配置</button>
        <button @click="dialogConfig(enumShowType.wxHotel)">生态酒店配置</button>
        <button @click="dialogConfig(enumShowType.miniApp)">小程序配置</button>
      </div>
      <div>
        <button @click="dialogConfig(enumShowType.sign)">电子签名</button>
        <button @click="dialogConfig(enumShowType.phoneCancel_unknown)">电话取消订单</button>
        <button @click="dialogConfig(enumShowType.invoice)">发票申请</button>
        <button @click="dialogConfig(enumShowType.preCheckinSms)">预登记</button>
        <button @click="dialogConfig(enumShowType.delayedPayment)">到店支付</button>
        <button @click="dialogConfig(enumShowType.autoCheckout)">自动退房</button>
        <button @click="dialogConfig(enumShowType.autoRefund)">自动退款</button>
        <button @click="dialogConfig(enumShowType.preCheckin)">无证入住</button>
      </div>
      <div>
        <button @click="dialogConfig(enumShowType.roomCard)">房卡配置</button>
        <button @click="dialogConfig(enumShowType.cashPledge)">押金配置</button>
        <button @click="dialogConfig(enumShowType.breakfastStemFrom)">早餐券配置</button>
        <button @click="dialogConfig(enumShowType.maxAllowRoomcount)">可选房数量</button>
        <button @click="dialogConfig(enumShowType.syncSpaceTime)">PMS同步频率</button>
        <button @click="dialogConfig(enumShowType.autoConfirmPrePay)">自动确认预付款</button>
        <button @click="dialogConfig(enumShowType.supportVd)">脏房配置</button>
        <button @click="dialogConfig(enumShowType.hotelfeatureDesc)">房间标签配置</button>
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
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
            <div v-show="PMSBrand != ''">
              <div>
                <span>酒店PMS编码</span>
                <el-input class="el-right" v-model="PMSCode" placeholder="请输入酒店PMS编码"></el-input>
              </div>
              <div>
                <span>酒店服务地址</span>
                <el-input class="el-right" v-model="hotelService" placeholder="请输入酒店服务地址"></el-input>
              </div>
            </div>
            <div v-show="PMSBrand == '别样红'">
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
                <span>安全服务地址</span>
                <el-input class="el-right" v-model="securityService" placeholder="请输入安全服务地址"></el-input>
              </div>
              <div>
                <span>用户名</span>
                <el-input class="el-right" v-model="PMSUserName" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                <span>密码</span>
                <el-input class="el-right" v-model="PMSPassword" placeholder="请输入密码"></el-input>
              </div>
            </div>
            <div v-show="PMSBrand == '住哲'">
              <div>
                <span>调用ID</span>
                <el-input class="el-right" v-model="cid" placeholder="请输入住哲分配的调用ID(cid)"></el-input>
              </div>
              <div>
                <span>密钥</span>
                <el-input class="el-right" v-model="key" placeholder="请输入住哲分配的密钥(key)"></el-input>
              </div>
              <div>
                <span>数据加密密钥</span>
                <el-input class="el-right" v-model="datakey" placeholder="请输入住哲分配的数据加密密钥(datakey)"></el-input>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.lvyeReportType">
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
          <div v-if="showType === enumShowType.doorLock_unknown">
          </div>
          <div v-if="showType === enumShowType.facein">
            <div>
              <span>自动通过值</span>
              <el-select class="el-right" v-model="faceinPassValue" placeholder="请选择自动通过值">
                <el-option
                  v-for="(obj, index) of [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>自动拒绝值</span>
              <el-select class="el-right" v-model="faceinRejectValue" placeholder="请选择自动拒绝值">
                <el-option
                  v-for="(obj, index) of [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
            <article>
              帮助：
              · 大于自动通过值则自动通过公安验证。
              · 小于自动拒绝值则验证自动拒绝。
              · 在自动通过值和自动拒绝值之间需要人工参与核实。
            </article>
          </div>
          <div v-if="showType === enumShowType.wechatPay">
            <div>
              <span>小程序app_id</span>
              <el-input class="el-right" v-model="wechatPayAppId" placeholder="请输入小程序app_id"></el-input>
            </div>
            <div>
              <span>小程序对应的商户号</span>
              <el-input class="el-right" v-model="mchId" placeholder="请输入小程序对应的商户号"></el-input>
            </div>
            <div>
              <span>小程序对应的商户号api密钥</span>
              <el-input class="el-right" v-model="mchApiKey" placeholder="请输入小程序对应的商户号api密钥"></el-input>
            </div>
            <div>
              <span>酒店微信账务收款代码</span>
              <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
            </div>
            <div>
              <span>酒店微信账务退款代码</span>
              <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.wxHotel">
            <div>
              <span>微信酒店ID</span>
              <el-input class="el-right" v-model="wxHotelId" placeholder="请输入微信酒店ID"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.miniApp">
            <div>
              <span>小程序app_id</span>
              <el-input class="el-right" v-model="appId" placeholder="请输入小程序app_id"></el-input>
            </div>
            <div>
              <span>小程序名称</span>
              <el-input class="el-right" v-model="appSecret" placeholder="请输入小程序名称"></el-input>
            </div>
            <div>
              <span>小程序密钥</span>
              <el-input class="el-right" v-model="originalId" placeholder="请输入小程序密钥(app_secr)"></el-input>
            </div>
            <div>
              <span>小程序原始ID</span>
              <el-input class="el-right" v-model="appName" placeholder="请输入小程序原始ID(original_id)"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.sign">
            <div>
              <span>是否开通电子签名？</span>
              <el-switch
                v-model="enabledSign"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.phoneCancel_unknown">
             <div>
              <span>是否支持电话取消订单？</span>
              <el-switch
                v-model="phoneCancel_unknown"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div v-show="phoneCancel_unknown">
              <span>允许最晚取消时间</span>
              <el-select class="el-right" v-model="phoneCancelTime_unknown">
                <el-option
                  v-for="(obj, index) of phoneCancelTimeList_unknown"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.invoice">
            <div>
              <span>是否支持申请发票？</span>
              <el-switch
                v-model="enabledInvoice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div v-show="enabledInvoice">
              <div>
                <span>发票类型</span>
                <div v-for="(obj, index) of invoiceName">
                  <el-input class="el-right" v-model="invoiceName[index]" placeholder="请输入发票类型"></el-input>
                </div>
              </div>
              <button @click="addInvoiceName">+++++</button>
              <button v-show="invoiceName.length > 1" @click="subtractInvoiceName">-----</button>
            </div>
          </div>
          <div v-if="showType === enumShowType.preCheckinSms">
            <div>
              <span>预登记是否发送短信？</span>
              <el-switch
                v-model="enabledPreCheckinSms"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.delayedPayment">
            <div>
              <span>是否开通到店支付？</span>
              <el-switch
                v-model="enabledDelayedPayment"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoCheckout">
            <div>
              <span>是否开通自动退房服务？</span>
              <el-switch
                v-model="enableAutoCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoRefund">
            <div>
              <span>是否开通自动退款服务？</span>
              <el-switch
                v-model="enabledAutoRefund"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.preCheckin">
            <div>
              <span>是否开通无证入住业务？</span>
              <el-switch
                v-model="enabledPreCheckin"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.roomCard">
            <div>
              <span>是否支持吞吐门卡？</span>
              <el-switch
                v-model="supportRoomCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.cashPledge">
            <div>
              <span>押金类型</span>
              <el-select class="el-right" v-model="cashPledgeType" placeholder="请选择押金类型">
                <el-option
                  v-for="(obj, index) of cashPledgeTypeList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div v-show="cashPledgeType != '' && cashPledgeType != 'none_cash_pledge'">
              <div v-show="cashPledgeType == 'fixed_cash_pledge'">
                <span>固定押金金额</span>
                <el-input class="el-right" v-model="fixedCashPledge" placeholder="请输入固定押金金额"></el-input>
              </div>
              <div v-show="cashPledgeType == 'multiple_of_cash_pledge'">
                <span>放大系数</span>
                <el-input class="el-right" v-model="multipleOfCashPledge" placeholder="请输入放大系数(0到1之间,例如0.2)"></el-input>
              </div>
              <div>
                <span>是否向上取整</span>
                <el-switch
                  v-model="roundUpToInteger"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
              <div>
                <span>是否有日杂费</span>
                <el-switch
                  v-model="hasDayOfIncidentals"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
              <div v-show="hasDayOfIncidentals">
                <span>日杂费金额</span>
                <el-input class="el-right" v-model="dayOfIncidentals" placeholder="请输入日杂费金额"></el-input>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.breakfastStemFrom">
            <div>
              <span>早餐券规则</span>
              <el-select class="el-right" v-model="breakfastStemFrom" placeholder="请选择早餐券规则">
                <el-option
                  v-for="(obj, index) of breakfastStemFromList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.maxAllowRoomcount">
            <div>
              <span>请输入选房列表最大展示房间数量</span>
              <el-input class="el-right" v-model="maxAllowRoomcount" placeholder="请输入选房列表最大展示房间数量"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.syncSpaceTime">
            <div>
              <span>PMS同步频率</span>
              <el-select class="el-right" v-model="syncSpaceTime" placeholder="请选择PMS同步频率">
                <el-option
                  v-for="(obj, index) of syncSpaceTimeList"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoConfirmPrePay">
            <div>
              <span>自动确认预付关键字</span>
              <el-input class="el-right" v-model="prepayKeyword" placeholder="预付|预付款|已付款"></el-input>
            </div>
            <div>
              <span>自动确认预付冲突字</span>
              <el-input class="el-right" v-model="prepayExclusionKeyword" placeholder="现付|未预付"></el-input>
            </div>
            <div>
              <span>自动确认后付关键字</span>
              <el-input class="el-right" v-model="postpayKeyword" placeholder="挂帐|公付|公司付费|公司已付"></el-input>
            </div>
            <div>
              <span>自动确认后付冲突字</span>
              <el-input class="el-right" v-model="postpayExclusionKeyword" placeholder="现付"></el-input>
            </div>
            <div>
              <span>自动确认免押关键字 </span>
              <el-input class="el-right" v-model="freeDepositKeyword" placeholder="免押金|免押"></el-input>
            </div>
            <div>
              <span>自动确认免押冲突字 </span>
              <el-input class="el-right" v-model="needDepositKeyword" placeholder=""></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.supportVd">
            <div>
              <span>是否支持分脏房？</span>
              <el-switch
                v-model="isSupportVd"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.hotelfeatureDesc">
            <div>
              <span>房间标签</span>
              <div v-for="(obj, index) of hotelfeatureDesc">
                <el-input class="el-right" v-model="hotelfeatureDesc[index]" placeholder="请输入房间标签"></el-input>
              </div>
              <button @click="addHotelfeatureDesc">+++++</button>
              <button v-show="hotelfeatureDesc.length > 1" @click="subtractHotelfeatureDesc">-----</button>
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
    PMS: 1, //PMS信息
    lvyeReportType: 2,  //旅业系统配置
    doorLock_unknown: 3, //门锁配置
    facein: 4,  //人脸识别配置
    wechatPay: 5,  //微信支付配置
    wxHotel: 6,  //微信生态酒店配置
    miniApp: 7,  //小程序配置
    sign: 8, //电子签名配置
    phoneCancel_unknown: 9, //电话取消订单配置
    invoice: 10,  //发票配置
    preCheckinSms: 11,  //预登记短信配置
    delayedPayment: 12, //到店支付配置
    autoCheckout: 13, //自动退房配置
    autoRefund: 14, //自动退款配置
    preCheckin: 15, //无证入住配置
    roomCard: 16, //门卡配置
    cashPledge: 17, //押金配置
    breakfastStemFrom: 18,  //早餐券配置
    maxAllowRoomcount: 19,  //最大房间数量配置
    syncSpaceTime: 20,  //PMS同步频率配置
    autoConfirmPrePay: 21,  //自动确认预付款配置
    supportVd: 22,  //脏房配置
    hotelfeatureDesc: 23,  //房间标签配置
  }

  const typeTitles = [' ',
                      'PMS信息',
                      '旅业系统配置',
                      '门锁配置',
                      '人脸识别配置',
                      '微信支付配置',
                      '微信生态酒店配置',
                      '小程序配置',
                      '电子签名配置',
                      '电话取消订单配置',
                      '发票配置',
                      '预登记短信配置',
                      '到店支付配置',
                      '自动退房配置',
                      '自动退款配置',
                      '无证入住配置',
                      '门卡配置',
                      '押金配置',
                      '早餐券配置',
                      '最大房间数量配置',
                      'PMS同步频率配置',
                      '自动确认预付款配置',
                      '脏房配置',
                      '房间标签配置',
                    ];

  export default {
    name: 'ConfigInfo',
    data() {
      return {
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        //PMS配置
        PMSBrandList: ['绿云', '捷信达', '别样红', '住哲'],
        PMSBrand: '',
        PMSCode: '',
        hotelService: '',
        billService: '',
        CRMService: '',
        orderService: '',
        securityService: '',
        PMSUserName: '',
        PMSPassword: '',
        cid: '',
        key: '',
        datakey: '',
        // 旅业配置
        lvyeTypeList: [{id: 'LOCAL', name: '本地'}, {id: 'CLOUD', name: '云端'}],
        lvyeType: '',
        policeId: '',
        policeType: '',
        policeParam: '',
        //门锁配置，暂无
        //人脸识别配置
        faceinPassValue: 70,
        faceinRejectValue: 70,
        //微信支付配置
        wechatPayAppId: '',
        mchId: '',
        mchApiKey: '',
        payCode: '',
        refundCode: '',
        //微信生态酒店配置
        wxHotelId: '',
        //小程序配置
        appId: '',
        appSecret: '',
        originalId: '',
        appName: '',
        //电子签名
        enabledSign: false,
        //电话取消订单  暂无
        phoneCancel_unknown: false,
        phoneCancelTime_unknown: false,
        phoneCancelTimeList_unknown: ['12:00','12:30','13:00',
        '13:30','14:00','14:30','15:00','15:30',
        '16:00','16:30','17:00','17:30','18:00',
        '18:30','19:00','19:30','20:00','20:30',
        '21:00','21:30','22:00','22:30','23:00',
        '23:30','24:00'],
        //发票配置
        enabledInvoice: true,
        invoiceName: [''],
        //预登记短信配置
        enabledPreCheckinSms: false,
        //到店支付配置
        enabledDelayedPayment: true,
        //自动退房
        enableAutoCheckout: false,
        //自动退款
        enabledAutoRefund: true,
        //无证入住
        enabledPreCheckin: true,
        //门卡配置
        supportRoomCard: true,
        //押金配置
        cashPledgeType: '',
        cashPledgeTypeList: [
          {name: '无押金', value: 'none_cash_pledge'},
          {name: '固定押金', value: 'fixed_cash_pledge'},
          {name: '首晚房费', value: 'first_day_of_room_price'},
          {name: '最大系数', value: 'multiple_of_cash_pledge'}],
        fixedCashPledge: '',
        multipleOfCashPledge: '',
        roundUpToInteger: false,
        hasDayOfIncidentals: false,
        dayOfIncidentals: '',
        //早餐券配置
        breakfastStemFrom: 'MANKE',
        breakfastStemFromList: [
          {name: '无早', value: 'NONE'},
          {name: '同步PMS早餐券', value: 'PMS'},
          {name: '漫客平台定义,人/张', value: 'MANKE'}],
        //可选房数量
        maxAllowRoomcount: '10',
        //PMS同步频率
        syncSpaceTime: '30分钟',
        syncSpaceTimeList: ['10分钟','20分钟','30分钟','1小时','2小时','3小时','6小时','12小时','24小时'],
        //自动预付款确认
        prepayKeyword: '',
        prepayExclusionKeyword: '',
        postpayKeyword: '',
        postpayExclusionKeyword: '',
        freeDepositKeyword: '',
        needDepositKeyword: '',
        //脏房配置
        isSupportVd: true,
        //酒店标签配置
        hotelfeatureDesc: ['']
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

        switch (this.showType) {
          case enumShowType.PMS: 
            
            break;
          case enumShowType.lvyeReportType: 
            
            break;
          case enumShowType.doorLock_unknown: 
            
            break;
          case enumShowType.facein: 
            
            break;
          case enumShowType.wechatPay: 
            
            break;
          case enumShowType.wxHotel: 
            
            break;
          case enumShowType.miniApp: 
            
            break;
          case enumShowType.sign: 
            
            break;
          case enumShowType.phoneCancel_unknown: 
            
            break;
          case enumShowType.invoice: 
            {
              let arr = this.invoiceName.filter(v => v != '');  //去除空字符串
              console.log(arr)
            }
            break;
          case enumShowType.preCheckinSms: 
            
            break;
          case enumShowType.delayedPayment: 
            
            break;
          case enumShowType.autoCheckout: 
            
            break;
          case enumShowType.autoRefund: 
            
            break;
          case enumShowType.preCheckin: 
            
            break;
          case enumShowType.roomCard: 
            
            break;
          case enumShowType.cashPledge: 
            
            break;
          case enumShowType.breakfastStemFrom: 
            
            break;
          case enumShowType.maxAllowRoomcount: 
            
            break;
          case enumShowType.syncSpaceTime: 
            
            break;
          case enumShowType.autoConfirmPrePay: 
            
            break;
          case enumShowType.supportVd: 
            
            break;
          case enumShowType.hotelfeatureDesc: 
            {
              let arr = this.hotelfeatureDesc.filter(v => v != '');  //去除空字符串
              console.log(arr)
            }
            break;
          default:
            console.log('enumShowType.init');
        }
      },
      dialogConfig(type) {
        this.showType = type;
        this.showDialog = true;
      },
      addInvoiceName() {
        this.invoiceName.push('');
      },
      subtractInvoiceName() {
        if (this.invoiceName.length == 1) return;
        this.invoiceName.pop();
      },
      addHotelfeatureDesc() {
        this.hotelfeatureDesc.push('');
      },
      subtractHotelfeatureDesc() {
        if (this.hotelfeatureDesc.length == 1) return;
        this.hotelfeatureDesc.pop();
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