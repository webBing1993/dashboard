<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addAlipay">+添加银联支付</el-button>
        </div>
        <table-chinaums :list="list" :page="page" :size="size" @edit="edit"></table-chinaums>
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
        title="修改银联支付"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="system-dialog">
          <!-- <div class="dialog_item">
            <span>ID</span>
            <el-input class="el-right" v-model="wechatpayId" name="wechatpayId" v-validate="'required'"
                      :class="{'is-danger': errors.has('wechatpayId') }" placeholder="请输入微信支付ID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('wechatpayId')">ID不能为空!</span> -->

          <div class="dialog_item">
            <span>APPID</span>
            <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                      :class="{'is-danger': errors.has('appid') }" placeholder="请输入银联支付APPID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>

          <div class="dialog_item">
            <span>mchId</span>
            <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchId') }" placeholder="请输入银联支付mchId"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPid')">mchId不能为空!</span>

          <div class="dialog_item">
            <span>appKey</span>
            <el-input class="el-right" v-model="appKey" name="appKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('appKey') }" placeholder="请输入银联支付appKey"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appKey')">银联支付appKey不能为空!</span>

          <div class="dialog_item">
            <span>配置名称</span>
            <el-input class="el-right" v-model="configName" name="configName" v-validate="'required'"
                      :class="{'is-danger': errors.has('configName') }" placeholder="请输入银联支付配置名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('configName')">配置名称不能为空!</span>

          <div class="dialog_item">
            <span>默认终端号</span>
            <el-input class="el-right" v-model="defaultTerminalCode" name="defaultTerminalCode" v-validate="'required'"
                      :class="{'is-danger': errors.has('defaultTerminalCode') }" placeholder="请输入银联支付默认终端号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('defaultTerminalCode')">默认终端号不能为空!</span>
          <div class="dialog_item">
            <span>类型</span>
            <el-input class="el-right" v-model="type" name="type" v-validate="'required'"
                      :class="{'is-danger': errors.has('type') }" placeholder="请输入银联支付类型"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('type')">银联支付类型不能为空!</span>

          <div class="dialog_item">
            <span>类型名称</span>
            <el-input class="el-right" v-model="typeName" name="typeName" v-validate="'required'"
                      :class="{'is-danger': errors.has('typeName') }" placeholder="请输入"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('typeName')">银联支付类型名称不能为空!</span>
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
    name: 'AlipayList',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        appid: '',
        mchId: '',
        appKey: '',
        configName: '',
        defaultTerminalCode: '',
        type: '',
        typeName:'',
        chinaumsId:'',
      }
    },
    methods: {
      ...mapActions([
        'getChinaumsList',
        'updateChinaums',
        'goto',
        'getAlipayById',
      ]),
      addAlipay() {
        this.goto({
          name: 'AddChinaums'
        })
      },

      hideDialog() {
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
      edit(obj) {
        console.log(obj);
        this.showDialog = true;
        this.chinaumsId=obj.id;
        this.appid = obj.appId;
        this.mchId = obj.mchId;
        this.appKey = obj.appKey;
        this.configName =obj.configName;
        this.defaultTerminalCode = obj.defaultTerminalCode;
        this.type=obj.type;
        this.typeName=obj.typeName;
      },
      modify() {
        this.updateChinaums({
          chinaumsId:this.chinaumsId,
          data:{
            appId: this.appid ,
            mchId:  this.mchId,
            appKey: this.appKey,
            configName: this.configName,
            defaultTerminalCode: this.defaultTerminalCode,
            type:  this.type,
            typeName:this.typeName,
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getChinaumsList({
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
