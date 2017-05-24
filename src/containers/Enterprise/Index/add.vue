<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span></span>
        <h3>注册企业账户</h3>
      </div>
      <div class="content">
        <div class="enterprise-info">
          <p>企业信息</p>
          <div class="info-content">
            <div class="content-msg">
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="enterpriseName" @change="nameChange"/>
              <span v-show="nameError" class="error-info">* 请输入企业名称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseCode">账户编码</label>
              <input type="text" id="enterpriseCode" v-model="enterpriseCode" @change="codeChange"/>
              <span v-show="codeError" class="error-info">* 请输入账户编码</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseDesc">企业简称</label>
              <input type="text" id="enterpriseDesc" v-model="enterpriseDesc" @change="memoChange"/>
              <span v-show="memoError" class="error-info">* 请输入企业简称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="enterpriseWeb" @change="websiteChange"/>
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
        <XButton @onClick="regist" value="注册"></XButton>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableAdd from '@/modules/Tables/table-add.vue'
  export default {
    name: 'Add',
    data () {
      return {
        enterpriseName: '',
        enterpriseCode: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
        nameError: false,
        codeError: false,
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
      codeChange(e) {
        if (e.target.value != '')
          this.codeError = false;
        else
          this.codeError = true;
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
        if (this.enterpriseCode == '') this.codeError = true;
        if (this.enterpriseDesc == '') this.memoError = true;
        if (this.enterpriseWeb == '') this.websiteError = true;
        if (this.enterpriseName == '' || this.enterpriseCode == '' || this.enterpriseDesc == '' || this.enterpriseWeb == '') return;

        this.addEnterprise({
          name: this.enterpriseName,
          code: this.enterpriseCode,
          memo: this.enterpriseDesc,
          website: this.enterpriseWeb,
          onsuccess: body => this.goto(-1)
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
  .module-wrapper {
    position: relative;
    .title {
      display: flex;
      align-items: center;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
      p {
        font-size: 18px;
        font-weight: 400;
        color: #DEDEDE;
      }
      span {
        display: block;
        width: 22px;
        height: 22px;
        background-color: #C8C8CD;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          display: block;
          border-left: solid 1px #ffffff;
          border-bottom: solid 1px #ffffff;
          position: absolute;
          left: 9px;
          top: 7px;
          transform: rotate(45deg);
        }
      }
    }
    .content {
      padding: 20px;
      .enterprise-info {
        border: 1px solid #EAEDF0;
        p {
          line-height: 30px;
          padding: 8px 20px;
          font-size: 16px;
          font-weight: 300;
          background-color: #EAEDF0;
          border-bottom: 1px solid transparent;
        }
        .info-content {
          padding: 10px 40px;
          .content-msg {
            display: flex;
            align-items: center;
            font-size: 14px;
            input {
              outline: none;
              border: solid 1px #EAEDF0;
              margin: 10px 20px;
              padding: 4px;
              width: 280px;
              font-size: 14px;
              &:focus {
                border-color: #8f8f8f;
              }
            }
          }
        }
      }
      .weui-btn_default {
        width: 200px;
        cursor: pointer;
        margin-top: 45px;
        background-color: #1C9053;
        color: #ffffff;
        &:hover {
          background-color: #0D0D0D;
        }
      }
    }
  }

  .table-content {
    padding: 10px 20px;
  }

  .brand-info {
    border: 1px solid #EAEDF0;;
    margin-top: 20px;
  }

  .error-info {
    color: red;
    font-size: 12px;
  }
</style>
