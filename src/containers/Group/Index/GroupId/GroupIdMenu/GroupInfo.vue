<template>
  <div>
    <!--<div class="module-wrapper"></div>-->
    <div class="module-wrapper">
      <div class="top-content">
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
        group: {}
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
          onsuccess: body => body.data ? this.group = body.data : this.showtoast({text: '数据不存在', type: 'warning'})
        })
      },
      edit() {
        if (!this.group.id) return;
        // this.$router.push(`${this.group.id}/edit`)
        // 这里不要跳转了，直接在本页编辑
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style scoped lang="less">
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
    padding: 5px 20px;
    line-height: 40px;
    .content-msg {
      display: flex;
      align-items: center;
      font-size: 14px;
      label {
        width: 90px;
      }
      input {
        outline: none;
        border: none;
        border-bottom: solid 1px #EAEDF0;
        margin: 10px 20px;
        padding: 8px;
        flex: 1;
        font-size: 14px;
      }
    }
  }
</style>
