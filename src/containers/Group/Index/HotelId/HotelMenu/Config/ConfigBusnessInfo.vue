<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
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
      <!--<el-dialog-->
        <!--:title="typeTitles[showType]"-->
        <!--:visible.sync="queryDel"-->
        <!--:close-on-click-modal="false"-->
        <!--:close-on-press-escape="false"-->
        <!--:show-close="true"-->
        <!--@close="handleClose"-->
        <!--center>-->
        <!--<span>是否删除</span>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click="deleteWxHotels(false)">取 消</el-button>-->
          <!--<el-button type="primary" @click="deleteWxHotels(true)">确 定</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->
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
    sign: 1, //电子签名配置
    enabledCancelTime: 2, //电话取消订单配置
    invoice: 3,  //发票配置
    fastInvoice: 4,  //闪开发票配置
    preCheckinSms: 5,  //预登记短信配置
    delayedPayment: 6, //到店支付配置
    autoCheckout: 7, //自动退房配置
    autoRefund: 8, //退款业务配置配置
    preCheckin: 9, //无证入住配置
    mobileCheckin: 10,//启用移动端办理入住
    rcPrint: 11,
    enableRCstatus :12,
    enablebreakfast:13, //推送白名单到餐券设备

  }

  //弹框标题类型
  const typeTitles = ['是否删除',
    '电子签名配置',
    '电话取消订单配置',
    '发票配置',
    '闪开发票配置',
    '预登记短信配置',
    '到店支付配置',
    '自动退房配置',
    '退款业务配置',
    '无证入住配置',
    '订单操作配置',
    'RC单打印',
    'RC单是否开启字段','推送白名单到餐券设备']

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
        switchName: 'close',//微信生态酒店配置按钮
        delName: 'close',
//        RegisterOk: true,
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,

//          singlelvyeAutoReport: '',
//        lvyeType: '',
//
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
        queryDel: false,
  //RC单打印
        rcTypeList: [],
        rcTemplateVal: '',
        autoPrintVal: 1,
        perRoom: "1",
        perGuest: '2',
//        moreLvyeReportVal: '',
//        actionUrl: 'http://localhost:8080/virgo/fileUpload',
        UploadResponData: '',
        rcConfig: false,
//        hasSetMoreLvye: false,
        hasSetRc: false,
//        mirrorIntro:false,
//        mirrorBrand:false,
        rcStatus:false,
//        inteRoomLock:false,
        isPoliceParam:false,
//        notFoundMark:'',
//        checkOutMark:'',
//        noDeviceCheckInMark:'',
//        failedCheckOutMark:'',
//        hotelServiceTelMark:'',
//        hotelMark:false,
        enableNoCertificateCheck:false,
        //是否推送白名单到餐券设备
        enablebreakfast:false,
      }
    },
    mounted() {
      this.getConfigs();
      this.getRCConfigeds();
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
//      pmsType() {
//        let obj = this.PMSBrandList.find(v => v.id == this.pmsId);
//        if (tool.isNotBlank(obj))
//          return obj.type;
//        return '';
//      },
      invoiceNameList() {
        return this.invoiceName.filter(v => v != '');
      },
      invoiceCodeList() {
        return this.invoiceCode.filter(v => v != '');
      },
//      roomTagsList() {
//        return this.roomTags.filter(v => v != '');
//      },

      //无数个validate
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
      validateRcPrint() {
        return (tool.isNotBlank(this.rcTemplateVal) && (tool.isNotBlank(this.perRoom) && tool.isNotBlank(this.perGuest) && tool.isNotBlank(this.autoPrintVal)))
      },


      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.sign:
            result = true;
            break;
          case enumShowType.enabledCancelTime:
            result = true;
            break;
          case enumShowType.invoice:
            result = this.validateinvoice;
            break;
          case enumShowType.fastInvoice:
            result = this.validatefastinvoice;
            break;
          case enumShowType.preCheckinSms:
            result = true;
            break;
          case enumShowType.delayedPayment:
            result = true;
            break;
          case enumShowType.autoCheckout:
            result = true;
            break;
          case enumShowType.autoRefund:
            result = true;
            break;
          case enumShowType.preCheckin:
            result = this.validatepreCheckin;
            break;
          case enumShowType.mobileCheckin:
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
      configData(){
        let configData = this.configData;
        console.log('configData:',configData)
        if (tool.isNotBlank(configData)) {

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

          //无证核验
          this.enableNoCertificateCheck= configData.enable_identity_check_undocumented == 'true' ? true : false;
          this.enableKeyAccess=configData.enable_pull_identity_guest_info == 'true' ? true : false
          //应用功能配置
          this.appValue=configData.business_mode;
          //推送白名单到餐券设备
          this.enablebreakfast = configData.enable_pull_identity_info_breakfast  == 'true' ? true : false;
           };
        this.rcStatus=configData.rc_status=='true'?true:false;

      },
//      lvyeType(val){
//          this.lvyeTypeList.forEach(obj=>{
//              if(val==obj.lvye_report_type){
//                  this.isPoliceParam=obj.enable_police_param;
//                  console.log(this.isPoliceParam)
//              };
//          })
//      },
    },
    methods: {
      ...mapActions([
        'getConfig',
        'patchConfig',
        'showtoast',
        'showalert',
        'goto',
        'RCconfig',
        "setRCconfig",
        "getRCConfiged",

      ]),
      dialogConfig(type) {
        console.log('------>',type)
        this.showType = type;
        this.showDialog = true;
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

      addInvoiceName() {
        this.invoiceName.push('');
      },
      subtractInvoiceName() {
        if (this.invoiceName.length == 1) return;
        this.invoiceName.pop();
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
          case enumShowType.enablebreakfast:
            data = {
              "enable_pull_identity_info_breakfast":this.enablebreakfast.toString()
            }
            break
          default:null
        };
        this.patchConfigData(data);
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
