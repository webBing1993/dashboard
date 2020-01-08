<template>
  <div>
    <div class="module-wrapper" style="margin:20px 0 20px 20px;">
      <div class="payConfig_header">
        <i class="el-icon-arrow-left"></i> <span @click="goto(-1)"> 返回</span> <div>设备支付配置</div>
      </div>
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">默认支付方式:{{defaultPayMode == '2'?'预授权':(defaultPayMode=='1'?'支付':'无')}}</p>
            <p class="payConfig_main_p2">可以配置默认的支付方式</p>
          </div>
          <div class="payConfig_main_right">
            <span class="payConfig_main_btn1" @click="defaultConfig">配置</span>
          </div>
        </div>
      </div>
      <!--微信支付配置-->
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
      <!--支付宝支付配置-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">支付宝</p>
            <p class="payConfig_main_p2">开启后可选择设备支持支付宝支付</p>
          </div>
          <div class="payConfig_main_right">
            <span class="payConfig_main_btn1" @click="alipayConfig('alipay')">配置</span>
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
      <!--前台支付配置-->
      <!--<div class="payConfig_main">-->
        <!--<div class="payConfig_main_top">-->
          <!--<div>-->
            <!--<p class="payConfig_main_p1">前台支付</p>-->
            <!--<p class="payConfig_main_p2">开启后可选择设备支持前台支付</p>-->
          <!--</div>-->
          <!--<div class="payConfig_main_right">-->
            <!--<span class="payConfig_main_btn1" @click="prosceniumConfig">配置</span>-->
            <!--<span :class="isProsceniumUse? 'noUse':'payConfig_main_btn2'" @click="useConfig('proscenium')">{{isProsceniumUse?'停用':'启用'}}</span>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="chooseDevice" v-if="isProsceniumUse">-->
          <!--<div class="chooseDevice_div">-->
            <!--<p class="chooseDevice_p1">选择需要启用的设备</p>-->
            <!--<p class="chooseDevice_p2">更改配置，需重启设备生效</p>-->
          <!--</div>-->
          <!--<div class="deviceList">-->
            <!--<el-checkbox-group-->
              <!--v-model="prosceniumDeviceList"-->
              <!--@change="chooseDevice('proscenium')"-->
            <!--&gt;-->
              <!--<el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--微信预授权配置-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">微信预授权</p>
            <p class="payConfig_main_p2">开启后可选择设备支持微信预授权支付</p>
          </div>
          <div class="payConfig_main_right">
            <span class="payConfig_main_btn1" @click="wechatYuConfig">配置</span>
            <p :class="isWechatYuUse ? 'noUse':'payConfig_main_btn2'" @click="useConfig('wechat_yu')">
              <span v-if="isWechatYuUse">停用</span>
              <span v-else>启用</span>
            </p>
          </div>
        </div>
        <div class="chooseDevice" v-if="isWechatYuUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="wechatYuDeviceList"
              @change="chooseDevice('wechatYu')"
            >
              <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!--支付宝预授权配置-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">支付宝预授权</p>
            <p class="payConfig_main_p2">开启后可选择设备支持支付宝预授权</p>
          </div>
          <div class="payConfig_main_right">
            <span class="payConfig_main_btn1" @click="alipayConfig('alipay_yu')">配置</span>
            <span :class="isAlipayYuUse?'noUse':'payConfig_main_btn2'" @click="useConfig('alipay_yu')">{{isAlipayYuUse?'停用':'启用'}}</span>
          </div>
        </div>
        <div class="chooseDevice" v-if="isAlipayYuUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="alipayYuDeviceList"
              @change="chooseDevice('alipayYu')"
            >
              <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!--好码齐支付配置-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">好码齐支付</p>
            <p class="payConfig_main_p2">开启后可选择设备支持好码齐支付</p>
          </div>
          <div class="payConfig_main_right">
            <span class="payConfig_main_btn1" @click="howmuchConfig('howmuch')">配置</span>
            <span :class="isHowmuchUse?'noUse':'payConfig_main_btn2'" @click="useConfig('howmuch')">{{isHowmuchUse?'停用':'启用'}}</span>
          </div>
        </div>
        <div class="chooseDevice" v-if="isHowmuchUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="howmuchDeviceList"
              @change="chooseDevice('howmuch')"
            >
              <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!--PMS支付宝-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">PMS支付宝支付</p>
            <p class="payConfig_main_p2">开启后可选择设备支持PMS支付宝支付</p>
          </div>
          <div class="payConfig_main_right">
            <!--<span class="payConfig_main_btn1" @click="howmuchConfig('howmuch')">配置</span>-->
            <span :class="isPmsUse?'noUse':'payConfig_main_btn2'" @click="useConfig('pms')">{{isPmsUse?'停用':'启用'}}</span>
          </div>
        </div>
        <div class="chooseDevice" v-if="isPmsUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="pmsDeviceList"
              @change="chooseDevice('pms')"
            >
              <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!--PMS微信-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">PMS微信支付</p>
            <p class="payConfig_main_p2">开启后可选择设备支持PMS支付</p>
          </div>
          <div class="payConfig_main_right">
            <!--<span class="payConfig_main_btn1" @click="howmuchConfig('howmuch')">配置</span>-->
            <span :class="isPmsWechatUse?'noUse':'payConfig_main_btn2'" @click="useConfig('pmsWechat')">{{isPmsWechatUse?'停用':'启用'}}</span>
          </div>
        </div>
        <div class="chooseDevice" v-if="isPmsWechatUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="pmsWechatDeviceList"
              @change="chooseDevice('pmsWechat')"
            >
              <el-checkbox v-for="item in deviceList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!--PMS支付宝预授权支付-->
      <div class="payConfig_main">
        <div class="payConfig_main_top">
          <div>
            <p class="payConfig_main_p1">PMS支付宝预授权支付</p>
            <p class="payConfig_main_p2">开启后可选择设备支持PMS支付宝预授权支付</p>
          </div>
          <div class="payConfig_main_right">
            <!--<span class="payConfig_main_btn1" @click="howmuchConfig('howmuch')">配置</span>-->
            <span :class="isPmsAlipayYuUse?'noUse':'payConfig_main_btn2'" @click="useConfig('pmsAlipayYu')">{{isPmsAlipayYuUse?'停用':'启用'}}</span>
          </div>
        </div>
        <div class="chooseDevice" v-if="isPmsAlipayYuUse">
          <div class="chooseDevice_div">
            <p class="chooseDevice_p1">选择需要启用的设备</p>
            <p class="chooseDevice_p2">更改配置，需重启设备生效</p>
          </div>
          <div class="deviceList">
            <el-checkbox-group
              v-model="pmsAlipayYuDeviceList"
              @change="chooseDevice('pmsAlipayYu')"
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
      <!--微信预授权弹框-->
      <el-dialog
        title="微信预授权参数配置"
        :visible.sync="wechatYuDialog"
        width="50%"
        center>
        <div class="item-form">
          <span>服务商模式</span>
          <el-switch
            v-model="providerYu"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </div>
        <div class="item-form">
          <span>小程序app_id</span>
          <el-select class="el-right" v-model="appIdTempYu" filterable placeholder="请选择小程序">
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
          <el-select class="el-right" v-model="mchIdTempYu" filterable placeholder="请输入商户号">
            <el-option
              v-for="(obj, index) of mchIdList"
              :key="obj.value"
              :label="obj.value"
              :value="obj.value">
            </el-option>
          </el-select>
        </div>
        <div v-show="providerYu">
          <div class="item-form">
            <span>服务商app_id</span>
            <el-select class="el-right" v-model="providerAppIdTempYu" filterable placeholder="请选择服务商app_id">
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
            <el-select class="el-right" v-model="providerMchIdTempYu" filterable placeholder="请选择服务商mch_id">
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
            <el-button @click="hideDialog('wechatYu')">取 消</el-button>
            <el-button :disabled="!wechatYuvalidate" type="primary" @click="wechatYuSubmit">确 定</el-button>
      </span>
      </el-dialog>
      <!--支付宝支付配置弹框-->
      <el-dialog
        :title="payType=='alipay'?'支付宝参数配置':'支付宝预授权参数配置'"
        :visible.sync="alipayDialog"
        width="50%"
        center>
          <div class="item_large" v-if="payType=='alipay'">
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
          <div class="item_large" v-else>
            <span>商户账号</span>
            <el-select v-model="accountYu" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(obj, index) of accountList"
                :key="obj.id"
                :label="obj.name"
                :value="obj.id">
              </el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="hideDialog">取 消</el-button>
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
              on-color="#13ce66"
              off-color="#E8E8E8"
              :width="40">
            </el-switch>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
         <el-button style="background-color:#00CD78;color:#ffffff" @click="proSubmit">保 存</el-button>
      </span>
      </el-dialog>

      <!--好码齐支付弹框-->
      <el-dialog
        title="好码齐支付参数配置"
        :visible.sync="howmuchDialog"
        width="50%"
        center>
        <div class="item_large">
          <span>商户账号</span>
          <el-select v-model="howmuchId" slot="prepend" placeholder="请选择">
            <el-option
              v-for="(obj, index) of howmuchList"
              :key="obj.id"
              :label="obj.app_name"
              :value="obj.id">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="hideHowmuchDialog">取 消</el-button>
              <el-button :disabled="!howmuchvalidate" type="primary" @click="howmuchSubmit">确 定</el-button>
          </span>
      </el-dialog>
      <!--默认支付方式弹框-->
      <el-dialog
        title="配置默认支付方式"
        :visible.sync="defaultDialog"
        width="50%"
        center>
        <div class="item_large">
          <span>支付方式</span>
          <el-select v-model="defaultPayMode" slot="prepend" placeholder="请选择">
            <el-option
              v-for="(obj, index) of defaultConfigList"
              :key="obj.id"
              :label="obj.name"
              :value="obj.id">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="defaultDialogCancel">取 消</el-button>
              <el-button type="primary"   @click="defaultDialogSubmit">确 定</el-button>
          </span>
      </el-dialog>
      <!---去配置弹框-->
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
      wechatYuDialog:false, //控制微信预授权配置弹框
      alipayDialog: false, // 控制支付宝支付配置弹框
      prosceniumDialog: false, // 控制前台支付配置弹框
      defaultDialog:false,     //默认支付方式
      howmuchDialog:false,   //好码齐支付配置弹框
      promptDialog: false, // 是否配置提示弹框
      inform: false,       //前台通知待办是否打开
      deviceList: [],      //所有设备列表
      noDerviceAlert:false,

      wechatDeviceList: [], // 微信支付设备列表
      alipayDeviceList: [], // 支付宝支付设备列表
      prosceniumDeviceList: [], // 前台支付设备列表
      wechatYuDeviceList:[],  //微信预授权设备列表
      alipayYuDeviceList:[],   //支付宝预授权设备列表
      howmuchDeviceList:[],   //好码齐设备列表
      pmsDeviceList:[],       //pms设备列表
      pmsWechatDeviceList:[],     //PMS微信支付设备列表
      pmsAlipayYuDeviceList:[],       //PMS支付宝预授权支付设备列表

      isWechatUse: false,      //微信设备是否启用
      isAlipayUse: false,          //支付宝设备是否启用
      isProsceniumUse: false,    //前台支付是否启用
      isWechatYuUse:false,      //微信预授权是否启用
      isAlipayYuUse:false,      //支付宝预授权是否启用
      isHowmuchUse:false,        //好码齐是否启用
      isPmsUse:false,           //PMS支付
      isPmsWechatUse:false,     //PMS微信支付
      isPmsAlipayYuUse:false,     //PMS支付宝预授权支付

      account:'',//商户账户
      accountList:[],//账户列表

      accountYu:'',//商户账户

      //微信支付配置弹框参数
      miniAppList: [],
      provider: false,
      appIdTemp: '',
      mchIdTemp: '',
      providerAppIdTemp: '',
      providerMchIdTemp: '',
      unProviderList:[],
      providerList:[],


      //微信预授权弹框参数
      providerYu: false,
      appIdTempYu: '',
      mchIdTempYu: '',
      providerAppIdTempYu: '',
      providerMchIdTempYu: '',


      accountdata:'',
      accountYudata:'',
      pay_config_key:'',
      payType:'',

      wechatYudefault:{},

      howmuchList:[],    //所有好码齐支付列表
      howmuchId:'',             //好码齐支付id
      howmuchIdData:'',

      defaultConfigList:[{id:'0',name:'无'},{id:'1',name:'支付'},{id:'2',name:'预授权'}],
      defaultPayMode:0,
      defaultPayModeData:0
    }
  },
  methods: {
    ...mapActions(['goto','getMchNames','getMiniAppList','getWechatpayProvider','patchConfig','getDevices',
      'patchPayConfig','getDevicePayConfig','getWechatpay','getHowmuchAll','getConfig',
      'defaultPayModeConfig'//默认支付方式配置
    ]),
    //去配置
    goConfig(){
      this.promptDialog=false;
      if(this.payType=='wechat'){
         this.wechatConfig()
      }else if(this.payType=='alipay'){
        this.alipayDialog = true;
        this.initMchNames();
      }else if(this.payType=="proscenium"){
        this.prosceniumDialog = true;
      }else if(this.payType=="wechat_yu"){
        this.wechatConfig();
      } else if(this.payType=="alipay_yu"){
        this.alipayDialog = true;
        this.initMchNames();
      }else if(this.payType=="howmuch"){
        this.howmuchDialog=true;
        this.initHowmuchAll();
      }
    },
    //打开配置默认支付方式对话框
    defaultConfig(){
      this.defaultDialog=true;


    },
    defaultDialogCancel(){
      this.defaultDialog=false;
      this.defaultPayMode=this.defaultPayModeData;
    },
    defaultDialogSubmit(){
      console.log(this.isPmsUse,this.pmsDeviceList);
      if(this.defaultPayMode=='1'){
        if( !((this.isWechatUse&&this.wechatDeviceList.length>0) ||(this.isAlipayUse&&this.alipayDeviceList.length>0)||(this.isPmsUse && this.pmsDeviceList.length>0)||(this.isPmsWechatUse && this.pmsWechatDeviceList.length>0))){
          this.$message({
            message: '请选择可以支付的设备',
            type: 'warning'
          });
          return
        }
      }else if(this.defaultPayMode=='2'){
        if(!((this.isWechatYuUse&&this.wechatYuDeviceList.length>0)||(this.isAlipayYuUse&&this.alipayYuDeviceList.length>0)||(this.isPmsAlipayYuUse&&this.pmsAlipayYuDeviceList.length>0))){
          this.$message({
            message: '请选择可以预授权支付的设备',
            type: 'warning'
          });
          return
        }
      }
      this.defaultDialog=false;
      this.defaultPayModeConfig({
        hotel_id:this.$route.params.hotelid,
        default_pay_mode:this.defaultPayMode,
        onsuccess: body => {

        }
      })
    },
    //打开微信预授权配置对话框
    wechatYuConfig () {
      this.wechatYuDialog = true;
      this.getMiniAppLists();
      this.wechatList();
    },
    //打开微信配置对话框
    wechatConfig () {
      this.wechatDialog = true;
      this.mchId = this.configData;
      this.appId = this.configData;
      this.providerAppId=this.configData;
      this.providerMchId=this.configData;
      this.provider = this.configData.provider ? true : false;
      this.getMiniAppLists();
      this.wechatList();
    },

    howmuchConfig(type){
      this.howmuchDialog = true;
      console.log('弹框类型',type);
      this.payType=type;
      this.initHowmuchAll();
    },
    //请求好码齐支付所有数据
    initHowmuchAll(){
      this.getHowmuchAll({
        onsuccess: body => {
          this.howmuchList=body.data;
        }
      })
    },

    //打开支付宝配置对话框
    alipayConfig (type) {
      this.alipayDialog = true;
      this.payType=type;
      this.initMchNames();
    },
    //打开前台支付配置对话框
    prosceniumConfig () {
      this.prosceniumDialog = true
    },

    //选择设备
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
      }else if(type == 'wechatYu'){
        this.pay_config_key='wechat_authority_config';
        if(this.isWechatYuUse){
          data={"devices":this.wechatYuDeviceList} // 设备
        }
      }else if (type == 'alipayYu'){
        this.pay_config_key='alipay_authority_config';
        if(this.isAlipayYuUse){
          data={"devices":this.alipayYuDeviceList} // 设备
        }
      }else if (type == 'howmuch'){
        this.pay_config_key='howmuch_pay_config';
        if(this.isHowmuchUse){
          data={"devices":this.howmuchDeviceList} // 设备
        }
      }else if (type == 'pms'){
        this.pay_config_key='pmspay_alipay_config';
        if(this.isPmsUse){
          data={"devices":this.pmsDeviceList} // 设备
        }
      }else if (type == 'pmsWechat') {
        this.pay_config_key='pmspay_wechatpay_config';
        if(this.isPmsWechatUse){
          data={"devices":this.pmsWechatDeviceList} // 设备
        }
      }else if (type == 'pmsAlipayYu') {
        this.pay_config_key='pmspay_alipay_authority_config';
        if(this.isPmsAlipayYuUse){
          data={"devices":this.pmsAlipayYuDeviceList} // 设备
        }
      }
      this.patchPayConfigData(data);
    },
    // 启用设备
    useConfig (type) {
      console.log(this.isPmsUse ,this.isPmsWechatUse,this.isPmsAlipayYuUse);
      if(type == 'pms' || type == 'pmsWechat'|| type == 'pmsAlipayYu' ){
          if(!this.isPmsUse ||!this.isPmsWechatUse || !this.isPmsAlipayYuUse){
            if( this.isWechatUse || this.isAlipayUse || this.isWechatYuUse || this.isAlipayYuUse  ||this.isHowmuchUse){
              this.$message({
                message: ' 请停用其他非PMS支付方式',
                type: 'warning'
              });
              return;
            }
          }
      }else{
        if(this.isPmsUse|| this.isPmsWechatUse ||  this.isPmsAlipayYuUse){
          this.$message({
            message: ' 请停用PMS支付方式',
            type: 'warning'
          });
          return;
        }
      }
      if(this.deviceList.length==0){
        this.$message({
          message: ' 没有可用的设备',
          type: 'warning'
        });
        return
      }
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
        if((this.account == ''||this.account == undefined) && this.isAlipayUse==false ){
          this.promptDialog=true;
          return;
        }
        this.isAlipayUse = !this.isAlipayUse;
        this.pay_config_key='alipay_config';
        data={
          "enable":this.isAlipayUse, // 启用：true  停用：false
        }
      }else if(type == 'wechat_yu'){
        if(this.appIdYu =='' && this.isWechatYuUse==false){
          this.promptDialog=true;
          return;
        }
        this.isWechatYuUse = !this.isWechatYuUse
        this.pay_config_key='wechat_authority_config';
        if(this.isWechatYuUse){
          data={
            "enable":this.isWechatYuUse, // 启用：true  停用：false
            "devices":this.wechatYuDeviceList, // 设备
            "alipay_config_id":"", // 支付宝商户配置ID
            "enable_todo_list":""  // 通知代办
          }
        }else{
          data={
            "enable":this.isWechatYuUse, // 启用：true  停用：false
            "devices":[], // 设备
            "alipay_config_id":"", // 支付宝商户配置ID
            "enable_todo_list":""  // 通知代办
          }
        }

      }else if(type == 'alipay_yu'){
        if((this.accountYu == ''|| this.accountYu == undefined) && this.isAlipayYuUse==false ){
          this.promptDialog=true;
          return;
        }
        this.isAlipayYuUse = !this.isAlipayYuUse;
        this.pay_config_key='alipay_authority_config';
        data={
            "enable":this.isAlipayYuUse, // 启用：true  停用：false
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
      }else if(type == 'howmuch'){
        if((this.howmuchId== ''||this.howmuchId == undefined) && this.isHowmuchUse==false ){
          this.promptDialog=true;
          return;
        }
        this.isHowmuchUse = !this.isHowmuchUse;
        this.pay_config_key='howmuch_pay_config';
        data={
          "enable":this.isHowmuchUse, // 启用：true  停用：false
        }
      }else if(type == 'pms'){
        this.isPmsUse = !this.isPmsUse;
        this.pay_config_key='pmspay_alipay_config';
        data={
          "enable":this.isPmsUse, // 启用：true  停用：false
        }
      }else if(type == 'pmsWechat') {
        this.isPmsWechatUse = !this.isPmsWechatUse;
        this.pay_config_key = 'pmspay_wechatpay_config';
        data = {
          "enable": this.isPmsWechatUse, // 启用：true  停用：false
        }
      }else if(type == 'pmsAlipayYu') {
        this.isPmsAlipayYuUse = !this.isPmsAlipayYuUse;
        this.pay_config_key = 'pmspay_alipay_authority_config';
        data = {
          "enable": this.isPmsAlipayYuUse, // 启用：true  停用：false
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
       if(this.payType=='alipay'){
          this.alipayDialog=false;
          this.account=this.accountdata;
       }
        if(this.payType=='alipay_yu'){
          this.alipayDialog=false;
          this.accountYu=this.accountYudata;
        }

        if( type == 'wechatYu'){
          this.wechatYuDialog=false;
          this.appIdYu=this.wechatYudefault;
          this.mchIdYu = this.wechatYudefault;
          this.providerYu = this.wechatYudefault.provider ? true : false;
          this.providerAppIdYu=this.wechatYudefault;
          this.providerMchIdYu=this.wechatYudefault;
        }

    },
    //微信预授权保存
    wechatYuSubmit(){
      this.wechatYuDialog=false;
      let data={};
      if (this.providerYu) {//服务商模式是否开启
        data = {
          app_id: this.appIdYu,     // appId 必需
          mch_id: this.mchIdYu,     // mchId 必需
          provider: this.providerYu,     //子商户appId 非必需
          provider_app_id: this.providerAppIdYu,   // 子商户mchId 非必需
          provider_mch_id: this.providerMchIdYu,    // 是否是服务商模式 必需
        }
      } else {
        data = {
          app_id: this.appIdYu,
          mch_id: this.mchIdYu,
          provider: this.providerYu,
          provider_app_id: this.providerAppIdYu,   // 子商户mchId 非必需
          provider_mch_id: this.providerMchIdYu,    // 是否是服务商模式 必需

        }
      }
      console.log(data);
      this.patchPayConfig({
        hotel_id: this.$route.params.hotelid,
        pay_config_key:"wechat_authority_config",
        data: {
          "enable": this.isWechatYuUse, // 启用：true  停用：false
          "devices": this.wechatYuDeviceList, // 设备
          "wechat_pay": data,
        },
        onsuccess: body => {
        }
      })
    },
    //微信配置保存
    wechatSubmit(){
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
          mch_name: this.mchName,
          provider_app_id: this.providerAppId,
          provider_mch_id: this.providerMchId,
          provider_app_name: this.providerAppName,
          provider_mch_name: this.providerMchName
        }
      }
      this.patchConfigData(data);
    },
    //支付宝配置保存
    alipaySubmit(){
       this.alipayDialog=false;
       let data={};
       console.log("账户iD",this.accountYu);
       if(this.payType=='alipay'){
         this.pay_config_key='alipay_config';
         data={
           "alipay_config_id":this.account, // 支付宝商户配置ID
         }
       }else{
         this.pay_config_key='alipay_authority_config';
          data={
           "alipay_config_id":this.accountYu, // 支付宝商户配置ID
         }
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
      this.patchConfig({
        hotel_id: this.$route.params.hotelid,
        data: data,
        onsuccess: body => {

        }
      })
    },
    //设备列表
    initDevices(){
      this.getDevices({
        hotelId: this.$route.params.hotelid,
        onsuccess: body => {
          if(body.data!=null){
            this.deviceList=body.data;
          }
          this.initDevicePayConfig();
        }
      })
    },
    //把删除的设备过滤掉
    deviceFilter(list){
      let filterList=[];
      // console.log("勾选",list);
      // console.log("所有",this.deviceList);
      for(let item of list){
        for(let allItem of this.deviceList){
          if(item==allItem.id){
            filterList.push(item);
          }
        }
      }
      return filterList;
    },
    //酒店默认打开项
    initDevicePayConfig(){
       this.getDevicePayConfig({
         hotel_id: this.$route.params.hotelid,
         onsuccess: body => {
           //微信支付默认配置
           if(body.data.wechat_pay_config!=null){
             if(body.data.wechat_pay_config.enable!=undefined){
               this.isWechatUse=JSON.parse(body.data.wechat_pay_config.enable);      //微信设备是否启用
             }
             if(body.data.wechat_pay_config.devices!=undefined){
               this.wechatDeviceList=body.data.wechat_pay_config.devices; // 微信支付设备列表
               this.wechatDeviceList=this.deviceFilter(this.wechatDeviceList);
             }
           }

           //微信预授权默认配置
           if(body.data.wechat_authority_config!=null){
             if(body.data.wechat_authority_config.enable!=undefined) {
               this.isWechatYuUse=JSON.parse(body.data.wechat_authority_config.enable);      //微信预授权是否启用
             }
             if(body.data.wechat_authority_config.devices!=undefined){
               this.wechatYuDeviceList=body.data.wechat_authority_config.devices; // 微信支付设备列表
               this.wechatYuDeviceList=this.deviceFilter(this.wechatYuDeviceList);
             }
           }
           //支付宝设备默认配置
           if(body.data.alipay_config!=null){
             if(body.data.alipay_config.enable!=undefined){
               this.isAlipayUse=JSON.parse(body.data.alipay_config.enable);          //支付宝设备是否启用
             }
             if(body.data.alipay_config.devices!=undefined){
               this.alipayDeviceList=body.data.alipay_config.devices; // 支付宝支付设备列表
               this.alipayDeviceList=this.deviceFilter( this.alipayDeviceList);
             }
             this.accountdata=body.data.alipay_config.alipay_config_id;
             this.account=this.accountdata;
           }

           //支付宝预授权默认配置
           if(body.data.alipay_authority_config!=null){
             if(body.data.alipay_authority_config.enable!=undefined) {
               this.isAlipayYuUse=JSON.parse(body.data.alipay_authority_config.enable);          //支付宝预授权是否启用
             }
             if(body.data.alipay_authority_config.devices!=undefined){
               this.alipayYuDeviceList=body.data.alipay_authority_config.devices; // 支付宝支付设备列表
               console.log('1',this.alipayYuDeviceList);
               this.alipayYuDeviceList=this.deviceFilter( this.alipayYuDeviceList);
               console.log('2',this.alipayYuDeviceList);
             }
             this.accountYudata=body.data.alipay_authority_config.alipay_config_id;
             this.accountYu=this.accountYudata;
           }

          //前台支付默认配置
           if(body.data.frontdesk_pay_config!=null){
             if(body.data.frontdesk_pay_config.enable!=undefined){
               this.isProsceniumUse=JSON.parse(body.data.frontdesk_pay_config.enable);
             }
             if(body.data.frontdesk_pay_config.enable_todo_list!=undefined){
               this.inform=JSON.parse(body.data.frontdesk_pay_config.enable_todo_list);
             }
             if(body.data.frontdesk_pay_config.devices!=undefined){
               this.prosceniumDeviceList=body.data.frontdesk_pay_config.devices; // 前台支付设备列表
               this.prosceniumDeviceList=this.deviceFilter(this.prosceniumDeviceList);
             }
           }

           //好码齐默认配置

           if(body.data.howmuch_pay_config!=null){
             if(body.data.howmuch_pay_config.enable!=undefined){
               this.isHowmuchUse=JSON.parse(body.data.howmuch_pay_config.enable);
             }
             if(body.data.howmuch_pay_config.devices!=undefined){
               this.howmuchDeviceList=body.data.howmuch_pay_config.devices; // 支付宝支付设备列表
               this.howmuchDeviceList=this.deviceFilter(this.howmuchDeviceList);
             }
             if(body.data.howmuch_pay_config.howmuch_pay_config_id!=undefined){
               this.howmuchId=body.data.howmuch_pay_config.howmuch_pay_config_id;
               this.howmuchIdData=this.howmuchId;
             }
           }
           //pms支付宝支付
           if(body.data.pmspay_alipay_config!=null){
             if(body.data.pmspay_alipay_config.enable!=undefined){
               this.isPmsUse=body.data.pmspay_alipay_config.enable=='true'?true:false;
               console.log("this.isPmsUse",this.isPmsUse);
             }
             if(body.data.pmspay_alipay_config.devices!=undefined){
               this.pmsDeviceList=body.data.pmspay_alipay_config.devices; // 支付宝支付设备列表
               this.pmsDeviceList=this.deviceFilter(this.pmsDeviceList);
             }
           }
           //pms微信支付
           if(body.data.pmspay_wechatpay_config!=null){
             if(body.data.pmspay_wechatpay_config.enable!=undefined){
               this.isPmsWechatUse=JSON.parse(body.data.pmspay_wechatpay_config.enable);
             }
             if(body.data.pmspay_wechatpay_config.devices!=undefined){
               this.pmsWechatDeviceList=body.data.pmspay_wechatpay_config.devices; // 支付宝支付设备列表
               this.pmsWechatDeviceList=this.deviceFilter(this.pmsWechatDeviceList);
             }
           }
           //pms支付宝预授权支付
           if(body.data.pmspay_alipay_authority_config!=null){
             if(body.data.pmspay_alipay_authority_config.enable!=undefined){
               this.isPmsAlipayYuUse=JSON.parse(body.data.pmspay_alipay_authority_config.enable);
             }
             if(body.data.pmspay_alipay_authority_config.devices!=undefined){
               this.pmsAlipayYuDeviceList=body.data.pmspay_alipay_authority_config.devices; // 支付宝支付设备列表
               this.pmsAlipayYuDeviceList=this.deviceFilter(this.pmsAlipayYuDeviceList);
             }
           }

           //默认支付方式
           if(body.data.default_pay_mode==''){
             this.defaultPayMode='0'
             this.defaultPayModeData='0'
           }else{
             this.defaultPayMode=body.data.default_pay_mode
             this.defaultPayModeData=this.defaultPayMode
           }
         }
       })
    },
    initMchNames(){
      this.getMchNames({
         onsuccess: body=>{
           this.accountList=body.data;
         }
      })
    },
    //取消好码齐弹框
    hideHowmuchDialog(){
      this.howmuchDialog=false;
      this.howmuchId=this.howmuchIdData;
    },
    //好码齐确认配置
    howmuchSubmit(){
      this.howmuchDialog=false;
      this.pay_config_key='howmuch_pay_config';
      let data={
        "howmuch_pay_config_id":this.howmuchId, // 好码齐商户配置ID
      }
      this.patchPayConfigData(data);
    },
    //获取微信预授权默认配置项
    initWechatYuConfig(){
      this.getWechatpay({
        hotel_id: this.$route.params.hotelid,
        key:"wechat_authority_config",
        onsuccess:body=>{
          if(body.data!=null){
            this.wechatYudefault=body.data;
            this.appIdYu=body.data;
            this.mchIdYu = body.data;
            this.providerYu = body.data.provider ? true : false;
            this.providerAppIdYu=body.data;
            this.providerMchIdYu=body.data;
          }
        }
      })
    },
    getConfigs() {
      this.getConfig({
        hotel_id: this.$route.params.hotelid
      })
    },
  },
  computed:{
    ...mapState({
      configData: state => state.enterprise.configData,
    }),
    appIdYu: {
      get() {
        if (!this.appIdTempYu) return '';
        return this.appIdTempYu.split(' | ')[0];
      },
      set(val) {
        val.app_id ? this.appIdTempYu = `${val.app_id} | ${val.app_name}` : this.appIdTempYu = '';
      }
    },
    mchIdYu: {
      get() {
        if (!this.mchIdTempYu) return '';
        return this.mchIdTempYu.split(' | ')[0];
      },
      set(val) {
        val.mch_id ? this.mchIdTempYu = `${val.mch_id} | ${val.mch_name}` : this.mchIdTempYu = '';
      }
    },
    providerAppIdYu: {
      get() {
        if (!this.providerAppIdTempYu) return '';
        return this.providerAppIdTempYu.split(' | ')[0];
      },
      set(val) {
        val.provider_app_id ? this.providerAppIdTempYu = `${val.provider_app_id} | ${val.provider_app_name}` : this.providerAppIdTempYu = '';
      }
    },
    providerMchIdYu: {
      get() {
        if (!this.providerMchIdTempYu) return '';
        return this.providerMchIdTempYu.split(' | ')[0];
      },
      set(val) {
        val.provider_mch_id ? this.providerMchIdTempYu = `${val.provider_mch_id} | ${val.provider_mch_name}` : this.providerMchIdTempYu = '';
      }
    },
    wechatYuvalidate(){
      if (!this.providerYu) {
        return tool.isNotBlank(this.appIdYu) && tool.isNotBlank(this.mchIdYu);
      }
      return tool.isNotBlank(this.appIdYu) && tool.isNotBlank(this.mchIdYu) && tool.isNotBlank(this.providerAppIdYu) && tool.isNotBlank(this.providerMchIdYu);
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
        console.log('app_id ',val.app_id,val.app_name);
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
        console.log('mch_id',val.mch_id,val.mch_name);
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
    howmuchvalidate(){
      return tool.isNotBlank(this.howmuchId)
    },

  },
  mounted() {
     this.initDevices();

     this.initWechatYuConfig();
      this.getConfigs();
     this.appId = this.configData;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
   .payConfig_header{
     display:flex;
     flex-direction: row;
     align-items: center;
     font-size:16px;
     margin-top:10px;
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
