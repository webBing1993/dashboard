<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">

          <el-input class="title-inp" v-model="search_key" placeholder="请输入搜索关键字"></el-input>
          <!--<el-input class="title-inp" v-model="total"></el-input>-->
          <div class="lineSpase"></div>
          <el-button type="success" @click.native="search">搜索</el-button>
          <div class="lineSpase"></div>
          <el-button type="success" @click.native="addServerMsgTem">添加模板</el-button>
        </div>
        <table-server-massage :list="list" :page="page" :size="size" @edit="edit"></table-server-massage>
        <el-pagination
          v-show="total > size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog
        title="服务消息模板"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="system-dialog">

          <div class="dialog_item">
            <span>AppID</span>
            <el-input class="el-right" v-model="AppId" name="mchName" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchName') }" placeholder="请输入微信支付商户名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchName')">appid不能为空!</span>

          <div class="dialog_item">
            <span>template ID</span>
            <el-input class="el-right" v-model="templateId" name="mchId" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchId') }"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchId')">template ID不能为空!</span>

          <div class="dialog_item">
            <span>标题</span>
            <el-input class="el-right" v-model="templateTitle" name="mchId" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchId') }"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchId')">标题不能为空!</span>


          <div class="keyword-list dialog_item">
            <el-input class="el-1" v-model="templateJson['desc']"></el-input>
            <div class="lineSpase"></div>
            <el-input class="el-2" v-model="templateJson['key']"></el-input>
            <div class="lineSpase"></div>
            <el-input class="el-3" v-model="templateJson['value']"></el-input>
            <div class="lineSpase"></div>
            <el-input class="el-4" v-model="templateJson['color']"></el-input>
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
              <img src="../../../../assets/images/减少.png" alt="a">
            </div>
          </div>
          <div class="addNew dialog_item" @click="addAnotherLine">
            <img src="../../../../assets/images/添加.png" alt="a">
            <div class="lineSpase"></div>
            <span>新增一行</span>
          </div>
          <div class="dialog_item">
            <span>跳转URL</span>
            <el-input class="el-right" v-model="gotoUrl" name="contactName" v-validate="'required'"
                      :class="{'is-danger': errors.has('contactName') }" placeholder="请输入跳转URL"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('contactName')">跳转URL不能为空!</span>


        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="submitDialog">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../assets/styles/system/index.less';

  export default {
    name: 'WechatPayList',
    data() {
      return {
        showDialog: false,
        list: [],
        lines: [],
        page: 1,
        size: 10,
        total: 0,
        Id: '',
        tem_data:[],
        search_key:'',
        templateTitle: '',
        contactName: '',
        gotoUrl:'',
        templateJson:[],
        contactPhone: '',
        AppId: '',
        templateId: '',
        templateTotalData:{},
        showData:{},

      }
    },
    methods: {
      ...mapActions([
        'getWechatpayList',
        'getServMesTempList',
        'modifyServeMesTemp',
        'goto'
      ]),

      search(){
        this.getList()
      },

      addServerMsgTem() {
        this.goto({
          name: 'AddServeMessage'
        })
      },
      edit(obj) {
        this.showDialog = true;
        this.Id = obj.id,
        this.AppId = obj.app_id,
        this.templateId = obj.template_id;
        this.templateTitle = obj.template_name;

        console.log('obj.template_data',obj.template_data?JSON.parse(obj.template_data):"aaaa")
        this.showData=obj.template_data?JSON.parse(obj.template_data):null;
        let length=this.showData?this.showData.tem_data.length:0
        if(length>0){
          this.gotoUrl = this.showData.url;
          this.templateJson=this.showData.tem_data[0];
          this.showData.tem_data.map((item, index) => {
            if (index != 0) {
              this.lines.push(item)
            }
          })
        }
      },
      hideDialog() {
        this.lines=[]
        this.tem_data=[]
        this.showDialog = false;
      },
      submitDialog() {
        this.$validator.validateAll().then(result => {
          result && this.modify();
        });
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      addAnotherLine(){
        this.lines.push({'desc':'','key':'','value':'','color':''})
      },
      DeleteThisLine(index){
        console.log(index)
        this.lines.splice(index, 1);
      },
      modify() {
        this.tem_data.push({"desc":this.templateJson.desc ,"key":this.templateJson.key,"value":this.templateJson.value,"color":this.templateJson.color})
        this.lines.map((item,index)=>{
          this.tem_data.push(item)
        })
        console.log('this.templateTotalData',this.templateTotalData)
        console.log('this.tem_data',this.tem_data)

        this.templateTotalData["aaa"]=['aa','bb']
        this.templateTotalData['tem_data']=this.tem_data
        this.templateTotalData['url']=this.gotoUrl
        this.modifyServeMesTemp({
          id: this.Id,
          app_id: this.AppId,
          template_id: this.templateId,
          template_name: this.templateTitle,
          template_data:JSON.stringify(this.templateTotalData),
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
        this.lines=[]
        this.tem_data=[]
      },
      getList() {
        this.getServMesTempList({
//          page: this.page.toString(),
          page: (this.page-1)*this.size.toString(),
          size: this.size.toString(),
          search_key:this.search_key,
          onsuccess: (body, headers) => {
            this.list = body.data;
            this.total = +headers['x-total-count']
            headers.get('X-Total-Count') ? this.page = +headers.get('X-Total-Count') : null;
            headers['x-total-count'] ? this.total = headers['x-total-count'] : null;

          }
        })
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  .lineSpase {
    width: 10px;
  }

  .data_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .data_title:first-child {
      display: flex;
      flex-direction: row;
      width: 500px;
    }

  }

  .dialog_item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .dialog_item span {
    text-align: left;

  }

  .system-dialog {
    text-align: left;
  }

  .keyword-list {
    display: flex;
    flex-direction: row;
  }

  .keyword-list .el-input {
    width: 20%;

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

  .addNew {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .el-dialog__footer {
    padding: 10px 20px 28px;
    .dialog-footer {
      text-align: center;
      .el-button {
        width: 246px;
        border-radius: 0;
        line-height: 18px;
        margin: 0;
        &:nth-child(1) {
          margin-right: 22px;
        }
        &:nth-child(2) {
          background-color: #39C240;
          border-color: #39C240;
          color: #ffffff;
        }
      }
      .el-button--primary {
        background-color: transparent;
        border: solid 1px #979797;
        color: #4A4A4A;
      }
    }
  }
</style>
