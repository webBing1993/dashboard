<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addAlipay">+添加工行支付</el-button>
        </div>
        <table-icbc :list="list" :page="page" :size="size" @edit="edit"></table-icbc>
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
        title="修改工行支付"
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
                      :class="{'is-danger': errors.has('appid') }" placeholder="请输入工行支付APPID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appid')">APPID不能为空!</span>

          <div class="dialog_item">
            <span>商户名称</span>
            <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchName') }" placeholder="请输入工行支付商户名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPid')">商户名称不能为空!</span>

          <div class="dialog_item">
            <span>商户线下档案编号</span>
            <el-input class="el-right" v-model="merId" name="merId" v-validate="'required'"
                      :class="{'is-danger': errors.has('merId') }" placeholder="请输入工行支付商户线下档案编号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('merId')">商户线下档案编号不能为空!</span>

          <div class="dialog_item">
            <span>e生活档案编号</span>
            <el-input class="el-right" v-model="storeCode" name="storeCode" v-validate="'required'"
                      :class="{'is-danger': errors.has('storeCode') }" placeholder="请输入工行支付e生活档案编号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('storeCode')">e生活档案编号不能为空!</span>

          <div class="dialog_item">
            <span>api私钥</span>
            <el-input class="el-right" v-model="apiPrivateKey" name="apiPrivateKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('apiPrivateKey') }" placeholder="请输入工行支付api私钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('apiPrivateKey')">api私钥不能为空!</span>
          <div class="dialog_item">
            <span>api公钥</span>
            <el-input class="el-right" v-model="apiPublicKey" name="apiPublicKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('apiPublicKey') }" placeholder="请输入工行支付api公钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('apiPublicKey')">api公钥不能为空!</span>

          <div class="dialog_item">
            <span>网管公钥</span>
            <el-input class="el-right" v-model="gatewayPublicKey" name="gatewayPublicKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('gatewayPublicKey') }" placeholder="请输入工行支付网管公钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('gatewayPublicKey')">网管公钥不能为空!</span>
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
    name: 'paymentIcbc',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        appid: '',
        mchName: '',
        merId: '',
        storeCode: '',
        apiPrivateKey: '',
        apiPublicKey: '',
        gatewayPublicKey:'',
        icbcId:'',
      }
    },
    methods: {
      ...mapActions([
        'getIcbcPayList',
        'updateIcbc',
        'goto',
        'getAlipayById',
        'icbcDetail'
      ]),
      addAlipay() {
        this.goto({
          name: 'AddIcbc'
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
        this.icbcDetail({
          id: obj.id,
          onsuccess: body => {
            this.showDialog = true;
            this.icbcId = body.data.id;
            this.appid = body.data.appId;
            this.mchName = body.data.mchName;
            this.merId = body.data.merId;
            this.storeCode = body.data.storeCode;
            this.apiPrivateKey = body.data.apiPrivateKey;
            this.apiPublicKey = body.data.apiPublicKey;
            this.gatewayPublicKey = body.data.gatewayPublicKey;
          }
        });
      },
      modify() {
        this.updateIcbc({
          data:{
            id: this.icbcId,
            appId: this.appid ,
            mchName:  this.mchName,
            merId: this.merId,
            storeCode: this.storeCode,
            apiPrivateKey: this.apiPrivateKey,
            apiPublicKey:  this.apiPublicKey,
            gatewayPublicKey:this.gatewayPublicKey,
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getIcbcPayList({
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
  .system-dialog .dialog_item span {
    min-width: 140px;
  }
</style>
