<template>
  <div>
    <div class="module-wrapper">
      <div class="content_addMiniApp">
        <div class="enterprise-info">
          <div class="info-content">
            <div class="content-msg">
              <span>小程序名称</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入小程序名称"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">小程序名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序ID</span>
              <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入小程序ID"></el-input>
              <span class="help is-danger" v-show="errors.has('appId')">小程序ID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序密钥</span>
              <el-input class="el-right" v-model="appSecret" name="appSecret" v-validate="'required'"
                        :class="{'is-danger': errors.has('appSecret') }" placeholder="请输入小程序密钥"></el-input>
              <span class="help is-danger" v-show="errors.has('appSecret')">小程序密钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序原始ID</span>
              <el-input class="el-right" v-model="originalId" name="originalId" v-validate="'required'"
                        :class="{'is-danger': errors.has('originalId') }" placeholder="请输入小程序原始ID"></el-input>
              <span class="help is-danger" v-show="errors.has('originalId')">小程序原始ID不能为空!</span>
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
            <div class="content-msg">
              <span>请选择支付商户</span>
              <el-select class="el-right" v-model="merchantsId" name="merchantsId" v-validate="'required'"
                         :class="{'is-danger': errors.has('merchantsId') }" placeholder="请选择支付商户">
                <el-option
                  v-for="(obj, index) of mchList"
                  :key="obj.id"
                  :label="obj.mch_name"
                  :value="obj.id">
                </el-option>
              </el-select>
              <span class="help is-danger" v-show="errors.has('merchantsId')">请选择支付商户!</span>
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
    name: 'AddMiniApp',
    data () {
      return {
        appId: '',
        appSecret: '',
        originalId: '',
        appName: '',
        contactName: '',
        contactPhone: '',
        merchantsId: '',
        mchList: []
      }
    },
    methods: {
      ...mapActions([
        'addMiniApp',
        'getWechatpayList',
        'goto',
        'showalert'
      ]),
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.regist();
        }).catch(() => {
        });
      },
      regist() {
        this.addMiniApp({
          app_id: this.appId,
          app_secret: this.appSecret,
          original_id: this.originalId,
          app_name: this.appName,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          wechat_pay_config_id: this.merchantsId,
          onsuccess: body => this.goto(-1)
        })
      },
      getMchList() {
        this.getWechatpayList({
          onsuccess: (body, headers) => {
            this.mchList = body.data;
            if (this.mchList.length === 0) {
              this.showalert({
                code: 0,
                content: '支付商户为空，请先配置微信支付!'
              });
            }
          }
        })
      }
    },
    mounted() {
      this.getMchList();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    .content_addMiniApp {
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
