<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>商户名称</span>
              <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchName') }" placeholder="请输入微信支付商户名称"></el-input>
              <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户号</span>
              <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchId') }" placeholder="请输入微信支付商户号"></el-input>
              <span class="help is-danger" v-show="errors.has('mchId')">商户号不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户号密钥</span>
              <el-input  class="el-right" v-model="mchKey" name="mchKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchKey') }" placeholder="请输入微信支付商户号密钥"></el-input>
              <span class="help is-danger" v-show="errors.has('mchKey')">商户号密钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户类型</span>
              <el-select class="el-right" v-model="mchType" name="mchType" v-validate="'required'"
                         :class="{'is-danger': errors.has('mchType') }" placeholder="请选择商户类型">
                <el-option
                  v-for="(obj, index) of mchTypeList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
              <span class="help is-danger" v-show="errors.has('mchType')">请选择商户类型!</span>
            </div>
            <div class="content-msg">
              <span>绑定人</span>
              <el-input class="el-right" v-model="contactName" name="contactName" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactName') }" placeholder="请输入小程序绑定人"></el-input>
              <span class="help is-danger" v-show="errors.has('contactName')">绑定人不能为空!</span>
            </div>
            <div class="content-msg">
              <span>手机号</span>
              <el-input class="el-right" v-model="contactPhone" name="contactPhone" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactPhone') }" placeholder="请输入小程序绑定人手机号码"></el-input>
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
        mchId: '',
        mchKey: '',
        mchType: '',
        contactName: '',
        contactPhone: '',
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
        'addWechatpay',
        'goto'
      ]),
      nextStep() {
        
        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        
        this.addWechatpay({
          mch_id: this.mchId,
          mch_key: this.mchKey,
          mch_name: this.mchName,
          mch_type: this.mchType,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {
      
    }
  }
</script>
