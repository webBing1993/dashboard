<template>
  <div class="payConfig">
    <div class="payConfig_header">
      <i class="el-icon-arrow-left"></i> <span @click="goto(-1)"> 返回</span> <div>设备支付配置</div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">微信支付</p>
          <p class="payConfig_main_p2">开启后可选择设备支持微信支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="wechatConfig">配置</span>
          <p :class="isWechatUse ? 'noUse':'payConfig_main_btn2'" @click="useConfig('wechat')">
            <span v-if="isWechatUse">停用</span>
            <span v-else>启用</span>
          </p>
        </div>
      </div>
      <div class="chooseDevice" v-if="isWechatUse">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="wechatDeviceList"
            @change="chooseDevice('wechat')"
          >
            <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">支付宝</p>
          <p class="payConfig_main_p2">开启后可选择设备支持支付宝支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="alipayConfig">配置</span>
          <span :class="isAlipayUse?'noUse':'payConfig_main_btn2'" @click="useConfig('alipay')">{{isAlipayUse?'停用':'启用'}}</span>
        </div>
      </div>
      <div class="chooseDevice" v-if="isAlipayUse">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="alipayDeviceList"
            @change="chooseDevice('alipay')"
          >
            <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="payConfig_main">
      <div class="payConfig_main_top">
        <div>
          <p class="payConfig_main_p1">前台支付</p>
          <p class="payConfig_main_p2">开启后可选择设备支持前台支付</p>
        </div>
        <div class="payConfig_main_right">
          <span class="payConfig_main_btn1" @click="prosceniumConfig">配置</span>
          <span :class="isProsceniumUse? 'noUse':'payConfig_main_btn2'" @click="useConfig('proscenium')">{{isProsceniumUse?'停用':'启用'}}</span>
        </div>
      </div>
      <div class="chooseDevice" v-if="isProsceniumUse">
        <div class="chooseDevice_div">
          <p class="chooseDevice_p1">选择需要启用的设备</p>
          <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
        </div>
        <div class="deviceList">
          <el-checkbox-group
            v-model="prosceniumDeviceList"
            @change="chooseDevice('proscenium')"
          >
            <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!--微信支付配置弹框-->
    <el-dialog
      title="微信支付参数配置"
      :visible.sync="wechatDialog"
      width="50%"
      center>
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
      <span slot="footer" class="dialog-footer">
            <el-button @click="hideDialog('wechat')">取 消</el-button>
            <el-button :disabled="!wechatvalidate" type="primary" @click="wechatSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--支付宝支付配置弹框-->
    <el-dialog
      title="支付宝参数配置"
      :visible.sync="alipayDialog"
      width="50%"
      center>
      <div class="item_large">
        <span>商户账号</span>
        <el-select v-model="account" slot="prepend" placeholder="请选择">
          <el-option
            v-for="(obj, index) of accountList"
            :key="obj.id"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="hideDialog('alipay')">取 消</el-button>
            <el-button :disabled="!alipayvalidate" type="primary" @click="alipaySubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!--前台支付配置弹框-->
    <el-dialog
      title="前台支付"
      :visible.sync="prosceniumDialog"
      width="50%"
      center>
      <div class="dialog_main">
        <div>
          <p class="dialog_main_p1">通知待办</p>
          <p class="dialog_main_p2">开启后选择此支付方式时会发送待办事项到企业微信</p>
        </div>
        <div>
          <el-switch
            v-model="inform"
            active-color="#13ce66"
            inactive-color="#E8E8E8"
            :width="40">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button style="background-color:#00CD78;color:#ffffff" @click="proSubmit">保 存</el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog
      title="提示"
      :visible.sync="promptDialog"
      width="50%"
      center>
      <div style="width:100%;text-align: center">该支付方式暂无配置参数，请先进行配置后启用</div>
      <span slot="footer" class="dialog-footer">
        <el-button style="background-color:#00CD78;color:#ffffff" @click="promptDialog = false">取消</el-button>
         <el-button style="background-color:#00CD78;color:#ffffff" @click="goConfig">去配置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import tool from '@/assets/tools/tool.js'
