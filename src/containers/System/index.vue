<template>
  <div>
    <div class="module-wrapper">
      <p class="side_title" v-show="list.length > 1"><span v-for="(obj, index) in list"
                                                           @click="breadGo(obj.path)">{{obj.name}}</span></p>
      <router-view class="third-router"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../assets/styles/asideMenu_title/index.less';

  export default {
    name: 'System',
    data() {
      return {}
    },
    computed: {
      list() {
        let bread = [];

        for (let obj of this.$route.matched) {
          if (obj.path === '/system') {
            bread.push({name: '系统设置', path: '/system'})
          } else if (obj.path === '/system/addminiapp') {
            bread.push({name: '添加小程序', path: '/system/addminiapp'})
          } else if (obj.path === '/system/addwechatpay') {
            bread.push({name: '添加微信支付', path: '/system/addwechatpay'})
          }
        }
        return bread;
      },
      matched() {
        return this.$route.matched
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
      breadGo(path) {
        this.goto(path)
      }
    }
  }
</script>
