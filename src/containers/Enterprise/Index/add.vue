<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">注册企业账户</h3>
      <div class="content">
        <div class="enterprise-info">
          <p class="info-title">企业信息</p>
          <div class="info-content">
            <div class="content-msg">
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="enterpriseName" @change="nameChange" />
              <span v-show="nameError" class="error-info">* 请输入企业名称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseDesc">企业简称</label>
              <input type="text" id="enterpriseDesc" v-model="enterpriseDesc" @change="memoChange" />
              <span v-show="memoError" class="error-info">* 请输入企业简称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="enterpriseWeb" @change="websiteChange" />
              <span v-show="websiteError" class="error-info">* 请输入企业官网</span>
            </div>
          </div>
        </div>
        <!--<div class="brand-info">
          <p class="info-title">品牌管理</p>
          <div class="table-content">
            <table-add :list="brandList" @modify="modify" @remove="remove"></table-add>
          </div>
        </div>-->
        <div class="button-content">
          <XButton @onClick="regist" value="添加"></XButton>
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
        nameError: false,
        memoError: false,
        websiteError: false,
        brandList: []
      }
    },
    components: {
      tableAdd
    },
    methods: {
      ...mapActions([
        'getBrandList',
        'addEnterprise',
        'removeBrand',
        'goto'
      ]),
      modify(obj) {

      },
      remove(obj) {
        this.removeBrand({
          id: obj.id,
          onsuccess: body => console.log(body.data)
        })
      },
      nameChange(e) {
        if (e.target.value != '') 
          this.nameError = false;
        else 
          this.nameError = true;
      },
      memoChange(e) {
        if (e.target.value != '') 
          this.memoError = false;
        else 
          this.memoError = true;
      },
      websiteChange(e) {
        if (e.target.value != '') 
          this.websiteError = false;
        else 
          this.websiteError = true;
      },
      regist() {
        if (this.enterpriseName == '') this.nameError = true;
        if (this.enterpriseDesc == '') this.memoError = true;
        if (this.enterpriseWeb == '') this.websiteError = true;
        if (this.enterpriseName == '' || this.enterpriseDesc == '' || this.enterpriseWeb == '') return;
        
        this.addEnterprise({
          name: this.enterpriseName,
          memo: this.enterpriseDesc,
          website: this.enterpriseWeb,
          onsuccess: body => this.goto(-1),
          onFail: err => alert(err.errmsg)
        })
      },
      getBrandList() {
        this.getBrandList({
          onsuccess: body => console.log(body.data)
        })
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
  }

  .content {
    padding: 20px;
  }

  .info-content {
    padding: 10px 40px;
  }

  .content-msg {
    display: flex;
    align-items: center;
    font-size: 14px;
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

  .table-content {
    padding: 10px 20px;
  }

  .info-title {
    line-height: 30px;
    padding: 8px 20px;
    font-size: 16px;
    font-weight: 300;
    background-color: #EAEDF0;
    border-bottom: 1px solid transparent;
  }

  .enterprise-info {
    border: 1px solid #EAEDF0;
  }

  .brand-info {
    border: 1px solid #EAEDF0;;
    margin-top: 20px;
  }

  .button-content {
    margin-top: 45px;
    cursor: pointer;
  }

  .error-info {
    color: red;
  }
</style>
