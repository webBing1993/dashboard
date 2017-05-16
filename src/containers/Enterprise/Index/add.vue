<template>
  <div>
    <div class="module-wrapper">
      <h3>注册企业账户</h3>
      <div>
        <p>企业信息</p>
        <div>
          <label for="enterpriseName">企业名称</label>
          <input type="text" id="enterpriseName" v-model="enterpriseName"/>
        </div>
        <div>
          <label for="enterpriseDesc">企业名称</label>
          <input type="text" id="enterpriseDesc" v-model="enterpriseDesc"/>
        </div>
        <div>
          <label for="enterpriseWeb">企业官网</label>
          <input type="text" id="enterpriseWeb" v-model="enterpriseWeb"/>
        </div>
      </div>
      <div>
        <p>联系信息</p>
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
      <div>
        <p>品牌管理</p>
        <table-add :list="list" @modify="modify" @remove="remove"></table-add>
      </div>
      <div>
        <button @click="regist">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  import tableAdd from '@/components/Tables/table-add.vue'
  export default {
    name: 'Add',
    data () {
      return {
        enterpriseName: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        list: [{name: 'E01', logo: true}]
      }
    },
    components: {
      tableAdd
    },
    methods: {
      modify(obj) {
        
      },
      remove(obj) {

      },
      regist() {

      }
    }
  }
</script>
