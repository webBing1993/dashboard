<!--添加好码齐配置-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>APPID</span>
              <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                        :class="{'is-danger': errors.has('appid') }" placeholder="请输入好码齐支付APPID"></el-input>
              <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>app_id所属者</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"  :autosize="{ minRows: 1, maxRows: 5}"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入好码齐支付app_id所属者"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">app_id所属者不能为空!</span>
            </div>
            <div class="content-msg">
              <span>密钥</span>
              <el-input class="el-right" v-model="secret" name="secret" v-validate="'required'"  type="password" :autosize="{ minRows: 1, maxRows: 5}"
                        :class="{'is-danger': errors.has('secret') }" placeholder="请输入好码齐支付应用公钥"></el-input>
              <span class="help is-danger" v-show="errors.has('secret')">应用公钥不能为空!</span>
            </div>

          </div>
        </div>
        <div class="system-button">
          <el-button class="el-btn" type="success" @click.native="nextStep">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../assets/styles/system/systemAdd.less';

  export default {
    name: 'AddHowMuch',
    data () {
      return {
        appid: '',  //appid
        appName:'',  //appid所属这
        secret:'',   //密钥
      }
    },
    methods: {
      ...mapActions([
        'addHowmuchPayConfig',
        'goto'
      ]),
      nextStep() {

        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addHowmuchPayConfig({
          data:{
            "app_id":this.appid,   // app_id
            "app_name":this.appName,  // app_id所属者
            "secret":this.secret // 密钥
          },
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {

    }
  }
</script>
