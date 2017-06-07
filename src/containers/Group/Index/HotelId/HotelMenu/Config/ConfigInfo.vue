<template>
  <div>
    <div class="module-wrapper">
      <div class="content-title">
        <span>系统配置</span>
        <a @click="goSummary">查看配置汇总</a>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.PMS)">
            <img class="images" src="../../../../../../assets/images/系统.png" alt="a">
            <div class="item-text">
              <span>pms对接配置</span>
              <p>对接PMS的酒店必须开通该配置。</p>
            </div>
            <span class="tag_text">未配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.lvyeReportType)">
            <img class="images" src="../../../../../../assets/images/公安.png" alt="a">
            <div class="item-text">
              <span>旅业系统配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.doorLock_unknown)">
            <img class="images" src="../../../../../../assets/images/门锁.png" alt="a">
            <div class="item-text">
              <span>门锁配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.facein)">
            <img class="images" src="../../../../../../assets/images/人脸识别 BFR.png" alt="a">
            <div class="item-text">
              <span>人脸识别配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.wechatPay)">
            <img class="images" src="../../../../../../assets/images/微信支付.png" alt="a">
            <div class="item-text">
              <span>微信支付配置</span>
              <p>配置微信支付信息。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.wxHotel)">
            <img class="images" src="../../../../../../assets/images/cancel.png" alt="a">
            <div class="item-text">
              <span>生态酒店配置</span>
              <p>必须开通该配置,身份识别、旅业上报
                等接口需要用到。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.miniApp)">
            <img class="images" src="../../../../../../assets/images/小程序.png" alt="a">
            <div class="item-text">
              <span>小程序配置</span>
              <p>关联小程序配置。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
      </el-row>

      <div class="content-title">
        <span>业务配置 <i>（选择酒店开启业务）</i></span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.sign)">
            <img class="images" src="../../../../../../assets/images/签名.png" alt="a">
            <div class="item-text">
              <span>电子签名</span>
              <p>客人是否需要在支付后签名。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.phoneCancel_unknown)">
            <img class="images" src="../../../../../../assets/images/cancel.png" alt="a">
            <div class="item-text">
              <span>电话取消订单</span>
              <p>客人是否可以电话取消订单，如果可以，最晚在几点之前可以取消。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.invoice)">
            <img class="images" src="../../../../../../assets/images/发票.png" alt="a">
            <div class="item-text">
              <span>发票申请</span>
              <p>配置客人是否可以申请发票。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.preCheckinSms)">
            <img class="images" src="../../../../../../assets/images/登记.png" alt="a">
            <div class="item-text">
              <span>预登记</span>
              <p>配置客人是否可以预登记。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.delayedPayment)">
            <img class="images" src="../../../../../../assets/images/到店.png" alt="a">
            <div class="item-text">
              <span>到店支付</span>
              <p>开通后客人可以免支付完成预登记</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoCheckout)">
            <img class="images" src="../../../../../../assets/images/退房.png" alt="a">
            <div class="item-text">
              <span>自动退房</span>
              <p>插回房卡自动操作PMS退房，旅业退房，不需要营业员参与。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoRefund)">
            <img class="images" src="../../../../../../assets/images/退款.png" alt="a">
            <div class="item-text">
              <span>自动退款</span>
              <p>酒店不必人工登录微信支付手动操作退款，退房成功后调用退款接口。</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.preCheckin)">
            <img class="images" src="../../../../../../assets/images/认证.png" alt="a">
            <div class="item-text">
              <span>无证入住</span>
              <p>酒店是否支持无证入住</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
      </el-row>

      <div class="content-title">
        <span>酒店配置 <i>（需要配置以下所有项目）</i></span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.roomCard)">
            <img class="images" src="../../../../../../assets/images/卡.png" alt="a">
            <div class="item-text">
              <span>房卡配置</span>
              <p>酒店是否支持写卡吐卡</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.cashPledge)">
            <img class="images" src="../../../../../../assets/images/押金.png" alt="a">
            <div class="item-text">
              <span>押金配置</span>
              <p>配置酒店押金规则</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.breakfastStemFrom)">
            <img class="images" src="../../../../../../assets/images/卡券.png" alt="a">
            <div class="item-text">
              <span>早餐券配置</span>
              <p>配置早餐券规则</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.maxAllowRoomcount)">
            <img class="images" src="../../../../../../assets/images/列表.png" alt="a">
            <div class="item-text">
              <span>可选房数量</span>
              <p>展示给用户看的最大房间数量</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.syncSpaceTime)">
            <img class="images" src="../../../../../../assets/images/同步.png" alt="a">
            <div class="item-text">
              <span>PMS同步频率</span>
              <p>设置自动同步周期</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.autoConfirmPrePay)">
            <img class="images" src="../../../../../../assets/images/自动投标.png" alt="a">
            <div class="item-text">
              <span>自动确认预付款</span>
              <p>配置预付款确认关键字</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.supportVd)">
            <img class="images" src="../../../../../../assets/images/打扫.png" alt="a">
            <div class="item-text">
              <span>脏房配置</span>
              <p>配置酒店对脏房的态度</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.roomTags)">
            <img class="images" src="../../../../../../assets/images/标签.png" alt="a">
            <div class="item-text">
              <span>房间标签配置</span>
              <p>配置酒店对脏房的态度</p>
            </div>
            <span class="tag_text">已配置</span>
          </button>
        </el-col>
      </el-row>

      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="dialog-content">
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
            <div v-show="pmsName == '别样红'">
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
                <span>用户名</span>
                <el-input class="el-right" v-model="userName" placeholder="请输入用户名"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="userPass" placeholder="请输入密码"></el-input>
              </div>
            </div>
            <div v-show="pmsName == '住哲'">
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
          </div>
          <div v-if="showType === enumShowType.lvyeReportType">
            <div class="item-form">
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
              <div class="item-form">
                <span>酒店公安ID</span>
                <el-input class="el-right" v-model="policeId" placeholder="请输入酒店公安ID"></el-input>
              </div>
              <div class="item-form">
                <span>公安类型</span>
                <el-input class="el-right" v-model="policeType" placeholder="请输入公安类型"></el-input>
              </div>
              <div v-if="lvyeType == 'LOCAL'">
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
            <div class="item-form">
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
              <ul>
                帮助：
                <li>大于自动通过值则自动通过公安验证。</li>
                <li>小于自动拒绝值则验证自动拒绝。</li>
                <li>在自动通过值和自动拒绝值之间需要人工参与核实。</li>
              </ul>
            </article>
          </div>
          <div v-if="showType === enumShowType.wechatPay">
            <div class="item_small">
              <span>小程序app_id</span>
              <el-input class="el-right" v-model="wechatPayAppId" placeholder="请输入小程序app_id"></el-input>
            </div>
            <div class="item_small">
              <span>小程序对应的商户号</span>
              <el-input class="el-right" v-model="mchId" placeholder="请输入小程序对应的商户号"></el-input>
            </div>
            <div class="item_small">
              <span>小程序对应的商户号api密钥</span>
              <el-input class="el-right" v-model="mchApiKey" placeholder="请输入小程序对应的商户号api密钥"></el-input>
            </div>
            <div class="item_small">
              <span>酒店微信账务收款代码</span>
              <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
            </div>
            <div class="item_small">
              <span>酒店微信账务退款代码</span>
              <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.wxHotel">
            <div class="item-form">
              <span>微信酒店ID</span>
              <el-input class="el-right" v-model="wxHotelId" placeholder="请输入微信酒店ID"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.miniApp">
            <div class="item-form">
              <span>小程序app_id</span>
              <el-input class="el-right" v-model="appId" placeholder="请输入小程序app_id"></el-input>
            </div>
            <div class="item-form">
              <span>小程序名称</span>
              <el-input class="el-right" v-model="appSecret" placeholder="请输入小程序名称"></el-input>
            </div>
            <div class="item-form">
              <span>小程序密钥</span>
              <el-input class="el-right" v-model="originalId" placeholder="请输入小程序密钥(app_secr)"></el-input>
            </div>
            <div class="item-form">
              <span>小程序原始ID</span>
              <el-input class="el-right" v-model="appName" placeholder="请输入小程序原始ID(original_id)"></el-input>
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
          <div v-if="showType === enumShowType.phoneCancel_unknown">
            <h1>暂无</h1>
            <!--<div>
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
            </div>-->
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
              <div class="item-tag">
                <span>发票类型</span>
                <div class="tag-input">
                  <div v-for="(obj, index) of invoiceName">
                    <el-input class="el-right" v-model="invoiceName[index]" placeholder="请输入发票类型"></el-input>
                  </div>
                  <div class="tag-btn">
                    <button style="border-color: #39C240; color: #39C240" @click="addInvoiceName">+</button>
                    <button style="border-color: #D0011B;color: #D0011B" v-show="invoiceName.length > 1"
                            @click="subtractInvoiceName">-
                    </button>
                  </div>
                </div>
              </div>
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
              <span>是否开通自动退款服务？</span>
              <el-switch
                v-model="enabledAutoRefund"
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
          <div v-if="showType === enumShowType.roomCard">
            <div class="item-form">
              <span>是否支持吞吐门卡？</span>
              <el-switch
                v-model="supportRoomCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
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
                  v-for="(obj, index) of breakfastStemFromList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="showType === enumShowType.maxAllowRoomcount">
            <div class="item-form">
              <span style="width: 240px; ">请输入选房列表最大展示房间数量</span>
              <el-input class="el-right" v-model="maxAllowRoomcount" placeholder="请输入选房列表最大展示房间数量"></el-input>
            </div>
          </div>
          <div v-if="showType === enumShowType.syncSpaceTime">
            <div class="item-form">
              <span>PMS同步频率</span>
              <el-select class="el-right" v-model="syncSpaceTime" placeholder="请选择PMS同步频率">
                <el-option
                  v-for="(obj, index) of syncSpaceTimeList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
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
              <span>自动确认免押关键字 </span>
              <el-input class="el-right" v-model="freeDepositKeyword" placeholder="免押金|免押"></el-input>
            </div>
            <div class="item-form">
              <span>自动确认免押冲突字 </span>
              <el-input class="el-right" v-model="needDepositKeyword" placeholder=""></el-input>
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
                <div v-for="(obj, index) of roomTags">
                  <el-input class="el-right" v-model="roomTags[index]" placeholder="请输入房间标签"></el-input>
                </div>
                <div class="tag-btn">
                  <button style="border-color: #39C240; color: #39C240" @click="addRoomTags">+</button>
                  <button style="border-color: #D0011B;color: #D0011B" v-show="roomTags.length > 1"
                          @click="subtractRoomTags">-
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button :disabled="!validateAll" type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

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
    roomTags: 23,  //房间标签配置
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

  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tool from '@/assets/tools/tool.js'
  export default {
    components: {ElRow},
    name: 'ConfigInfo',
    data() {
      return {
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        //PMS配置
        PMSBrandList: [],
        //绿云,捷信达
        pmsId: '',
        // pmsName: '', //放在计算属性
        hotelPmsCode: '',
        hotelServiceUrl: '',
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
        phoneCancelTimeList_unknown: ['12:00', '12:30', '13:00',
          '13:30', '14:00', '14:30', '15:00', '15:30',
          '16:00', '16:30', '17:00', '17:30', '18:00',
          '18:30', '19:00', '19:30', '20:00', '20:30',
          '21:00', '21:30', '22:00', '22:30', '23:00',
          '23:30', '24:00'],
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
        syncSpaceTime: '30',
        syncSpaceTimeList: [
          {name: '10分钟', value: '10'}, {name: '20分钟', value: '20'}, {name: '30分钟', value: '30'},
          {name: '1小时', value: '60'}, {name: '2小时', value: '120'}, {name: '3小时', value: '180'},
          {name: '6小时', value: '360'}, {name: '12小时', value: '720'}, {name: '24小时', value: '1440'}],
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
        roomTags: ['']
      }
    },
    computed: {
      ...mapState([
        'configData'
      ]),
      pmsName() {
        let obj = this.PMSBrandList.find(v => v.id == this.pmsId);
        if (tool.isNotBlank(obj))
          return obj.name;
        return '';
      },
      invoiceNameList() {
        return this.invoiceName.filter(v => v != '');
      },
      roomTagsList() {
        return this.roomTags.filter(v => v != '');
      },
      //无数个validate
      validatePMS() {
        if (tool.isNotBlank(this.pmsId) && tool.isNotBlank(this.pmsName) && tool.isNotBlank(this.hotelPmsCode) && tool.isNotBlank(this.hotelServiceUrl)) {
          if (this.pmsName == '绿云' || this.pmsName == '捷信达') {
            return true;
          } else if (this.pmsName == '别样红') {
            if (tool.isNotBlank(this.billServiceUrl) && tool.isNotBlank(this.crmServiceUrl) && tool.isNotBlank(this.orderServiceUrl) && tool.isNotBlank(this.secServiceUrl) && tool.isNotBlank(this.userName) && tool.isNotBlank(this.userPass)) {
              return true;
            } else {
              return false;
            }
          } else if (this.pmsName == '住哲') {
            if (tool.isNotBlank(this.cid) && tool.isNotBlank(this.key) && tool.isNotBlank(this.dataKey) && tool.isNotBlank(this.adminName) && tool.isNotBlank(this.adminPassword) && tool.isNotBlank(this.brandId)) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      validatelvyeReportType() {
        if (this.lvyeType == 'CLOUD') {
          if (tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType))
            return true;
          return false;
        } else if (this.lvyeType == 'LOCAL') {
          if (tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType) && tool.isNotBlank(this.policeParam)) {
            let flag = true;
            try {
              JSON.parse(this.policeParam);
            } catch (e) {
              flag = false;
            }
            if (flag)
              return true;
            return false;
          }
          return false;
        } else {
          return false;
        }
      },
      validatedoorLock_unknown() {

      },
      validatefacein() {
        if (tool.isNotBlank(this.faceinPassValue) && tool.isNotBlank(this.faceinRejectValue))
          return true;
        return false;
      },
      validatewechatPay() {
        if (tool.isNotBlank(this.wechatPayAppId) && tool.isNotBlank(this.mchId) && tool.isNotBlank(this.mchApiKey) && tool.isNotBlank(this.payCode) && tool.isNotBlank(this.refundCode))
          return true;
        return false;
      },
      validatewxHotel() {
        if (tool.isNotBlank(this.wxHotelId))
          return true;
        return false;
      },
      validateminiApp() {
        if (tool.isNotBlank(this.appId) && tool.isNotBlank(this.appSecret) && tool.isNotBlank(this.originalId) && tool.isNotBlank(this.appName))
          return true;
        return false;
      },
      validatesign() {
        return true;
      },
      validatephoneCancel_unknown() {

      },
      validateinvoice() {
        if (this.enabledInvoice) {
          if (this.invoiceNameList.length > 0)
            return true;
          return false;
        }
        return false;
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
      validateroomCard() {
        return true;
      },
      validatecashPledge() {
        if (this.cashPledgeType == 'none_cash_pledge') {
          return true;
        } else if (this.cashPledgeType == 'fixed_cash_pledge') {
          if (tool.isBlank(this.fixedCashPledge) || isNaN(+this.fixedCashPledge))
            return false;
          if (this.hasDayOfIncidentals) {
            if (tool.isBlank(this.dayOfIncidentals))
              return false;
            return true;
          }
          return true;
        } else if (this.cashPledgeType == 'first_day_of_room_price') {
          if (this.hasDayOfIncidentals) {
            if (tool.isBlank(this.dayOfIncidentals))
              return false;
            return true;
          }
          return true;
        } else if (this.cashPledgeType == 'multiple_of_cash_pledge') {
          if (tool.isBlank(this.multipleOfCashPledge) || isNaN(+this.multipleOfCashPledge) || this.multipleOfCashPledge <= 0 || this.multipleOfCashPledge >= 1)
            return false;
          if (this.hasDayOfIncidentals) {
            if (tool.isBlank(this.dayOfIncidentals) || isNaN(+this.dayOfIncidentals))
              return false;
            return true;
          }
          return true;
        }
      },
      validatebreakfastStemFrom() {
        return true;
      },
      validatemaxAllowRoomcount() {
        if (tool.isBlank(this.maxAllowRoomcount) || isNaN(+this.maxAllowRoomcount))
          return false;
        return true;
      },
      validatesyncSpaceTime() {
        return true;
      },
      validateautoConfirmPrePay() {
        if (tool.isNotBlank(this.prepayKeyword) && tool.isNotBlank(this.prepayExclusionKeyword) && tool.isNotBlank(this.postpayKeyword) && tool.isNotBlank(this.postpayExclusionKeyword) && tool.isNotBlank(this.freeDepositKeyword) && tool.isNotBlank(this.needDepositKeyword))
          return true;
        return false;
      },
      validatesupportVd() {
        return true;
      },
      validateroomTags() {
        if (this.roomTagsList.length > 0)
          return true;
        return false;
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
          case enumShowType.miniApp:
            result = this.validateminiApp;
            break;
          case enumShowType.sign:
            result = this.validatesign;
            break;
          case enumShowType.phoneCancel_unknown:
            result = this.validatephoneCancel_unknown;
            break;
          case enumShowType.invoice:
            result = this.validateinvoice;
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
          default:
            result = false;
        }
        return result;
      }
    },
    watch: {
      configData(val) {
        if (tool.isNotBlank(this.configData)) {
          //PMS信息
          //绿云,捷信达
          this.pmsId = this.configData.pms_id;
          // this.pmsName = this.configData.pms_name; //放在计算属性
          this.hotelPmsCode = this.configData.hotel_pmscode;
          this.hotelServiceUrl = this.configData.hotel_service_url;
          //别样红
          this.billServiceUrl = this.configData.bill_service_url;
          this.crmServiceUrl = this.configData.crm_service_url;
          this.orderServiceUrl = this.configData.order_service_url;
          this.secServiceUrl = this.configData.sec_service_url;
          this.userName = this.configData.user_name;
          this.userPass = this.configData.user_pass;
          //住哲
          this.cid = this.configData.cid;
          this.key = this.configData.key;
          this.dataKey = this.configData.datakey;
          this.adminName = this.configData.admin_name;
          this.adminPassword = this.configData.admin_password;
          this.brandId = this.configData.brand_id;
          // 旅业配置
          this.lvyeType = this.configData.lvye_report_type;
          this.policeId = this.configData.hotel_ga_id;
          this.policeType = this.configData.police_type;
          this.policeParam = JSON.stringify(this.configData.police_param);
          //门锁配置，暂无
          //人脸识别配置
          this.faceinPassValue = +this.configData.facein_pass_value;
          this.faceinRejectValue = +this.configData.facein_reject_value;
          //微信支付配置
          this.wechatPayAppId = this.configData.miniapp_config.app_id;
          this.mchId = this.configData.miniapp_config.mch_id;
          this.mchApiKey = this.configData.miniapp_config.mch_api_key;
          this.payCode = this.configData.pay_code;
          this.refundCode = this.configData.refund_code;
          //微信生态酒店配置
          this.wxHotelId = this.configData.wx_hotel_id;
          //小程序配置
          this.appId = this.configData.app_id;
          this.appSecret = this.configData.app_secret;
          this.originalId = this.configData.original_id;
          this.appName = this.configData.app_name;
          //电子签名
          this.enabledSign = this.configData.enabled_sign == 'true' ? true : false;
          //电话取消订单  暂无
          //发票配置
          this.enabledInvoice = this.configData.enabled_invoice == 'true' ? true : false;
          this.invoiceName = [...this.configData.invoice_name];
          //预登记短信配置
          this.enabledPreCheckinSms = this.configData.enabled_pre_checkin_sms == 'true' ? true : false;
          //到店支付配置
          this.enabledDelayedPayment = this.configData.enabled_delayed_payment == 'true' ? true : false;
          //自动退房
          this.enableAutoCheckout = this.configData.enable_auto_checkout == 'true' ? true : false;
          //自动退款
          this.enabledAutoRefund = this.configData.enabled_auto_refund == 'true' ? true : false;
          //无证入住
          this.enabledPreCheckin = this.configData.enabled_pre_checkin == 'true' ? true : false;
          //门卡配置
          this.supportRoomCard = this.configData.support_room_card == 'true' ? true : false;
          //押金配置
          this.cashPledgeType = this.configData.cash_pledge_config.cash_pledge_type;
          this.fixedCashPledge = +this.configData.cash_pledge_config.fixed_cash_pledge;
          this.multipleOfCashPledge = +this.configData.cash_pledge_config.multiple_of_cash_pledge;
          this.roundUpToInteger = this.configData.cash_pledge_config.round_up_to_integer;
          this.hasDayOfIncidentals = this.configData.cash_pledge_config.has_day_of_incidentals;
          this.dayOfIncidentals = +this.configData.cash_pledge_config.day_of_incidentals;
          //早餐券配置
          this.breakfastStemFrom = this.configData.breakfast_stem_from;
          //可选房数量
          this.maxAllowRoomcount = this.configData.max_allow_roomcount;
          //PMS同步频率
          this.syncSpaceTime = this.configData.sync_space_time;
          //自动预付款确认
          this.prepayKeyword = this.configData.prepay_keyword;
          this.prepayExclusionKeyword = this.configData.prepay_exclusion_keyword;
          this.postpayKeyword = this.configData.postpay_keyword;
          this.postpayExclusionKeyword = this.configData.postpay_exclusion_keyword;
          this.freeDepositKeyword = this.configData.free_deposit_keyword;
          this.needDepositKeyword = this.configData.need_deposit_keyword;
          //脏房配置
          this.isSupportVd = this.configData.is_support_vd == '1' ? true : false;
          //酒店标签配置
          this.roomTags = this.configData.room_tags.length > 0 ? [...this.configData.room_tags] : [''];
        }
      }
    },
    methods: {
      ...mapActions([
        'getConfig',
        'patchConfig',
        'getPMSBrandList',
        'showtoast',
        'goto'
      ]),
      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },
      dialogConfig(type) {
        this.showType = type;
        this.showDialog = true;
        if (type === enumShowType.PMS && this.PMSBrandList.length == 0) {
          this.getPMSBrandLists();
        }
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
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.PMS:
            //绿云,捷信达
            this.pmsId = this.configData.pms_id;
            // this.pmsName = this.configData.pms_name; //放在计算属性
            this.hotelPmsCode = this.configData.hotel_pmscode;
            this.hotelServiceUrl = this.configData.hotel_service_url;
            //别样红
            this.billServiceUrl = this.configData.bill_service_url;
            this.crmServiceUrl = this.configData.crm_service_url;
            this.orderServiceUrl = this.configData.order_service_url;
            this.secServiceUrl = this.configData.sec_service_url;
            this.userName = this.configData.user_name;
            this.userPass = this.configData.user_pass;
            //住哲
            this.cid = this.configData.cid;
            this.key = this.configData.key;
            this.dataKey = this.configData.datakey;
            this.adminName = this.configData.admin_name;
            this.adminPassword = this.configData.admin_password;
            this.brandId = this.configData.brand_id;
            break;
          case enumShowType.lvyeReportType:
            this.lvyeType = this.configData.lvye_report_type;
            this.policeId = this.configData.hotel_ga_id;
            this.policeType = this.configData.police_type;
            this.policeParam = JSON.stringify(this.configData.police_param);
            break;
          case enumShowType.doorLock_unknown:

            break;
          case enumShowType.facein:
            this.faceinPassValue = +this.configData.facein_pass_value;
            this.faceinRejectValue = +this.configData.facein_reject_value;
            break;
          case enumShowType.wechatPay:
            this.wechatPayAppId = this.configData.miniapp_config.app_id;
            this.mchId = this.configData.miniapp_config.mch_id;
            this.mchApiKey = this.configData.miniapp_config.mch_api_key;
            this.payCode = this.configData.pay_code;
            this.refundCode = this.configData.refund_code;
            break;
          case enumShowType.wxHotel:
            this.wxHotelId = this.configData.wx_hotel_id;
            break;
          case enumShowType.miniApp:
            this.appId = this.configData.app_id;
            this.appSecret = this.configData.app_secret;
            this.originalId = this.configData.original_id;
            this.appName = this.configData.app_name;
            break;
          case enumShowType.sign:
            this.enabledSign = this.configData.enabled_sign == 'true' ? true : false;
            break;
          case enumShowType.phoneCancel_unknown:

            break;
          case enumShowType.invoice:
            this.enabledInvoice = this.configData.enabled_invoice == 'true' ? true : false;
            this.invoiceName = [...this.configData.invoice_name];
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
            this.enabledAutoRefund = this.configData.enabled_auto_refund == 'true' ? true : false;
            break;
          case enumShowType.preCheckin:
            this.enabledPreCheckin = this.configData.enabled_pre_checkin == 'true' ? true : false;
            break;
          case enumShowType.roomCard:
            this.supportRoomCard = this.configData.support_room_card == 'true' ? true : false;
            break;
          case enumShowType.cashPledge:
            this.cashPledgeType = this.configData.cash_pledge_config.cash_pledge_type;
            this.fixedCashPledge = +this.configData.cash_pledge_config.fixed_cash_pledge;
            this.multipleOfCashPledge = +this.configData.cash_pledge_config.multiple_of_cash_pledge;
            this.roundUpToInteger = this.configData.cash_pledge_config.round_up_to_integer;
            this.hasDayOfIncidentals = this.configData.cash_pledge_config.has_day_of_incidentals;
            this.dayOfIncidentals = +this.configData.cash_pledge_config.day_of_incidentals;
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
            this.freeDepositKeyword = this.configData.free_deposit_keyword;
            this.needDepositKeyword = this.configData.need_deposit_keyword;
            break;
          case enumShowType.supportVd:
            this.isSupportVd = this.configData.is_support_vd == '1' ? true : false;
            break;
          case enumShowType.roomTags:
            this.roomTags = this.configData.room_tags.length > 0 ? [...this.configData.room_tags] : [''];
            break;
          default:

        }
      },
      submitDialog() {
        let data;
        switch (this.showType) {
          case enumShowType.PMS:
            let paramData = {
              pms_id: this.pmsId,
              pms_name: this.pmsName,
              hotel_pmscode: this.hotelPmsCode,
              hotel_service_url: this.hotelServiceUrl
            }
            if (this.pmsName == '绿云' || this.pmsName == '捷信达') {
              data = {
                ...paramData
              }
            } else if (this.pmsName == '别样红') {
              data = {
                ...paramData,
                bill_service_url: this.billServiceUrl,
                crm_service_url: this.crmServiceUrl,
                order_service_url: this.orderServiceUrl,
                sec_service_url: this.secServiceUrl,
                user_name: this.userName,
                user_pass: this.userPass,
              }
            } else if (this.pmsName == '住哲') {
              data = {
                ...paramData,
                cid: this.cid,
                key: this.key,
                datakey: this.dataKey,
                admin_name: this.adminName,
                admin_password: this.adminPassword,
                brand_id: this.brandId,
              }
            }
            break;
          case enumShowType.lvyeReportType:
            data = {
              lvye_report_type: this.lvyeType,
              hotel_ga_id: this.policeId,
              police_type: this.policeType,
              police_param: JSON.parse(this.policeParam)
            }
            break;
          case enumShowType.doorLock_unknown:

            break;
          case enumShowType.facein:
            data = {
              facein_pass_value: this.faceinPassValue.toString(),
              facein_reject_value: this.faceinRejectValue.toString()
            }
            break;
          case enumShowType.wechatPay:
            data = {
              miniapp_config: {
                app_id: this.wechatPayAppId,
                mch_id: this.mchId,
                mch_api_key: this.mchApiKey
              },
              pay_code: this.payCode,
              refund_code: this.refundCode
            }
            break;
          case enumShowType.wxHotel:
            data = {
              wx_hotel_id: this.wxHotelId
            }
            break;
          case enumShowType.miniApp:
            data = {
              app_id: this.appId,
              app_secret: this.appSecret,
              original_id: this.originalId,
              app_name: this.appName
            }
            break;
          case enumShowType.sign:
            data = {
              enabled_sign: this.enabledSign.toString()
            }
            break;
          case enumShowType.phoneCancel_unknown:

            break;
          case enumShowType.invoice:
            data = {
              enabled_invoice: this.enabledInvoice.toString(),
              invoice_name: this.invoiceNameList
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
              enabled_auto_refund: this.enabledAutoRefund.toString()
            }
            break;
          case enumShowType.preCheckin:
            data = {
              enabled_pre_checkin: this.enabledPreCheckin.toString()
            }
            break;
          case enumShowType.roomCard:
            data = {
              support_room_card: this.supportRoomCard.toString()
            }
            break;
          case enumShowType.cashPledge:
            data = {
              cash_pledge_type: this.cashPledgeType,
              fixed_cash_pledge: +this.fixedCashPledge,
              multiple_of_cash_pledge: +this.multipleOfCashPledge,
              round_up_to_integer: this.roundUpToInteger,
              has_day_of_incidentals: this.hasDayOfIncidentals,
              day_of_incidentals: +this.dayOfIncidentals
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
              sync_space_time: this.syncSpaceTime
            }
            break;
          case enumShowType.autoConfirmPrePay:
            data = {
              prepay_keyword: this.prepayKeyword,
              prepay_exclusion_keyword: this.prepayExclusionKeyword,
              postpay_keyword: this.postpayKeyword,
              postpay_exclusion_keyword: this.postpayExclusionKeyword,
              free_deposit_keyword: this.freeDepositKeyword,
              need_deposit_keyword: this.needDepositKeyword
            }
            break;
          case enumShowType.supportVd:
            data = {
              is_support_vd: this.isSupportVd ? '1' : '0'
            }
            break;
          case enumShowType.roomTags:
            data = {
              room_tags: this.roomTagsList
            }
            break;
          default:
            data = {};
        }
        this.patchConfigData(data);
      },
      patchConfigData(data) {
        this.patchConfig({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => this.showDialog = false
        })
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {

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
    },
    mounted() {
      if (tool.isBlank(this.configData)) {
        this.getConfigs();
      }
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    padding: 24px 0px 24px 8px;
    .content-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 18px;
      padding: 0 19px;
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
      .el-col-8 {
        margin-bottom: 20px;
        button {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background-color: #ffffff;
          border: solid 1px #9B9B9B;
          outline: none;
          color: #4A4A4A;
          padding: 12px 6px;
          position: relative;
          height: 110px;
          .images {
            width: 46px;
            height: 46px;
            text-align: center;
            border: solid 1px #979797;
            border-radius: 50%;
            padding: 10px;
          }
          .item-text {
            text-align: left;
            margin-left: 10px;
            padding-top: 10px;
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
            color: #D0011B;
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
      .dialog-content {
        .item-form {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          span {
            min-width: 90px;
            text-align: end;
          }
          .el-select {
            width: 70%;
          }
          .el-input {
            width: 70%;
          }
          .el-switch {
            margin-left: 16px;
          }
        }
        article {
          ul {
            font-size: 14px;
            color: #9B9B9B;
            margin-left: 20px;
            line-height: 22px;
            li {
              margin-left: 20px;
            }
          }
        }
        .item_small {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          span {
            width: 174px;
            text-align: end;
          }
          .el-input {
            width: 60%;
          }
        }
        .item-tag {
          display: flex;
          align-items: flex-start;
          span {
            width: 60px;
            text-align: end;
            margin-right: 14px;
            padding-top: 12px;
          }
          .tag-input {
            position: relative;
            line-height: 45px;
            width: 70%;
            .el-input {
              width: 100%;
            }
            .tag-btn {
              position: absolute;
              margin-left: 10px;
              bottom: 0;
              right: -72px;
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
      .dialog-footer {
        margin-top: -10px;
        text-align: center;
        .el-button {
          min-width: 200px;
        }
      }
    }
  }

</style>
