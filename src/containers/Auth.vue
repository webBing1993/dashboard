<template>
  <div>
    <div class="login_content">
      <div class="header-icon"></div>
      <div class="content">
        <h3>微信生态酒店总控平台</h3>
        <div class="content-item">
          <input type="text" v-model="logUserName" placeholder="用户名">
          <input type="password" v-model="logPassword" placeholder="密码">
        </div>
        <div class="button-box">
          <el-button class="el-btn" :disabled="btnDesabled" type="success" @click.native="loginAction">登录</el-button>
        </div>
      </div>
      <footer class="foot">
        <span>Powered By Fortrun.</span>
        <span>Copyright©2016-2017  All Rights Reserved.</span>
      </footer>
      <!--<div class="content">
        <div class="content-item">
          <span>账号</span>
          <input type="text" v-model="userName" placeholder="请输入账号">
        </div>
        <div class="content-item">
          <span>密码</span>
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="content-item">
          <span>用户名</span>
          <input type="text" v-model="name" placeholder="请输入用户名">
        </div>
        <div class="content-item">
          <span>邮箱</span>
          <input type="text" v-model="email" placeholder="请输入您的邮箱">
        </div>
        <div class="content-item">
          <span>手机</span>
          <input type="text" v-model="mobile" placeholder="请输入您的手机号">
        </div>
        <div class="button-box">
          <el-button class="el-btn" :disabled="btnDesabled" type="success" @click.native="registAction">注册</el-button>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'Auth',
    data () {
      return {
        logUserName: '',
        logPassword: '',
        userName: '',
        password: '',
        name: '',
        email: '',
        mobile: ''
      }
    },
    computed: {
      btnDesabled() {
        return this.logUserName == '' || this.logPassword == ''
      }
    },
    methods: {
      ...mapActions([
        'login',
        'regist',
        'getInfo',
        'goto'
      ]),
      loginAction() {
        this.login({
          userName: this.logUserName,
          password: this.logPassword,
          onsuccess: body => {
            this.goto('/enterprise');
            this.getInfo();
          }
        })
      },
      registAction() {
        this.regist({
          userName: this.userName,
          password: this.password,
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          onsuccess: body => console.log(body.data)
        })
      },
    },
    mounted() {

    }
  }
</script>
<style lang="less">
  .login_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    height: 100%;
    position: relative;
    .header-icon {
      width: 100%;
      line-height: 39px;
      margin: 50px 0 184px 0;
    }
    .content {
      width: 100%;
      text-align: center;
      opacity: .8;
      h3 {
        display: block;
        width: 100%;
        font-size: 36px;
        line-height: 45px;
        background-color: transparent;
        color: #4A4A4A;
      }
      .content-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 13px;
        input {
          width: 287px;
          line-height: 40px;
          font-size: 14px;
          text-indent: 1em;
          outline: none;
          margin-top: 10px;
          color: #000000;
        }
        input::-webkit-input-placeholder {
          color: #9B9B9B;
        }
      }
      .button-box {
        width: 293px;
        line-height: 40px;
        margin: 10px auto;
        .el-btn {
          width: 100%;
          background-color: #39C240;
          color: #ffffff;
          height: 42px;
        }
      }
    }
    .foot {
      position: absolute;
      margin: 0 auto;
      width: 100%;
      line-height: 45px;
      bottom: 14px;
      color: #999999;
      font-size: 12px;
      text-align: center;
    }

  }

  .copy-right {
    bottom: 25px;
    width: 100%;
  }


</style>
