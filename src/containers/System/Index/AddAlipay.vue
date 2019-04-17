<!--添加支付宝配置-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>商户名称</span>
              <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchName') }" placeholder="请输入支付宝支付商户名称"></el-input>
              <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户PID</span>
              <el-input class="el-right" v-model="mchPid" name="mchPid" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchPid') }" placeholder="请输入支付宝支付商户PID"></el-input>
              <span class="help is-danger" v-show="errors.has('mchPid')">商户PID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>APPID</span>
              <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                        :class="{'is-danger': errors.has('appid') }" placeholder="请输入支付宝支付APPID"></el-input>
              <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户私钥</span>
              <el-input class="el-right" v-model="mchPriKey" name="mchPriKey" v-validate="'required'" type="textarea" :autosize="{ minRows: 1, maxRows: 5}"
                        :class="{'is-danger': errors.has('mchPriKey') }" placeholder="请输入支付宝支付商户私钥"></el-input>
              <span class="help is-danger" v-show="errors.has('mchPriKey')">商户私钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>应用公钥</span>
              <el-input class="el-right" v-model="mchPubKey" name="mchPubKey" v-validate="'required'"  type="textarea" :autosize="{ minRows: 1, maxRows: 5}"
                        :class="{'is-danger': errors.has('mchPubKey') }" placeholder="请输入支付宝支付应用公钥"></el-input>
              <span class="help is-danger" v-show="errors.has('mchPubKey')">应用公钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>支付宝公钥</span>
              <el-input class="el-right" v-model="alipayPubKey" name="alipayPubKey" v-validate="'required'" type="textarea" :autosize="{ minRows: 1, maxRows: 5}"
                        :class="{'is-danger': errors.has('alipayPubKey') }" placeholder="请输入支付宝公钥"></el-input>
              <span class="help is-danger" v-show="errors.has('alipayPubKey')">支付宝公钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>绑定人</span>
              <el-input class="el-right" v-model="contactName" name="contactName" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactName') }" placeholder="请输入支付宝绑定人"></el-input>
              <span class="help is-danger" v-show="errors.has('contactName')">绑定人不能为空!</span>
            </div>
            <div class="content-msg">
              <span>手机号</span>
              <el-input class="el-right" v-model="contactPhone" name="contactPhone" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactPhone') }" placeholder="请输入支付宝绑定人手机号码"></el-input>
              <span class="help is-danger" v-show="errors.has('contactPhone')">手机号不能为空!</span>
            </div>
          </div>
        </div>
        <div class="system-button">
          <el-button class="el-btn" type="success" @click.native="nextStep">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../assets/styles/system/systemAdd.less';

  export default {
    name: 'AddWechatpay',
    data () {
      return {
        mchName: '',
        mchPid: '',
        appid: '',
        mchPriKey: '',
        mchPubKey: '',
        alipayPubKey: '',
        contactName:'',
        contactPhone:'',
        mchTypeList: [{
          id: 'PROVIDER',
          name: '服务商'
        },{
          id: 'SPECIAL',
          name: '特约商户'
        },{
          id: 'GENERAL',
          name: '普通商户'
        }]
      }
    },
    methods: {
      ...mapActions([
        'addAlipayConfig',
        'goto'
      ]),
      nextStep() {

        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addAlipayConfig({
           data:{
             mchPid: this.mchPid,
             appId: this.appid,
             mchName: this.mchName,
             mchPrivateKey: this.mchPriKey,
             mchPublicKey: this.mchPubKey,
             aliPublicKey: this.alipayPubKey,
             "contactName":this.contactName,    //绑定人
             "contactPhone":this.contactPhone ,   // 手机号码
           },
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {

    }
  }
</script>
