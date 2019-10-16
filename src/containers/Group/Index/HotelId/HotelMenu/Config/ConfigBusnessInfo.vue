<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <!--<div class="content-title">-->
        <!--<span>业务配置 <i>（选择酒店开启业务）</i></span>-->
      <!--</div>-->
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="isWipeCatch">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text" style="color:#D0011B;">
              <span>清除缓存</span>
              <p>更改配置后请清除缓存</p>
            </div>
          </button>
        </el-col>
        <el-col :span="8">
          <button style="border:0;"></button>
        </el-col>
        <el-col :span="8">
          <button style="border:0;"></button>
        </el-col>

        <div class="content-title">
          <span>支付业务配置</span>
        </div>
        <!--<el-col :span="8">-->
        <!--<button @click="dialogConfig(enumShowType.invoice)">-->
        <!--<div class="item_img">-->
        <!--<img src="../../../../../../assets/images/发票.png" alt="a">-->
        <!--</div>-->
        <!--<div class="item-text">-->
        <!--<span>发票配置</span>-->
        <!--<p>配置客人是否可以申请发票。</p>-->
        <!--</div>-->
        <!--<span class="tag_text"-->
        <!--:class="{'tag_text_red': !enabledInvoice, 'tag_text_green': enabledInvoice}">{{enabledInvoice ? '已开通' : '未开通'}}</span>-->
        <!--</button>-->
        <!--</el-col>-->
        <el-col :span="8">
          <button @click="goto('/group/' + groupId + '/hotel/' + hotelId + '/payConfig')">
            <div class="item_img">
              <img src="../../../../../../assets/images/小程序.png" alt="a">
            </div>
            <div class="item-text">
              <span>设备支付配置</span>
              <p>关联设备支付配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':appId , 'tag_text_green':appId}">{{appId ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.miniApp)">
            <div class="item_img">
              <img src="../../../../../../assets/images/小程序.png" alt="a">
            </div>
            <div class="item-text">
              <span>小程序支付配置</span>
              <p>关联小程序支付配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':appId , 'tag_text_green':appId}">{{appId ? '已配置' : '未配置'}}</span>
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
        <!--预授权打印结算单配置-->
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.prePrint)">
            <div class="item_img">
              <img src="../../../../../../assets/images/退款.png" alt="a">
            </div>
            <div class="item-text">
              <span>支付小票配置</span>
              <p>配置是否打印结算单以及份数</p>
            </div>
            <span class="tag_text" :class="{'tag_text_red': !enablePrePrint, 'tag_text_green': enablePrePrint}">{{enablePrePrint ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button style="border:0;"></button>
        </el-col>
        <el-col :span="8">
          <button style="border:0;"></button>
        </el-col>

        <div class="content-title">
          <span>房间配置</span>
        </div>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoCheckout)">
            <div class="item_img">
              <img src="../../../../../../assets/images/退房.png" alt="a">
            </div>
            <div class="item-text">
              <span>插卡退房</span>
              <p>插回房卡自动操作PMS退房，旅业退房，不需要营业员参与。</p>
            </div>
            <span class="tag_text" :class="{'tag_text_red': !enableAutoCheckout, 'tag_text_green': enableAutoCheckout}">{{enableAutoCheckout ? '已开通' : '未开通'}}</span>
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
          <button @click="dialogConfig(enumShowType.roomTags)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>房间标签配置</span>
              <p>可对酒店房间设置多个标签</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.room_tags || configData.room_tags.length == 0, 'tag_text_green': configData.room_tags && configData.room_tags.length > 0}">{{configData.room_tags && configData.room_tags.length > 0 ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.maxAllowRoomcount)">
            <div class="item_img">
              <img src="../../../../../../assets/images/列表.png" alt="a">
            </div>
            <div class="item-text">
              <span>在线选房配置</span>
              <p>展示给用户看的最大房间数量</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !maxAllowRoomcount, 'tag_text_green':maxAllowRoomcount}">{{maxAllowRoomcount ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>


        <div class="content-title">
          <span>订单相关配置</span>
        </div>

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
          <button @click="dialogConfig(enumShowType.advancedLiveIn)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>入住规则配置</span>
              <p>入住手机号配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledAdvancedLiveIn, 'tag_text_green':enabledAdvancedLiveIn}">{{enabledAdvancedLiveIn ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.zftShowMoreRoom)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>值房通是否显示多房订单</span>
              <p>配置值房通是否显示多房订单</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !showMoreRoomOrder , 'tag_text_green': showMoreRoomOrder }">{{showMoreRoomOrder ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
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
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.accessServiceType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>订单关键字脚本配置</span>
              <p>业务类型配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !accessService, 'tag_text_green':accessService}">{{accessService? '已配置' : '未配置'}}</span>
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
          <button style="border:0;"></button>
        </el-col>
        <el-col :span="8">
          <button style="border:0;"></button>
        </el-col>
        <div class="content-title">
          <span>其他配置</span>
        </div>
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
          <button @click="dialogConfig(enumShowType.keyAccess)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>关键通道配置</span>
              <p>配置关键通道</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enableKeyAccess , 'tag_text_green': enableKeyAccess }">{{enableKeyAccess ? '已开通' : '未开通'}}
            </span>
            <!--<span class="tag_text"-->
            <!--:class="{'tag_text_red': !configData.enable_pull_identity_guest_info , 'tag_text_green': configData.enable_pull_identity_guest_info }">{{configData.enable_pull_identity_guest_info ? '已配置' : '未配置'}}-->
            <!--</span>-->
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
          <button @click="dialogConfig(enumShowType.deviceDeposit)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店设备是否缴纳押金及押金金额</span>
              <p>配置酒店设备是否缴纳押金及押金金额</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !this.isDevicePaid , 'tag_text_green': this.isDevicePaid }">{{this.isDevicePaid ? '已配置' : '未配置'}}
            </span>
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
        <!--推送白名单到餐券设备-->
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.enablebreakfast)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>推送白名单到餐券设备配置</span>
              <p>配置是否推送白名单到餐券设备</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enablebreakfast, 'tag_text_green': enablebreakfast}">{{enablebreakfast ? '已开通' : '未开通'}}</span>
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

          <!--<span class="tip" v-if="setTip">* 旅业信息不能为空</span>-->
          <!--发票配置弹框-->
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
          <!---闪开发票配置弹框-->
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
          <!--微信配置弹框-->
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
          <!--退款业务配置-->
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
          <!--预授权打印结算单配置-->
          <div v-if="showType === enumShowType.prePrint">
            <div class="item-form">
              <span>是否开启打印小票配置？</span>
              <el-switch
                v-model="enablePrePrint"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="enablePrePrint">
              <span>打印份数</span>
              <el-input class="el-right" v-model="prePrintNumber"
                        onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                        onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                        placeholder="请输入打印份数（大于0的整数）"></el-input>
            </div>
          </div>
          <!--自动退房配置-->
          <div v-if="showType === enumShowType.autoCheckout">
            <div class="item-form">
              <span>是否开通自动退房服务？</span>
              <el-switch
                v-model="enableAutoCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>设备账单是否需要签名</span>
              <el-switch
                v-model="enabledDeviceNeedSign"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否支持插卡退房（新）</span>
              <el-switch
                v-model="enabledRoomCardCheckout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--退离规则配置-->
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
            <div class="item-form">
              <span>客人退房提醒时间</span>
              <!--<el-time-picker class="el-right" value-format="H"-->
              <!--v-model="setCheckoutHouseTime"-->
              <!--placeholder="选择时间">-->
              <!--</el-time-picker>-->
              <el-time-select
                v-model="setCheckoutHouseTime"
                :picker-options="{
                 start: '00:00',
                 step: '00:60',
                 end: '24:00'
                 }"
                placeholder="选择时间">
              </el-time-select>
            </div>
            <div class="item-form">
              <span>账单是否需要签名</span>
              <el-switch
                v-model="enabledAdvancedCheckoutName"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>平帐帐单是否需要签名</span>
              <el-switch
                v-model="enabledAdvancedCheckoutNameSure"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否判断客房消费</span>
              <el-switch
                v-model="enabledAdvancedCheckoutHouse"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--脏房配置-->
          <div v-if="showType === enumShowType.supportVd">
            <div class="item-form">
              <span>是否支持分脏房？</span>
              <el-switch
                v-model="isSupportVd"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否允许住脏？</span>
              <el-switch
                v-model="isSupportDirtyCheckin"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="isSupportDirtyCheckin">
              <span>住脏是否允许发卡？</span>
              <el-switch
                v-model="isDirtyCheckinSendCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--分房配置-->
          <div v-if="showType === enumShowType.autoGiveRoom">
            <div class="item-form">
              <span>是否自动分房</span>
              <el-switch
                v-model="autoGiveRoomVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="autoGiveRoomVal">
              <span>分房规则</span>
              <el-select class="el-right" v-model="autoGiveRoomRule" placeholder="请选择分房规则">
                <el-option
                  :key="index"
                  v-for="(obj, index) of autoGiveRoomRuleList"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--房间标签-->
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
          <!--可选房配置-->
          <div v-if="showType === enumShowType.maxAllowRoomcount">
            <div class="item-form">
              <span style="margin-right:80px">是否开启在线选房？</span>
              <el-switch
                v-model="isMaxAllow"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="isMaxAllow">
              <span style="min-width: 210px; ">请输入选房列表最大展示房间数量</span>
              <el-input class="el-right" v-model="maxAllowRoomcount" placeholder="请输入选房列表最大展示房间数量"></el-input>
            </div>
            <div class="item-form" v-if="isMaxAllow">
              <span style="min-width: 210px; ">开启选房时间</span>
              <el-time-picker class="el-right" value-format="HH:mm:ss"
                              v-model="setHouseTime"
                              placeholder="选择时间">
              </el-time-picker>
            </div>
            <!--<div class="item-form">-->
            <!--<span style="min-width: 210px; ">是否允许选房</span>-->
            <!--<el-switch-->
            <!--v-model="selectHouseSure"-->
            <!--on-color="#13ce66"-->
            <!--off-color="#ff4949">-->
            <!--</el-switch>-->
            <!--</div>-->
          </div>
          <!--押金配置-->
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
          <!--早餐券配置-->
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
            <div class="item-form" style="padding-top:30px;" v-if="breakfastStemFrom=='PMS'">
              <table-breakfast :list="breakfastList" @delBreakfast="delBreakfast" @addBreakfast="addBreakfast"></table-breakfast>
            </div>
          </div>
          <!--定制化配置弹框-->
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
          <!--关键通道配置-->
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
          <!--酒店二维码配置-->
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
          <!--酒店设备押金配置-->
          <div v-if="showType === enumShowType.deviceDeposit">
            <div class="item-form">
              <span>是否开启酒店押金配置</span>
              <el-switch
                v-model="isDevicePaid"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="isDevicePaid">
              <span>押金金额</span>
              <el-input class="el-right" v-model="deviceAmount" placeholder="请输入押金金额"></el-input>
            </div>
          </div>
          <!--自动确认预付款配置-->
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
          <!--预登记短信配置-->
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
          <!--是否显示多房订单配置-->
          <div v-if="showType === enumShowType.zftShowMoreRoom">
            <div class="item-form">
              <span>显示多房订单</span>
              <el-switch
                v-model="showMoreRoomOrder"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="more-room-tip">说明:客人在认证通设备上刷二代身份证后，查询到多房订单，根据配置项是否显示订单二维码</div>

          </div>
          <!--入住规则配置-->
          <div v-if="showType === enumShowType.advancedLiveIn">
            <div class="item-form">
              <span>办理入住时，需要用户填写订单手机号</span>
              <el-switch
                v-model="enabledAdvancedLiveIn"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--电子签名配置-->
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
                <el-button slot="trigger" size="small" type="primary" v-if="!templateUrl">选取文件</el-button>
                <el-button slot="trigger" size="small" type="primary" v-if="templateUrl">重新选择</el-button>
                <el-button style="margin-left: 10px;" size="small" type="submit" @click="submitUpload">上传</el-button>
              </el-upload>
              <div>
                <a :href="templateUrl" v-if="templateUrl">rc单模板预览</a>
              </div>
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
          <!--推送白名单到餐券设备-->
          <div v-if="showType === enumShowType.enablebreakfast">
            <div class="item-form">
              <span>是否推送白名单到餐券设备</span>
              <el-switch
                v-model="enablebreakfast"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
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
        </div>
        <!--footer-->
        <div slot="footer" class="dialog-footer">
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
    invoice: 1,  //发票配置
    fastInvoice: 2,  //闪开发票配置
    miniApp: 3,  //小程序配置
    autoRefund: 4, //退款业务配置配置
    prePrint: 5,    //预授权打印结算单配置
    autoCheckout: 6, //自动退房配置
    advancedCheckout: 7,//是否允许提前退房
    supportVd: 8,  //脏房配置
    autoGiveRoom: 9,//自动分房
    roomTags: 10,  //房间标签配置
    maxAllowRoomcount: 11,  //最大房间数量配置
    cashPledge: 12, //押金配置
    breakfastStemFrom: 13,  //早餐券配置
    customization:14, //定制化配置
    keyAccess: 15,//关键通道
    qrCodeCreate: 16,//酒店二维码配置
    deviceDeposit:17,//酒店押金配置规则
    autoConfirmPrePay: 18,  //自动确认预付款配置
    preCheckinSms: 19,  //预登记短信配置
    zftShowMoreRoom: 20,//是否显示多房订单
    advancedLiveIn:  21,//入住规则配置
    sign: 22, //电子签名配置
    rcPrint: 23,//RC单打印
    enableRCstatus :24,//RC单是否开启字段
    enablebreakfast:25, //推送白名单到餐券设备
    accessServiceType:26,  //订单关键字脚本配置
  }

  //弹框标题类型
  const typeTitles = ['是否删除',
    '发票配置',
    '闪开发票配置',
    '小程序配置','退款业务配置配置', '支付小票配置','插卡退房配置','退离规则配置',  '脏房配置','分房配置','房间标签配置','在线选房配置', '押金配置',
    '早餐券配置', '定制化配置',  '关键通道配置',    '酒店二维码配置', '酒店设备押金配置','自动确认预付款配置',  '预登记短信配置','值房通是否显示多房订单',
    '入住规则配置','电子签名配置' , 'RC单打印',    'RC单是否开启字段','推送白名单到餐券设备','订单关键字脚本配置'
  ]

  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import ElInput from "../../../../../../../node_modules/element-ui/packages/input/src/input";
  import tool from '@/assets/tools/tool.js'
  export default {
    components: {
      ElDialog,
      ElInput,
    },
    name: 'ConfigInfo',
    data() {
      return {
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
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
        //**********************小程序配置**********************
        miniAppList: [],
        provider: false,
        appIdTemp: '',
        mchIdTemp: '',
        providerAppIdTemp: '',
        providerMchIdTemp: '',
        unProviderList:[],
        providerList:[],

        //退款业务配置
        enabledAutoRefund: true,
        operateOverDeposit:false,
        isAccessAutoCheckout:false,

        //预授权打印结算单配置
        enablePrePrint:false,
        prePrintNumber:1,
        //自动退房
        enableAutoCheckout: false,
        refundList:[{name:'PMS挂帐',value:'PMS'},{name:'退款入账',value:'ORDER_BILL'},{ name:'企业微信退款',value:'MANUAL'}],
        refundVal:'',

        //是否允许提前退房
        enabledAdvancedCheckout: false,
        enabledPMScheckout: false,
        enabledSameDateIO: false,
        setCheckoutHouseTime:'',                //客人退房时间提醒
        enabledAdvancedCheckoutName:false,      //账单是否需要签名
        enabledAdvancedCheckoutNameSure:false,  //平张帐单是否需要签名
        enabledAdvancedCheckoutHouse:false,    //是否判断客房消费
        enabledDeviceNeedSign:false,// 设备账单是否签名
        enabledRoomCardCheckout:false,//是否支持插卡退房
        //脏房配置
        isSupportVd: true,
        isSupportDirtyCheckin:false,
        isDirtyCheckinSendCard:false,
        //自动分房配置
        autoGiveRoomVal:false,
        autoGiveRoomRule:'',
        autoGiveRoomRuleList:[{name:'房号从小到大',value:'room_no_asc'},{name:'房号从大到小',value:'room_no_desc'},{name:'楼层从高到低',value:'floor_desc'},{name:'楼层从低到高',value:'floor_asc'}],
        //酒店标签配置
        roomTags: [''],
        wechatpayList: [],

        //可选房数量
        maxAllowRoomcount: '10',
        setHouseTime:'',//选房时间
        // selectHouseSure:false,//是否允许选房
        isMaxAllow:false,
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
        breakfastList: [],
        //**********************定制化配置**********************
        mirrorIntro:false,
        mirrorBrand:false,
        //关键通道配置
        enableKeyAccess: false,

        //酒店二维码配置
        QR_CodeVal: false,
        serviceTypeList: [
          {name: '发票', value: 'invoice'},
          {name: 'mobile-checkin二维码', value: 'mobileCheckin'}
        ],
        serviceType: '',
        qrCode: '',
        qrName: '',
        remark:'',

        //酒店设备配置
        isDevicePaid:false,  //是否酒店配置
        deviceAmount:'',     //酒店押金金额

        //自动预付款确认
        prepayKeyword: '',
        prepayExclusionKeyword: '',
        postpayKeyword: '',
        postpayExclusionKeyword: '',
        nowpayKeyword: '',
        nowpayExclusionKeyword: '',
        freeDepositKeyword: '',
        needDepositKeyword: '',
        isOpenAutoConfirmPrePay: false,

        //预登记短信配置
        enabledPreCheckinSms: false,
        //显示多房订单
        showMoreRoomOrder: false,
        showMoreRoomOrderKey: 'support_zft_mroom',
         //入住规则
        enabledAdvancedLiveIn:false,

        //电子签名
        enabledSign: false,

        //RC单是否开启字段
        rcStatus:false,

        //RC单打印
        rcTypeList: [],
        rcTemplateVal: '',
        autoPrintVal: 1,
        perRoom: "1",
        perGuest: '2',
        templateUrl:'',
//        moreLvyeReportVal: '',
//        actionUrl: 'http://localhost:8080/virgo/fileUpload',
        UploadResponData: '',
        rcConfig: false,
//        hasSetMoreLvye: false,
        hasSetRc: false,
//        mirrorIntro:false,
//        mirrorBrand:false,
        //**********************酒店开通业务类型配置**********************
        filter:'',
        format:'',
        formatScript:"",
        filterScript:"",
        filterScript:"",
        enableAccessService:false,
        accessService:false,

        //是否推送白名单到餐券设备
        enablebreakfast:false,

      }
    },
    mounted() {
      this.getConfigs();
      this.getRCConfigeds();
      this.getAccessServiceType();
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
      roomTagsList() {
        return this.roomTags.filter(v => v != '');
      },
      groupId(){
        return this.$route.params.id
      },
      hotelId(){
        return this.$route.params.hotelid
      },
      providerMchIdList() {
        if(this.providerList.length>0) {
          return this.providerList.map(v => {
            let obj = {
              value: `${v.mch_id} | ${v.mch_name}`
            }
            return obj
          })
        }
      },
      mchIdList() {
       if(this.unProviderList.length>0){
         return this.unProviderList.map(v => {
           let obj = {
             value: `${v.mch_id} | ${v.mch_name}`
           }
           return obj
         })
       }

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
      invoiceNameList() {
        return this.invoiceName.filter(v => v != '');
      },
      invoiceCodeList() {
        return this.invoiceCode.filter(v => v != '');
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
      validateminiApp() {
        if (!this.provider) {
          return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId);
        }
        return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId) && tool.isNotBlank(this.providerAppId) && tool.isNotBlank(this.providerMchId);
      },
      validatemaxAllowRoomcount() {
        return tool.isNotBlank(this.maxAllowRoomcount) && !isNaN(+this.maxAllowRoomcount)
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
          if (tool.isBlank(this.multipleOfCashPledge) || isNaN(+this.multipleOfCashPledge) || this.multipleOfCashPledge <=0 || this.multipleOfCashPledge >10)
            return false;
          if (this.hasDayOfIncidentals) {
            return tool.isNotBlank(this.dayOfIncidentals) && !isNaN(+this.dayOfIncidentals)
          }
          return true;
        }
      },
      validateQrcodeCreate() {
        return (tool.isNotBlank(this.serviceType) && tool.isNotBlank(this.qrName) && tool.isNotBlank(this.qrCode))
      },
      validateDeviceDeposit(){
        if(this.isDevicePaid){
          return (tool.isNotBlank(this.deviceAmount))
        }else{
          return true;
        }
      },
      validateautoConfirmPrePay() {
        return tool.isNotBlank(this.prepayKeyword) && tool.isNotBlank(this.prepayExclusionKeyword) && tool.isNotBlank(this.postpayKeyword) && tool.isNotBlank(this.postpayExclusionKeyword) && tool.isNotBlank(this.freeDepositKeyword) && tool.isNotBlank(this.needDepositKeyword)
      },
      validatePrePrint(){
        console.log('this.prePrintNumber',this.prePrintNumber);
        if(this.enablePrePrint){
          if(this.prePrintNumber!=''){
            return true;
          }else{
            return false;
          }
        }else{
          return true
        }
      },
      validateAccessService(){
        return (tool.isNotBlank(this.filterScript)||tool.isNotBlank(this.formatScript));
      },
      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.invoice:
            result = this.validateinvoice;
            break;
          case enumShowType.fastInvoice:
            result = this.validatefastinvoice;
            break;
          case enumShowType.miniApp:
            result = this.validateminiApp;
            break;
          case enumShowType.autoRefund:
            result = true;
            break;
          case enumShowType.prePrint:
            result = this.validatePrePrint;
            break;
          case enumShowType.autoCheckout:
            result = true;
            break;
          case enumShowType.advancedCheckout:
            result = true;
            break;
          case enumShowType.supportVd:
            result = true;
            break;
          case enumShowType.autoGiveRoom:
            result = true;
            break;
          case enumShowType.roomTags:
            result = true;
            break;
          case enumShowType.maxAllowRoomcount:
            result = this.validatemaxAllowRoomcount;
            break;
          case enumShowType.cashPledge:
            result = this.validatecashPledge;
            break;
          case enumShowType.breakfastStemFrom:
            result = true;
            break;
          case enumShowType.customization:
            result = true;
            break;
          case enumShowType.keyAccess:
            result = true;
            break;
          case enumShowType.qrCodeCreate:
            result = this.validateQrcodeCreate;
            break;
          case enumShowType.deviceDeposit:
            result=this.validateDeviceDeposit;
            break;
          case enumShowType.autoConfirmPrePay:
            result = this.validateautoConfirmPrePay;
            break;
          case enumShowType.preCheckinSms:
            result = true;
            break;
          case enumShowType.zftShowMoreRoom:
            result = true;
            break;
          case enumShowType.advancedLiveIn:
            result = true;
            break;
          case enumShowType.sign:
            result = true;
            break;
          case enumShowType.rcPrint:
            result = true;
            break;
          case enumShowType.enableRCstatus:
//            result = this.validateRCStatus ;
            result = true;
            break;
          case  enumShowType.enablebreakfast :
            result = true;
            break;
          case enumShowType.accessServiceType:
            result=this.validateAccessService;
            break;
          default:
            result = false;
        }
        return result;
      }
    },
    watch: {
//      renderRoomNumReviewList(val){
//          console.log(val)
//      },
      enabledAdvancedCheckoutName(newval,oldval){
        this.signAdvancedCheckoutName = newval
        if(newval == false){
          this.enabledAdvancedCheckoutNameSure = false
        }
      },
      enabledAdvancedCheckoutNameSure(newval,oldval){
        // this.signAdvancedCheckoutNameSure = newval
        if(this.signAdvancedCheckoutName == false){
          this.enabledAdvancedCheckoutNameSure = false
          this.showtoast({
            text: '如需要使用平帐帐单开关需要先打开账单总开关',
            type: 'error'
          })
        }

      },
      configData(){
        let configData = this.configData;
        console.log('configData:',configData)
        if (tool.isNotBlank(configData)) {
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
          this.configData.code ? this.invoiceCode = [...this.configData.code] : null;
          this.plugCode = this.configData.plug_code;

          //微信支付配置
          this.mchId = configData;
          //小程序配置
          this.appId = configData;
          this.providerAppId = configData;
          this.providerMchId = configData;
          this.provider = configData.provider ? true : false;

          //退款业务配置
          this.operateOverDeposit=configData.enable_out_of_cash_pledge_refund == 'true' ? true : false;
          this.isAccessAutoCheckout=configData.enable_auto_checkout == 'true' ? true : false;
          this.enabledAutoRefund = configData.enabled_auto_refund == 'true' ? true : false;
          this.refundVal= configData.refund_amount_source;

          //预授权打印结算单配置
          this.enablePrePrint=JSON.parse(configData.payment_ticket).open;
          this.prePrintNumber=JSON.parse(configData.payment_ticket).printedNum;

          //自动退房
          this.enableAutoCheckout = configData.enable_auto_checkout == 'true' ? true : false;

          //是否允许提前退房配置
          this.enabledAdvancedCheckout = configData.advanced_checkout == 'true' ? true : false;
          this.enabledPMScheckout = configData.enabled_pms_in_guest_checkout == 'true' ? true : false;
          this.enabledSameDateIO = configData.enabled_same_date_io == 'true' ? true : false;
          this.setCheckoutHouseTime = configData.checkout_remind_time
          this.enabledAdvancedCheckoutName = configData.bill_need_sign== 'true' ? true : false;
          this.enabledAdvancedCheckoutNameSure = configData.bill_equal_need_sign == 'true' ? true : false;
          this.enabledAdvancedCheckoutHouse =configData.need_check_expense == 'true' ? true : false;
          this.enabledDeviceNeedSign=configData.bill_device_need_sign == 'true' ?true:false;
          this.enabledRoomCardCheckout=configData.enabled_room_card_checkout=='true'?true:false;
          //脏房配置
          this.isSupportVd = configData.is_support_vd == '1' ? true : false;
          this.isSupportDirtyCheckin=configData.is_support_dirty_checkin=='true'?true:false;
          this.isDirtyCheckinSendCard=configData.dirty_checkin_send_card=='true'?true:false;

          //是否自动分房配置
          this.autoGiveRoomVal = configData.enabled_auto_give_room == 'true' ? true : false;
          this.autoGiveRoomRule= configData.assign_room_no_rules;

          //酒店标签配置
          if (tool.isNotBlank(configData.room_tags)) {
            this.roomTags = configData.room_tags.length > 0 ? [...configData.room_tags] : [''];
          }
          this.enabledSpeedCard = configData.enabled_speed_card == 'true' ? true : false;

          //可选房数量
          this.maxAllowRoomcount = configData.max_allow_roomcount;
          this.isMaxAllow=configData.enabled_self_selected_room == 'true' ? true : false;
          this.setHouseTime = configData.allow_give_room;
          // this.selectHouseSure = configData.enable_select_house == 'true' ? true : false;

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
          if(configData.contain_price_info!=null&&configData.contain_price_info!=''){
             this.breakfastList=JSON.parse(configData.contain_price_info)
          }else{
             this.breakfastList.push({"code":"","breakfast":"","description":""});
          }
          //定制化配置
          this.mirrorIntro=configData.enabled_mirror_introduce=='true'?true:false;
          this.mirrorBrand=configData.enabled_mirror_brand=='true'?true:false;
          //关键通道配置
          this.enableKeyAccess = configData.enable_pull_identity_guest_info == 'true' ? true : false

          //酒店设备是否配置
          if(configData.device_deposit!=undefined){
            let deviceDepositObj=JSON.parse(configData.device_deposit);
            this.isDevicePaid=deviceDepositObj.paid;       //是否酒店配置
            this.deviceAmount=deviceDepositObj.amount     //酒店押金金额
          }

          //自动预付款确认
          this.prepayKeyword = configData.prepay_keyword;
          this.prepayExclusionKeyword = configData.prepay_exclusion_keyword;
          this.postpayKeyword = configData.postpay_keyword;
          this.postpayExclusionKeyword = configData.postpay_exclusion_keyword;
          this.nowpayKeyword = configData.nowpay_keyword;
          this.nowpayExclusionKeyword = configData.nowpay_exclusion_keyword;
          this.freeDepositKeyword = configData.free_deposit_keyword;
          this.isOpenAutoConfirmPrePay = configData.enabled_autoprepay == 'true' ? true : false;
          this.needDepositKeyword = configData.need_deposit_keyword;

          //预登记短信配置
          this.enabledPreCheckinSms = configData.enabled_pre_checkin_sms == 'true' ? true : false;

          //值房通是否显示多房订单
          this.showMoreRoomOrder=configData.support_zft_mroom=='true' ? true : false;

          //入住规则配置
          this.enabledAdvancedLiveIn = configData.no_phone_checkin == 'true' ? true : false;

          //电子签名
          this.enabledSign = configData.enabled_sign == 'true' ? true : false;

          //rc是否开启配置字段
          this.rcStatus=configData.rc_status=='true'?true:false;
          //推送白名单到餐券设备
          this.enablebreakfast = configData.enable_pull_identity_info_breakfast  == 'true' ? true : false;
        };
      },
    },
    methods: {
      ...mapActions([
        'getConfig','getMiniAppList','getWechatpayProvider',
        'patchConfig',
        'showtoast',
        'showalert',
        'goto',
        'RCconfig',
        "setRCconfig",
        "getRCConfiged",'updateSingerConfig','getSingerConfig','isDeleteCatch','getServiceTypeScript','saveScriptUpload'

      ]),
      delBreakfast(obj,index){
        this.breakfastList.splice(index, 1);
        console.log("1111",this.breakfastList)
      },
      addBreakfast(obj,index){
        this.breakfastList.push({"code":"","breakfast":"","description":""});
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
      dialogConfig(type) {
        console.log('------>',type)
        this.showType = type;
        this.showDialog = true;
        if (type === enumShowType.miniApp) {
          this.getMiniAppLists();
          this.wechatList();
        }
      },
      wechatList() {
//        this.getWechatpayList({
//          onsuccess: (body, headers) => {
//            if (body.data && Array.isArray(body.data)) {
//              this.wechatpayList = body.data;
//            }
//          }
//        })
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
      closeMorelvye(type){
        if(type===enumShowType.moreLvyeReportType){
          // this.getMoreLvyes();
          this.setTip=false;
        }
      },

      //rc单打印开始
      getUploadData(res) {
        this.UploadResponData = res.data
        console.log('---->', this.UploadResponData)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      //拉已配置的RC数据
      getRCConfigeds() {
        this.getRCConfiged({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
             console.log("拉已配置的RC数据:",body.data)
            if (body.data) {
              this.hasSetRc = true;
              this.UploadResponData = body.data.hotel_id;
              this.perRoom = body.data.electron_sign.toString();
              this.templateUrl=body.data.templateUrl;
              this.autoPrintVal = body.data.auto_print == 1 ? true : false
            }
          }
        })
      },
      RCconfigs(pre) {
        console.log(111)
        this.RCconfig({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
          }
        })

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
      // rc单打印结束
      addInvoiceName() {
        this.invoiceName.push('');
      },
      subtractInvoiceName() {
        if (this.invoiceName.length == 1) return;
        this.invoiceName.pop();
      },
      //是否清除缓存
      isWipeCatch(){
        this.$confirm('是否要清除缓存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.isDeleteCatch({
            hotel_id: this.$route.params.hotelid,
            onsuccess: body => {
              if (body.errcode == '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      addRoomTags() {
        this.roomTags.push('');
      },
      subtractRoomTags() {
        if (this.roomTags.length == 1) return;
        this.roomTags.pop();
      },
        //弹框取消按钮
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
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
          case enumShowType.miniApp:
            this.appId = this.configData;
            this.mchId = this.configData;
            this.providerAppId = this.configData;
            this.providerMchId = this.configData;
            this.provider = this.configData.provider ? true : false;
            break;
          case enumShowType.autoRefund:
            this.operateOverDeposit=this.configData.enable_out_of_cash_pledge_refund == 'true' ? true : false;
            this.isAccessAutoCheckout=this.configData.enable_auto_checkout == 'true' ? true : false;
            this.enabledAutoRefund = this.configData.enabled_auto_refund == 'true' ? true : false;
            this.refundVal=this.configData.refund_amount_source;
            break;
          case enumShowType.prePrint:
            this.enablePrePrint=JSON.parse(this.configData.payment_ticket).open;
            this.prePrintNumber=JSON.parse(this.configData.payment_ticket).printedNum;
            break;
          case enumShowType.autoCheckout:
            this.enableAutoCheckout = this.configData.enable_auto_checkout == 'true' ? true : false;
            this.enabledDeviceNeedSign=this.configData.bill_device_need_sign == 'true' ?true:false;
            this.enabledRoomCardCheckout=this.configData.enabled_room_card_checkout=='true'?true:false;
            break;
          case enumShowType.advancedCheckout:
            this.enabledAdvancedCheckout = this.configData.advanced_checkout == 'true' ? true : false;
            this.enabledPMScheckout = this.configData.enabled_pms_in_guest_checkout == 'true' ? true : false;
            this.enabledSameDateIO = this.configData.enabled_same_date_io == 'true' ? true : false;
            this.setCheckoutHouseTime = this.configData.checkout_remind_time
            this.enabledAdvancedCheckoutName = this.configData.bill_need_sign== 'true' ? true : false;
            this.enabledAdvancedCheckoutNameSure = this.configData.bill_equal_need_sign == 'true' ? true : false;
            this.enabledAdvancedCheckoutHouse = this.configData.need_check_expense == 'true' ? true : false;
            break;
          case enumShowType.supportVd:
            this.isSupportVd = this.configData.is_support_vd == '1' ? true : false;
            this.isSupportDirtyCheckin=this.configData.is_support_dirty_checkin=='true'?true:false;
            this.isDirtyCheckinSendCard=this.configData.dirty_checkin_send_card=='true'?true:false;
            break;
          case enumShowType.autoGiveRoom:
            this.autoGiveRoomVal = this.configData.enabled_auto_give_room == 'true' ? true : false;
            this.autoGiveRoomRule= this.configData.assign_room_no_rules;
            break;
          case enumShowType.roomTags:
            this.roomTags = this.configData.room_tags.length > 0 ? [...this.configData.room_tags] : [''];
            break;
          case enumShowType.maxAllowRoomcount:
            this.isMaxAllow=this.configData.enabled_self_selected_room == 'true' ? true : false;
            this.maxAllowRoomcount = this.configData.max_allow_roomcount;
            this.setHouseTime = this.configData.allow_give_room
            // this.selectHouseSure = this.configData.enable_select_house == 'true' ? true : false;
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
            if(this.configData.contain_price_info!=null&&this.configData.contain_price_info!=''){
              this.breakfastList=JSON.parse(this.configData.contain_price_info);
            }else{
              this.breakfastList=[{"code":"","breakfast":"","description":""}]
            }

            break;
          case enumShowType.customization:
            this.mirrorIntro=this.configData.enabled_mirror_introduce=='true'?true:false;
            this.mirrorBrand=this.configData.enabled_mirror_brand=='true'?true:false;
            break;
          case enumShowType.keyAccess:
            this.enableKeyAccess = this.configData.enable_pull_identity_guest_info == 'true' ? true : false
            break;
          case enumShowType.deviceDeposit:
            //酒店设备是否配置
            if(this.configData.device_deposit!=undefined){
              let deviceDepositObj=JSON.parse(this.configData.device_deposit);
              this.isDevicePaid=deviceDepositObj.paid;       //是否酒店配置
              this.deviceAmount=deviceDepositObj.amount     //酒店押金金额
            }
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
            this.isOpenAutoConfirmPrePay = this.configData.enabled_autoprepay == 'true' ? true : false;
            break;
          case enumShowType.preCheckinSms:
            this.enabledPreCheckinSms = this.configData.enabled_pre_checkin_sms == 'true' ? true : false;
            break;
          case enumShowType.zftShowMoreRoom:
            this.showMoreRoomOrder=this.configData.support_zft_mroom=='true' ? true : false;
            break;
          case enumShowType.advancedLiveIn:
            this.enabledAdvancedLiveIn = this.configData.no_phone_checkin == 'true' ? true : false;
            break;
          case enumShowType.sign:
            this.enabledSign = this.configData.enabled_sign == 'true' ? true : false;
            break;
          case enumShowType.enableRCstatus:
            this.rcStatus=this.configData.rc_status=='true'?true:false;
            break;
          case enumShowType.enablebreakfast:
            this.enablebreakfast = this.configData.enable_pull_identity_info_breakfast  == 'true' ? true : false;
            break
          default:
        }
      },
      submitDialog() {
        let data;
        switch (this.showType) {
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
                mch_name: this.mchName,
                provider_app_id: this.providerAppId,
                provider_mch_id: this.providerMchId,
                provider_app_name: this.providerAppName,
                provider_mch_name: this.providerMchName
              }
            }
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
          case enumShowType.prePrint:
            let  payment_ticket={
              open:this.enablePrePrint,
              printedNum:this.prePrintNumber
            }
            data ={
              payment_ticket:JSON.stringify(payment_ticket)
            }
            break;
          case enumShowType.autoCheckout:
            data = {
              enable_auto_checkout: this.enableAutoCheckout.toString(),
              bill_device_need_sign:this.enabledDeviceNeedSign.toString(),
              enabled_room_card_checkout:this.enabledRoomCardCheckout.toString(),
            }
            break;
          case enumShowType.advancedCheckout:
            data = {
              advanced_checkout: this.enabledAdvancedCheckout.toString(),
              enabled_pms_in_guest_checkout: this.enabledPMScheckout.toString(),
              enabled_same_date_io: this.enabledSameDateIO.toString(),
              checkout_remind_time: this.setCheckoutHouseTime,
              bill_need_sign:this.enabledAdvancedCheckoutName.toString(),
              bill_equal_need_sign:this.enabledAdvancedCheckoutNameSure,
              need_check_expense:this.enabledAdvancedCheckoutHouse.toString(),
            }
            break;
          case enumShowType.supportVd:
            if(this.isSupportDirtyCheckin){
              data = {
                is_support_vd: this.isSupportVd ? '1' : '0',
                'is_support_dirty_checkin':this.isSupportDirtyCheckin.toString(),
                'dirty_checkin_send_card':this.isDirtyCheckinSendCard.toString(),
              }
            }else{
              data = {
                is_support_vd: this.isSupportVd ? '1' : '0',
                'is_support_dirty_checkin':this.isSupportDirtyCheckin.toString(),
                'dirty_checkin_send_card':'false',
              }
            }
            break;
          case enumShowType.autoGiveRoom:
            if(this.autoGiveRoomVal){
              data = {
                'enabled_auto_give_room': this.autoGiveRoomVal.toString(),
                'assign_room_no_rules':this.autoGiveRoomRule
              };
            }else{
              data = {
                'enabled_auto_give_room': this.autoGiveRoomVal.toString(),
                'assign_room_no_rules':''
              };
            }

            break;
          case enumShowType.roomTags:
            data = { room_tags: Array.from(new Set(this.roomTagsList))    }
            break;
          case enumShowType.maxAllowRoomcount:
            data = {
              enabled_self_selected_room: this.isMaxAllow.toString(),
              max_allow_roomcount: this.maxAllowRoomcount,
              allow_give_room:this.setHouseTime,
              // enable_select_house:this.selectHouseSure
            }
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

            if(this.breakfastStemFrom=='PMS'){
              data = {
                breakfast_stem_from: this.breakfastStemFrom,
                contain_price_info:JSON.stringify(this.breakfastList)
              }
            }else{
              data = {
                breakfast_stem_from: this.breakfastStemFrom,
                contain_price_info:''
              }
            }
            break;
          case enumShowType.customization:
            data = {
              "enabled_mirror_introduce": this.mirrorIntro.toString(),
              "enabled_mirror_brand": this.mirrorBrand.toString()
            }
            break;
          case enumShowType.keyAccess:
            data = {
              enable_pull_identity_guest_info: this.enableKeyAccess.toString()
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
          case enumShowType.deviceDeposit:
            let device_deposit=JSON.stringify({"paid":this.isDevicePaid,"amount":this.deviceAmount})
            data = {device_deposit}
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
          case enumShowType.preCheckinSms:
            data = {
              enabled_pre_checkin_sms: this.enabledPreCheckinSms.toString()
            }
            break;
          case enumShowType.zftShowMoreRoom:
            this._updateSingerConfig(this.showMoreRoomOrder);
            this.getSingerConfig();
            break;
          case enumShowType.advancedLiveIn:
            data = {
              no_phone_checkin:this.enabledAdvancedLiveIn.toString(),
            }
            break;
          case enumShowType.sign:
            data = {
              enabled_sign: this.enabledSign.toString()
            }
            break;
          case enumShowType.rcPrint:
            data = {
              "id": this.$route.params.hotelid,
              "electron_sign": parseInt(this.perRoom),
              "auto_print": this.autoPrintVal ? 1 : 0
            }
            this.mySetRCconfig(data);
            return;
          case enumShowType.enableRCstatus:
            data = {
              "rc_status": this.rcStatus
            }
            break;
          case enumShowType.accessServiceType:
            let tempData={
              enabled_script:this.enableAccessService
            };
            this.saveAccessServiceType(tempData);
            return;
            data = {
//                qrcode:this.serviceType,
//                qrcode:this.qrcode,
//                qrcode:this.qrName,
//                qrcode:this.remark
            }
            break;
          case enumShowType.enablebreakfast:
            data = {
              "enable_pull_identity_info_breakfast":this.enablebreakfast.toString()
            }
            break
          default:null
        };
        this.patchConfigData(data);
      },
      //时间格式处理
      _updateSingerConfig(pre){
        this.updateSingerConfig({
          hotel_id: this.$route.params.hotelid,
          key: this.showMoreRoomOrderKey,
          value: pre,
          onsuccess: (body) => {
            console.log('修改了')
            this.showDialog = false;
          }
        })
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
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

      addInvoiceCode() {
        this.invoiceCode.push('');
      },
      subtractInvoiceCode() {
        if (this.invoiceCode.length == 1) return;
        this.invoiceCode.pop();
      },
      creatQrcode(code) {
        if (!code) return;
        console.log('process.env=======',process.env)

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

        this.tempCode = `https://jskp.fortrun.cn/index.html?code=${code}`;

        QRCode.toDataURL(this.tempCode, (err, url) => {
          console.log('url=======',url)
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
