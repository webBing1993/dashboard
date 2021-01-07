<!--添加昆仑银行配置-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>商户号</span>
              <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchId') }" placeholder="请输入昆仑银行支付商户号"></el-input>
              <span class="help is-danger" v-show="errors.has('mchId')">商户号不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户名称</span>
              <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchName') }" placeholder="请输入昆仑银行支付商户名称"></el-input>
              <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>
            </div>

            <div class="content-msg">
              <span>代理商编号</span>
              <el-input class="el-right" v-model="agentNum" name="agentNum" v-validate="'required'"
                        :class="{'is-danger': errors.has('agentNum') }" placeholder="请输入昆仑银行支付代理商编号"></el-input>
              <span class="help is-danger" v-show="errors.has('agentNum')">代理商编号不能为空!</span>
            </div>

            <div class="content-msg">
              <span>下游商户号</span>
              <el-input class="el-right" v-model="outMchId" name="outMchId" placeholder="请输入昆仑银行支付下游商户号"></el-input>
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
    name: 'AddKunlunBank',
    data () {
      return {
        mchId: '',
        mchName: '',
        agentNum: '',
        outMchId: '',
      }
    },
    methods: {
      ...mapActions([
        'addBankPayConfig',
        'goto'
      ]),
      nextStep() {

        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addBankPayConfig({
          data:{
            mchId :this.mchId,
            mchName:this.mchName,
            agentNum: this.agentNum,
            outMchId: this.outMchId,
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
