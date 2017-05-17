<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">注册企业账户</h3>
      <div class="content">
        <div class="enterprise-info">
          <p class="info-title">企业信息</p>
          <div class="info-content">
            <div>
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="enterpriseName"/>
            </div>
            <div>
              <label for="enterpriseDesc">企业简称</label>
              <input type="text" id="enterpriseDesc" v-model="enterpriseDesc"/>
            </div>
            <div>
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="enterpriseWeb"/>
            </div>
          </div>
        </div>
        <div class="brand-info">
          <p class="info-title">品牌管理</p>
          <div class="table-content">
            <table-add :list="list" @modify="modify" @remove="remove"></table-add>
          </div>
        </div>
        <div class="button-content">
          <button @click="regist">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableAdd from '@/components/Tables/table-add.vue'
  export default {
    name: 'Add',
    data () {
      return {
        enterpriseName: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
        list: [{id: 1, name: 'E01', logo: true}]
      }
    },
    components: {
      tableAdd
    },
    methods: {
      ...mapActions([
        'getBrandList',
        'addEnterprise',
        'removeBrand'
      ]),
      modify(obj) {
        
      },
      remove(obj) {
        this.removeBrand({
          id: obj.id,
          onsuccess: body => console.log(body.data)
        })
      },
      regist() {
        this.addEnterprise({
          name: this.enterpriseName,
          memo: this.enterpriseDesc,
          website: this.enterpriseWeb,
          onsuccess: body => console.log(body.data)
        })
      },
      getBrandList() {
        this.getBrandList({
          // id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
        })
      }
    },
    mounted() {
      
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
    padding: 0 20px;
    background-color: #EAEDF0;
    border-bottom: 1px solid #757575;
  }
  .enterprise-info {
    border: 1px solid #757575;
  }
  .brand-info {
    border: 1px solid #757575;
    margin-top: 20px;
  }
  .button-content {
    margin-top: 20px;
  }
  button {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: 80px;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #0000FF;
    border: none;
  }
</style>
