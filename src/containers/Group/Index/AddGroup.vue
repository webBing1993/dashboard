<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="enterprise-info">
          <p>企业信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>企业名称</span>
              <el-input class="el-right" v-model="groupName" placeholder="请输入企业名称"></el-input>
            </div>
            <div class="content-msg">
              <span>账户编码</span>
              <el-input class="el-right" v-model="groupCode" placeholder="请输入账户编码"></el-input>
            </div>
            <div class="content-msg">
              <span>企业简称</span>
              <el-input class="el-right" v-model="groupDesc" placeholder="请输入企业简称"></el-input>
            </div>
            <div class="content-msg">
              <span>企业官网</span>
              <el-input class="el-right" v-model="groupWeb" placeholder="请输入企业官网"></el-input>
            </div>
          </div>
        </div>
        <div class="enterprise-info">
          <p>联系信息</p>
          <div class="info-content">
            <div class="content-msg">
              <span>联系人姓名</span>
              <el-input class="el-right" v-model="contactName" placeholder="请输入联系人姓名"></el-input>
            </div>
            <div class="content-msg">
              <span>联系人职务</span>
              <el-input class="el-right" v-model="contactPosition" placeholder="请输入联系人职务"></el-input>
            </div>
            <div class="content-msg">
              <span>联系电话</span>
              <el-input class="el-right" v-model="contactPhone" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
        </div>
        <div class="button-box">
          <el-button class="el-btn" type="success" :disabled="submitDisabled" @click.native="regist">注册</el-button>
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
    computed: {
      submitDisabled() {
        if (this.groupName == '' || this.groupCode == '' || this.groupDesc == '')
          return true;
        return false;
      }
    },
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
      regist() {
        if (this.submitDisabled) return;

        this.addGroup({
          name: this.groupName,
          code: this.groupCode,
          memo: this.groupDesc,
          website: this.groupWeb,
          contact_name: this.groupName,
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
<style scoped lang="less">
  .module-wrapper {
    /*padding: 19px 39px;*/
    .content {
      .enterprise-info {
        border: 1px solid #EAEDF0;
        margin-bottom: 17px;
        p {
          line-height: 30px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 300;
          background-color: #FAFAFA;
        }
        .info-content {
          padding: 10px 46px;
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
              padding: 4px;
              width: 60%;
            }
          }
        }
      }
      .button-box {
        width: 30%;
        margin: 10px auto;
        .el-btn {
          width: 100%;
          height: 46px;
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

</style>
