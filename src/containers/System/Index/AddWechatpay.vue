<template>
  <div>
    <div class="module-wrapper">
      <div class="content_addWechatpay">
        <div class="enterprise-info">
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
              <span>商户号API密钥</span>
              <el-input class="el-right" v-model="mchApiKey" name="mchApiKey" v-validate="'required'"
                        :class="{'is-danger': errors.has('mchApiKey') }" placeholder="请输入微信支付商户号API密钥"></el-input>
              <span class="help is-danger" v-show="errors.has('mchApiKey')">商户号API密钥不能为空!</span>
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
        <div class="button-box">
          <el-button class="el-btn" type="success" @click.native="nextStep">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'AddWechatpay',
    data () {
      return {
        mchName: '',
        mchId: '',
        mchApiKey: '',
        contactName: '',
        contactPhone: '',
      }
    },
    methods: {
      ...mapActions([
        'addWechatpay',
        'goto'
      ]),
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.regist();
        }).catch(() => {
        });
      },
      regist() {
        this.addWechatpay({
          mch_id: this.mchId,
          mch_api_key: this.mchApiKey,
          mch_name: this.mchName,
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
<style lang="less">
  .module-wrapper {
    /*padding: 19px 39px;*/
    .content_addWechatpay {
      .enterprise-info {
        border: 1px solid #EAEDF0;
        margin: 20px 37px 17px 39px;
        p {
          line-height: 30px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 300;
          background-color: #FAFAFA;
        }
        .info-content {
          padding: 19px 54px;
          font-size: 16px;
          color: #4A4A4A;
          line-height: 55px;
          .content-msg {
            display: flex;
            align-items: center;
            span {
              &:nth-child(1) {
                width: 110px;
                font-size: 15px;
                text-align: right;
                margin-right: 20px;
              }
            }
            .el-right {
              width: 56%;
              .el-input__inner {
                color: #000000;
              }
            }
            .help {
              position: relative;
              min-width: 120px;
              line-height: 40px;
              text-align: left;
              font-size: 13px;
              margin: 0 0 0 18px;
              color: #D0011B;
              &:before {
                content: '*';
                position: absolute;
                top: 3px;
                left: -10px;
                font-size: 22px;
              }
            }
          }
        }
      }
      .button-box {
        width: 246px;
        margin: 50px auto;
        .el-btn {
          width: 100%;
          height: 40px;
          padding: 0;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          color: #ffffff;
        }
      }
    }
  }

  .table-content {
    padding: 10px 20px;
  }

  .brand-info {
    border: 1px solid #EAEDF0;;
    margin-top: 20px;
  }

  .error-info {
    color: red;
    font-size: 12px;
  }

  .is-danger .el-input__inner {
    border-color: #ff3860;
  }

  .is-danger .el-input__inner:focus {
    outline: 0;
    border-color: #ff3860;
  }

  .is-danger .el-input__inner:hover {
    border-color: #ff3860;
  }

  .help {
    display: block;
    font-size: 11px;
    margin-top: 5px;
  }

  .help.is-danger {
    color: #ff3860;
  }

</style>
