<template>
  <div>
    <div class="module-wrapper">
      <p class="side_title" v-show="list.length > 1"><span v-for="(obj, index) of list"
                                                           @click="breadGo(obj.path)">{{obj.name}}</span></p>
      <router-view class="third-router"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'System',
    data() {
      return {
        
      }
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
<style scoped lang="less">
  .side_title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #39C240;
    width: 100%;
    box-sizing: border-box;
    line-height: 39px;
    padding: 13px 0 8px 40px;
    position: relative;
    border-bottom: solid 1px #e0e0e0;
    span {
      display: flex;
      align-items: center;
      &:last-child {
        color: #4A4A4A;
      }
      &:not(:first-child):before {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        margin-left: 3px;
        margin-right: 6px;
        border-left: solid 1px #4A4A4A;
        border-bottom: solid 1px #4A4A4A;
        transform: rotate(-135deg);
      }
    }
  }
</style>
