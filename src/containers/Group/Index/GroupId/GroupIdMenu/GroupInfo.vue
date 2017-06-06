<template>
  <div>
    <div class="module-wrapper">
      <!--<div class="top-content">
        <h3>企业账户</h3>
        <p class="edit" @click="edit">编辑</p>
      </div>
      <div class="content">
        <div class="content-msg">
          <label for="groupCode">企业账户编码</label>
          <input disabled="disabled" type="text" id="groupCode" v-model="group.code"/>
        </div>
        <div class="content-msg">
          <label for="groupName">企业名称</label>
          <input disabled="disabled" type="text" id="groupName" v-model="group.name"/>
        </div>
        <div class="content-msg">
          <label for="groupDesc">企业简介</label>
          <input disabled="disabled" type="text" id="groupDesc" v-model="group.memo"/>
        </div>
      </div>-->
      <div class="content">
        <div class="enterprise-info">
          <p>企业信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>企业名称</span>
              <el-input class="el-right" v-model="groupName" placeholder="请输入企业名称" :disabled="!isEdit"></el-input>
            </div>
            <div class="content-msg">
              <span>账户编码</span>
              <el-input class="el-right" v-model="groupCode" placeholder="请输入账户编码" :disabled="!isEdit"></el-input>
            </div>
            <div class="content-msg">
              <span>企业简称</span>
              <el-input class="el-right" v-model="groupDesc" placeholder="请输入企业简称" :disabled="!isEdit"></el-input>
            </div>
            <div class="content-msg">
              <span>企业官网</span>
              <el-input class="el-right" v-model="groupWeb" placeholder="选填，请输入企业官网" :disabled="!isEdit"></el-input>
            </div>
          </div>
        </div>
        <div class="enterprise-info">
          <p>联系信息<a @click="edit">修改</a></p>
          <div class="info-content">
            <div class="content-msg">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="groupName" placeholder="选填，请输入联系人姓名" :disabled="!isEdit"></el-input>
            </div>
            <div class="content-msg">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="groupCode" placeholder="选填，请输入联系人职务" :disabled="!isEdit"></el-input>
            </div>
            <div class="content-msg">
              <span>联系电话</span>
              <el-input class="el-right" v-model="groupDesc" placeholder="选填，请输入联系电话" :disabled="!isEdit"></el-input>
            </div>
          </div>
        </div>
        <div class="button-box" v-show="isEdit">
          <el-button type="success" :disabled="submitDisabled" @click.native="modify">确认修改</el-button>
          <el-button @click.native="cancel">取消</el-button>
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
        isEdit: false
      }
    },
    computed: {
      submitDisabled() {
        if (!this.group.id || this.groupName == '' || this.groupCode == '' || this.groupDesc == '')
          return true;
        return false;
      }
    },
    methods: {
      ...mapActions([
        'getGroup',
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
      edit() {
        this.isEdit = true;
      },
      modify() {

      },
      cancel() {
        this.isEdit = false;
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper{
    padding: 20px 38px;
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

    .content {
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
          padding: 10px 40px;
          .content-msg {
            display: flex;
            align-items: center;
            span {
              min-width: 80px;
              text-align: right;
            }
            .el-input {
              outline: none;
              background-color: #FBFBFB;
            }
            .el-right {
              margin: 10px 20px;
              padding: 4px;
              width: 80%;
            }
          }
        }
      }
      .button-box {
        display: inline-block;
        align-items: center;
        width: 100%;
        text-align: center;
        .el-button {
          width: 246px;
          line-height: 18px;
        }
      }
    }
  }

</style>
