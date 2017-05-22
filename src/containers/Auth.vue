<template>
  <div>
    <div>
      <div>
        <span>账号</span>
        <input type="text" v-model="logUserName">
      </div>
      <div>
        <span>密码</span>
        <input type="password" v-model="logPassword">
      </div>
      <button @click="loginAction">登陆</button>
    </div>
    <div>
      <div>
        <span>账号</span>
        <input type="text" v-model="userName">
      </div>
      <div>
        <span>密码</span>
        <input type="password" v-model="password">
      </div>
      <div>
        <span>用户名</span>
        <input type="text" v-model="name">
      </div>
      <div>
        <span>邮箱</span>
        <input type="text" v-model="email">
      </div>
      <div>
        <span>手机</span>
        <input type="text" v-model="mobile">
      </div>
      <button @click="registAction">注册</button>
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
            this.getInfo()
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
          onsuccess: body => alert('注册成功')
        })
      },
    },
    mounted() {
      
    }
  }
</script>
