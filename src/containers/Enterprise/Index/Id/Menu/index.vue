<template>
  <div>
    <div class="module-wrapper">
      <div class="top-content">
        <h3>企业账户</h3>
        <p class="edit" @click="edit">编辑</p>
      </div>
      <div class="content">
        <div class="content-msg">
          <label for="enterpriseCode">企业账户编码</label>
          <input disabled="disabled" type="text" id="enterpriseCode" v-model="group.id"/>
        </div>
        <div class="content-msg">
          <label for="enterpriseName">企业名称</label>
          <input disabled="disabled" type="text" id="enterpriseName" v-model="group.name"/>
        </div>
        <div class="content-msg">
          <label for="enterpriseDesc">企业简介</label>
          <input disabled="disabled" type="text" id="enterpriseDesc" v-model="group.memo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'Index',
    data() {
      return {
        group: {
          "id": "xxxxxxxxxxxxxxxx",
          "name": "如家集团",
          "memo": "企业简介企业简介企业简介企业简介",
          "website": "http://www.baidu.com"
        }
      }
    },
    methods: {
      ...mapActions([
        'getEnterprise'
      ]),
      getInfo() {
        this.getEnterprise({
          id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
        })
      },
      edit() {
        this.$router.push(`${666}/edit`)
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
    h3{
      font-size: 18px;
      font-weight: 400;
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
