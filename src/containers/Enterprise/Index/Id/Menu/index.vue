<template>
  <div>
    <div class="module-wrapper">
      <div class="top-content">
        <h3 class="title">企业账户</h3>
        <p class="edit" @click="edit">编辑</p>
      </div>
      <div class="content">
        <div>
          <label for="enterpriseCode">企业账户编码</label>
          <input disabled="disabled" type="text" id="enterpriseCode" v-model="group.id"/>
        </div>
        <div>
          <label for="enterpriseName">企业名称</label>
          <input disabled="disabled" type="text" id="enterpriseName" v-model="group.name"/>
        </div>
        <div>
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
          "id":"xxxxxxxxxxxxxxxx",
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

<style scoped>
  .top-content {
    position: relative;
    padding-left: 0 20px;
    border-bottom: 1px solid #757575;
  }
  .title {
    line-height: 50px；
  }
  .edit {
    position: absolute;
    top: 0;
    right: 20px;
    line-height: 50px；
  }
  .content {
    padding: 20px;
  }
  input {
    border: none;
  }
</style>
