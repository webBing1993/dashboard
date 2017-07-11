<template>
  <div>
    <div class="module-wrapper">
      <div class="content_addgroup">
        <div class="enterprise-info">
          <p>企业信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>企业名称</span>
              <el-input class="el-right" v-model="groupName" name="groupName" v-validate="'required'"
                        :class="{'is-danger': errors.has('groupName') }" placeholder="请输入企业名称"></el-input>
              <span class="help is-danger" v-show="errors.has('groupName')">企业名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>账户编码</span>
              <el-input class="el-right" v-model="groupCode" name="groupCode" v-validate="'required'"
                        :class="{'is-danger': errors.has('groupCode') }" placeholder="请输入账户编码"></el-input>
              <span class="help is-danger" v-show="errors.has('groupCode')">账户编码不能为空!</span>
            </div>
            <div class="content-msg">
              <span>企业简称</span>
              <el-input class="el-right" v-model="groupDesc" name="groupDesc" v-validate="'required'"
                        :class="{'is-danger': errors.has('groupDesc') }" placeholder="请输入企业简称"></el-input>
              <span class="help is-danger" v-show="errors.has('groupDesc')">企业简称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>企业官网</span>
              <el-input class="el-right" v-model="groupWeb" placeholder="选填，请输入企业官网"></el-input>
            </div>
          </div>
        </div>
        <div class="enterprise-info">
          <p>联系信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="选填，请输入联系人姓名"></el-input>
            </div>
            <div class="content-msg">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="选填，请输入联系人职务"></el-input>
            </div>
            <div class="content-msg">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="选填，请输入联系电话"></el-input>
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
    name: 'AddGroup',
    data () {
      return {
        groupName: '',
        groupCode: '',
        groupDesc: '',
        groupWeb: '',
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        brandList: []
      }
    },
    // computed: {
    //   submitDisabled() {
    //     if (this.groupName == '' || this.groupCode == '' || this.groupDesc == '')
    //       return true;
    //     return false;
    //   }
    // },
    methods: {
      ...mapActions([
        'getBrandList',
        'addGroup',
        'removeBrand',
        'goto'
      ]),
      modify(obj) {

      },
      remove(obj) {
        this.removeBrand({
          id: obj.id,
          onsuccess: body => console.log(body.data)
        })
      },
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.regist();
        }).catch(() => {
        });
      },
      regist() {

        this.addGroup({
          name: this.groupName,
          code: this.groupCode,
          memo: this.groupDesc,
          website: this.groupWeb,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          contact_position: this.contactPosition,
          onsuccess: body => this.goto(-1)
        })
      },
      getBrandList() {
        this.getBrandList({
          onsuccess: body => console.log(body.data)
        })
      }
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
