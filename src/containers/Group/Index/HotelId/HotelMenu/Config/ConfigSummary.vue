<template>
  <div>
    <div class="module-wrapper">
      <div v-show="!isEmptyConfigData()">
        <h1>配置汇总</h1>
        <div>
          <h3>PMS对接配置</h3>
          <!--<p>PMS品牌: </p>
          <p>酒店PMS编码: </p>
          <p>酒店服务地址: </p>
          <p>账单服务地址: </p>
          <p>CRM服务地址: </p>
          <p>订单服务地址: </p>
          <p>安全服务地址: </p>
          <p>用户名: </p>
          <p>密码: </p>
          <p>调用ID: </p>
          <p>密钥: </p>
          <p>数据加密密钥: </p>-->
        </div>
        <div>
          <h3>旅业系统配置</h3>
          <p>旅业系统类型: {{configData.lvye_report_type}}</p>
          <p>酒店公安ID: {{configData.hotel_ga_id}}</p>
          <p>公安类型: {{configData.police_type}}</p>
          <p>公安参数: {{configData.police_param}}</p>
        </div>
        <div>
          <h3>门锁配置</h3>
          <p>暂未设计</p>
        </div>
        <div>
          <h3>人脸识别配置</h3>
          <p>自动通过值: {{configData.facein_pass_value}}</p>
          <p>自动拒绝值: {{configData.facein_reject_value}}</p>
        </div>
        <div>
          <h3>微信支付配置</h3>
          <p>小程序app_id: {{configData.miniapp_config.app_id}}</p>
          <p>小程序对应的商户号: {{configData.miniapp_config.mch_id}}</p>
          <p>小程序对应的商户号api密钥: {{configData.miniapp_config.mch_api_key}}</p>
          <p>酒店微信账务收款代码: {{configData.pay_code}}</p>
          <p>酒店微信账务退款代码: {{configData.refund_code}}</p>
        </div>
        <div>
          <h3>生态酒店配置</h3>
          <p>微信酒店ID: {{configData.wx_hotel_id}}</p>
        </div>
        <div>
          <h3>小程序配置</h3>
          <p>小程序app_id: {{configData.app_id}}</p>
          <p>小程序名称: {{configData.app_secret}}</p>
          <p>小程序密钥: {{configData.original_id}}</p>
          <p>小程序原始ID: {{configData.app_name}}</p>
        </div>
        <div>
          <h3>电子签名配置</h3>
          <p>是否开通电子签名: {{configData.enabled_sign}}</p>
        </div>
        <div>
          <h3>电话取消订单配置</h3>
          <p>暂未设计</p>
        </div>
        <div>
          <h3>发票配置</h3>
          <p>是否支持申请发票: {{configData.enabled_invoice}}</p>
          <p>发票类型: </p>
          <p v-for="(obj, index) of configData.invoice_name" :key="index">{{obj}}</p>
        </div>
        <div>
          <h3>预登记短信配置</h3>
          <p>预登记是否发送短信: {{configData.enabled_pre_checkin_sms}}</p>
        </div>
        <div>
          <h3>到店支付配置</h3>
          <p>是否开通到店支付: {{configData.enabled_delayed_payment}}</p>
        </div>
        <div>
          <h3>自动退房配置</h3>
          <p>是否开通自动退房服务: {{configData.enable_auto_checkout}}</p>
        </div>
        <div>
          <h3>自动退款配置</h3>
          <p>是否开通自动退款服务: {{configData.enabled_auto_refund}}</p>
        </div>
        <div>
          <h3>无证入住配置</h3>
          <p>是否开通无证入住业务: {{configData.enabled_pre_checkin}}</p>
        </div>
        <div>
          <h3>门卡配置</h3>
          <p>是否支持吞吐门卡: {{configData.support_room_card}}</p>
        </div>
        <div>
          <h3>押金配置</h3>
          <p>押金类型: {{configData.cash_pledge_config.cash_pledge_type}}</p>
          <p>固定押金金额: {{configData.cash_pledge_config.fixed_cash_pledge}}</p>
          <p>放大系数: {{configData.cash_pledge_config.multiple_of_cash_pledge}}</p>
          <p>是否向上取整: {{configData.cash_pledge_config.round_up_to_integer}}</p>
          <p>是否有日杂费: {{configData.cash_pledge_config.has_day_of_incidentals}}</p>
          <p>日杂费金额: {{configData.cash_pledge_config.day_of_incidentals}}</p>
        </div>
        <div>
          <h3>早餐券配置</h3>
          <p>早餐券规则: {{configData.breakfast_stem_from}}</p>
        </div>
        <div>
          <h3>最大房间数量配置</h3>
          <p>选房列表最大展示房间数量: {{configData.max_allow_roomcount}}</p>
        </div>
        <div>
          <h3>PMS同步频率配置</h3>
          <p>PMS同步频率: {{configData.sync_space_time}}</p>
        </div>
        <div>
          <h3>自动确认预付款配置</h3>
          <p>预付款关键字: {{configData.prepay_keyword}}</p>
          <p>预付款冲突字: {{configData.prepay_exclusion_keyword}}</p>
          <p>后付关键字: {{configData.postpay_keyword}}</p>
          <p>后付冲突字: {{configData.postpay_exclusion_keyword}}</p>
          <p>押金关键字: {{configData.free_deposit_keyword}}</p>
          <p>押金冲突字: {{configData.need_deposit_keyword}}</p>
        </div>
        <div>
          <h3>脏房配置</h3>
          <p>是否支持分脏房: {{configData.is_support_vd}}</p>
        </div>
        <div>
          <h3>房间标签配置</h3>
          <p>房间标签: </p>
          <p v-for="(obj, index) of configData.hotelfeature_desc" :key="index">{{obj}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tool from '@/assets/tools/tool.js'
  export default {
    name: 'ConfigSummary',
    data() {
      return {
        configData: {
          "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
          //PMS信息
          
          //旅业配置
          "lvye_report_type":"LOCAL", //LOCAL ,CLOUD
          "hotel_ga_id":"xxxxxxxx", 
          "police_type":"SHENZHEN",
          "police_param":{"ikey":"B40556205781055035081708","ieid":"Wxt_00002","iver":"v1.0","ipms":"WQT1.0","comp_company":"深圳优图","db_type":"1","conn_string":"Server=172.17.11.252;Database=ga_hotel;User ID=xh;Password=xh;"},

          //人脸识别配置
          "facein_pass_value":"70",  //自动通过值
          "facein_reject_value":"70",  //自动拒绝值
          
          //微信支付配置  
          "miniapp_config":{
            "app_id":"小程序app_id",
            "mch_id":"小程对应的商户号",
            "mch_api_key":"小程对应的商户号api密钥"
          },
        "pay_code":"20",   //微信酒店账务收款代码
        "refund_code":"21",  //财务退款代码
          
          //微信生态酒店配置
          "wx_hotel_id":"xxxxx",
          
          //小程序配置
          "app_id":"xxxxxx",
          "app_secret":"应用密钥",
          "original_id":"应用原始ID",
          "app_name":"xxx",
          
          //电子签名
          "enabled_sign":"false",
          
          //电话取消订单
          //暂时没有
          
          //发票配置
          "enabled_invoice":"true",  //是否启用开发票功能
          "invoice_name":["住宿费"],
          
          //预登记短信配置
          "enabled_pre_checkin_sms" :"false", //预登记是否发短信

          //到店支付配置
          "enabled_delayed_payment" :"true",
          
          //自动退房
          "enable_auto_checkout": "true",
          
          //自动退款
          "enabled_auto_refund":"false",
          
          //无证入住
          "enabled_pre_checkin":"true",
          
          //门卡配置
          "support_room_card":"true",
          
          //押金配置
          "cash_pledge_config":{
            "cash_pledge_type": "fixed_cash_pledge",//押金类型none_cash_pledge,fixed_cash_pledge,multiple_of_cash_pledge,first_day_of_room_price
            "fixed_cash_pledge": 30000,//固定押金(分)
            "multiple_of_cash_pledge": 0.2,//押金为房费的倍数
            "round_up_to_integer": true,//是否向上10000取整
            "has_day_of_incidentals": true,//是否有日杂费
            "day_of_incidentals": 3000 //日杂费金额
          },
          
          //早餐券配置
          "breakfast_stem_from":"NONE", //NONE-无早,PMS-同步PMS早餐券,MANKE-漫 客平台定义,人/张,默认PMS
          
          //可选房数量配置
          "max_allow_roomcount" :"10",
          
          //PMS同步频率（分钟）
          "sync_space_time" :"30",
          
          //自动预付款确认
          "prepay_keyword": "",//预付
          "prepay_exclusion_keyword": "",//预付例外
          "postpay_keyword": "",//后付
          "postpay_exclusion_keyword": "",//后付例外
          "free_deposit_keyword": "",//免押
          "need_deposit_keyword": "",//免押例外

          //脏房配置
          "is_support_vd":"1", //1支持，0不支持
          
          //酒店标签配置
        "hotelfeature_desc":[
            "可抽烟",
            "朝南"
          ]
        }
      }
    },
    computed: {
      // ...mapState([
      //   'configData'
      // ]),
    },
    filters: {
      
    },
    methods: {
      ...mapActions([
        'getConfig',
        'showtoast'
      ]),
      isEmptyConfigData() {
        return tool.isBlank(this.configData) || tool.isEmptyObject(this.configData)
      },
      getConfigs() {
        this.getConfig({
            hotelId: this.$route.params.hotelid,
            onsuccess: body => {

            }
        })
      }
    },
    mounted() {
      if (tool.isBlank(this.configData)) {
        this.getConfigs();
      }
    }
  }
</script>