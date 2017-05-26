<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">企业信息</p>
            <div>
              <XButton primary mini value="删除" @click.native="remove"></XButton>
              <XButton primary mini :disabled="submitDisabled" value="修改" @click.native="modify"></XButton>
            </div>
          </div>
          <div class="info-content">
            <div class="content-msg">
              <span>企业名称</span>
              <el-input class="el-right" v-model="enterpriseName" placeholder="请输入企业名称"></el-input>
            </div>
            <div class="content-msg">
              <span>账户编码</span>
              <el-input class="el-right" v-model="enterpriseCode" placeholder="请输入账户编码"></el-input>
            </div>
            <div class="content-msg">
              <span>企业简称</span>
              <el-input class="el-right" v-model="enterpriseDesc" placeholder="请输入企业简称"></el-input>
            </div>
            <div class="content-msg">
              <span>企业官网</span>
              <el-input class="el-right" v-model="enterpriseWeb" placeholder="请输入企业官网"></el-input>
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
        group: {},
        enterpriseName: '',
        enterpriseCode: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
      }
    },
    computed: {
      submitDisabled() {
        if (!this.group.id || this.enterpriseName == '' || this.enterpriseCode == '' || this.enterpriseDesc == '')
          return true;
        return false;
      }
    },
    methods: {
      ...mapActions([
        'getEnterprise',
        'modifyEnterprise',
        'removeEnterprise',
        'goto',
        'showtoast'
      ]),
      getInfo() {
        this.getEnterprise({
          id: this.$route.params.id,
          onsuccess: body => {
            if (body.data) {
              this.group = body.data;

              this.enterpriseName = this.group.name;
              this.enterpriseCode = this.group.code;
              this.enterpriseDesc = this.group.memo;
              this.enterpriseWeb = this.group.website;
            } else {
              this.showtoast('数据不存在')
            }
          }
        })
      },
      modify() {
        if (this.submitDisabled) return;

        this.modifyEnterprise({
          id: this.group.id,
          code: this.enterpriseCode,
          name: this.enterpriseName,
          memo: this.enterpriseDesc,
          website: this.enterpriseWeb,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      remove() {
        this.removeEnterprise({
          id: this.group.id,
          onsuccess: body => {
            this.goto('/enterprise')
          }
        })
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
    font-size: 18px;
    font-weight: 400;
  }

  .content {
    padding: 20px 20px;
    ._button {
      float: right;
      width: 120px;
      line-height: 38px;
      margin-top: 16px;
    }
  }

  .enterprise-info {
    border: 1px solid #EAEDF0;
    .title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #EAEDF0;
      line-height: 50px;
      .info-title {
        font-size: 18px;
        font-weight: 400;
      }
      .info-modify {
        cursor: pointer;
        padding-right: 20px;
        font-size: 15px;
        &:hover {
          color: #586C94;
          text-decoration: underline;
        }
      }
    }
    .info-content {
      padding: 10px 40px;
      .content-msg {
        display: flex;
        align-items: center;
        font-size: 18px;
        // input {
        //   outline: none;
        //   border: solid 1px #EAEDF0;
        //   margin: 10px 20px;
        //   padding: 4px;
        //   width: 280px;
        //   font-size: 14px;
        //   &:focus {
        //     border-color: #8f8f8f;
        //   }
        // }
        .el-right {
          margin: 10px 20px;
          padding: 4px;
          width: 80%;
        }
      }
    }
  }

  .error-info {
    color: red;
  }
</style>
