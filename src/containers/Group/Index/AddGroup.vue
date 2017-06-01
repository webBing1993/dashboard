<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span></span>
        <h3>注册企业账户</h3>
      </div>
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
    position: relative;
    .title {
      display: flex;
      align-items: center;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #DEDEDE;
      }
      span {
        display: block;
        width: 22px;
        height: 22px;
        background-color: #C8C8CD;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          display: block;
          border-left: solid 1px #ffffff;
          border-bottom: solid 1px #ffffff;
          position: absolute;
          left: 9px;
          top: 7px;
          transform: rotate(45deg);
        }
      }
    }
    .content {
      padding: 20px;
      .enterprise-info {
        border: 1px solid #EAEDF0;
        p {
          line-height: 30px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 300;
          background-color: #EAEDF0;
          border-bottom: 1px solid transparent;
        }
        .info-content {
          padding: 10px 40px;
          .content-msg {
            display: flex;
            align-items: center;
            font-size: 18px;
            // input {
            //   outline: none;
            //   border: solid 1px #EAEDF0;
            //   margin: 10px 20px;
            //   padding: 4px;
            //   width: 280px;
            //   font-size: 14px;
            //   &:focus {
            //     border-color: #8f8f8f;
            //   }
            // }
            .el-right {
              margin: 10px 20px;
              padding: 4px;
              width: 80%;
            }
          }
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

  .button-box {
    width: 40%;
    margin: 10px auto;
    .el-btn {
      width: 100%;
      height: 46px;
    }
  }
</style>
