<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">企业信息</p>
            <p class="info-modify">修改</p>
          </div>
          <div class="info-content">
            <div>
              <label for="enterpriseCode">企业账户编码</label>
              <input type="text" id="enterpriseCode" v-model="enterpriseCode"/>
            </div>
            <div>
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="enterpriseName"/>
            </div>
            <div>
              <label for="enterpriseDesc">企业简介</label>
              <input type="text" id="enterpriseDesc" v-model="enterpriseDesc"/>
            </div>
            <div>
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="enterpriseWeb"/>
            </div>
          </div>
        </div>
        <div class="contact-info">
          <div class="title-bar">
            <p class="info-title">联系信息</p>
            <p class="info-modify">修改</p>
          </div>
          <div class="info-content">
            <div>
              <label for="contactName">联系人姓名</label>
              <input type="text" id="contactName" v-model="contactName"/>
            </div>
            <div>
              <label for="contactPosition">联系人职务</label>
              <input type="text" id="contactPosition" v-model="contactPosition"/>
            </div>
            <div>
              <label for="contactPhone">联系人电话</label>
              <input type="text" id="contactPhone" v-model="contactPhone"/>
            </div>
          </div>
        </div>
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
        enterpriseCode: '',
        enterpriseName: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
        contactName: '',
        contactPosition: '',
        contactPhone: ''
      }
    },
    methods: {
      ...mapActions([
        'getEnterpriseInfo'
      ]),
      getInfo() {
        this.getEnterpriseInfo({
          id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
        })
      },
      modify(obj) {
        
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
  .contact-info {
    border: 1px solid #757575;
    margin-top: 20px;
    /*box-sizing: border-box;*/
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
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 10px;
  }
</style>
