<template>
  <div>
    <div class="module-wrapper">
      <div class="content_systemAdd">
        <div class="system-info">
          <div class="info-content">
            <div class="content-msg">
              <span>AppID</span>
              <el-input class="el-right" v-model="appId" name="appName" v-validate="'required'"
                        :class="{'is-danger': errors.has('appName') }" placeholder="请输入appid"></el-input>
              <span class="help is-danger" v-show="errors.has('appName')">appid不能为空!</span>
            </div>
            <div class="content-msg">
              <span>template ID</span>
              <el-input class="el-right" v-model="templateId" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入template ID"></el-input>
              <span class="help is-danger" v-show="errors.has('appId')">template ID不能为空!</span>
            </div>
            <div class="content-msg">
              <span>标题</span>
              <el-input class="el-right" v-model="templateTitle" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入标题"></el-input>
              <span class="help is-danger" v-show="errors.has('appId')">标题不能为空!</span>
            </div>
            <div class="keyword-list dialog_item">
              <el-input class="el-1" v-model="templateJson['desc']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-2"  v-model="templateJson['key']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-3"  v-model="templateJson['value']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-4"  v-model="templateJson['color']"></el-input>
            </div>
            <div class="keyword-list dialog_item" v-for="(obj, index) of lines">
              <el-input class="el-1" v-model="lines[index]['desc']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-2" v-model="lines[index]['key']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-3" v-model="lines[index]['value']"></el-input>
              <div class="lineSpase"></div>
              <el-input class="el-4" v-model="lines[index]['color']"></el-input>
              <div class="lineSpase"></div>
              <div @click="DeleteThisLine(index)">
                <img src="../../../assets/images/减少.png">
              </div>
            </div>
            <div class="addNew dialog_item" @click="addAnotherLine">
            <img src="../../../assets/images/添加.png" alt="a">
            <div class="lineSpase"></div>
            <span>新增一行</span>
            </div>
            <div class="content-msg">
              <span>跳转URL</span>
              <el-input class="el-right" v-model="gotoUrl" name="appId" v-validate="'required'"
                        :class="{'is-danger': errors.has('appId') }" placeholder="请输入跳转URL"></el-input>
              <span class="help is-danger" v-show="errors.has('appId')">跳转URL不可为空</span>
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
        templateId:"",
        templateTitle:"",
        templateJson:[],
        templateTotalData:{},
        tem_data:[],
        gotoUrl:'',
        lines:[],
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
        'addServerMsgTem',
        'getWechatpayList',
        'goto',
        'showalert'
      ]),
      addAnotherLine(){
        this.lines.push({'desc':'','key':'','value':'','color':''})
      },
      DeleteThisLine(index){
        console.log(index)
        this.lines.splice(index, 1);
      },
      nextStep() {
        this.tem_data.push({"desc":this.templateJson.desc ,"key":this.templateJson.key,"value":this.templateJson.key,"color":this.templateJson.color})
        this.lines.map((item,index)=>{
          this.tem_data.push(item)
        })
        this.templateTotalData['tem_data']=this.tem_data
        this.templateTotalData['url']=this.gotoUrl
        this.$validator.validateAll().then(result => {
          result && this.regist();
        });
      },
      regist() {
        this.addServerMsgTem({
          app_id: this.appId,
          template_id: this.templateId,
          template_name: this.templateTitle,
          template_data:JSON.stringify(this.templateTotalData),
          onsuccess: body => this.goto(-1)
        })
      }
    },
    mounted() {

    }
  }
</script>
<style>
  .lineSpase{
    width: 10px;
  }

  .keyword-list,.addNew{
    display: flex;
    flex-direction: row;
  }
  .keyword-list .el-1 {
    width: 15%;

  }

  .keyword-list .el-2 {
    width: 15%;

  }

  .keyword-list .el-3 {
    width: 40%;

  }

  .keyword-list .el-4 {
    width: 15%;

  }

  img {
    width: 40px;
    height: 40px;
  }
</style>
