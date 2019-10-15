<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>小程序名称</span>
              <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入小程序名称"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">小程序名称不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序ID</span>
              <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入小程序ID"></el-input>
              <span class="help is-danger" v-show="errors.has('appId')">小程序ID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序密钥</span>
              <el-input class="el-right" v-model="appSecret" name="appSecret" v-validate="'required'"
                        :class="{'is-danger': errors.has('appSecret') }" placeholder="请输入小程序密钥"></el-input>
              <span class="help is-danger" v-show="errors.has('appSecret')">小程序密钥不能为空!</span>
            </div>
            <div class="content-msg">
              <span>小程序原始ID</span>
              <el-input class="el-right" v-model="originalId" name="originalId" v-validate="'required'"
                        :class="{'is-danger': errors.has('originalId') }" placeholder="请输入小程序原始ID"></el-input>
              <span class="help is-danger" v-show="errors.has('originalId')">小程序原始ID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>微信APP类型</span>
              <el-select class="el-right" v-model="appType" name="appType" v-validate="'required'"
                         :class="{'is-danger': errors.has('appType') }" placeholder="请选择微信APP类型">
                <el-option
                  v-for="(obj, index) of appTypeList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
              <span class="help is-danger" v-show="errors.has('appType')">请选择微信APP类型!</span>
            </div>
            <div class="content-msg">
              <span>绑定人</span>
              <el-input class="el-right" v-model="contactName" name="contactName" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactName') }" placeholder="请输入小程序绑定人"></el-input>
              <span class="help is-danger" v-show="errors.has('contactName')">绑定人不能为空!</span>
            </div>
            <div class="content-msg">
              <span>手机号</span>
              <el-input class="el-right" v-model="contactPhone" name="contactPhone" v-validate="'required'"
                        :class="{'is-danger': errors.has('contactPhone') }" placeholder="请输入小程序绑定人手机号码"></el-input>
              <span class="help is-danger" v-show="errors.has('contactPhone')">手机号不能为空!</span>
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
    name: 'AddMiniApp',
    data () {
      return {
        appId: '',
        appSecret: '',
        originalId: '',
        appName: '',
        contactName: '',
        contactPhone: '',
        appType: '',
        appTypeList: [{
          id: 'XCX',
          name: '小程序'
        },{
          id: 'FWH',
          name: '服务号'
        },{
          id: 'DYH',
          name: '订阅号'
        }]
      }
    },
    methods: {
      ...mapActions([
        'addMiniApp',
        'getWechatpayList',
        'goto',
        'showalert'
      ]),
      nextStep() {
        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        
        this.addMiniApp({
          app_id: this.appId,
          app_secret: this.appSecret,
          original_id: this.originalId,
          app_name: this.appName,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          app_type: this.appType,
          onsuccess: body => this.goto(-1)
        })
      }
    },
    mounted() {
      
    }
  }
</script>
