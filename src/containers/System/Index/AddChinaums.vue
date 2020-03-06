<!--添加支付宝配置-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>APPID</span>
              <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                        :class="{'is-danger': errors.has('appid') }" placeholder="请输入银联支付APPID"></el-input>
              <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>mchId</span>
              <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchId') }" placeholder="请输入银联支付mchId"></el-input>
              <span class="help is-danger" v-show="errors.has('mchId')">mchId不能为空!</span>
            </div>

            <div class="content-msg">
              <span>appKey</span>
              <el-input class="el-right" v-model="appKey" name="appKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('appKey') }" placeholder="请输入银联支付appKey"></el-input>
              <span class="help is-danger" v-show="errors.has('appKey')">appKey不能为空!</span>
            </div>

            <div class="content-msg">
              <span>配置名称</span>
              <el-input class="el-right" v-model="configName" name="configName" v-validate="'required'"
                        :class="{'is-danger': errors.has('configName') }" placeholder="请输入银联支付配置名称"></el-input>
              <span class="help is-danger" v-show="errors.has('configName')">配置名称不能为空!</span>
            </div>

            <div class="content-msg">
              <span>默认终端号</span>
              <el-input class="el-right" v-model="defaultTerminalCode" name="defaultTerminalCode" v-validate="'required'"
                        :class="{'is-danger': errors.has('defaultTerminalCode') }" placeholder="请输入银联支付默认终端号"></el-input>
              <span class="help is-danger" v-show="errors.has('defaultTerminalCode')">默认终端号不能为空!</span>
            </div>
            <div class="content-msg">
              <span>类型</span>
              <el-input class="el-right" v-model="type" name="type" v-validate="'required'"
                        :class="{'is-danger': errors.has('type') }" placeholder="请输入银联支付类型"></el-input>
              <span class="help is-danger" v-show="errors.has('type')">类型不能为空!</span>
            </div>

            <div class="content-msg">
              <span>类型名称</span>
              <el-input class="el-right" v-model="typeName" name="typeName" v-validate="'required'"
                        :class="{'is-danger': errors.has('typeName') }" placeholder="请输入银联支付类型名称"></el-input>
              <span class="help is-danger" v-show="errors.has('typeName')">类型名称不能为空!</span>
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
        mchId: '',
        appKey: '',
        configName: '',
        defaultTerminalCode: '',
        type: '',
        typeName:'',

      }
    },
    methods: {
      ...mapActions([
        'addChinaumsPayConfig',
        'goto'
      ]),
      nextStep() {

        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addChinaumsPayConfig({
          data:{
            appId :this.appid,
            mchId:this.mchId,
            appKey: this.appKey,
            configName: this.configName,
            defaultTerminalCode: this.defaultTerminalCode,
            type: this.type,
            typeName:this.typeName,
          },
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {

    }
  }
</script>
