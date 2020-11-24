<!--添加工行配置-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>APPID</span>
              <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                        :class="{'is-danger': errors.has('appid') }" placeholder="请输入工行支付APPID"></el-input>
              <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户名称</span>
              <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchName') }" placeholder="请输入工行支付商户名称"></el-input>
              <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>
            </div>

            <div class="content-msg">
              <span>商户线下档案编号</span>
              <el-input class="el-right" v-model="merId" name="merId" v-validate="'required'"
                        :class="{'is-danger': errors.has('merId') }" placeholder="请输入工行支付商户线下档案编号"></el-input>
              <span class="help is-danger" v-show="errors.has('merId')">商户线下档案编号不能为空!</span>
            </div>

            <div class="content-msg">
              <span>e生活档案编号</span>
              <el-input class="el-right" v-model="storeCode" name="storeCode" v-validate="'required'"
                        :class="{'is-danger': errors.has('storeCode') }" placeholder="请输入工行支付e生活档案编号"></el-input>
              <span class="help is-danger" v-show="errors.has('storeCode')">e生活档案编号不能为空!</span>
            </div>

            <div class="content-msg">
              <span>api私钥</span>
              <el-input class="el-right" v-model="apiPrivateKey" name="apiPrivateKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('apiPrivateKey') }" placeholder="请输入工行支付api私钥"></el-input>
              <span class="help is-danger" v-show="errors.has('apiPrivateKey')">api私钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>api公钥</span>
              <el-input class="el-right" v-model="apiPublicKey" name="apiPublicKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('apiPublicKey') }" placeholder="请输入工行支付api公钥"></el-input>
              <span class="help is-danger" v-show="errors.has('apiPublicKey')">api公钥不能为空!</span>
            </div>

            <div class="content-msg">
              <span>网管公钥</span>
              <el-input class="el-right" v-model="gatewayPublicKey" name="gatewayPublicKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('gatewayPublicKey') }" placeholder="请输入工行支付网管公钥"></el-input>
              <span class="help is-danger" v-show="errors.has('gatewayPublicKey')">网管公钥不能为空!</span>
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
        appid: '',
        mchName: '',
        merId: '',
        storeCode: '',
        apiPrivateKey: '',
        apiPublicKey: '',
        gatewayPublicKey:'',

      }
    },
    methods: {
      ...mapActions([
        'addIcbcPayConfig',
        'goto'
      ]),
      nextStep() {

        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addIcbcPayConfig({
          data:{
            appId :this.appid,
            mchName:this.mchName,
            merId: this.merId,
            storeCode: this.storeCode,
            apiPrivateKey: this.apiPrivateKey,
            apiPublicKey: this.apiPublicKey,
            gatewayPublicKey:this.gatewayPublicKey,
          },
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  .module-wrapper .content_systemAdd .system-info .info-content .content-msg span:nth-child(1) {
    width: 140px;
  }
</style>
