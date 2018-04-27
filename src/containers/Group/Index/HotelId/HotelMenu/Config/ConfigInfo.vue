<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <div class="content-title">
        <span>系统配置</span>
        <a @click="goSummary">查看配置汇总</a>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.PMS)">
            <div class="item_img">
              <img src="../../../../../../assets/images/系统.png" alt="a">
            </div>
            <div class="item-text">
              <span>pms对接配置</span>
              <p>对接PMS的酒店必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !pmsId, 'tag_text_green': pmsId}">{{pmsId ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8" v-if="!showReception">
          <button @click="dialogConfig(enumShowType.lvyeReportType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>旅业系统配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':lvyeType, 'tag_text_green': lvyeType}">{{lvyeType ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.doorLock_unknown)">
            <div class="item_img">
              <img src="../../../../../../assets/images/门锁.png" alt="a">
            </div>
            <div class="item-text">
              <span>门锁配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">暂无</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.facein)">
            <div class="item_img">
              <img src="../../../../../../assets/images/人脸识别 BFR.png" alt="a">
            </div>
            <div class="item-text">
              <span>人脸识别配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.facein_pass_value, 'tag_text_green': configData.facein_pass_value}">{{configData.facein_pass_value ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.wechatPay)">
            <div class="item_img">
              <img src="../../../../../../assets/images/微信支付.png" alt="a">
            </div>
            <div class="item-text">
              <span>PMS支付配置</span>
              <p>配置PMS支付信息。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': payCode, 'tag_text_green': payCode}">{{payCode ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="depswitch()">
            <div class="item_img">
              <img src="../../../../../../assets/images/酒店.png" alt="a">
            </div>
            <div class="item-text">
              <span>生态酒店配置</span>
              <p>必须开通该配置,身份识别、旅业上报
                等接口需要用到。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!configData.wx_hotel_id, 'tag_text_green': configData.wx_hotel_id}">{{configData.wx_hotel_id ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.miniApp)">
            <div class="item_img">
              <img src="../../../../../../assets/images/小程序.png" alt="a">
            </div>
            <div class="item-text">
              <span>小程序配置</span>
              <p>关联小程序配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':appId , 'tag_text_green':appId}">{{appId ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8" v-if="showReception">
          <button @click="dialogConfig(enumShowType.moreLvyeReportType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>多旅业系统配置</span>
              <p>多旅业配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !showMoreLvyeConfig, 'tag_text_green':showMoreLvyeConfig}">{{showMoreLvyeConfig ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.customization)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>定制化配置</span>
              <p>酒店LOGO、酒店介绍</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !mirrorBrand||mirrorIntro, 'tag_text_green':mirrorBrand||mirrorIntro}">{{mirrorBrand||mirrorIntro ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.accessServiceType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店开通业务类型配置</span>
              <p>业务类型配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !accessService, 'tag_text_green':accessService}">{{accessService? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
      </el-row>

      <div class="content-title">
        <span>业务配置 <i>（选择酒店开启业务）</i></span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.sign)">
            <div class="item_img">
              <img src="../../../../../../assets/images/签名.png" alt="a">
            </div>
            <div class="item-text">
              <span>电子签名</span>
              <p>客人是否需要在支付后签名。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledSign, 'tag_text_green': enabledSign}">{{enabledSign ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.enabledCancelTime)">
            <div class="item_img">
              <img src="../../../../../../assets/images/cancel.png" alt="a">
            </div>
            <div class="item-text">
              <span>电话取消订单</span>
              <p>客人是否可以电话取消订单，如果可以，最晚在几点之前可以取消。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !isEnabledCancelTime, 'tag_text_green': isEnabledCancelTime}">{{isEnabledCancelTime ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.invoice)">
            <div class="item_img">
              <img src="../../../../../../assets/images/发票.png" alt="a">
            </div>
            <div class="item-text">
              <span>发票配置</span>
              <p>配置客人是否可以申请发票。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledInvoice, 'tag_text_green': enabledInvoice}">{{enabledInvoice ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.fastInvoice)">
            <div class="item_img">
              <img src="../../../../../../assets/images/发票.png" alt="a">
            </div>
            <div class="item-text">
              <span>闪开发票配置</span>
              <p>配置客人是否可以申请闪开发票。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledSpeedInvoice, 'tag_text_green': enabledSpeedInvoice}">{{enabledSpeedInvoice ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.preCheckinSms)">
            <div class="item_img">
              <img src="../../../../../../assets/images/登记.png" alt="a">
            </div>
            <div class="item-text">
              <span>预登记短信</span>
              <p>配置客人是否可以受到预登记短信提醒。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledPreCheckinSms, 'tag_text_green': enabledPreCheckinSms}">{{enabledPreCheckinSms ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.delayedPayment)">
            <div class="item_img">
              <img src="../../../../../../assets/images/到店.png" alt="a">
            </div>
            <div class="item-text">
              <span>到店支付</span>
              <p>开通后客人可以免支付完成预登记</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledDelayedPayment, 'tag_text_green': enabledDelayedPayment}">{{enabledDelayedPayment ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoCheckout)">
            <div class="item_img">
              <img src="../../../../../../assets/images/退房.png" alt="a">
            </div>
            <div class="item-text">
              <span>自动退房</span>
              <p>插回房卡自动操作PMS退房，旅业退房，不需要营业员参与。</p>
            </div>
            <span class="tag_text" :class="{'tag_text_red': !enableAutoCheckout, 'tag_text_green': enableAutoCheckout}">{{enableAutoCheckout ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoRefund)">
            <div class="item_img">
              <img src="../../../../../../assets/images/退款.png" alt="a">
            </div>
            <div class="item-text">
              <span>退款业务配置</span>
              <p>酒店不必人工登录微信支付手动操作退款，退房成功后调用退款接口。</p>
            </div>
            <span class="tag_text" :class="{'tag_text_red': !enabledAutoRefund, 'tag_text_green': enabledAutoRefund}">{{enabledAutoRefund ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.preCheckin)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证入住</span>
              <p>酒店是否支持无证入住</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledPreCheckin, 'tag_text_green': enabledPreCheckin}">{{enabledPreCheckin ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.mobileCheckin)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>启用移动端办理入住</span>
              <p>启用后可在微前台小程序中进行选房、登记入住人信息、支付等操作
              </p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledMobileCheckin, 'tag_text_green': enabledMobileCheckin}">{{enabledMobileCheckin ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.rcPrint)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>RC单打印</span>
              <p>酒店是否支持RC单打印，选择开启一房一签或一人一签
              </p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hasSetRc, 'tag_text_green': hasSetRc}">{{hasSetRc ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.enableRCstatus)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>RC单是否开启字段</span>
              <p>RC单是否开启字段</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !rcStatus, 'tag_text_green': rcStatus}">{{rcStatus ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
      </el-row>
      <div class="content-title">
        <span>酒店配置 <i>（需要配置以下所有项目）</i></span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.roomCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/卡.png" alt="a">
            </div>
            <div class="item-text">
              <span>房卡配置</span>
              <p>酒店房卡,对接门锁配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !supportRoomCard||issuedCardRuleVal, 'tag_text_green': supportRoomCard||issuedCardRuleVal}">{{supportRoomCard||issuedCardRuleVal ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.cashPledge)">
            <div class="item_img">
              <img src="../../../../../../assets/images/押金.png" alt="a">
            </div>
            <div class="item-text">
              <span>押金配置</span>
              <p>配置酒店押金规则</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !cashPledgeType, 'tag_text_green':cashPledgeType}">{{cashPledgeType ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.breakfastStemFrom)">
            <div class="item_img">
              <img src="../../../../../../assets/images/卡券.png" alt="a">
            </div>
            <div class="item-text">
              <span>早餐券配置</span>
              <p>配置早餐券规则</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':breakfastStemFrom, 'tag_text_green':breakfastStemFrom}">{{breakfastStemFrom ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.maxAllowRoomcount)">
            <div class="item_img">
              <img src="../../../../../../assets/images/列表.png" alt="a">
            </div>
            <div class="item-text">
              <span>可选房数量</span>
              <p>展示给用户看的最大房间数量</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !maxAllowRoomcount, 'tag_text_green':maxAllowRoomcount}">{{maxAllowRoomcount ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.syncSpaceTime)">
            <div class="item_img">
              <img src="../../../../../../assets/images/同步.png" alt="a">
            </div>
            <div class="item-text">
              <span>PMS同步频率</span>
              <p>设置自动同步周期</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !syncSpaceTime, 'tag_text_green': syncSpaceTime}">{{syncSpaceTime ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoConfirmPrePay)">
            <div class="item_img">
              <img src="../../../../../../assets/images/自动投标.png" alt="a">
            </div>
            <div class="item-text">
              <span>自动确认预付款</span>
              <p>配置预付款确认关键字</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': prepayKeyword, 'tag_text_green': prepayKeyword}">{{prepayKeyword ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.supportVd)">
            <div class="item_img">
              <img src="../../../../../../assets/images/打扫.png" alt="a">
            </div>
            <div class="item-text">
              <span>脏房配置</span>
              <p>配置酒店对脏房的态度</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!isSupportVd, 'tag_text_green': isSupportVd}">{{isSupportVd ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.roomTags)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>房间标签配置</span>
              <p>配置酒店对脏房的态度</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.room_tags || configData.room_tags.length == 0, 'tag_text_green': configData.room_tags && configData.room_tags.length > 0}">{{configData.room_tags && configData.room_tags.length > 0 ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.fastCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>极速领卡配置</span>
              <p>配置极速领卡</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledSpeedCard, 'tag_text_green':enabledSpeedCard}">{{enabledSpeedCard ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.CustomerOperate)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>订单操作配置</span>
              <p>酒店是否允许顾客操作</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!curstomDeploy, 'tag_text_green':curstomDeploy}">{{curstomDeploy ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.ticketPrint)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>是否打印小票配置</span>
              <p>是否打印小票</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledTicketPrint, 'tag_text_green': enabledTicketPrint}">{{enabledTicketPrint ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.advancedCheckout)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>退离规则配置</span>
              <p>是否允许提前退房</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledAdvancedCheckout||!enabledPMScheckout||!enabledSameDateIO, 'tag_text_green':enabledAdvancedCheckout||enabledPMScheckout||enabledSameDateIO}">{{enabledAdvancedCheckout||enabledPMScheckout||enabledSameDateIO ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.hotelAreaCode)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店行政区划代码配置</span>
              <p>酒店行政区划代码</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hotelAreaCodeVal, 'tag_text_green':hotelAreaCodeVal}">{{hotelAreaCodeVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.qrCodeCreate)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店二维码配置</span>
              <p>完善线下业务使用，当前可配置发票与mobile-checkin</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!configData.QR_CodeVal, 'tag_text_green':configData.QR_CodeVal}">{{configData.QR_CodeVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoGiveRoom)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>分房配置</span>
              <p>是否自动分房</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!autoGiveRoomVal, 'tag_text_green':autoGiveRoomVal}">{{autoGiveRoomVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.identityCheck)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>开启身份核验功能</span>
              <p>是否开启墨镜身份核验</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !identityCheckVal, 'tag_text_green': identityCheckVal}">{{identityCheckVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.PADshowContent)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>PAD界面内容显示配置</span>
              <p>PAD界面内容显示配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hotelMark, 'tag_text_green': hotelMark}">{{hotelMark ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.informCoResident)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>同住人未到提醒配置</span>
              <p>同住人未到提醒配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !timeStep, 'tag_text_green': timeStep}">{{timeStep ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.noCertificateCheck)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证核验</span>
              <p>酒店是否开启无证核验功能</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enableNoCertificateCheck, 'tag_text_green': enableNoCertificateCheck}">{{enableNoCertificateCheck ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8" v-show="false">
          <button @click="dialogConfig(enumShowType.appManage)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>应用功能配置管理</span>
              <p>可配置微前台应用模块功能管理</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.business_mode, 'tag_text_green': configData.business_mode}">{{configData.business_mode ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.appManage2)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>企业微信应用功能配置</span>
              <p>可配置微前台应用模块功能管理</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.business_mode, 'tag_text_green': configData.business_mode}">{{configData.business_mode ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.reviewRoomNum)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>旅业房间号核对配置</span>
              <p>匹配PMS，房间号手动输入旅业房间号</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !isHaveRoomNumReviewList, 'tag_text_green': isHaveRoomNumReviewList}">{{isHaveRoomNumReviewList ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.isShowPoliceHandeld)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>公安验证是否显示已处理列表配置</span>
              <p>企业微信公安验证是否显示已处理列表</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!configData.enable_show_plice_processed, 'tag_text_green': configData.enable_show_plice_processed}">{{configData.enable_show_plice_processed ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.keyAccess)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>关键通道配置</span>
              <p>配置关键通道</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.enable_pull_identity_guest_info , 'tag_text_green': configData.enable_pull_identity_guest_info }">{{configData.enable_pull_identity_guest_info ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
      </el-row>
      <!--/弹框页-->
      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        @close="closeMorelvye(showType)"
      >
        <div class="dialog-content">
          <span class="tip" v-if="setTip">* 旅业信息不能为空</span>
          <div v-if="showType === enumShowType.PMS">
            <div class="item-form">
              <span>PMS品牌</span>
              <el-select class="el-right" v-model="pmsId" placeholder="请选择PMS品牌">
                <el-option
                  v-for="(obj, index) of PMSBrandList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
            </div>
            <div v-show="pmsId != ''">
              <div class="item-form">
                <span>酒店PMS编码</span>
                <el-input class="el-right" v-model="hotelPmsCode" placeholder="请输入酒店PMS编码"></el-input>
              </div>
              <div class="item-form">
                <span>酒店服务地址</span>
                <el-input class="el-right" v-model="hotelServiceUrl" placeholder="请输入酒店服务地址"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '2' || pmsType == '7'|| pmsType == '11'||pmsType == '14'">
              <div class="item-form">
                <span>crsURL</span>
                <el-input class="el-right" v-model="crsURL" placeholder="请输入crsURL，选填"></el-input>
              </div>
              <div class="item-form">
                <span>hotelGroupCode</span>
                <el-input class="el-right" v-model="hotelGroupCode" placeholder="请输入hotelGroupCode，选填"></el-input>
              </div>
              <div class="item-form">
                <span>appKey</span>
                <el-input class="el-right" v-model="appKey" placeholder="请输入appkey，选填"></el-input>
              </div>
              <div class="item-form">
                <span>appSecret</span>
                <el-input class="el-right" v-model="PMSAppSecret" placeholder="请输入appSecret，选填"></el-input>
              </div>
              <div class="item-form">
                <span>用户名</span>
                <el-input class="el-right" v-model="userCode" placeholder="请输入用户名，选填"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="password" placeholder="请输入密码，选填"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '1'">
              <div class="item-form">
                <span>账单服务地址</span>
                <el-input class="el-right" v-model="billServiceUrl" placeholder="请输入账单服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>CRM服务地址</span>
                <el-input class="el-right" v-model="crmServiceUrl" placeholder="请输入CRM服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>订单服务地址</span>
                <el-input class="el-right" v-model="orderServiceUrl" placeholder="请输入订单服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>安全服务地址</span>
                <el-input class="el-right" v-model="secServiceUrl" placeholder="请输入安全服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>渠道名称</span>
                <el-input class="el-right" v-model="userName" placeholder="请输入用户名"></el-input>
              </div>
              <div class="item-form">
                <span>渠道凭证</span>
                <el-input class="el-right" v-model="userPass" placeholder="请输入密码"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '3'">
              <div class="item-form">
                <span>调用ID</span>
                <el-input class="el-right" v-model="cid" placeholder="请输入住哲分配的调用ID(cid)"></el-input>
              </div>
              <div class="item-form">
                <span>密钥</span>
                <el-input class="el-right" v-model="key" placeholder="请输入住哲分配的密钥(key)"></el-input>
              </div>
              <div class="item-form">
                <span>数据加密密钥</span>
                <el-input class="el-right" v-model="dataKey" placeholder="请输入住哲分配的数据加密密钥(datakey)"></el-input>
              </div>
              <div class="item-form">
                <span>用户名</span>
                <el-input class="el-right" v-model="adminName" placeholder="请输入用户名"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="adminPassword" placeholder="请输入密码"></el-input>
              </div>
              <div class="item-form">
                <span>品牌ID</span>
                <el-input class="el-right" v-model="brandId" placeholder="请输入品牌ID"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '8'">
              <div class="item-form">
                <span>密钥</span>
                <el-input class="el-right" v-model="dcKey" placeholder="请输入东呈分配的密钥(key)"></el-input>
              </div>
            </div>
            <!--西软BS-->
            <div v-show="pmsType == '12'">
              <div class="item-form">
                <span>集团ID</span>
                <el-input class="el-right" v-model="xrbs_groupCode" placeholder="请输入集团ID"></el-input>
              </div>
              <div class="item-form">
                <span>平台appkey</span>
                <el-input class="el-right" v-model="xrbs_appkey" placeholder="请输入平台appkey"></el-input>
              </div>
              <div class="item-form">
                <span>平台授权码</span>
                <el-input class="el-right" v-model="xrbs_authCode" placeholder="请输入平台授权码"></el-input>
              </div>
              <div class="item-form">
                <span>返回语种信息</span>
                <el-input class="el-right" v-model="xrbs_infoLanguage" placeholder="请输入返回语种信息"></el-input>
              </div>
              <div class="item-form">
                <span>服务方法版本</span>
                <el-input class="el-right" v-model="xrbs_serviceVersion" placeholder="请输入服务方法版本"></el-input>
              </div>
              <div class="item-form">
                <span>渠道代码</span>
                <el-input class="el-right" v-model="xrbs_CRM" placeholder="请输入渠道代码"></el-input>
              </div>
              <div class="item-form">
                <span>站点ID</span>
                <el-input class="el-right" v-model="xrbs_siteId" placeholder="请输入站点ID"></el-input>
              </div>
              <div class="item-form">
                <span>工号</span>
                <el-input class="el-right" v-model="xrbs_employeeNum" placeholder="请输入工号"></el-input>
              </div>
              <div class="item-form">
                <span>模块号</span>
                <el-input class="el-right" v-model="xrbs_moduleNum" placeholder="请输入模块号"></el-input>
              </div>
            </div>
            <div class="item-form">
              <span>备注</span>
              <el-input class="el-right" v-model="remark" placeholder="备注"></el-input>
            </div>
            <div class="item-form">
              <span>是否对接退房接口</span>
              <el-switch
                v-model="checkout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>微前台公号</span>
              <el-input class="el-right" v-model="wqtPublicNo" placeholder="请输入微前台公号"></el-input>
            </div>
            <div v-show="pmsType == '5'||pmsType == '7'||pmsType == '9'">
              <div class="item-form" v-for="(item,index) of urls">
                <span>代理（备选网址）</span>
                <el-input class="el-right" v-model="item.url"></el-input>
                <img src="../../../../../../assets/images/减少.png" class="reduceImg" @click="reduceAlterUrl(index)">
              </div>
              <div style="margin-left: 9rem">
                <el-button plain @click="addAlterUrl"> 添加一个备选网址</el-button>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.lvyeReportType">
            <div class="lvyeItem">
              <div class="item-form">
                <span>上传配置项</span>
                <el-select class="el-right" v-model="singlelvyeAutoReport" placeholder="请选择旅业系统类型">
                  <el-option
                    v-for="(obj, index) of LvyeConfigItemList"
                    :key="obj.index"
                    :label="obj.name"
                    :value="obj.value">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>旅业系统类型</span>
                <el-select class="el-right" v-model="lvyeType" placeholder="请选择旅业系统类型">
                  <el-option
                    v-for="(obj, index) of rendLvyeTypeList"
                    :key="obj.index"
                    :label="obj.lvye_report_type_name"
                    :value="obj.lvye_report_type">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>酒店公安ID</span>
                <el-input class="el-right" v-model="policeId" placeholder="请输入酒店公安ID"></el-input>
              </div>
              <div class="item-form">
                <span>公安类型</span>
                <el-input class="el-right" v-model="policeType" placeholder="请输入公安类型"></el-input>
              </div>
              <div v-show="isPoliceParam">
                <div class="item-form">
                  <span>公安参数</span>
                  <el-input class="el-right" v-model="policeParam" placeholder="请输入公安参数,正确的JSON字符串"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.doorLock_unknown">
            <h1>暂无</h1>
          </div>
          <div v-if="showType === enumShowType.facein">
            <div class="item-form">
              <span>人脸识别通道</span>
              <el-select class="el-right" v-model="faceTongdao" placeholder="请选择自动通过值">
                <el-option
                  v-for="(obj, index) of [{name:'腾讯优图',val:'YOUTO'},{name:'厦门身份宝',val:'SHENFENBAO'}]"
                  :key="index"
                  :label="obj.name"
                  :value="obj.name">
                </el-option>
              </el-select>
            </div>
            <div class="item-form" v-if="faceTongdao!=='腾讯优图' && faceTongdao==='厦门身份宝'">
              <span>身份宝账号</span>
              <el-input class="el-right" placeholder="请输入内容" v-model="identityAccount"></el-input>
              <span></span>
            </div>
            <div class="item-form" v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
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
            <div class="item-form" v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
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
            <div class="item-form">
              <span>是否开启人脸识别</span>
              <el-switch
                v-model="faceEqu"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否自动人脸核验</span>
              <el-switch
                v-model="autoIdentityCheckVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否显示相似度对比值</span>
              <el-switch
                v-model="similarity"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="faceTongdao!=='腾讯优图' && faceTongdao==='厦门身份宝'">
              <span>身份宝拒绝是否人工参与</span>
              <el-switch
                v-model="shenfenbaoRejectManual"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <article v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
              <ul>
                帮助：
                <li>大于自动通过值则自动通过公安验证。</li>
                <li>小于自动拒绝值则验证自动拒绝。</li>
                <li>在自动通过值和自动拒绝值之间需要人工参与核实。</li>
              </ul>
            </article>
          </div>
          <div v-if="showType === enumShowType.wechatPay">
            <div class="item_large">
              <span>酒店微信账务收款代码</span>
              <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信账务退款代码</span>
              <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
            </div>
            <div class="item_large">
              <span>酒店房租房费关键词</span>
              <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信支付项目名</span>
              <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信退款项目名</span>
              <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.wxHotel && RegisterOk">
            <div class="item-form">
              <el-select class="el-right" v-model="optionvalue" placeholder="城市服务">
                <el-option
                  v-for="(obj, index) of renderList"
                  :key="index"
                  :label="obj.route_name"
                  :value="obj.route_code">
                </el-option>
              </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button class="reg" @click="dialogConfig(enumShowType.WxHotelRegister)">注册
              </el-button>
            </div>
          </div>
          <div v-if="showType === enumShowType.WxHotelRegister">
            <div style="font-size: 14px;font-weight: 400;color: #6d6e6e;margin-left: 35px;line-height: 2em">
              <p style="margin-top: 30px"><span style="margin-right: 20px">微信酒店ID:</span>
                <label v-if="RegistersWxHotelId">{{RegistersWxHotelId ? RegistersWxHotelId : '系统异常1'}}</label>
                <label v-if="wxHotelId">{{wxHotelId ? wxHotelId : '系统异常2'}}</label>
              </p>
              <div>
                <div v-if="1">
                  <el-button style="width: 200px;margin-top: 30px" @click="isDelete()">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.miniApp">
            <div class="item-form">
              <span>服务商模式</span>
              <el-switch
                v-model="provider"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>小程序app_id</span>
              <el-select class="el-right" v-model="appIdTemp" filterable placeholder="请选择小程序">
                <el-option
                  v-for="(obj, index) of miniAppList"
                  :key="obj.app_id"
                  :label="`${obj.app_id} | ${obj.app_name}`"
                  :value="`${obj.app_id} | ${obj.app_name}`">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>商户mch_id</span>
              <el-select class="el-right" v-model="mchIdTemp" filterable placeholder="请输入商户号">
                <el-option
                  v-for="(obj, index) of mchIdList"
                  :key="obj.value"
                  :label="obj.value"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div v-show="provider">
              <div class="item-form">
                <span>服务商app_id</span>
                <el-select class="el-right" v-model="providerAppIdTemp" filterable placeholder="请选择服务商app_id">
                  <el-option
                    v-for="(obj, index) of miniAppList"
                    :key="obj.app_id"
                    :label="`${obj.app_id} | ${obj.app_name}`"
                    :value="`${obj.app_id} | ${obj.app_name}`">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>服务商mch_id</span>
                <el-select class="el-right" v-model="providerMchIdTemp" filterable placeholder="请选择服务商mch_id">
                  <el-option
                    v-for="(obj, index) of providerMchIdList"
                    :key="obj.value"
                    :label="obj.value"
                    :value="obj.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.sign">
            <div class="item-form">
              <span>是否开通电子签名？</span>
              <el-switch
                v-model="enabledSign"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.enabledCancelTime">
            <div class="item-form">
              <span>是否支持电话取消订单？</span>
              <el-switch
                v-model="isEnabledCancelTime"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div v-show="isEnabledCancelTime">
              <span>允许最晚取消时间</span>
              <el-select class="el-right" v-model="enabledCancelTime">
                <el-option
                  v-for="(obj, index) of enabledCancelTimeList"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.invoice">
            <div class="item-form">
              <span>是否支持申请发票？</span>
              <el-switch
                v-model="enabledInvoice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div v-show="enabledInvoice">
              <div class="item-tag2">
                <span style="min-width: 102px;">发票类型</span>
                <div class="tag-input">
                  <div v-for="(obj, index) of invoiceName">
                    <el-input class="el-right" v-model="invoiceName[index]" placeholder="请输入发票类型"></el-input>
                  </div>
                  <div class="tag-btn">
                    <button style="border-color: #D0011B;color: #D0011B" v-show="invoiceName.length > 1"
                            @click="subtractInvoiceName">-
                    </button>
                    <button style="border-color: #39C240; color: #39C240" @click="addInvoiceName">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.fastInvoice">
            <div class="item-form">
              <span>是否开启闪开发票？</span>
              <el-switch
                v-model="enabledSpeedInvoice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>发票类型 </span>
              <el-checkbox-group class="el-right" v-model="invoiceType">
                <el-checkbox v-for="item in invoicesList" :label="item.value" :key="item.value">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="item-tag2">
              <span>code</span>
              <div class="tag-input">
                <div style="display: flex" v-for="(obj, index) in invoiceCode">
                  <el-input class="el-right" v-model="invoiceCode[index]" placeholder="请输入code"></el-input>
                  <el-button v-show="invoiceCode[index]" @click.native="creatQrcode(invoiceCode[index])">生成二维码
                  </el-button>
                </div>
                <div class="tag-btn">
                  <button style="border-color: #D0011B;color: #D0011B" v-show="invoiceCode.length > 1"
                          @click="subtractInvoiceCode">-
                  </button>
                  <button style="border-color: #39C240; color: #39C240" @click="addInvoiceCode">+</button>
                </div>
              </div>
            </div>
            <div class="item-form">
              <span>发票插件ID配置</span>
              <el-input class="el-right" v-model="plugCode" placeholder="请输入发票插件ID"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.preCheckinSms">
            <div class="item-form">
              <span>预登记是否发送短信？</span>
              <el-switch
                v-model="enabledPreCheckinSms"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.delayedPayment">
            <div class="item-form">
              <span>是否开通到店支付？</span>
              <el-switch
                v-model="enabledDelayedPayment"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoCheckout">
            <div class="item-form">
              <span>是否开通自动退房服务？</span>
              <el-switch
                v-model="enableAutoCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoRefund">
            <div class="item-form">
              <span>退款方式</span>
              <el-select class="el-right" v-model="refundVal" placeholder="请选择退款方式">
                <el-option
                  v-for="(obj, index) of refundList"
                  :key="obj.index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>是否开通退款业务配置服务？</span>
              <el-switch
                v-model="enabledAutoRefund"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否开通自动退房？</span>
              <el-switch
                v-model="isAccessAutoCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否允许营业员操作超出押金的退款？</span>
              <el-switch
                v-model="operateOverDeposit"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.preCheckin">
            <div class="item-form">
              <span>是否开通无证入住业务？</span>
              <el-switch
                v-model="enabledPreCheckin"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.mobileCheckin">
            <div class="item-form">
              <span>是否支持手机入住？</span>
              <el-switch
                v-model="enabledMobileCheckin"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.roomCard">
            <div class="item-form">
              <span>是否支持吞吐门卡？</span>
              <el-switch
                v-model="supportRoomCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否对接门锁</span>
              <el-switch
                v-model="inteRoomLock"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>选择分房卡类型</span>
              <el-select class="el-right" v-model="issuedCardRuleVal">
                <el-option
                  v-for="(item, index) in issuedCardRuleList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.cashPledge">
            <div class="item-form">
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
              <div class="item-form" v-show="cashPledgeType == 'fixed_cash_pledge'">
                <span>固定押金金额</span>
                <el-input class="el-right" v-model="fixedCashPledge" placeholder="请输入固定押金金额"></el-input>
                (分)
              </div>
              <div class="item-form" v-show="cashPledgeType == 'multiple_of_cash_pledge'">
                <span>放大系数</span>
                <el-input class="el-right" v-model="multipleOfCashPledge" placeholder="请输入放大系数(0到1之间,例如0.2)"></el-input>
              </div>
              <div class="item-form">
                <span>是否向上取整</span>
                <el-switch
                  v-model="roundUpToInteger"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
              <div class="item-form">
                <span>是否有日杂费</span>
                <el-switch
                  v-model="hasDayOfIncidentals"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </div>
              <div class="item-form" v-show="hasDayOfIncidentals">
                <span>日杂费金额</span>
                <el-input class="el-right" v-model="dayOfIncidentals" placeholder="请输入日杂费金额"></el-input>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.breakfastStemFrom">
            <div class="item-form">
              <span>早餐券规则</span>
              <el-select class="el-right" v-model="breakfastStemFrom" placeholder="请选择早餐券规则">
                <el-option
                  v-for="(obj, index) in breakfastStemFromList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.maxAllowRoomcount">
            <div class="item-form">
              <span style="min-width: 210px; ">请输入选房列表最大展示房间数量</span>
              <el-input class="el-right" v-model="maxAllowRoomcount" placeholder="请输入选房列表最大展示房间数量"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.syncSpaceTime">
            <div class="item-form">
              <span>PMS同步频率</span>
              <el-select class="el-right" v-model="syncSpaceTime" placeholder="请选择PMS同步频率">
                <el-option
                  v-for="(obj, index) in syncSpaceTimeList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>是否需要自动同步？</span>
              <el-switch
                v-model="scheduledSure"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoConfirmPrePay">
            <div class="item-form">
              <span>自动确认预付关键字</span>
              <el-input class="el-right" v-model="prepayKeyword" placeholder="预付|预付款|已付款"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认预付冲突字</span>
              <el-input class="el-right" v-model="prepayExclusionKeyword" placeholder="现付|未预付"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认后付关键字</span>
              <el-input class="el-right" v-model="postpayKeyword" placeholder="挂帐|公付|公司付费|公司已付"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认后付冲突字</span>
              <el-input class="el-right" v-model="postpayExclusionKeyword" placeholder="现付"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 126px">现付</span>
              <el-input class="el-right" v-model="nowpayKeyword" placeholder="现付"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 126px">现付例外</span>
              <el-input class="el-right" v-model="nowpayExclusionKeyword" placeholder="现付"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认免押关键字 </span>
              <el-input class="el-right" v-model="freeDepositKeyword" placeholder="免押金|免押"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认免押冲突字 </span>
              <el-input class="el-right" v-model="needDepositKeyword" placeholder=""></el-input>
            </div>
            <div class="item-form">
              <span>是否开启</span>
              <el-switch
                v-model="isOpenAutoConfirmPrePay"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.supportVd">
            <div class="item-form">
              <span>是否支持分脏房？</span>
              <el-switch
                v-model="isSupportVd"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.roomTags">
            <div class="item-tag">
              <span>房间标签</span>
              <div class="tag-input">
                <div style="height: 40px; margin-bottom: 12px;" v-for="(obj, index) in roomTags">
                  <el-input class="el-right" v-model="roomTags[index]" placeholder="请输入房间标签"></el-input>
                </div>
                <div class="tag-btn">
                  <button style="border-color: #D0011B;color: #D0011B" v-show="roomTags.length > 1"
                          @click="subtractRoomTags">-
                  </button>
                  <button style="border-color: #39C240; color: #39C240" @click="addRoomTags">+</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showType === enumShowType.fastCard">
            <div class="item-form">
              <span>极速领卡配置</span>
              <el-switch
                v-model="enabledSpeedCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.CustomerOperate">
            <div class="item-form">
              <span>禁止顾客操作订单</span>
              <el-switch v-model="curstomDeploy"
                         on-color="#13ce66"
                         off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.ticketPrint">
            <div class="item-form">
              <span>是否打印小票配置</span>
              <el-switch
                v-model="enabledTicketPrint"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.advancedCheckout">
            <div class="item-form">
              <span>是否允许提前退房</span>
              <el-switch
                v-model="enabledAdvancedCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否允许PMS入住用户离店</span>
              <el-switch
                v-model="enabledPMScheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否允许当日抵离</span>
              <el-switch
                v-model="enabledSameDateIO"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.hotelAreaCode">
            <div class="item-form">
              <span>酒店行政区划代码</span>
              <el-input class="el-right" v-model="hotelAreaCodeVal" placeholder="请输入酒店行政区划代码"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.qrCodeCreate">
            <div class="item-form">
              <span>选择业务类型</span>
              <el-select class="el-right" v-model="serviceType">
                <el-option
                  v-for="(item, index) in serviceTypeList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>二维码名称</span>
              <el-input class="el-right" v-model="qrName" placeholder="请填写二维码名称"></el-input>
            </div>
            <div class="item-form">
              <span>二维码code</span>
              <el-input class="el-right" v-model="qrCode" style="display:block"></el-input>
            </div>
            <div class="item-form" style="margin-left: 9rem;margin-top: -0.5rem">
              <p style="color: #868686;">运营人员线下微信扫描获取参数，或酒店方拍摄二维码图片发送给我们</p>
            </div>
            <div class="item-form">
              <span>备注</span>
              <el-input class="el-right" v-model="remark"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoGiveRoom">
            <div class="item-form">
              <span>是否自动分房</span>
              <el-switch
                v-model="autoGiveRoomVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!-- RC单打印 -->
          <div v-if="showType === enumShowType.rcPrint">
            <div class="item-form">
              <span>模版名称</span>
              <el-upload
                ref="upload"
                class="upload-demo el-right"
                :headers="setHeader"
                :action="rcgethotelid"
                :on-success="getUploadData"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="submit" @click="submitUpload">上传</el-button>
              </el-upload>
            </div>
            <div class="item-form">
              <span>电子签名</span>
              <el-radio v-model="perRoom" label="1">一房一签</el-radio>
              <el-radio v-model="perRoom" label="2">一人一签</el-radio>
            </div>
            <div style="margin: -0.5rem 0 0.5rem 9rem ;color: #9B9B9B;margin-top: -0.5rem">
              <span>注：一房一签：只需有第一位入住人签名，同住人无需再签名</span><br>
              <span style="margin-left: 2rem">一人一签：要求每位入住人都签名</span>
            </div>
            <div class="item-form">
              <span>默认自动打印</span><br>
              <el-switch
                v-model="autoPrintVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.enableRCstatus">
            <div class="item-form">
              <span>RC单是否开启字段</span>
              <el-switch
                v-model="rcStatus"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.identityCheck">
            <div class="item-form">
              <span>是否自动调用人脸识别接口</span>
              <el-switch
                v-model="identityCheckVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.noCertificateCheck">
            <div class="item-form">
              <span>无证核验</span>
              <el-switch
                v-model="enableNoCertificateCheck"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!-- 定制化配置 -->
          <div v-if="showType === enumShowType.customization">
            <div class="item-form">
              <span>是否显示酒店的介绍</span>
              <el-switch
                v-model="mirrorIntro"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>显示酒店品牌的logo</span>
              <el-switch
                v-model="mirrorBrand"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--通知同住人配置-->
          <div v-if="showType === enumShowType.informCoResident">
            <div class="item-form">
              <span>酒店同住人未到时通知发送间隔</span>
              <el-input class="el-right" style="margin-right: 10px" v-model="timeStep"></el-input> 小时
            </div>
          </div>
          <!--开通酒店业务类型配置-->
          <div v-if="showType === enumShowType.accessServiceType">
            <div class="item-form">
              <span>格式化脚本</span>
              <el-input class="el-right" v-model="formatScript"></el-input>
              <el-upload
                class="upload-demo el-right"
                :action="scriptUpload"
                :headers="setHeader"
                :data="{'script_type':'format'}"
                :on-success="formatScriptSuccess"
                :before-upload='beforeUploadformat'
                :show-file-list=false
                :limit=1>
                <el-button size="small" type="primary">{{formatScript?'重新上传':'选择上传文件'}}</el-button>
              </el-upload>
            </div>
            <div class="item-form">
              <span>过滤脚本</span>
              <el-input class="el-right" v-model="filterScript"></el-input>
              <el-upload
                class="upload-demo el-right"
                :action="scriptUpload"
                :headers="setHeader"
                :data="{'script_type':'filter'}"
                :show-file-list=false
                :before-upload='beforeUploadfilter'
                :on-success="filterScriptSuccess"
                :limit=1>
                <el-button size="small" type="primary">{{filterScript?'重新上传':'选择上传文件'}}</el-button>
              </el-upload>
            </div>
            <div class="item-form">
              <span>是否开启</span>
              <el-switch
                v-model="enableAccessService"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--PAD界面显示-->
          <div v-if="showType === enumShowType.PADshowContent">
            <div class="item-form">
              <span style="width: 155px">未查找到订单界面提示语</span>
              <el-input class="el-right" v-model="notFoundMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">申请退房完成界面提示语</span>
              <el-input class="el-right" v-model="checkOutMark" style="display:block;"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">非设备入住退房提示语</span>
              <el-input class="el-right" v-model="noDeviceCheckInMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">退房失败以后提示语</span>
              <el-input class="el-right" v-model="failedCheckOutMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">酒店客服电话</span>
              <el-input class="el-right" v-model="hotelServiceTelMark" style="display:block"></el-input>
            </div>
          </div>
          <!--<div v-if="showType === enumShowType.appManage">-->
            <!--<el-radio-group v-model="appValue">-->
              <!--<span>门店业务</span>-->
              <!--<el-radio class="el-right"label="IDENTITY">公安人证核验 <br><span style="margin-left: 1.5rem;color: #a9a9a9">设备核验（包括应用，待办事项）</span></el-radio>-->
              <!--<span></span>-->
              <!--<el-radio class="el-right"label="WQT">微前台 <br><span style="margin-left: 1.5rem;color: #a9a9a9">订单中心，住离信息，入住核验，设备核验，发票中心，财务管理，异常提醒</span></el-radio>-->
            <!--</el-radio-group>-->
          <!--</div>-->
          <div v-if="showType === enumShowType.appManage2">
            <div class="item-form">
              <span>公安验证</span>
              <el-switch
                v-model="appPolice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>订单中心</span>
              <el-switch
                v-model="appOrder"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>住离信息</span>
              <el-switch
                v-model="appIdentity"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>入住核验</span>
              <el-switch
                v-model="appLiveIn"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>发票中心</span>
              <el-switch
                v-model="appInvoice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>财务管理</span>
              <el-switch
                v-model="appMoney"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>异常提醒</span>
              <el-switch
                v-model="appAbnormal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>可疑人员</span>
              <el-switch
                v-model="appSuspicious"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.autoGiveRoom">
            <div class="item-form">
              <span>是否自动分房</span>
              <el-switch
                v-model="autoGiveRoomVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.reviewRoomNum">
            <div class="item-form">
              <span>PMS房间号与旅业房间号核对:</span>
            </div>
            <div class="item-form">
             <table-roomNumReview :list="renderRoomNumReviewList" :page="page" :size="size"></table-roomNumReview>
            </div>
            <div class="item-form">
              <el-pagination
                v-show="total > size"
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="page"
                :page-sizes="[10, 20, 30]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div v-if="showType === enumShowType.isShowPoliceHandeld">
            <div class="item-form">
              <span>企业微信公安验证显示已处理列表</span>
              <el-switch
                v-model="showPoliceHandledList"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div v-if="showType === enumShowType.keyAccess">
            <div class="item-form">
              <span>关键通道开关</span>
              <el-switch
                v-model="enableKeyAccess"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
        </div>
        <!--footer-->
        <div slot="footer" class="dialog-footer" v-if="switchName === 'close' && delName==='close'">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button :disabled="!validateAll" type="primary" @click="submitDialog">确 定</el-button>
        </div>
        <!--footer-->
      </el-dialog>
      <el-dialog
        title="点击下载二维码"
        :visible.sync="showQrImgContent">
        <div class="qrcode-img">
          <img @click="downloadImg" :style="isBigQrImg?{height:'280px',width:'280px'}:{height:'140px',width:'140px'}"
               :src="qrImgUrl"/>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-radio class="radio" v-model="isBigQrImg" :label="true">大图 280</el-radio>
          <el-radio class="radio" v-model="isBigQrImg" :label="false">小图 140</el-radio>
        </div>
      </el-dialog>
      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="queryDel"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        @close="handleClose"
        center>
        <span>是否删除</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteWxHotels(false)">取 消</el-button>
          <el-button type="primary" @click="deleteWxHotels(true)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElDialog from "../../../../../../../node_modules/element-ui/packages/dialog/src/component.vue";

  var QRCode = require('qrcode')
  const empty={
      emptyArr:[]
  }
  //弹框类型
  const enumShowType = {
    checkDel: 0,
    PMS: 1, //PMS信息
    lvyeReportType: 2,  //旅业系统配置
    doorLock_unknown: 3, //门锁配置
    facein: 4,  //人脸识别配置
    wechatPay: 5,  //微信支付配置
    wxHotel: 6,  //微信生态酒店配置
    miniApp: 7,  //小程序配置
    sign: 8, //电子签名配置
    enabledCancelTime: 9, //电话取消订单配置
    invoice: 10,  //发票配置
    fastInvoice: 11,  //发票配置
    preCheckinSms: 12,  //预登记短信配置
    delayedPayment: 13, //到店支付配置
    autoCheckout: 14, //自动退房配置
    autoRefund: 15, //退款业务配置配置
    preCheckin: 16, //无证入住配置
    roomCard: 17, //门卡配置
    cashPledge: 18, //押金配置
    breakfastStemFrom: 19,  //早餐券配置
    maxAllowRoomcount: 20,  //最大房间数量配置
    syncSpaceTime: 21,  //PMS同步频率配置
    autoConfirmPrePay: 22,  //自动确认预付款配置
    supportVd: 23,  //脏房配置
    roomTags: 24,  //房间标签配置
    fastCard: 25,  //极速领卡配置
    WxHotelRegister: 26,//微信生态酒店——城市服务注册
    CustomerOperate: 27,//禁止顾客操作订单
    mobileCheckin: 28,//启用移动端办理入住
    ticketPrint: 29,//是否启用小票打印
    advancedCheckout: 30,//是否允许提前退房
    hotelAreaCode: 31,//酒店行政区划代码
    qrCodeCreate: 32,//酒店二维码配置
    autoGiveRoom: 33,//自动分房
    autoIdentityCheck: 34,//自动调用人脸识别接口
    issuedCardRule: 35,//发房卡规则
    rcPrint: 36,
    identityCheck: 37,
    moreLvyeReportType: 38,
    customization:39,
    enableRCstatus :40,
    accessServiceType:41,
    PADshowContent:42,
    informCoResident:43,
    noCertificateCheck:44,
    // appManage:45,
    appManage2:45,
    reviewRoomNum:46,
    isShowPoliceHandeld:47,
    keyAccess:48
  }

  //弹框标题类型
  const typeTitles = ['是否删除',
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
    '闪开发票配置',
    '预登记短信配置',
    '到店支付配置',
    '自动退房配置',
    '退款业务配置',
    '无证入住配置',
    '房卡配置',
    '押金配置',
    '早餐券配置',
    '最大房间数量配置',
    'PMS同步频率配置',
    '自动确认预付款配置',
    '脏房配置',
    '房间标签配置',
    '极速领卡配置',
    '微信生态酒店配置',
    '禁止顾客操作订单配置',
    '订单操作配置',
    '是否打印小票配置',
    '退离规则配置',
    '酒店行政区划代码配置',
    '酒店二维码配置',
    '分房配置',
    '自动人脸核验配置',
    '发房卡规则配置',
    'RC单打印',
    '开启身份核验功能配置',
    '酒店多旅业系统配置',
    '定制化配置',
    'RC单是否开启字段',
    '酒店开通业务类型配置',
    'PAD界面内容显示配置',
    '通知同住人配置',
    '无证核验',
    '应用功能配置管理',
    '旅业房间号核对配置',
    '公安验证是否显示已处理记录',
    '关键通道配置',

  ]

  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import ElInput from "../../../../../../../node_modules/element-ui/packages/input/src/input";
  import tool from '@/assets/tools/tool.js'

  export default {
    components: {
      ElDialog,
      ElInput
    },
    name: 'ConfigInfo',
    data() {
      return {
        timeStepList:[{label:'2小时',value:'2'},{label:'3小时',value:"3"},{label:'4小时',value:"4"},{label:'5小时',value:"5"},{label:'6小时',value:"6"}],
        timeStep:'',
        //开关设置
        accessService:false,
        //酒店开通业务类型配置
        filter:'',
        format:'',
        formatScript:"",
        filterScript:"",
        enableAccessService:false,
        //多旅业列表
        roomType:[],
        roomTypeList:[],
        roomNoList: [],
        filterRoomNo: [],
        transferListName: ['所有房号', '已选房号'],
        deskList:[],
        disItem:null,
        setTip:false,
        moreLyReportTypeValue: '',
        moreLyReportTypeList: [{name: "数据库交换", value: "MIDDLE_BASE"}, {
          name: "文件交换",
          value: "FILE_EXCHANGE"
        }, {name: "云端上传", value: "CLOUD"}],
        moreLvyeOpen: '',
        moreLvyeAutoReport: '',
        moreLvyeList: [],
        optionvalue: '',//微信生态酒店配置列表初始化
        switchName: 'close',//微信生态酒店配置按钮
        delName: 'close',
        RegisterOk: true,
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        //PMS配置
        wqtPublicNo:'',
        PMSBrandList: [],
        checkout: true,
        urls: [],
        //捷信达
        pmsId: '',
        // pmsType: '', //放在计算属性
        hotelPmsCode: '',
        hotelServiceUrl: '',
        remark: '',
        //西软BS
          xrbs_groupCode:'',
          xrbs_appkey:'',
          xrbs_authCode:'',
          xrbs_serviceVersion:'',
          xrbs_infoLanguage:'',
          xrbs_CRM:'',
          xrbs_siteId:'',
          xrbs_employeeNum:'',
          xrbs_moduleNum:'',
        //绿云,西软
        crsURL: '',
        hotelGroupCode: '',
        appKey: '',
        PMSAppSecret: '',
        userCode: '',
        password: '',
        //别样红
        billServiceUrl: '',
        crmServiceUrl: '',
        orderServiceUrl: '',
        secServiceUrl: '',
        userName: '',
        userPass: '',
        //住哲
        cid: '',
        key: '',
        dataKey: '',
        adminName: '',
        adminPassword: '',
        brandId: '',
        //东呈
        dcKey: '',
        // 旅业配置
        lvyeTypeList: [],
          singlelvyeAutoReport: '',
        lvyeType: '',
        policeId: '',
        policeType: '',
        policeParam: '',
        //门锁配置，暂无
        //人脸识别配置
        faceEqu: true,
        similarity:false,
        faceTongdao: '腾讯优图',
        identityAccount: null,
        shenfenbaoRejectManual: "false",

        faceinPassValue: 70,
        faceinRejectValue: 70,
        //微信支付配置
        payCode: '',
        refundCode: '',
        dayrentName: '',
        payName: '',
        refundName: '',
        //微信生态酒店配置
        wxHotelId: '',
        wxhotelCityserList: [],
        RegistersWxHotelId: '',//注册返回的微信酒店id
        deleteList: '',//删除微信酒店后返回
        //小程序配置
        miniAppList: [],
        provider: false,
        appIdTemp: '',
        // appId: '',
        // mchId: '',
        mchIdTemp: '',
        providerAppIdTemp: '',
        // providerAppId: '',
        providerMchIdTemp: '',
        // providerMchId: '',
        //电子签名
        enabledSign: false,
        //电话取消订单
        isEnabledCancelTime: false,
        enabledCancelTime: '18:00',
        enabledCancelTimeList: ['12:00', '12:30', '13:00',
          '13:30', '14:00', '14:30', '15:00', '15:30',
          '16:00', '16:30', '17:00', '17:30', '18:00',
          '18:30', '19:00', '19:30', '20:00', '20:30',
          '21:00', '21:30', '22:00', '22:30', '23:00',
          '23:30', '24:00'],
        //发票配置
        enabledInvoice: true,
        invoiceName: [''],
        //闪开发票配置
        enabledSpeedInvoice: false,
        invoiceType: [],
        invoicesList: [{name: '普通发票', value: '1'}, {name: '专用发票', value: '2'}, {name: '个人发票', value: '3'}],
        invoiceCode: [''],
        qrImgUrl: '',
        tempCode: '',
        isBigQrImg: true,
        showQrImgContent: false,
        plugCode: '',
        //预登记短信配置
        enabledPreCheckinSms: false,
        //到店支付配置
        enabledDelayedPayment: true,
        //自动退房
        enableAutoCheckout: false,
        refundList:[{name:'PMS挂帐',value:'PMS'},{name:'退款入账',value:'ORDER_BILL'},{ name:'企业微信退款',value:'MANUAL'}],
        refundVal:'',
        //退款业务配置
        enabledAutoRefund: true,
        operateOverDeposit:false,
        isAccessAutoCheckout:false,
        isAccessAutoRefund:false, //无证入住
        enabledPreCheckin: true,
        //是否指出手机入住
        enabledMobileCheckin: false,
        enabledRCPrint: false,
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
        syncSpaceTime: '30',
        scheduledSure: true,
        syncSpaceTimeList: [
          {name: '10分钟', value: '10'}, {name: '20分钟', value: '20'}, {name: '30分钟', value: '30'},
          {name: '1小时', value: '60'}, {name: '2小时', value: '120'}, {name: '3小时', value: '180'},
          {name: '6小时', value: '360'}, {name: '12小时', value: '720'}, {name: '24小时', value: '1440'}],
        //自动预付款确认
        prepayKeyword: '',
        prepayExclusionKeyword: '',
        postpayKeyword: '',
        postpayExclusionKeyword: '',
        nowpayKeyword: '',
        nowpayExclusionKeyword: '',
        freeDepositKeyword: '',
        needDepositKeyword: '',
        isOpenAutoConfirmPrePay:false,
        //脏房配置
        isSupportVd: true,
        //酒店标签配置
        roomTags: [''],
        wechatpayList: [],
        providerList: [],
        unProviderList: [],
        //极速领卡配置
        enabledSpeedCard: false,
        //顾客自行操作配置
        curstomDeploy: false,
        enabledTicketPrint: false,//是否打印小票配置
          //是否允许提前退房
        enabledAdvancedCheckout: false,
        enabledPMScheckout:false,
        enabledSameDateIO:false,
        hotelAreaCodeVal: '',//酒店行政区划代码
        queryDel: false,
        //酒店二维码配置
        QR_CodeVal: false,
        serviceTypeList: [
          {name: '发票', value: 'invoice'},
          {name: 'mobile-checkin二维码', value: 'mobileCheckin'}
        ],
        serviceType: '',
        qrCode: '',
        qrName: '',
        autoGiveRoomVal: true,
        autoIdentityCheckVal: false,
        identityCheckVal: false,
        issuedCardRuleList: [
          {name: '一房一卡', value: 'OTO'},
          {name: '一房多卡', value: 'OTM'}
        ],
        issuedCardRuleVal: '',
        //RC单打印
        rcTypeList: [],
        rcTemplateVal: '',
        autoPrintVal: 1,
        perRoom: "1",
        perGuest: '2',
        moreLvyeReportVal: '',
//        RC单
//        http://intg.fortrun.cn/fileUpload/1486553a8edc4b088539d05aa99221e2
        actionUrl: 'http://localhost:8080/virgo/fileUpload',
        UploadResponData: '',
        rcConfig: false,
        hasSetMoreLvye: false,
        hasSetRc: false,
        mirrorIntro:false,
        mirrorBrand:false,
        rcStatus:false,
        inteRoomLock:false,
        isPoliceParam:false,
        notFoundMark:'',
        checkOutMark:'',
        noDeviceCheckInMark:'',
        failedCheckOutMark:'',
        hotelServiceTelMark:'',
        hotelMark:false,
        enableNoCertificateCheck:false,
        appValue:'WQT',
        LvyeConfigItemList:[{name:'全自动上传',value:'AUTO'},{name:'全手工上传',value:'MANUAL'},{name:'仅自动上传有房号的',value:'HAS_ROOM_NO'}],
        enableKeyAccess:false,
        appPolice:false,
        appOrder:false,
        appIdentity:false,
        appLiveIn:false,
        appInvoice:false,
        appMoney:false,
        appAbnormal:false,
        appSuspicious:false,
        order_hint_item_idFromPAD:'',
        apply_checkout_finish_idFromPAD:'',
        non_equipment_checkin_idFromPAD:'',
        checkout_failure_idFromPAD:'',
        roomNumReviewList:[],
        page: 1,
        size: 10,
        total: 0,
        isHaveRoomNumReviewList:false,
        showPoliceHandledList:false
      }
    },
    mounted() {
      this.getLvyes();
      this.getConfigs();
      this.getWxhotelCitysers();
      this.getPms();
      this.wechatList();
      this.WxhotelRegisters();
      this.getRCConfigeds();
      this.getAccessServiceType();
      this.getPADMarkConfigs();
      this.getRoomNumList()
      // this.getMoreLvye({hotel_id: this.$route.params.hotelid})
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
        pmsData: state => state.enterprise.pmsData,
        lvyeData: state => state.enterprise.lvyeData,
        wechatAppData: state => state.enterprise.wechatAppData,
        hotelName: state => state.enterprise.tempHotelName,
        showReception: state => state.enterprise.showReception,
        showMoreLvyeConfig:  state => state.enterprise.showMoreLvyeConfig
      }),
      rcgethotelid() {
        return "/virgo/fileUpload/" + this.$route.params.hotelid
      },
      scriptUpload(){
        return "/virgo/scriptupload/"+ this.$route.params.hotelid
      },
      setHeader() {
//        Session:1D280EA65D624BC1B84B73443D8BC6AA
//         return "Session:"+sessionStorage.getItem('session_id');
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
//           Access-Control-Allow-Origin: *
        }
      },
      rendLvyeTypeList() {
        return this.lvyeTypeList;
      },
      renderDeskList(){
        return this.deskList;
      },
      renderList() {
        return this.wxhotelCityserList;
      },
      renderMoreLvyeList() {
        return this.moreLvyeList;
      },
      renderRoomNumReviewList(){
        return this.roomNumReviewList;
      },
      providerMchIdList() {
        return this.providerList.map(v => {
          let obj = {
            value: `${v.mch_id} | ${v.mch_name}`
          }
          return obj
        })
      },
      mchIdList() {
        return this.unProviderList.map(v => {
          let obj = {
            value: `${v.mch_id} | ${v.mch_name}`
          }
          return obj
        })
      },
      appName() {
        if (!this.appIdTemp) return '';
        return this.appIdTemp.split(' | ')[1];
      },
      appId: {
        get() {
          if (!this.appIdTemp) return '';
          return this.appIdTemp.split(' | ')[0];
        },
        set(val) {
          val.app_id ? this.appIdTemp = `${val.app_id} | ${val.app_name}` : this.appIdTemp = '';
        }
      },
      mchName() {
        if (!this.mchIdTemp) return '';
        return this.mchIdTemp.split(' | ')[1];
      },
      mchId: {
        get() {
          if (!this.mchIdTemp) return '';
          return this.mchIdTemp.split(' | ')[0];
        },
        set(val) {
          val.mch_id ? this.mchIdTemp = `${val.mch_id} | ${val.mch_name}` : this.mchIdTemp = '';
        }
      },
      providerAppName() {
        if (!this.providerAppIdTemp) return '';
        return this.providerAppIdTemp.split(' | ')[1];
      },
      providerAppId: {
        get() {
          if (!this.providerAppIdTemp) return '';
          return this.providerAppIdTemp.split(' | ')[0];
        },
        set(val) {
          val.provider_app_id ? this.providerAppIdTemp = `${val.provider_app_id} | ${val.provider_app_name}` : this.providerAppIdTemp = '';
        }
      },
      providerMchName() {
        if (!this.providerMchIdTemp) return '';
        return this.providerMchIdTemp.split(' | ')[1];
      },
      providerMchId: {
        get() {
          if (!this.providerMchIdTemp) return '';
          return this.providerMchIdTemp.split(' | ')[0];
        },
        set(val) {
          val.provider_app_id ? this.providerMchIdTemp = `${val.provider_mch_id} | ${val.provider_mch_name}` : this.providerMchIdTemp = '';
        }
      },
      pmsType() {
        let obj = this.PMSBrandList.find(v => v.id == this.pmsId);
        if (tool.isNotBlank(obj))
          return obj.type;
        return '';
      },
      invoiceNameList() {
        return this.invoiceName.filter(v => v != '');
      },
      invoiceCodeList() {
        return this.invoiceCode.filter(v => v != '');
      },
      roomTagsList() {
        return this.roomTags.filter(v => v != '');
      },
      //无数个validate
      validatePMS() {
        if (tool.isNotBlank(this.pmsId) && tool.isNotBlank(this.pmsType) && tool.isNotBlank(this.hotelPmsCode) && tool.isNotBlank(this.hotelServiceUrl)) {
          if (this.pmsType == '1') {
            return tool.isNotBlank(this.billServiceUrl) && tool.isNotBlank(this.crmServiceUrl) && tool.isNotBlank(this.orderServiceUrl) && tool.isNotBlank(this.secServiceUrl) && tool.isNotBlank(this.userName) && tool.isNotBlank(this.userPass)
          } else if (this.pmsType == '3') {
            return tool.isNotBlank(this.cid) && tool.isNotBlank(this.key) && tool.isNotBlank(this.dataKey)
          } else if (this.pmsType == '8') {
            return tool.isNotBlank(this.dcKey)
          }
          else {
            return true;
          }
        } else {
          return false;
        }
      },
      validatelvyeReportType() {
        if (!this.isPoliceParam) {
            console.log(888)
          return tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType);
        } else if (this.isPoliceParam) {
            console.log(999)
          if (tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType) && isNaN(+this.policeParam)) {
            let flag = true;
            try {
              JSON.parse(this.policeParam);
            } catch (e) {
              flag = false;
            }
            return flag;
          }
          return false;
        } else if (this.lvyeType == 'NONE') {
            return true;
        } else {
          return false;
        }
      },
      validateMore() {
        return true;
      },
      validatefacein() {
        // return tool.isNotBlank(this.faceinPassValue) && tool.isNotBlank(this.faceinRejectValue);
        return (typeof this.faceinPassValue === 'number') && (typeof this.faceinRejectValue === 'number');
      },
      validatewechatPay() {
        return tool.isNotBlank(this.payCode) && tool.isNotBlank(this.refundCode) && tool.isNotBlank(this.dayrentName) && tool.isNotBlank(this.payName) && tool.isNotBlank(this.refundName);
//                tool.isNotBlank(this.mchId) &&
      },
      validatewxHotel() {
        return tool.isNotBlank(this.wxHotelId);
      },
      validatewxHotelReg() {
//        return tool.isNotBlank(this.wxHotelId);
        this.optionvalue && this.optionvalue.length > 0 ? true : false;
      },
      validateminiApp() {
        if (!this.provider) {
          return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId);
        }
        return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId) && tool.isNotBlank(this.providerAppId) && tool.isNotBlank(this.providerMchId);
      },
      validatesign() {
        return true;
      },
      validateenabledCancelTime() {
        return true;
      },
      validateinvoice() {
        if (this.enabledInvoice) {
          return (this.invoiceNameList.length > 0);
        }
        return true;
      },
      validatefastinvoice() {
        if (this.enabledSpeedInvoice) {
          return (this.invoiceCodeList.length > 0) && tool.isNotBlank(this.invoiceType) && tool.isNotBlank(this.plugCode)
        }
        return true;
      },
      validatepreCheckinSms() {
        return true;
      },
      validatedelayedPayment() {
        return true;
      },
      validateautoCheckout() {
        return true;
      },
      validateautoRefund() {
        return true;
      },
      validatepreCheckin() {
        return true;
      },
      validatemobileCheckin() {
        return true;
      },
      validateroomCard() {
        return tool.isNotBlank(this.issuedCardRuleVal);
      },
      validatecashPledge() {
        if (this.cashPledgeType == 'none_cash_pledge') {
          return true;
        } else if (this.cashPledgeType == 'fixed_cash_pledge') {
          if (tool.isBlank(this.fixedCashPledge) || isNaN(+this.fixedCashPledge))
            return false;
          if (this.hasDayOfIncidentals) {
            return tool.isNotBlank(this.dayOfIncidentals) && !isNaN(+this.dayOfIncidentals)
          }
          return true;
        } else if (this.cashPledgeType == 'first_day_of_room_price') {
          if (this.hasDayOfIncidentals) {
            return tool.isNotBlank(this.dayOfIncidentals) && !isNaN(+this.dayOfIncidentals)
          }
          return true;
        } else if (this.cashPledgeType == 'multiple_of_cash_pledge') {
          if (tool.isBlank(this.multipleOfCashPledge) || isNaN(+this.multipleOfCashPledge) || this.multipleOfCashPledge <= 0 || this.multipleOfCashPledge >= 1)
            return false;
          if (this.hasDayOfIncidentals) {
            return tool.isNotBlank(this.dayOfIncidentals) && !isNaN(+this.dayOfIncidentals)
          }
          return true;
        }
      },
      validatebreakfastStemFrom() {
        return true;
      },
      validatemaxAllowRoomcount() {
        return tool.isNotBlank(this.maxAllowRoomcount) && !isNaN(+this.maxAllowRoomcount)
      },
      validatesyncSpaceTime() {
        return true;
      },
      validateautoConfirmPrePay() {
        return tool.isNotBlank(this.prepayKeyword) && tool.isNotBlank(this.prepayExclusionKeyword) && tool.isNotBlank(this.postpayKeyword) && tool.isNotBlank(this.postpayExclusionKeyword) && tool.isNotBlank(this.freeDepositKeyword) && tool.isNotBlank(this.needDepositKeyword)
      },
      validatesupportVd() {
        return true;
      },
      validateroomTags() {
        return true;
      },
      validateisfastcard() {
        return true;
      },
      validateCustomerOperate() {
        return true;
      },
      validateTicketPrint() {
        return true;
      },
      validateAdvancedCheckout() {
        return true;
      },
      validateHotelAreaCode() {
        return true;
      },
      validateQrcodeCreate() {
        return (tool.isNotBlank(this.serviceType) && tool.isNotBlank(this.qrName) && tool.isNotBlank(this.qrCode))
      },
      validateAutoGiveRoom() {
        return true;
      },
      validateAutoIdentityCheck() {
        return true;
      },
      validateIssuedCardRule() {
        return (tool.isNotBlank(this.issuedCardRuleVal));
      },
      validateRcPrint() {
        return (tool.isNotBlank(this.rcTemplateVal) && (tool.isNotBlank(this.perRoom) && tool.isNotBlank(this.perGuest) && tool.isNotBlank(this.autoPrintVal)))
      },
      validateIdentityCheck() {
        return true;
      },
      validateRCPrintCheck() {
        return true;
      },
      validateRCStatus() {
          return true;
      },
      validateCustomization(){
        return true;
      },
      validateAccessService(){
        return (tool.isNotBlank(this.filterScript)||tool.isNotBlank(this.formatScript));
      },
      validatePADshowContent(){
        return true;
      },
      validateInformCoResident(){
        return (tool.isNotBlank(this.timeStep))
      },
      validateAppManage(){
        return (tool.isNotBlank(this.appValue))
      },
      validateAppManage2(){
        return true;
      },
      validateKeyAccess(){
        return true;
      },
      validateReviewRoomNum(){
        return true;
      },
      validateShowPoliceHandled(){
        return true;
      },
      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.PMS:
            result = this.validatePMS;
            break;
          case enumShowType.lvyeReportType:
            result = this.validatelvyeReportType;
            break;
          case enumShowType.doorLock_unknown:
            result = this.validatedoorLock_unknown;
            break;
          case enumShowType.facein:
            result = this.validatefacein;
            break;
          case enumShowType.wechatPay:
            result = this.validatewechatPay;
            break;
          case enumShowType.wxHotel:
            result = this.validatewxHotel;
            break;
          case enumShowType.WxHotelRegister:
            result = this.validatewxHotelReg;
            break;
          case enumShowType.miniApp:
            result = this.validateminiApp;
            break;
          case enumShowType.sign:
            result = this.validatesign;
            break;
          case enumShowType.enabledCancelTime:
            result = this.validateenabledCancelTime;
            break;
          case enumShowType.invoice:
            result = this.validateinvoice;
            break;
          case enumShowType.fastInvoice:
            result = this.validatefastinvoice;
            break;
          case enumShowType.preCheckinSms:
            result = this.validatepreCheckinSms;
            break;
          case enumShowType.delayedPayment:
            result = this.validatedelayedPayment;
            break;
          case enumShowType.autoCheckout:
            result = this.validateautoCheckout;
            break;
          case enumShowType.autoRefund:
            result = this.validateautoRefund;
            break;
          case enumShowType.preCheckin:
            result = this.validatepreCheckin;
            break;
          case enumShowType.mobileCheckin:
            result = this.validatemobileCheckin;
            break;
          case enumShowType.roomCard:
            result = this.validateroomCard;
            break;
          case enumShowType.cashPledge:
            result = this.validatecashPledge;
            break;
          case enumShowType.breakfastStemFrom:
            result = this.validatebreakfastStemFrom;
            break;
          case enumShowType.maxAllowRoomcount:
            result = this.validatemaxAllowRoomcount;
            break;
          case enumShowType.syncSpaceTime:
            result = this.validatesyncSpaceTime;
            break;
          case enumShowType.autoConfirmPrePay:
            result = this.validateautoConfirmPrePay;
            break;
          case enumShowType.supportVd:
            result = this.validatesupportVd;
            break;
          case enumShowType.roomTags:
            result = this.validateroomTags;
            break;
          case enumShowType.fastCard:
            result = this.validateisfastcard;
            break;
          case enumShowType.CustomerOperate:
            result = this.validateCustomerOperate;
            break;
          case enumShowType.ticketPrint:
            result = this.validateTicketPrint;
            break;
          case enumShowType.advancedCheckout:
            result = this.validateAdvancedCheckout;
            break;
          case enumShowType.hotelAreaCode:
            result = this.validateHotelAreaCode;
            break;
          case enumShowType.qrCodeCreate:
            result = this.validateQrcodeCreate;
            break;
          case enumShowType.autoGiveRoom:
            result = this.validateAutoGiveRoom;
            break;
          case enumShowType.autoIdentityCheck:
            result = this.validateAutoIdentityCheck;
            break;
          case enumShowType.issuedCardRule:
            result = this.validateIssuedCardRule;
            break;
          case enumShowType.identityCheck:
            result = this.validateIdentityCheck
            break;
          case enumShowType.rcPrint:
            result = true;
            break;
          case enumShowType.noCertificateCheck:
              result = true;
          break;
          case enumShowType.moreLvyeReportType:
            result = this.validateMore;
            break;
          case enumShowType.customization:
            result = this.validateCustomization;
            break;
          case enumShowType.enableRCstatus:
            result = this.validateRCStatus ;
            break;
          case enumShowType.accessServiceType:
            result=this.validateAccessService;
            break;
          case enumShowType.PADshowContent:
            result=this.validatePADshowContent;
            break;
          case enumShowType.informCoResident:
            result=this.validateInformCoResident;
            break;
          // case enumShowType.appManage:
          //   result=this.validateAppManage;
          //   break;
          case enumShowType.appManage2:
              result=this.validateAppManage2;
              break;
          case enumShowType.keyAccess:
            result=this.validateKeyAccess;
            break;
          case enumShowType.reviewRoomNum:
            result=this.validateReviewRoomNum;
            break
          case enumShowType.isShowPoliceHandeld:
          result=this.validateShowPoliceHandled;
            break;
          default:
            result = false;
        }
        return result;
      }
    },
    watch: {
      renderRoomNumReviewList(val){
          console.log(val)
      },
      configData(){
        let configData = this.configData;
        console.log('configData:',configData)
        if (tool.isNotBlank(configData)) {
          //门锁配置，暂无
          //人脸识别配置
          this.faceinPassValue = configData.facein_pass_value ? +configData.facein_pass_value : 70;
          this.faceinRejectValue = configData.facein_reject_value ? +configData.facein_reject_value : 70;
          this.faceTongdao = configData.identity_check_channel === 'YOUTU' ? '腾讯优图' : '厦门身份宝';
          this.identityAccount = configData.shenfenbao_hotel_account;
          this.shenfenbaoRejectManual = configData.shenfenbao_reject_manual;
          this.faceEqu = configData.support_face_in;
          this.similarity=configData.show_similarity === 'true' ? true : false;
          this.autoIdentityCheckVal = configData.enabled_auto_identity_check === 'true' ? true : false;
          //微信支付配置
          this.mchId = configData;
          // this.mchId = configData.child_mch_id;
          this.payCode = configData.pay_code;
          this.refundCode = configData.refund_code;
          this.dayrentName = configData.dayrent_name,
            this.payName = configData.pay_name,
            this.refundName = configData.refund_name,
            //微信生态酒店配置
            this.wxHotelId = configData.wx_hotel_id;
          //小程序配置
          this.appId = configData;
          this.providerAppId = configData;
          this.providerMchId = configData;
          this.provider = configData.provider ? true : false;
          //电子签名
          this.enabledSign = configData.enabled_sign == 'true' ? true : false;
          //电话取消订单
          this.isEnabledCancelTime = tool.isNotBlank(configData.enabled_cancel_time);
          if (this.isEnabledCancelTime) {
            let date = new Date(parseInt(configData.enabled_cancel_time));
            let hours = date.getHours();
            let min = date.getMinutes();
            let minStr = min > 9 ? min : `0${min}`;
            this.enabledCancelTime = `${hours}:${minStr}`;
          }
          //发票配置
          this.enabledInvoice = configData.enabled_invoice == 'true' ? true : false;
          if (tool.isNotBlank(configData.invoice_name) && configData.invoice_name.length > 0) {
            this.invoiceName = [...configData.invoice_name];
          }
          //极速开票配置
          this.enabledSpeedInvoice = configData.enabled_speed_invoice;
          if (tool.isNotBlank(configData.invoice_type) && configData.invoice_type.length > 0) {
            this.invoiceType = [...configData.invoice_type];
          }
          if (tool.isNotBlank(configData.code) && configData.code.length > 0) {
            this.invoiceCode = [...configData.code];
          }
          this.plugCode = configData.plug_code;
          //预登记短信配置
          this.enabledPreCheckinSms = configData.enabled_pre_checkin_sms == 'true' ? true : false;
          //到店支付配置
          this.enabledDelayedPayment = configData.enabled_delayed_payment == 'true' ? true : false;
          //自动退房
          this.enableAutoCheckout = configData.enable_auto_checkout == 'true' ? true : false;
          //退款业务配置
          this.operateOverDeposit=configData.enable_out_of_cash_pledge_refund == 'true' ? true : false;
          this.isAccessAutoCheckout=configData.enable_auto_checkout == 'true' ? true : false;
          this.enabledAutoRefund = configData.enabled_auto_refund == 'true' ? true : false;
           this.refundVal= configData.refund_amount_source;
          //无证入住
          this.enabledPreCheckin = configData.enabled_pre_checkin == 'true' ? true : false;
          //是否支持手机入住
          this.enabledMobileCheckin = configData.enabled_mobile_checkin == 'true' ? true : false;
          //门卡配置
          this.supportRoomCard = configData.support_room_card == 'true' ? true : false;
          this.issuedCardRuleVal = configData.issued_card_rule;
          this.inteRoomLock=configData.integration_room_lock == 'true' ? true : false;

            //
          this.enabledTicketPrint = configData.enabled_ticket_print == 'true' ? true : false;
          //押金配置
          if (tool.isNotBlank(configData.cash_pledge_config)) {
            this.cashPledgeType = configData.cash_pledge_config.cash_pledge_type;
            this.fixedCashPledge = configData.cash_pledge_config.fixed_cash_pledge;
            this.multipleOfCashPledge = configData.cash_pledge_config.multiple_of_cash_pledge;
            this.roundUpToInteger = configData.cash_pledge_config.round_up_to_integer;
            ;
            this.hasDayOfIncidentals = configData.cash_pledge_config.has_day_of_incidentals;
            ;
            this.dayOfIncidentals = configData.cash_pledge_config.day_of_incidentals;
          }
          //早餐券配置
          this.breakfastStemFrom = configData.breakfast_stem_from;
          //可选房数量
          this.maxAllowRoomcount = configData.max_allow_roomcount;
          //PMS同步频率
          this.syncSpaceTime = configData.sync_space_time;
          this.scheduledSure = configData.scheduled;
          //顾客配置
          this.curstomDeploy = configData.user_disable_order == 'true' ? true : false;
          //自动预付款确认
          this.prepayKeyword = configData.prepay_keyword;
          this.prepayExclusionKeyword = configData.prepay_exclusion_keyword;
          this.postpayKeyword = configData.postpay_keyword;
          this.postpayExclusionKeyword = configData.postpay_exclusion_keyword;
          this.nowpayKeyword = configData.nowpay_keyword;
          this.nowpayExclusionKeyword = configData.nowpay_exclusion_keyword;
          this.freeDepositKeyword = configData.free_deposit_keyword;
          this.isOpenAutoConfirmPrePay = configData.enabled_autoprepay== 'true' ? true : false;
          this.needDepositKeyword=configData.need_deposit_keyword;
          //脏房配置
          this.isSupportVd = configData.is_support_vd == '1' ? true : false;
          //酒店标签配置
          if (tool.isNotBlank(configData.room_tags)) {
            this.roomTags = configData.room_tags.length > 0 ? [...configData.room_tags] : [''];
          }
          this.enabledSpeedCard = configData.enabled_speed_card == 'true' ? true : false;
          //是否允许提前退房配置
          this.enabledAdvancedCheckout = configData.advanced_checkout == 'true' ? true : false;
          this.enabledPMScheckout=configData.enabled_pms_in_guest_checkout == 'true' ? true : false;
          this.enabledSameDateIO=configData.enabled_same_date_io== 'true' ? true : false;
          //酒店行政区划代码配置
          this.hotelAreaCodeVal = configData.hotel_area_code;
          //是否自动分房配置
          this.autoGiveRoomVal = configData.enabled_auto_give_room == 'true' ? true : false;
          //身份核验功能配置
          this.identityCheckVal = configData.enabled_identity_check == 'true' ? true : false;
          //定制化配置
          this.mirrorIntro=configData.enabled_mirror_introduce=='true'?true:false;
          this.mirrorBrand=configData.enabled_mirror_brand=='true'?true:false;
          this.rcStatus=configData.rc_status=='true'?true:false;
          //同住人通知配置
          this.timeStep=configData.checkin_noshow_interval_time;
          //无证核验
          this.enableNoCertificateCheck= configData.enable_identity_check_undocumented == 'true' ? true : false;
          this.enableKeyAccess=configData.enable_pull_identity_guest_info == 'true' ? true : false
          //应用功能配置
          this.appValue=configData.business_mode;
          //应用功能配置二
          let wqtMainCtl=configData.wqt_main_control?JSON.parse(configData.wqt_main_control):'';
          // console.log('wqtMainCtl:',wqtMainCtl)
          this.appPolice=wqtMainCtl.identity_check_view;
          this.appOrder=wqtMainCtl.order_view;
          this.appIdentity=wqtMainCtl.room_status_view;
          this.appLiveIn=wqtMainCtl.check_in_identity_check_view;
          this.appInvoice=wqtMainCtl.invoice_view;
          this.appMoney=wqtMainCtl.order_bill_view;
          this.appAbnormal=wqtMainCtl.exception_view;
          this.appSuspicious=wqtMainCtl.suspicious_person_view;
          //公安验证是否显示已处理列表配置
          this.showPoliceHandledList=configData.enable_show_plice_processed== 'true' ? true : false
        };
      },
      pmsData() {
        if (tool.isNotBlank(this.pmsData)) {
          //PMS信息
          //捷信达
          this.wqtPublicNo=this.pmsData.pms_worker_id;
          this.urls=this.pmsData.urls;
          this.pmsId = this.pmsData.pms_id;
          this.checkout = this.pmsData.checkout == 'true' ? true : false;
          // this.pmsType = this.pmsData.pms_type; //放在计算属性
          this.hotelPmsCode = this.pmsData.hotel_pmscode;
          this.remark = this.pmsData.remark;
          this.hotelServiceUrl = this.pmsData.hotel_service_url;
          //绿云,西软
          this.crsURL = this.pmsData.crs_url;
          this.hotelGroupCode = this.pmsData.hotel_group_code;
          this.appKey = this.pmsData.app_key;
          this.PMSAppSecret = this.pmsData.app_secret;
          this.userCode = this.pmsData.usercode;
          this.password = this.pmsData.password;
          //别样红
          this.billServiceUrl = this.pmsData.bill_service_url;
          this.crmServiceUrl = this.pmsData.crm_service_url;
          this.orderServiceUrl = this.pmsData.order_service_url;
          this.secServiceUrl = this.pmsData.sec_service_url;
          this.userName = this.pmsData.user_name;
          this.userPass = this.pmsData.user_pass;
          //住哲
          this.cid = this.pmsData.cid;
          this.key = this.pmsData.key;
          this.dataKey = this.pmsData.datakey;
          this.adminName = this.pmsData.admin_name;
          this.adminPassword = this.pmsData.admin_password;
          this.brandId = this.pmsData.brand_id;
          //东呈
          this.dcKey = this.pmsData.key;
          //西软BS
          this.xrbs_groupCode=this.pmsData.hotelGroupCode;
          this.xrbs_appkey=this.pmsData.appKey;
          this.xrbs_authCode=this.pmsData.secret;
          this.xrbs_serviceVersion=this.pmsData.ver;
          this.xrbs_infoLanguage=this.pmsData.loc;
          this.xrbs_CRM=this.pmsData.cmmcode;
          this.xrbs_siteId=this.pmsData.pcid;
          this.xrbs_employeeNum=this.pmsData.empno;
          this.xrbs_moduleNum=this.pmsData.modu;
        }
      },
      lvyeData() {
        // 旅业配置
        if (tool.isNotBlank(this.lvyeData)) {
          this.singlelvyeAutoReport = this.lvyeData.lvye_auto_report;
          this.lvyeType = this.lvyeData.lvye_report_type;
          console.log('this.lvyeType:',this.lvyeType)
          this.policeId = this.lvyeData.hotel_ga_id;
          this.policeType = this.lvyeData.police_type;
          this.policeParam = JSON.stringify(this.lvyeData.police_param);
        }
      },
      faceinPassValue(val) {
        val < this.faceinRejectValue ? this.faceinRejectValue = this.faceinPassValue : null;
      },
      faceinRejectValue(val) {
        val > this.faceinPassValue ? this.faceinPassValue = this.faceinRejectValue : null;
      },
      renderMoreLvyeList(val){
          console.log('此时的renderMore:',val)
          if(val.length>0){
              this.hasSetMoreLvye = true;
          } else {
              this.hasSetMoreLvye = false;
          };
      },
      lvyeType(val){
          this.lvyeTypeList.forEach(obj=>{
              if(val==obj.lvye_report_type){
                  this.isPoliceParam=obj.enable_police_param;
                  console.log(this.isPoliceParam)
              };
          })
      },
    },
    methods: {
      ...mapActions([
        'getConfig',
        'getWxhotelCityser',
        'WxhotelRegister',
        'deleteWxHotel',
        'getlvyeTypeList',
        'getFaceEqu',
        'patchConfig',
        'getPMS',
        'modifyPMS',
        'getPMSBrandList',
        'getLvye',
        'modifyLvye',
        'modifyMoreLvye',
        'deleteMoreLvye',
        'getMiniAppList',
        'getWechatpayList',
        'getWechatpayProvider',
        'showtoast',
        'showalert',
        'goto',
        'RCconfig',
        "setRCconfig",
        "getRCConfiged",
        "saveScriptUpload",
        "getServiceTypeScript",
        "getPADMarkConfig",
        "savePADMarkConfig",
        "getRoomNum",
        "saveReviewRoomNum",
        "editReviewRoomNum"
      ]),
      //查询所以PMS房间号
      getRoomNumList(){
          this.getRoomNum({
              hotel_id: this.$route.params.hotelid,
              page:this.page,
              size:this.size,
              onsuccess:(body,headers)=>{
                  this.roomNumReviewList = body.data;
                  if(body.data&&body.data.length!==0){
                      this.isHaveRoomNumReviewList=true
                  }else {
                      this.isHaveRoomNumReviewList=false
                  }

                  this.total=parseInt(headers['x-total'])
              }
          })
      },
       //保存旅业房间号
      saveReviewRoomNumList(){
          let lvyeRoomNumlist=[];
          this.renderRoomNumReviewList.forEach(item=>{
              lvyeRoomNumlist.push({'id':item.id,'room_id':item.room_id,'room_no':item.room_no,'lvye_room_no':item.lvye_room_no})
          });
          this.saveReviewRoomNum({
              hotel_id: this.$route.params.hotelid,
              data:lvyeRoomNumlist,
              onsuccess:(body)=>{
                  console.log('新增');
                  this.showDialog = false;
              }
          });
      },
      handleSizeChange(val) {
          this.size = val;
          this.getRoomNumList();
      },
      handleCurrentPageChange(val){
          this.page = val;
          this.getRoomNumList();
      },
      //查询旅业类型
      getlvyeTypeLists() {
          this.getlvyeTypeList({
              onsuccess: body => {
                  this.lvyeTypeList = [...body.data];
                  this.lvyeTypeList.forEach(item =>{
                      if(this.lvyeType===item.lvye_report_type){
                          this.isPoliceParam=item.enable_police_param;
                          console.log(this.isPoliceParam)
                      };
                  })
                  console.log('旅业类型列表',this.lvyeTypeList)
              }
          })
      },
        //获取酒店提示语配置
      getPADMarkConfigs(){
          this.getPADMarkConfig({
              hotel_id: this.$route.params.hotelid,
              onsuccess: body => {
                  if(body.data){
                      this.notFoundMark=body.data.order_hint_item;
                      this.checkOutMark=body.data.apply_checkout_finish;
                      this.noDeviceCheckInMark=body.data.non_equipment_checkin;
                      this.failedCheckOutMark=body.data.checkout_failure;
                      this.hotelServiceTelMark=body.data.customer_service_tel;
                      this.hotelMark=true;
                  }

              }
          })
      },
        //新增酒店提示语
      savePADMarkConfigs(){
          this.savePADMarkConfig({
              data:{
                  "hotel_id": this.$route.params.hotelid,
                  "order_hint_item":this.notFoundMark==''?''+'#190155':this.notFoundMark+'#190155',
                  "apply_checkout_finish":this.checkOutMark==''?''+'#190164':this.checkOutMark+'#190164',
                  "non_equipment_checkin":this.noDeviceCheckInMark==''?''+'#190159':this.noDeviceCheckInMark+'#190159',
                  "checkout_failure":this.failedCheckOutMark==''?''+'#190163':this.failedCheckOutMark+'#190163',
                  "customer_service_tel":this.hotelServiceTelMark
              },
              onsuccess: body => {
                  this.showDialog = false;
                  this.hotelMark=true;
              }
          })
      },
      getAccessServiceType(){
          this.getServiceTypeScript({
              hotel_id: this.$route.params.hotelid,
              onsuccess: body => {
                 this.filterScript=body.data.filter_script_name ;
                 this.formatScript=body.data.format_script_name ;
                 this.enableAccessService=body.data.enabled_script;
                  if(this.filterScript||this.formatScript){
                      this.accessService=true;
                  }
              }
          })
      },
      saveAccessServiceType(data){
         this.saveScriptUpload({
             hotel_id: this.$route.params.hotelid,
             body:data,
             onsuccess: body => {
                 this.showDialog = false;
                 this.accessService=true;
             }
         });
      },
      beforeUploadformat(){
          this.fileList1=[]
      },
      beforeUploadfilter(){
          this.fileList2=[]
      },
      filterScriptSuccess(res,file,list){
        if(res.data) {
            this.filterScript = res.data.script_name;
        }
      },
      formatScriptSuccess(res,file,list){
          if(res.data) {
              this.formatScript = res.data.script_name;
          }
      },
      addAlterUrl(){
          console.log(typeof this.urls)
        this.urls.push({url:''});
      },
      reduceAlterUrl(index){
        this.urls.splice(index,1);
      },
      //拉已配置的RC数据
      getRCConfigeds() {
        this.getRCConfiged({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            // console.log("拉已配置的RC数据:", this.UploadResponData, this.perRoom, this.autoPrintVal)
            if (body.data) {
              this.hasSetRc = true;
              this.UploadResponData = body.data.hotel_id;
              this.perRoom = body.data.electron_sign.toString();
              this.autoPrintVal = body.data.auto_print == 1 ? true : false
            }
          }
        })
      },
      getUploadData(res) {
        this.UploadResponData = res.data
        console.log('---->', this.UploadResponData)
      },
      _upload() {
        this.RCconfig({
          hotel_id: this.$route.params.hotelid
        })
      },
      handlePreview(file) {
        console.log(file);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      RCconfigs(pre) {
        console.log(111)
        this.RCconfig({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
          }
        })

      },
      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },
      depswitch() {
        if (this.wxHotelId) {
          this.delName = 'open';
          this.dialogConfig(enumShowType.WxHotelRegister)
        } else {
          this.delName = 'open';
          this.switchName = 'open';
          this.dialogConfig(enumShowType.wxHotel)
        }
      },
      dialogConfig(type) {
        this.showType = type;
        if (type === enumShowType.PMS && this.PMSBrandList.length == 0) {
          this.getPMSBrandLists();
        } else if (type === enumShowType.wxHotel) {
          this.WxhotelRegisters()
        } else if (type === enumShowType.WxHotelRegister) {
          this.WxhotelRegisters()
          this.hideDialog();
        } else if (type === enumShowType.miniApp) {
          this.getMiniAppLists();
          this.wechatList();
        } else if (type === enumShowType.moreLvyeReportType){
          this.goto({name: 'moreLvyeConfig'});
          return;
        }
          this.showDialog = true;
      },
      wechatList() {
        this.getWechatpayList({
          onsuccess: (body, headers) => {
            if (body.data && Array.isArray(body.data)) {
              this.wechatpayList = body.data;
            }
          }
        })
        this.getWechatpayProvider({
          provider: '0',
          onsuccess: (body, headers) => {
            if (body.data && Array.isArray(body.data)) {
              this.unProviderList = body.data;
            }
          }
        })
        this.getWechatpayProvider({
          provider: '1',
          onsuccess: (body, headers) => {
            if (body.data && Array.isArray(body.data)) {
              this.providerList = body.data;
            }
          }
        })

      },
      addInvoiceName() {
        this.invoiceName.push('');
      },
      subtractInvoiceName() {
        if (this.invoiceName.length == 1) return;
        this.invoiceName.pop();
      },
      addRoomTags() {
        this.roomTags.push('');
      },
      subtractRoomTags() {
        if (this.roomTags.length == 1) return;
        this.roomTags.pop();
      },
      handleClose() {
        this.delName = 'close';
        this.switchName = 'close';
      },
      closeMorelvye(type){
        if(type===enumShowType.moreLvyeReportType){
              // this.getMoreLvyes();
              this.setTip=false;
          }
      },
        //弹框取消按钮
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.PMS:
            this.wqtPublicNo=this.pmsData.pms_worker_id;
            //捷信达
            this.pmsId = this.pmsData.pms_id;
            this.checkout = this.pmsData.checkout == 'true' ? true : false;
            // this.pmsType = this.pmsData.pms_type; //放在计算属性
            this.hotelPmsCode = this.pmsData.hotel_pmscode;
            this.remark = this.pmsData.remark;
            this.hotelServiceUrl = this.pmsData.hotel_service_url;
            //绿云,西软
            this.crsURL = this.pmsData.crs_url;
            this.hotelGroupCode = this.pmsData.hotel_group_code;
            this.appKey = this.pmsData.app_key;
            this.PMSAppSecret = this.pmsData.app_secret;
            this.userCode = this.pmsData.usercode;
            this.password = this.pmsData.password;
            //别样红
            this.billServiceUrl = this.pmsData.bill_service_url;
            this.crmServiceUrl = this.pmsData.crm_service_url;
            this.orderServiceUrl = this.pmsData.order_service_url;
            this.secServiceUrl = this.pmsData.sec_service_url;
            this.userName = this.pmsData.user_name;
            this.userPass = this.pmsData.user_pass;
            //住哲
            this.cid = this.pmsData.cid;
            this.key = this.pmsData.key;
            this.dataKey = this.pmsData.datakey;
            this.adminName = this.pmsData.admin_name;
            this.adminPassword = this.pmsData.admin_password;
            this.brandId = this.pmsData.brand_id;
            //东呈
            this.dcKey = this.pmsData.key;
            //西软BS
            this.xrbs_groupCode=this.pmsData.hotelGroupCode;
            this.xrbs_appkey=this.pmsData.appKey;
            this.xrbs_authCode=this.pmsData.secret;
            this.xrbs_serviceVersion=this.pmsData.ver;
            this.xrbs_infoLanguage=this.pmsData.loc;
            this.xrbs_CRM=this.pmsData.cmmcode;
            this.xrbs_siteId=this.pmsData.pcid;
            this.xrbs_employeeNum=this.pmsData.empno;
            this.xrbs_moduleNum=this.pmsData.modu;
            break;
          case enumShowType.lvyeReportType:
            this.singlelvyeAutoReport = this.lvyeData.lvye_auto_report;
            this.lvyeType = this.lvyeData.lvye_report_type;
            this.policeId = this.lvyeData.hotel_ga_id;
            this.policeType = this.lvyeData.police_type;
            this.policeParam = JSON.stringify(this.lvyeData.police_param);
            break;
          case enumShowType.facein:
            this.faceinPassValue = this.configData.facein_pass_value ? +this.configData.facein_pass_value : 70;
            this.faceinRejectValue = this.configData.facein_reject_value ? +this.configData.facein_reject_value : 70;
            this.similarity=this.configData.show_similarity== 'true' ? true : false;
            this.autoIdentityCheckVal===this.configData.enabled_auto_identity_check ==='true' ? true : false;
            break;
          case enumShowType.wechatPay:
            this.payCode = this.configData.pay_code;
            this.refundCode = this.configData.refund_code;
            break;
          case enumShowType.wxHotel:
            this.wxHotelId = this.configData.wx_hotel_id;
            break;
          case enumShowType.miniApp:
            this.appId = this.configData;
            this.mchId = this.configData;
            this.providerAppId = this.configData;
            this.providerMchId = this.configData;
            this.provider = this.configData.provider ? true : false;
            break;
          case enumShowType.sign:
            this.enabledSign = this.configData.enabled_sign == 'true' ? true : false;
            break;
          case enumShowType.enabledCancelTime:
            this.isEnabledCancelTime = tool.isNotBlank(this.configData.enabled_cancel_time);
            if (this.isEnabledCancelTime) {
              let date = new Date(parseInt(this.configData.enabled_cancel_time));
              let hours = date.getHours();
              let min = date.getMinutes();
              let minStr = min > 9 ? min : `0${min}`;
              this.enabledCancelTime = `${hours}:${minStr}`;
            }
            break;
          case enumShowType.invoice:
            this.enabledInvoice = this.configData.enabled_invoice == 'true' ? true : false;
            this.configData.invoice_name ? this.invoiceName = [...this.configData.invoice_name] : null;
            break;
          case enumShowType.fastInvoice:
            this.enabledSpeedInvoice = this.configData.enabled_speed_invoice;
            this.configData.invoice_type ? this.invoiceType = [...this.configData.invoice_type] : null;
            this.configData.code ? this.invoiceCode = [...this.configData.code] : null;
            this.plugCode = this.configData.plug_code;
            break;
          case enumShowType.preCheckinSms:
            this.enabledPreCheckinSms = this.configData.enabled_pre_checkin_sms == 'true' ? true : false;
            break;
          case enumShowType.delayedPayment:
            this.enabledDelayedPayment = this.configData.enabled_delayed_payment == 'true' ? true : false;
            break;
          case enumShowType.autoCheckout:
            this.enableAutoCheckout = this.configData.enable_auto_checkout == 'true' ? true : false;
            break;
          case enumShowType.autoRefund:
            this.operateOverDeposit=this.configData.enable_out_of_cash_pledge_refund == 'true' ? true : false;
            this.isAccessAutoCheckout=this.configData.enable_auto_checkout == 'true' ? true : false;
            this.enabledAutoRefund = this.configData.enabled_auto_refund == 'true' ? true : false;
            this.refundVal=this.configData.refund_amount_source;
            break;
          case enumShowType.preCheckin:
            this.enabledPreCheckin = this.configData.enabled_pre_checkin == 'true' ? true : false;
            break;
          case enumShowType.mobileCheckin:
            this.enabledMobileCheckin = this.configData.enabled_mobile_checkin == 'true' ? true : false;
            break;
          case enumShowType.roomCard:
            this.supportRoomCard = this.configData.support_room_card == 'true' ? true : false;
            this.issuedCardRuleVal = this.configData.issued_card_rule;
            this.inteRoomLock=this.configData.integration_room_lock== 'true' ? true : false;;
            break;
          case enumShowType.cashPledge:
            this.cashPledgeType = this.configData.cash_pledge_config.cash_pledge_type;
            this.fixedCashPledge = this.configData.cash_pledge_config.fixed_cash_pledge;
            this.multipleOfCashPledge = this.configData.cash_pledge_config.multiple_of_cash_pledge;
            this.roundUpToInteger = this.configData.cash_pledge_config.round_up_to_integer;
            this.hasDayOfIncidentals = this.configData.cash_pledge_config.has_day_of_incidentals;
            this.dayOfIncidentals = this.configData.cash_pledge_config.day_of_incidentals;
            break;
          case enumShowType.breakfastStemFrom:
            this.breakfastStemFrom = this.configData.breakfast_stem_from;
            break;
          case enumShowType.maxAllowRoomcount:
            this.maxAllowRoomcount = this.configData.max_allow_roomcount;
            break;
          case enumShowType.syncSpaceTime:
            this.syncSpaceTime = this.configData.sync_space_time;
            break;
          case enumShowType.autoConfirmPrePay:
            this.prepayKeyword = this.configData.prepay_keyword;
            this.prepayExclusionKeyword = this.configData.prepay_exclusion_keyword;
            this.postpayKeyword = this.configData.postpay_keyword;
            this.postpayExclusionKeyword = this.configData.postpay_exclusion_keyword;
            this.nowpayKeyword = this.configData.nowpay_keyword;
            this.nowpayExclusionKeyword = this.configData.nowpay_exclusion_keyword;
            this.freeDepositKeyword = this.configData.free_deposit_keyword;
            this.needDepositKeyword = this.configData.need_deposit_keyword;
            this.isOpenAutoConfirmPrePay = this.configData.enabled_autoprepay== 'true' ? true : false;
            break;
          case enumShowType.supportVd:
            this.isSupportVd = this.configData.is_support_vd == '1' ? true : false;
            break;
          case enumShowType.roomTags:
            this.roomTags = this.configData.room_tags.length > 0 ? [...this.configData.room_tags] : [''];
            break;
          case enumShowType.fastCard:
            this.enabledSpeedCard = this.configData.enabled_speed_card == 'true' ? true : false;
            break;
          case enumShowType.ticketPrint:
            this.enabledTicketPrint = this.configData.enabled_ticket_print == 'true' ? true : false;
            break;
          case enumShowType.advancedCheckout:
            this.enabledAdvancedCheckout = this.configData.advanced_checkout == 'true' ? true : false;
              this.enabledPMScheckout=this.configData.enabled_pms_in_guest_checkout == 'true' ? true : false;
              this.enabledSameDateIO=this.configData.enabled_same_date_io== 'true' ? true : false;
            break;
          case enumShowType.hotelAreaCode:
            this.hotelAreaCodeVal = this.configData.hotel_area_code;
            break;
          case enumShowType.autoGiveRoom:
            this.autoGiveRoomVal = this.configData.enabled_auto_give_room == 'true' ? true : false;
            break;
          case enumShowType.issuedCardRule:
            this.issuedCardRuleVal = this.configData.issued_card_rule;
            break;
          case enumShowType.identityCheck:
            this.identityCheckVal = this.configData.enabled_identity_check == 'true' ? true : false;
            break;
          case enumShowType.customization:
            this.mirrorIntro=this.configData.enabled_mirror_introduce=='true'?true:false;
            this.mirrorBrand=this.configData.enabled_mirror_brand=='true'?true:false;
            break;
          case enumShowType.enableRCstatus:
            this.rcStatus=this.configData.rc_status=='true'?true:false;
            break;
          case enumShowType.informCoResident:
            this.timeStep=this.configData.checkin_noshow_interval_time;
              break;
          case enumShowType.appManage:
             this.appValue=this.configData.business_mode;
             break;
          default:
        }
      },
      submitDialog() {
        let data;
        switch (this.showType) {
          case enumShowType.PMS: {
            let paramData = {
              pms_id: this.pmsId,
              checkout: this.checkout.toString(),
              pms_type: this.pmsType,
              hotel_pmscode: this.hotelPmsCode,
              remark: this.remark,
              hotel_service_url: this.hotelServiceUrl,
              urls:this.urls,
              pms_worker_id:this.wqtPublicNo
            };
            if (this.pmsType == '7' || this.pmsType == '2'||this.pmsType == '11'||this.pmsType == '14') {
              data = {
                ...paramData,
                crs_url: this.crsURL,
                hotel_group_code: this.hotelGroupCode,
                app_key: this.appKey,
                app_secret: this.PMSAppSecret,
                usercode: this.userCode,
                password: this.password,
              }
            } else if (this.pmsType == '1') {
              data = {
                ...paramData,
                bill_service_url: this.billServiceUrl,
                crm_service_url: this.crmServiceUrl,
                order_service_url: this.orderServiceUrl,
                sec_service_url: this.secServiceUrl,
                user_name: this.userName,
                user_pass: this.userPass,
              }
            } else if (this.pmsType == '3') {
              data = {
                ...paramData,
                cid: this.cid,
                key: this.key,
                datakey: this.dataKey,
                admin_name: this.adminName,
                admin_password: this.adminPassword,
                brand_id: this.brandId,
              }
            } else if (this.pmsType == '8') {
              data = {
                ...paramData,
                key: this.dcKey
              }
            }else if (this.pmsType == '12'){
              data = {
                  ...paramData,
                  hotelGroupCode:this.xrbs_groupCode,
                  appKey:this.xrbs_appkey,
                  secret:this.xrbs_authCode,
                  ver:this.xrbs_serviceVersion,
                  loc:this.xrbs_infoLanguage,
                  cmmcode:this.xrbs_CRM,
                  pcid:this.xrbs_siteId,
                  empno:this.xrbs_employeeNum,
                  modu:this.xrbs_moduleNum
              }
            }
            else {
              data = {
                ...paramData
              }
            }
            this.modifyPms(data);
            return;
          }
            break;
          case enumShowType.lvyeReportType: {
            let tempData = {
              lvye_auto_report: this.singlelvyeAutoReport,
              lvye_report_type: this.lvyeType,
              hotel_ga_id: this.policeId,
              police_type: this.policeType
            }
            if (!this.isPoliceParam) {
              data = {
                ...tempData
              }
            }else if(this.isPoliceParam){
              data = {
                ...tempData,
                police_param: JSON.parse(this.policeParam)
              }
            }
            this.modifyLvyes(data);
            return;
          }
          case enumShowType.doorLock_unknown:
            break;
          case enumShowType.facein:
            if (this.faceTongdao === '腾讯优图') {
                this.identity_check_channel = 'YOUTU';
            }
            if (this.faceTongdao === '厦门身份宝') {
                this.identity_check_channel = 'SHENFENBAO';
            }
            data = {
              facein_pass_value: this.faceinPassValue,//自动通过值
              facein_reject_value: this.faceinRejectValue,//自动拒绝值
              identity_check_channel: this.faceTongdao === '腾讯优图' ? 'YOUTU' : 'SHENFENBAO',
              shenfenbao_hotel_account: this.identityAccount,
              support_face_in: this.faceEqu,//是否支持人脸识别
              shenfenbao_reject_manual: this.shenfenbaoRejectManual,//身份宝拒绝是否人工参与
              show_similarity:this.similarity.toString(), //相似度
              enabled_auto_identity_check: this.autoIdentityCheckVal.toString()
            }
            break;
          case enumShowType.wechatPay:
            data = {
              pay_code: this.payCode,
              refund_code: this.refundCode,
              dayrent_name: this.dayrentName,
              pay_name: this.payName,
              refund_name: this.refundName
            }
            break;
          case enumShowType.wxHotel:
            data = {
              wx_hotel_id: this.wxHotelId
            }
            break;
          case enumShowType.miniApp: {
            if (this.provider) {
              data = {
                app_id: this.appId,
                mch_id: this.mchId,
                provider: this.provider,
                provider_app_id: this.providerAppId,
                provider_mch_id: this.providerMchId,
                app_name: this.appName,
                mch_name: this.mchName,
                provider_app_name: this.providerAppName,
                provider_mch_name: this.providerMchName
              }
            } else {
              data = {
                app_id: this.appId,
                mch_id: this.mchId,
                provider: this.provider,
                app_name: this.appName,
                mch_name: this.mchName
              }
            }
          }
            break;
          case enumShowType.sign:
            data = {
              enabled_sign: this.enabledSign.toString()
            }
            break;
          case enumShowType.enabledCancelTime:
            if (this.isEnabledCancelTime) {
              let date = `${new Date().toLocaleDateString()} ${this.enabledCancelTime}`
              data = {
                enabled_cancel_time: new Date(date).getTime()
              }
            } else {
              data = {
                enabled_cancel_time: ''
              }
            }
            break;
          case enumShowType.invoice:
            data = {
              enabled_invoice: this.enabledInvoice.toString(),
              // invoice_name: this.invoiceNameList
            }
            if (this.enabledInvoice) {
              data.invoice_name = this.invoiceNameList;
            }
            break;
          case enumShowType.fastInvoice:
            data = {
              enabled_speed_invoice: this.enabledSpeedInvoice,
              invoice_type: this.invoiceType,
              code: this.invoiceCodeList,
              plug_code: this.plugCode
            }
            break;
          case enumShowType.preCheckinSms:
            data = {
              enabled_pre_checkin_sms: this.enabledPreCheckinSms.toString()
            }
            break;
          case enumShowType.delayedPayment:
            data = {
              enabled_delayed_payment: this.enabledDelayedPayment.toString()
            }
            break;
          case enumShowType.autoCheckout:
            data = {
              enable_auto_checkout: this.enableAutoCheckout.toString()
            }
            break;
          case enumShowType.autoRefund:
            data = {
              refund_amount_source:this.refundVal,
              enabled_auto_refund: this.enabledAutoRefund.toString(),
              enable_out_of_cash_pledge_refund:this.operateOverDeposit.toString(),
              enable_auto_checkout:  this.isAccessAutoCheckout.toString()
            }
            break;
          case enumShowType.preCheckin:
            data = {
              enabled_pre_checkin: this.enabledPreCheckin.toString(),

            }
            break;
          case enumShowType.mobileCheckin:
            data = {
              enabled_mobile_checkin: this.enabledMobileCheckin.toString()
            }
            break;
          case enumShowType.roomCard:
            data = {
              support_room_card: this.supportRoomCard.toString(),
              issued_card_rule: this.issuedCardRuleVal,
              integration_room_lock:this.inteRoomLock.toString()
            };
            break;
          case enumShowType.cashPledge: {
            let cash_pledge_config = {};
            let tempData = {
              cash_pledge_type: this.cashPledgeType
            }
            if (this.cashPledgeType == 'none_cash_pledge') {
              cash_pledge_config = {
                ...tempData
              }
            } else if (this.cashPledgeType == 'fixed_cash_pledge') {
              cash_pledge_config = {
                ...tempData,
                fixed_cash_pledge: +this.fixedCashPledge,
                round_up_to_integer: this.roundUpToInteger,
                has_day_of_incidentals: this.hasDayOfIncidentals
              }
              if (this.hasDayOfIncidentals) {
                cash_pledge_config.day_of_incidentals = +this.dayOfIncidentals;
              }
            } else if (this.cashPledgeType == 'multiple_of_cash_pledge') {
              cash_pledge_config = {
                ...tempData,
                multiple_of_cash_pledge: +this.multipleOfCashPledge,
                round_up_to_integer: this.roundUpToInteger,
                has_day_of_incidentals: this.hasDayOfIncidentals
              }
              if (this.hasDayOfIncidentals) {
                cash_pledge_config.day_of_incidentals = +this.dayOfIncidentals;
              }
            } else if (this.cashPledgeType == 'first_day_of_room_price') {
              cash_pledge_config = {
                ...tempData,
                round_up_to_integer: this.roundUpToInteger,
                has_day_of_incidentals: this.hasDayOfIncidentals
              }
              if (this.hasDayOfIncidentals) {
                cash_pledge_config.day_of_incidentals = +this.dayOfIncidentals;
              }
            }
            data = {
              cash_pledge_config
            }
          }
            break;
          case enumShowType.breakfastStemFrom:
            data = {
              breakfast_stem_from: this.breakfastStemFrom
            }
            break;
          case enumShowType.maxAllowRoomcount:
            data = {
              max_allow_roomcount: this.maxAllowRoomcount
            }
            break;
          case enumShowType.syncSpaceTime:
            data = {
              sync_space_time: this.syncSpaceTime,
              scheduled: this.scheduledSure
            }
            break;
          case enumShowType.autoConfirmPrePay:
            data = {
              prepay_keyword: this.prepayKeyword,
              prepay_exclusion_keyword: this.prepayExclusionKeyword,
              postpay_keyword: this.postpayKeyword,
              postpay_exclusion_keyword: this.postpayExclusionKeyword,
              nowpay_keyword: this.nowpayKeyword,
              nowpay_exclusion_keyword: this.nowpayExclusionKeyword,
              free_deposit_keyword: this.freeDepositKeyword,
              need_deposit_keyword: this.needDepositKeyword,
              enabled_autoprepay: this.isOpenAutoConfirmPrePay.toString()
            }
            break;
          case enumShowType.supportVd:
            data = {
              is_support_vd: this.isSupportVd ? '1' : '0'
            }
            break;
          case enumShowType.roomTags:
            data = {
              room_tags: Array.from(new Set(this.roomTagsList))
            }
            break;
          case enumShowType.fastCard:
            data = {
              enabled_speed_card: this.enabledSpeedCard.toString()
            }
            break;
          case enumShowType.ticketPrint:
            data = {
              enabled_ticket_print: this.enabledTicketPrint.toString()
            }
            break;
          case enumShowType.advancedCheckout:
            data = {
              advanced_checkout: this.enabledAdvancedCheckout.toString(),
              enabled_pms_in_guest_checkout:this.enabledPMScheckout.toString(),
              enabled_same_date_io:this.enabledSameDateIO.toString()
            }
            break;
          case enumShowType.CustomerOperate:
            data = {
              user_disable_order: this.curstomDeploy.toString()
            }
            break;
          case enumShowType.hotelAreaCode:
            data = {
              hotel_area_code: this.hotelAreaCodeVal
            }
            break;
          case enumShowType.qrCodeCreate:
            data = {
//                qrcode:this.serviceType,
//                qrcode:this.qrcode,
//                qrcode:this.qrName,
//                qrcode:this.remark
            }
            break;
          case enumShowType.autoGiveRoom:
            data = {'enabled_auto_give_room': this.autoGiveRoomVal.toString()};
            break;

          case enumShowType.identityCheck:
            data = {'enabled_identity_check': this.identityCheckVal.toString()};
            break;
          case enumShowType.rcPrint:
            data = {
              "id": this.$route.params.hotelid,
              "electron_sign": parseInt(this.perRoom),
              "auto_print": this.autoPrintVal ? 1 : 0
            }
            this.mySetRCconfig(data);
            return;
          case enumShowType.noCertificateCheck:
              data = {
                  enable_identity_check_undocumented:this.enableNoCertificateCheck.toString()
              }
              break;
            case enumShowType.keyAccess:
              data={
                  enable_pull_identity_guest_info:this.enableKeyAccess.toString()
              }
              break;
          case enumShowType.customization:
              data = {
                  "enabled_mirror_introduce": this.mirrorIntro.toString(),
                  "enabled_mirror_brand": this.mirrorBrand.toString()
              }
              break;
          case enumShowType.enableRCstatus:
              data = {
                  "rc_status": this.rcStatus
              }
              break;
          case enumShowType.informCoResident:
            data = {
                checkin_noshow_interval_time:this.timeStep
            }
            break;
          case enumShowType.accessServiceType:
            let tempData={
                enabled_script:this.enableAccessService
            };
            this.saveAccessServiceType(tempData);
            return;
          case enumShowType.PADshowContent:
            this.savePADMarkConfigs();
            return;
          case enumShowType.appManage:
            data={
                "business_mode":this.appValue
            }
            break;
          case enumShowType.appManage2:
              let wqt_main_control=JSON.stringify({
                      "identity_check_view":this.appPolice, 			//公安验证
                      "order_view":this.appOrder,						//订单中心
                      "room_status_view":this.appIdentity,				//住离信息
                      "check_in_identity_check_view":this.appLiveIn,	//入住核验
                      "invoice_view":this.appInvoice,					//发票中心
                      "order_bill_view":this.appMoney,				//账务管理
                      "exception_view":this.appAbnormal,					//异常提醒
                      "suspicious_person_view":this.appSuspicious
                  });
              data={
                  wqt_main_control
              }
            break;
          case enumShowType.isShowPoliceHandeld:
                data = {
                    "enable_show_plice_processed":this.showPoliceHandledList.toString()
                };
            break;
          case enumShowType.reviewRoomNum:
              this.saveReviewRoomNumList();
             // return;
          default:null
        };
        this.patchConfigData(data);
      },
      validateMoreLvye(){
        // this.moreLvyeList=this.renderMoreLvyeList;
        let result;
        result= this.renderMoreLvyeList.every(function (item, index){
          if(item.reportChannel){
            if (item.reportChannel == 'CLOUD' || item.reportChannel == 'WUHAN' ) {
              if( tool.isNotBlank(item.lvyeId) && tool.isNotBlank(item.reportType)&&tool.isNotBlank(item.device_id) && (tool.isNotBlank(item.lvyeName)) && tool.isNotBlank(item.reportChannel)){
                return true;
              }
              else {
                return false;
              }
            } else if (item.reportChannel == 'LOCAL' ||item.reportChannel == 'GUANGDONGOLD'|| item.reportChannel == 'HEFEI' || item.reportChannel == 'CHENGDU' || item.reportChannel == 'HANGZHOU'|| item.reportChannel == 'GUANGDONG') {
              if (tool.isNotBlank(item.lvyeId) && tool.isNotBlank(item.reportType)&&tool.isNotBlank(item.device_id) && tool.isNotBlank(item.lvyeName) && tool.isNotBlank(item.reportChannel) && tool.isNotBlank(item.transitParam)) {
                return true;
              }
              else {
                return false;
              }
            };
          }
          else {
            return false;
          }
        });
        return result;
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
        })
      },
      getWxhotelCitysers() {
        this.getWxhotelCityser({
          onsuccess: body => (this.wxhotelCityserList = [...body.data])
        })
      },

      WxhotelRegisters() {
        this.WxhotelRegister({
          hotel_id: this.$route.params.hotelid,
          route_code: this.optionvalue,
          onsuccess: body => {
            this.RegistersWxHotelId = body.data.wx_hotel_id;
            this.switchName = 'close';
          }
        })
        this.showtoast({
          text: '注册成功',
          type: 'success'
        })
      },
      //删除微信生态酒店配置
      isDelete() {
        this.showDialog = false;
        this.queryDel = true;
        this.delName = 'close';
        this.switchName = 'close';
      },
      deleteWxHotels(flag) {
        if (flag) {
          this.deleteWxHotel({
            hotel_id: this.$route.params.hotelid,
            wx_hotel_id: this.wxHotelId||this.RegistersWxHotelId,
            onsuccess: (body, header) => {
              this.showtoast({
                text: '删除成功',
                type: 'success'
              })
            }
          });
        };
        this.queryDel = false;
        this.hideDialog();
      },
      //上传已配置数据
      mySetRCconfig(data) {
        this.setRCconfig({
          data: data,
          onsuccess: body => {
            body.errmsg == 'ok' ? this.hasSetRc = true : this.hasSetRc = false
            this.showDialog = false;
          }
        })
      },
      //修改服务端数据
      patchConfigData(data) {
          console.log('debug:------->patchConfigData：',data)
        this.patchConfig({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getPms() {
        this.getPMS({
          hotel_id: this.$route.params.hotelid
        })
      },
      // 修改PMS
      modifyPms(data) {
        this.modifyPMS({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getPMSBrandLists() {
        this.getPMSBrandList({
          onsuccess: body => {
            if (body.data.length > 0) {
              this.PMSBrandList = body.data;
            } else {
              this.showtoast({
                text: '无PMS品牌',
                type: 'warning'
              })
            }
          }
        })
      },
      getLvyes() {
        this.getLvye({
          hotel_id: this.$route.params.hotelid,
            onsuccess:body=>{
                this.getlvyeTypeLists();
            }
        })
      },
      modifyLvyes(data) {
        this.modifyLvye({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getMiniAppLists() {
        this.getMiniAppList({
          onsuccess: (body, headers) => {
            this.miniAppList = body.data;
            if (this.miniAppList.length === 0) {
              this.showalert({
                code: 0,
                content: '小程序列表为空，请先添加小程序!'
              });
            }
          }
        })
      },
      addInvoiceCode() {
        this.invoiceCode.push('');
      },
      subtractInvoiceCode() {
        if (this.invoiceCode.length == 1) return;
        this.invoiceCode.pop();
      },
      creatQrcode(code) {
        if (!code) return;
        if (process.env.NODE_ENV === 'intg') {
          this.tempCode = `https://jskp.intg.fortrun.cn/index.html?code=${code}`;
        } else if (process.env.NODE_ENV === 'test') {
          this.tempCode = `https://jskp.qa.fortrun.cn/index.html?code=${code}`;
        }
        if (process.env.NODE_ENV === 'stg') {
          this.tempCode = `https://jskp.stg.fortrun.cn/index.html?code=${code}`;
        }
        if (process.env.NODE_ENV === 'production') {
          this.tempCode = `https://jskp.fortrun.cn/index.html?code=${code}`;
        }
//        console.log(this.tempCode);
        QRCode.toDataURL(this.tempCode, (err, url) => {
//          console.log(url)
          this.qrImgUrl = url.replace('image/png', 'image/octet-stream');
          this.showQrImgContent = true;
        })
      },
      saveFile(data, filename) {
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        var event = document.createEvent('MouseEvents');

        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
      },
      downloadImg() {
        this.saveFile(this.qrImgUrl, `${this.hotelName}_${this.tempCode}.png`);
      }
    }
  }
</script>
<style lang="less">
  .morelvyeCheckbox {
    .el-checkbox {
      margin-left: 0;
      margin-right: 1.5rem;
    }
  }
  .tip{
    color: #ff2b1c;
    font-size: 16px;
    margin-left: 9rem;
  }
  .module-wrapper {
    .content-configinfo {
      padding: 24px 20px 0 8px;
      .content-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 18px;
        padding: 0 0 0 12px;
        i {
          font-size: 12px;
          font-style: normal;
        }
        a {
          color: #39C240;
          cursor: pointer;
        }
      }
      .el-row {
        padding-right: 20px;
        .el-col-8 {
          margin-bottom: 20px;
          button {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: #ffffff;
            border: solid 1px #E5E5E5;
            outline: none;
            color: #4A4A4A;
            padding: 12px 6px;
            position: relative;
            height: 110px;
            .item_img {
              width: 42px;
              height: 42px;
              text-align: center;
              border: solid 1px #E5E5E5;
              background-color: #FBFBFB;
              border-radius: 50%;
              padding: 10px;
              display: flex;
              align-items: center;
              -webkit-align-items: center;
              img {
                width: 38px;
                height: 38px;
              }
            }
            .item-text {
              text-align: start;
              margin-left: 10px;
              span {
                font-size: 16px;
              }
              p {
                font-size: 12px;
                margin-top: 5px;
              }
            }
            .tag_text {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 16px;
            }
            .tag_text_red {
              color: #D0011B;
            }
            .tag_text_green {
              color: #39C240;
            }
            .tag_text_gray {
              color: #9B9B9B;
            }
          }
        }
        button {
          width: 100%;
          height: 90px;
        }
      }
      .el-right {
        width: 300px;
        margin-left: 16px;
      }
      .el-dialog {
        width: 68%;
        .el-dialog__header {
          padding: 0 20px;
          border-bottom: solid 1px #979797;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }
        }
        .lvyeItem {
          border-bottom: 1px solid #979797;;
        }
        .el-dialog__body {
          padding: 22px 20px 33px;
          .dialog-content {
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            .item-form {
              position: relative;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .el-select {
                width: 100%;
                .el-input {
                  width: 69.5%;
                }
              }
              .el-input {
                width: 60%;
              }
              .el-transfer{
                .el-input{
                  width: 100%;
                }
              }

              .el-switch {
                margin-left: 16px;
              }
              .el-radio {
                margin-left: 16px;
              }
            }
            article {
              ul {
                font-size: 14px;
                color: #9B9B9B;
                margin-left: 41px;
                line-height: 22px;
                li {
                  margin-left: 20px;
                }
              }
            }
            .item_large {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              span {
                min-width: 194px;
                text-align: end;
              }
              .el-input {
                width: 60%;
              }
            }
            .item-tag2 {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
                    border-radius: 50px;
                    outline: none;
                    border: solid 1px;
                    margin-left: 5px;
                    padding-bottom: 2px;
                    background-color: #ffffff;
                    height: 20px;
                    width: 20px;
                  }
                }
              }
            }

            .item-tag {
              display: flex;
              align-items: flex-start;
              padding-left: 20px;
              span {
                width: 60px;
                text-align: end;
                line-height: 40px;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
                    border-radius: 50px;
                    outline: none;
                    border: solid 1px;
                    margin-left: 5px;
                    padding-bottom: 2px;
                    background-color: #ffffff;
                    height: 20px;
                    width: 20px;
                  }
                }
              }
            }
          }
        }
        .delLv {
          color: red;
          position: absolute;
          right: 0;
          display: inline-block;
          cursor: pointer;
        }
        .el-dialog__footer {
          padding: 10px 20px 28px;
          .dialog-footer {
            text-align: center;
            .el-button {
              width: 246px;
              border-radius: 0;
              line-height: 18px;
              margin: 0;
              &:nth-child(1) {
                margin-right: 22px;
              }
              &:nth-child(2) {
                background-color: #39C240;
                border-color: #39C240;
                color: #ffffff;
              }
            }
            .el-button--primary {
              background-color: transparent;
              border: solid 1px #979797;
              color: #4A4A4A;
            }
          }
        }
      }
    }
  }

  .el-autocomplete {
    width: 60%;
    margin-left: 16px;
  }

  .el-autocomplete .el-input {
    width: 100% !important;
  }

  .qrcode-img {
    display: flex;
    justify-content: center;
  }

  //我的
  .el-dialog__headerbtn {
    padding-top: 12px;
  }

  .reg {
    display: block;
    width: 200px;
    margin-top: 25px;
    margin-left: 35px;
  }
  .bottoomLine{
    padding-top: 2rem;
    border-bottom: 1px solid #000000;
  }
  .el-transfer-panel__filter {
    padding: 0.2rem 1rem 1.1rem 1rem;
    width: 100%;
  }
  .reduceImg{
    display: inline-block;
    width:2rem;
    height: 2rem;
    margin-left: 1rem;
  }
</style>
