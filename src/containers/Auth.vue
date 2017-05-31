<template>
  <div>
    <div class="login_content">
      <span class="header">登录</span>
      <div class="content login">
        <div class="content-item">
          <span>账号</span>
          <input type="text" v-model="logUserName" placeholder="请输入您的账号">
        </div>
        <div class="content-item">
          <span>密码</span>
          <input type="password" v-model="logPassword" placeholder="请输入您的密码">
        </div>
        <div class="button-box">
          <el-button class="el-btn" :disabled="btnDesabled" type="success" @click.native="loginAction">登录</el-button>
        </div>
      </div>
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
    <footer class="copy-right">
      <span>Powered By Fortrun.</span>
      <span>Copyright©2016-2017  All Rights Reserved.</span>
    </footer>
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
            this.goto('/group');
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
    align-items: center;
    justify-content: space-between;
    margin-top: 45px;
    background-color: #ffffff;
    .header {
      position: fixed;
      top: 0;
      text-align: center;
      display: block;
      width: 100%;
      font-size: 18px;
      line-height: 45px;
      background-color: #0D0D0D;
      color: #ffffff;
    }
    .content {
      flex: 1;
      position: relative;
      height: 460px;
      padding: 160px;
      margin: 0 10px;
      opacity: .7;
      .content-item {
        display: flex;
        align-items: center;
        line-height: 34px;
        font-size: 18px;
        margin-bottom: 10px;
        span {
          display: block;
          width: 80px;
        }
        input {
          line-height: 28px;
          font-size: 14px;
          text-indent: 1em;
          flex: 1;
          outline: none;
          border: none;
          border-bottom: solid 1px #EAEDF0;
          margin: 10px 20px;
          padding: 8px;
        }
      }
    }
    .login {
      border-right: solid 2px #8f8f8f;
    }
  }

  .copy-right {
    bottom: 35px;
    width: 100%;
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
