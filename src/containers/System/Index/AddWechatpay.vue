<template>
  <div>
    <div class="module-wrapper">
      <div class="content_addgroup">
        <div class="enterprise-info">
          <div class="info-content">
            <div class="content-msg">
              <span>商户名称</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入微信支付商户名称"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">商户名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户号</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入微信支付商户号"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">商户号不能为空!</span>
            </div>
            <div class="content-msg">
              <span>商户号API密钥</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入微信支付商户号API密钥"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">商户号API密钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>绑定人</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入小程序绑定人"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">绑定人不能为空!</span>
            </div>
            <div class="content-msg">
              <span>手机号</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入小程序绑定人手机号码"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">手机号不能为空!</span>
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
        appName: '',
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.regist();
        }).catch(() => {
        });
      },
      regist() {

      },
    },
    mounted() {

    }
  }
</script>
<style lang="less">
  .module-wrapper {
    /*padding: 19px 39px;*/
    .content_addgroup {
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
              width: 82px;
              text-align: right;
              margin-right: 20px;
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
        margin: 10px auto;
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
