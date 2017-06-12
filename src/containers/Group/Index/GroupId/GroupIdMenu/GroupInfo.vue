<template>
  <div>
    <div class="module-wrapper">
      <div class="content_groupinfo">
        <div class="enterprise-info">
          <p>企业信息<a @click="editInfo">修改</a></p>
          <div class="info-content">
            <div class="content-msg">
              <span>账户名称</span>
              <el-input class="el-right" :disabled="!isEditInfo" v-model="groupName" name="groupName" v-validate="'required'" :class="{'is-danger': errors.has('groupName') }" placeholder="请输入企业名称"></el-input>
              <span class="help is-danger" v-show="errors.has('groupName')">企业名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>账户编码</span>
              <el-input class="el-right" :disabled="!isEditInfo" v-model="groupCode" name="groupCode" v-validate="'required'" :class="{'is-danger': errors.has('groupCode') }" placeholder="请输入账户编码"></el-input>
              <span class="help is-danger" v-show="errors.has('groupCode')">账户编码不能为空!</span>
            </div>
            <div class="content-msg">
              <span>企业简称</span>
              <el-input class="el-right" :disabled="!isEditInfo" v-model="groupDesc" name="groupDesc" v-validate="'required'" :class="{'is-danger': errors.has('groupDesc') }" placeholder="请输入企业简称"></el-input>
              <span class="help is-danger" v-show="errors.has('groupDesc')">企业简称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>企业官网</span>
              <el-input class="el-right" v-model="groupWeb" placeholder="选填，请输入企业官网" :disabled="!isEditInfo"></el-input>
            </div>
            <div class="button-box" v-show="isEditInfo">
              <el-button class="el-btn" type="success" @click.native="nextStep">确认修改</el-button>
              <el-button @click.native="cancelInfo">取消</el-button>
            </div>
          </div>
        </div>

        <div class="enterprise-info">
          <p>联系信息<a @click="editContact">修改</a></p>
          <div class="info-content">
            <div class="content-msg">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="选填，请输入联系人姓名"
                        :disabled="!isEditContact"></el-input>
            </div>
            <div class="content-msg">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="选填，请输入联系人职务"
                        :disabled="!isEditContact"></el-input>
            </div>
            <div class="content-msg">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="选填，请输入联系电话"
                        :disabled="!isEditContact"></el-input>
            </div>
            <div class="button-box" v-show="isEditContact">
              <el-button class="el-btn" type="success" @click.native="nextStep">注册</el-button>
              <el-button @click.native="cancelContact">取消</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'GroupInfo',
    data() {
      return {
        group: {},
        groupName: '',
        groupCode: '',
        groupDesc: '',
        groupWeb: '',
        contactName: '',
        contactPhone: '',
        contactPosition: '',
        isEditInfo: false,
        isEditContact: false
      }
    },
    // computed: {
    //   submitDisabled() {
    //     if (!this.group.id || this.groupName == '' || this.groupCode == '' || this.groupDesc == '')
    //       return true;
    //     return false;
    //   }
    // },
    methods: {
      ...mapActions([
        'getGroup',
        'modifyGroup',
        'showtoast'
      ]),
      getInfo() {
        this.getGroup({
          id: this.$route.params.id,
          onsuccess: body => {
            this.group = body.data;

            this.groupName = body.data.name;
            this.groupCode = body.data.code;
            this.groupDesc = body.data.memo;
            this.groupWeb = body.data.website;
            this.contactName = body.data.contact_name;
            this.contactPhone = body.data.contact_phone;
            this.contactPosition = body.data.contact_position;
          }
        })
      },
      editInfo() {
        this.isEditInfo = true;
      },
      editContact() {
        this.isEditContact = true;
      },
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.modify();
        }).catch(() => {});
      },
      modify() {
        this.modifyGroup({
          id: this.$route.params.id,
          name: this.groupName,
          code: this.groupCode,
          memo: this.groupDesc,
          website: this.groupWeb,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          contact_position: this.contactPosition,
          onsuccess: body => {
            this.isEditInfo = false;
            this.isEditContact = false;

            this.group = body.data;

            this.groupName = body.data.name;
            this.groupCode = body.data.code;
            this.groupDesc = body.data.memo;
            this.groupWeb = body.data.website;
            this.contactName = body.data.contact_name;
            this.contactPhone = body.data.contact_phone;
            this.contactPosition = body.data.contact_position;
          }
        })
      },
      cancelInfo() {
        this.isEditInfo = false;

        this.groupName = this.group.name;
        this.groupCode = this.group.code;
        this.groupDesc = this.group.memo;
        this.groupWeb = this.group.website;
      },
      cancelContact() {
        this.isEditContact = false;

        this.contactName = this.group.contact_name;
        this.contactPhone = this.group.contact_phone;
        this.contactPosition = this.group.contact_position;
      },
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style lang="less">
  .module-wrapper {
    .top-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #EAEDF0;
      line-height: 50px;
      h3 {
        font-size: 18px;
        font-weight: 400;
      }
      p {
        cursor: pointer;
        padding-right: 20px;
        font-size: 15px;
        &:hover {
          color: #586C94;
          text-decoration: underline;
        }
      }
    }

    .content_groupinfo {
      padding: 23px 36px 50px 25px;
      .enterprise-info {
        border: 1px solid #EAEDF0;
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 27px;
        p {
          line-height: 30px;
          padding: 8px 20px;
          background-color: #FAFAFA;
          border-bottom: 1px solid transparent;
          a {
            float: right;
            color: #39C240;
            cursor: pointer;
          }
        }
        .info-content {
          padding: 22px 0 16px 40px;
          .content-msg {
            display: flex;
            align-items: center;
            margin-bottom: 13px;
            span {
              width: 80px;
              text-align: right;
              margin-right: 21px;
            }
            .el-right {
              width: 68%;
              .el-input__inner {
                /*background-color: #FBFBFB;*/
                /*border: solid 1px #D0D0D0;*/
              }
            }
          }
          .button-box {
            display: inline-block;
            align-items: center;
            width: 100%;
            text-align: center;
            margin-top: 3px;
            .el-button {
              width: 246px;
              line-height: 18px;
              border-radius: 0;
            }
            .el-button--success {
              background-color: #39C240;
              border-color: #39C240;
              border-radius: 0;
            }
          }
        }
      }
    }
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
