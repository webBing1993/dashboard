<!--好码齐列表-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addHowMuch">+添加好码齐支付</el-button>
        </div>
        <table-howmuch :list="list" :page="page" :size="size" @edit="edit"></table-howmuch>
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
        title="修改好码齐支付"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="system-dialog">
          <div class="dialog_item">
            <span>APPID</span>
            <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                      :class="{'is-danger': errors.has('appid') }" placeholder="请输入好码齐支付appid"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appid')">appid不能为空!</span>

          <div class="dialog_item">
            <span>app_id所属者</span>
            <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"   :autosize="{ minRows: 1, maxRows: 5}"
                      :class="{'is-danger': errors.has('appName') }" placeholder="请输入好码齐支付app_id所属者"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appName')">app_id所属者不能为空!</span>

          <div class="dialog_item">
            <span>密钥</span>
            <el-input class="el-right" v-model="secret" name="secret" v-validate="'required'" type="textarea"  :autosize="{ minRows: 1, maxRows: 5}"
                      :class="{'is-danger': errors.has('secret') }" placeholder="请输入好码齐支付密钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('secret')">密钥不能为空!</span>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../assets/styles/system/index.less';

  export default {
    name: 'HowmuchList',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,

        howmuchId:'',
        appid: '',  //appid
        appName:'',  //appid所属这
        secret:'',   //密钥
      }
    },
    methods: {
      ...mapActions([
        'getHowmuchList',
        'updateHowmuch',
        'goto',
        'getHowmuchById',
      ]),
      addHowMuch() {
        this.goto({
          name: 'AddHowMuch'
        })
      },
      //编辑
      edit(obj) {
        console.log(obj);
        this.getHowmuchById({
          id:obj.id,
          onsuccess:body=>{
            this.showDialog = true;
            this.howmuchId=obj.id;
            this.appid=body.data.app_id;
            this.appName=body.data.app_name;
            this.secret='********';
          }
        })

      },
      //取消
      hideDialog() {
        this.showDialog = false;
      },
      //确认
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
      //确认修改
      modify() {
        this.updateHowmuch({
          data:{
            "id":this.howmuchId,
            "app_id":this.appid,   // app_id
            "app_name":this.appName,  // app_id所属者
            "secret":this.secret // 密钥
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      //获取列表
      getList() {
        this.getHowmuchList({
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            this.list = body.data;
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;
            console.log("this.total", headers['x-current-page']);
            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

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
