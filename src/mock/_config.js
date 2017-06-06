const Mock = require('mockjs')

const configModel = {
          "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
          //PMS信息
          
          // //旅业配置
          // "lvye_report_type":"LOCAL", //LOCAL ,CLOUD
          // "hotel_ga_id":"xxxxxxxx", 
          // "police_type":"SHENZHEN",
          // "police_param":{"ikey":"B40556205781055035081708","ieid":"Wxt_00002","iver":"v1.0","ipms":"WQT1.0","comp_company":"深圳优图","db_type":"1","conn_string":"Server=172.17.11.252;Database=ga_hotel;User ID=xh;Password=xh;"},

          //人脸识别配置
          // "facein_pass_value":"70",  //自动通过值
          // "facein_reject_value":"70",  //自动拒绝值
          
          //微信支付配置  
          "miniapp_config":{
            "app_id":"小程序app_id",
            "mch_id":"小程对应的商户号",
            "mch_api_key":"小程对应的商户号api密钥"
          },
        // "pay_code":"20",   //微信酒店账务收款代码
        // "refund_code":"21",  //财务退款代码
          
          //微信生态酒店配置
          // "wx_hotel_id":"xxxxx",
          
          // //小程序配置
          // "app_id":"xxxxxx",
          // "app_secret":"应用密钥",
          // "original_id":"应用原始ID",
          // "app_name":"xxx",
          
          // //电子签名
          // "enabled_sign":"false",
          
          //电话取消订单
          //暂时没有
          
          //发票配置
          // "enabled_invoice":"true",  //是否启用开发票功能
          "invoice_name":[],
          
          //预登记短信配置
          // "enabled_pre_checkin_sms" :"false", //预登记是否发短信

          //到店支付配置
          // "enabled_delayed_payment" :"true",
          
          // //自动退房
          // "enable_auto_checkout": "true",
          
          // //自动退款
          // "enabled_auto_refund":"false",
          
          // //无证入住
          // "enabled_pre_checkin":"true",
          
          // //门卡配置
          // "support_room_card":"true",
          
          //押金配置
          "cash_pledge_config":{
          },
          
          // //早餐券配置
          // "breakfast_stem_from":"NONE", //NONE-无早,PMS-同步PMS早餐券,MANKE-漫 客平台定义,人/张,默认PMS
          
          // //可选房数量配置
          // "max_allow_roomcount" :"10",
          
          // //PMS同步频率（分钟）
          // "sync_space_time" :"30",
          
          // //自动预付款确认
          // "prepay_keyword": "",//预付
          // "prepay_exclusion_keyword": "",//预付例外
          // "postpay_keyword": "",//后付
          // "postpay_exclusion_keyword": "",//后付例外
          // "free_deposit_keyword": "",//免押
          // "need_deposit_keyword": "",//免押例外

          //脏房配置
          // "is_support_vd":"1", //1支持，0不支持
          
          //酒店标签配置
        "room_tags":[
          ]
        }

Mock.mock(
    /\/hotel\/.+\/config$/,
    function(request){
      console.log(request)
        let re = {
            "errcode": "0",
            "errmsg": "ok",
            "data": configModel
        }
        return re;
    }
)