export default {
  name: 'hotelOrg',
  data () {
    return {
      wechatDialog: false, // 控制微信支付配置弹框
      alipayDialog: false, // 控制支付宝支付配置弹框
      prosceniumDialog: false, // 控制前台支付配置弹框
      promptDialog: false, // 是否配置提示弹框
      inform: false,       //前台通知待办是否打开
      deviceList: [],
      wechatDeviceList: [], // 微信支付设备列表
      alipayDeviceList: [], // 支付宝支付设备列表
      prosceniumDeviceList: [], // 前台支付设备列表
      isWechatUse: false,      //微信设备是否启用
      isAlipayUse: false,          //支付宝设备是否启用
      isProsceniumUse: false,
      account:'',//商户账户
      accountList:[],//账户列表
      //微信支付配置弹框参数
      miniAppList: [],
      provider: false,
      appIdTemp: '',
      mchIdTemp: '',
      providerAppIdTemp: '',
      providerMchIdTemp: '',
      unProviderList:[],
      providerList:[],
      pay_config_key:'',
      payType:'',
    }
  },
  methods: {
    ...mapActions(['goto','getMchNames','getMiniAppList','getWechatpayProvider','patchConfig','getDevices','patchPayConfig','getDevicePayConfig']),
    goConfig(){
      this.promptDialog=false;
      if(this.payType=='wechat'){
         this.wechatDialog = true;
      }else if(this.payType=='alipay'){
        this.alipayDialog = true;
      }else{
        this.prosceniumDialog = true;
      }
    },
    //打开微信配置对话框
    wechatConfig () {
      this.wechatDialog = true;
      this.mchId = this.configData;
      this.providerAppId=this.configData;
      this.providerMchId=this.configData;
      this.provider = this.configData.provider ? true : false;
      this.getMiniAppLists();
      this.wechatList();
    },
    //打开支付宝配置对话框
    alipayConfig () {
      this.alipayDialog = true
      this.initMchNames();
    },
    //打开前台支付配置对话框
    prosceniumConfig () {
      this.prosceniumDialog = true
    },
    chooseDevice (type) {
      let data={};

      if (type == 'wechat') {
        this.pay_config_key='wechat_pay_config';
        if(this.isWechatUse){
          data={"devices":this.wechatDeviceList,} // 设备
        }
      }else if(type == 'alipay'){
        this.pay_config_key='alipay_config';
        data={"devices":this.alipayDeviceList, }// 设备
      }else if(type == 'proscenium'){
        this.pay_config_key='frontdesk_pay_config';
        if(this.isProsceniumUse) {
          data = {"devices": this.prosceniumDeviceList, }// 设备
        }
      }
      this.patchPayConfigData(data);
    },
    // 启用设备
    useConfig (type) {
      let data={};
      this.payType=type;
      if (type == 'wechat') {
        if(this.appId =='' && this.isWechatUse==false){
            this.promptDialog=true;
            return;
        }
        this.isWechatUse = !this.isWechatUse
        this.pay_config_key='wechat_pay_config';
        if(this.isWechatUse){
           data={
             "enable":this.isWechatUse, // 启用：true  停用：false
             "devices":this.wechatDeviceList, // 设备
             "alipay_config_id":"", // 支付宝商户配置ID
             "enable_todo_list":""  // 通知代办
           }
        }else{
          data={
            "enable":this.isWechatUse, // 启用：true  停用：false
            "devices":[], // 设备
            "alipay_config_id":"", // 支付宝商户配置ID
            "enable_todo_list":""  // 通知代办
          }
        }

      }else if(type == 'alipay'){
        console.log(this.account,this.isAlipayUse);
        if((this.account == ''||this.account == undefined) && this.isAlipayUse==false ){
          this.promptDialog=true;
          return;
        }
        this.isAlipayUse = !this.isAlipayUse;
        this.pay_config_key='alipay_config';
        if(this.isAlipayUse){
          data={
            "enable":this.isAlipayUse, // 启用：true  停用：false
          }
        }else{
          data={
            "enable":this.isAlipayUse, // 启用：true  停用：false
          }
        }
      }else if(type == 'proscenium'){
        this.isProsceniumUse = !this.isProsceniumUse;
        this.pay_config_key='frontdesk_pay_config';
        if(this.isProsceniumUse){
          data={
            "enable":this.isProsceniumUse, // 启用：true  停用：false
          }
        }else{
          data={
            "enable":this.isProsceniumUse, // 启用：true  停用：false
          }
        }

      }
      this.patchPayConfigData(data);
    },
    patchPayConfigData(data){
      this.patchPayConfig({
        hotel_id: this.$route.params.hotelid,
        pay_config_key:this.pay_config_key,
        data: data,
        onsuccess: body => {

        }
      })
    },
    wechatList() {
      this.getWechatpayProvider({
        provider: '0',
        onsuccess: (body, headers) => {
          if (body.data && Array.isArray(body.data)) {
            this.unProviderList = body.data;
            console.log();
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
    //获取小程序列表
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
    //取消弹框
    hideDialog(type){
       if(type=='wechat'){
         this.wechatDialog=false;
         this.appId = this.configData;
         this.mchId = this.configData;
         this.providerAppId=this.configData;
         this.providerMchId=this.configData;
         this.provider = this.configData.provider ? true : false;
       }
       if(type=='alipay'){
          this.alipayDialog=false;
       }

    },
    //微信配置保存
    wechatSubmit(){
      console.log(111111111111111);
      this.wechatDialog=false;
      let data={};
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
      this.patchConfigData(data);
    },
    //支付宝配置保存
    alipaySubmit(){
       this.alipayDialog=false;
       this.pay_config_key='alipay_config';
       let data={
         "alipay_config_id":this.account, // 支付宝商户配置ID
       }
      this.patchPayConfigData(data);
    },
    proSubmit(){
      this.prosceniumDialog=false;
      this.pay_config_key='frontdesk_pay_config';
      let data={
        "enable_todo_list":this.inform, // 支付宝商户配置ID
      }
      this.patchPayConfigData(data);
    },
    //修改服务端数据
    patchConfigData(data) {
      console.log('debug:------->patchConfigData：',data)
      this.patchConfig({
        hotel_id: this.$route.params.hotelid,
        data: data,
        onsuccess: body => {

        }
      })
    },
    //设备列表
    initDevices(){
      console.log("111",this.$route.params.hotelid);
      this.getDevices({
        hotelId: this.$route.params.hotelid,
        onsuccess: body => {
          if(body.data!=null){
            this.deviceList=body.data;
          }
        }
      })
    },
    //酒店默认打开项
    initDevicePayConfig(){
       console.log("1111111111111");
       this.getDevicePayConfig({
         hotel_id: this.$route.params.hotelid,
         onsuccess: body => {

           if(body.data.wechat_pay_config!=null){
             this.isWechatUse=JSON.parse(body.data.wechat_pay_config.enable);      //微信设备是否启用
             this.wechatDeviceList=body.data.wechat_pay_config.devices; // 微信支付设备列表
           }

           if(body.data.alipay_config!=null){
             this.isAlipayUse=JSON.parse(body.data.alipay_config.enable);          //支付宝设备是否启用
             if(body.data.alipay_config.devices!=undefined){
               this.alipayDeviceList=body.data.alipay_config.devices; // 支付宝支付设备列表
             }
             console.log("this.alipayDeviceList",this.alipayDeviceList);
             this.account=body.data.alipay_config.alipay_config_id;
           }
           if(body.data.frontdesk_pay_config!=null){
             this.isProsceniumUse=JSON.parse(body.data.frontdesk_pay_config.enable);
             this.prosceniumDeviceList=body.data.frontdesk_pay_config.devices; // 前台支付设备列表
             this.inform=JSON.parse(body.data.frontdesk_pay_config.enable_todo_list);
           }
           console.log("this.inform",this.inform);
         }
       })
    },
    initMchNames(){
      this.getMchNames({
         onsuccess: body=>{
           this.accountList=body.data;
         }
      })
    }
  },
  computed:{
    ...mapState({
      configData: state => state.enterprise.configData,
      pmsData: state => state.enterprise.pmsData,
      lvyeData: state => state.enterprise.lvyeData,
      wechatAppData: state => state.enterprise.wechatAppData,
      hotelName: state => state.enterprise.tempHotelName,
      showReception: state => state.enterprise.showReception,
    }),
    appName() {
      console.log(this.appIdTemp);
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
    wechatvalidate(){
      if (!this.provider) {
        return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId);
      }
      return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId) && tool.isNotBlank(this.providerAppId) && tool.isNotBlank(this.providerMchId);
    },
    alipayvalidate(){
      return tool.isNotBlank(this.account)
    },
  },
  mounted() {
     this.initDevices();
     this.initDevicePayConfig();
     this.appId = this.configData;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
 .payConfig{
    margin:20px;
   display: flex;
   flex-direction: column;
   .payConfig_header{
     display:flex;
     flex-direction: row;
     align-items: center;
     font-size:16px;
     span{
       color:#00CD78;
       margin-right:20px;
       margin-left:10px;
     }
   }
   .payConfig_main{
     border-bottom: 1px solid #C9C9C9;
     padding-bottom:20px;
     .payConfig_main_top{
       display: flex;
       min-height: 80px;
       justify-content: space-between;
       align-items: center;
       .payConfig_main_p1{
         font-family: PingFangSC-Medium;
         font-size: 14px;
         color: #000000;
       }
       .payConfig_main_p2{
         opacity: 0.4;
         font-family: PingFangSC-Regular;
         color: #000000;
       }
       .payConfig_main_right{
         display:flex;
         flex-direction: row;
       }
       .payConfig_main_btn1,.payConfig_main_btn2,.noUse{
         display: block;
         height:35px;
         width:60px;
         border-radius: 3px;
         background-color: #3B99FC;
         color:#ffffff;
         line-height: 35px;
         text-align: center;
       }
       .payConfig_main_btn2{
         background-color: #00CD78;
         margin-left:10px;
       }
       .noUse{
         background-color: #FB2142;
         margin-left:10px;
       }
     }
     .chooseDevice{
       .chooseDevice_div{
         margin-bottom: 10px;
       }
       .chooseDevice_p1{
         font-family: PingFangSC-Medium;
         font-size: 13px;
         color: #000000;
       }
       .chooseDevice_p2{
         opacity: 0.4;
         font-family: PingFangSC-Regular;
         color: #000000;
       }
     }
   }
 }
  /deep/.el-dialog__wrapper  .el-dialog__header{
     border:0px;
  }
 /deep/ .el-dialog__headerbtn .el-dialog__close{
   color:#909399;
 }
 /deep/.el-dialog__wrapper .el-dialog--center .el-dialog__body .item_large{
    display:flex;
    align-items: center;
   margin-bottom: 10px;
   span{
      width:120px;
   }
   .el-select{
      width:100%;
   }
 }
 /deep/.el-dialog__wrapper .el-dialog--center .el-dialog__body .dialog_main{
   display: flex;
   min-height: 80px;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid #C9C9C9;
   .dialog_main_p1{
     font-family: PingFangSC-Medium;
     font-size: 14px;
     color: #000000;
   }
   .dialog_main_p2{
     opacity: 0.4;
     font-family: PingFangSC-Regular;
     color: #000000;
   }
 }
 .item-form {
   osition: relative;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
   margin-bottom: 10px;
   text-align: left;
   & > span {
     min-width: 120px;
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
   .el-radio {
     margin-left: 16px;
   }
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
</style>
