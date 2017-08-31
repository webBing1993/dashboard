<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>appID</span>
        <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入appID"></el-input>
        <span class="help is-danger" v-show="errors.has('appId')">appId不能为空!</span>
      </div>
      <div class="content-item">
        <span>template ID</span>
        <el-input class="el-right" v-model="templateId" name="templateId" v-validate="'required'"
                        :class="{'is-danger': errors.has('templateId') }" placeholder="请输入templateID"></el-input>
        <span class="help is-danger" v-show="errors.has('templateId')">templateID不能为空!</span>
      </div>
      <div class="content-item">
        <span>template name</span>
        <el-input class="el-right" v-model="templateName" name="templateName" v-validate="'required'"
                        :class="{'is-danger': errors.has('templateName') }" placeholder="请输入template name"></el-input>
        <span class="help is-danger" v-show="errors.has('templateName')">templateName不能为空!</span>
      </div>
      <div class="content-btn">
        <el-button @click.native="nextStep">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../../assets/styles/system/index.less';

  export default {
    name: 'AddMiniAppMsg',
    data() {
      return {
        appId: '',
        templateId: '',
        templateName: ''
      }
    },
    methods: {
      ...mapActions([
        'addMiniAppMsg',
        'goto'
      ]),
      nextStep() {
        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addMiniAppMsg({
          app_id: this.appId,
          template_id: this.templateId,
          template_name: this.templateName,
          onsuccess: body => {
            this.goto(-1);
          }
        })
      }
    },
    mounted() {
      
    }
  }
</script>
<style scoped lang="less">
    .module-wrapper {
    padding: 26px 45px;
    .content-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 14px;
      span {
        min-width: 68px;
        text-align: end;
      }
      .el-right {
        margin-left: 20px;
        padding: 4px;
        width: 80%;
      }
    }
    .content-btn {
      width: 100%;
      margin-top: 53px;
      text-align: center;
      .el-button {
        width: 173px;
        line-height: 18px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        color: #ffffff;
        &:nth-child(1) {
          background-color: #D0011B;
          border-color: #D0011B;
        }
      }
    }
  }
</style>
