<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">企业信息</p>
            <p class="info-modify" @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div>
              <label for="enterpriseCode">企业账户编码</label>
              <input type="text" id="enterpriseCode" v-model="group.id"/>
            </div>
            <div>
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="group.name"/>
            </div>
            <div>
              <label for="enterpriseDesc">企业简介</label>
              <input type="text" id="enterpriseDesc" v-model="group.memo"/>
            </div>
            <div>
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="group.website"/>
            </div>
          </div>
        </div>
        <button @click="remove">删除</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'Edit',
    data () {
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
        'getEnterprise',
        'modifyEnterprise',
        'removeEnterprise'
      ]),
      getInfo() {
        this.getEnterprise({
          id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
        })
      },
      modify() {
        this.modifyEnterprise({
          id: this.group.id,
          name: this.group.name,
          memo: this.group.memo,
          website: this.group.website,
          onsuccess: body => console.log(body.data)
        })
      },
      remove() {
        this.removeEnterprise({
          id: this.group.id,
          onsuccess: body => console.log(body.data)
        })
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
<style scoped>
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
  }
  .content {
    padding: 20px 20px;
  }
  .info-content {
    padding: 10px 40px;
  }
  .table-content {
    padding: 10px 20px;
  }
  .info-title {
    line-height: 30px;
  }
  .enterprise-info {
    border: 1px solid #757575;
  }
  .title-bar {
    position: relative;
    width: 100%;
    padding: 0 20px;
    background-color: #EAEDF0;
    border-bottom: 1px solid #757575;
    box-sizing: border-box;
  }
  .info-modify {
    cursor: pointer;
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 10px;
  }
</style>
