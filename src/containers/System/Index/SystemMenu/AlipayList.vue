<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addAlipay">+添加支付宝支付</el-button>
        </div>
        <table-alipay :list="list" :page="page" :size="size" @edit="edit"></table-alipay>
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
        title="修改支付宝支付"
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
            <span>商户名称</span>
            <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchName') }" placeholder="请输入支付宝支付商户名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>

          <div class="dialog_item">
            <span>商户PID</span>
            <el-input class="el-right" v-model="mchPid" name="mchPid" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchPid') }" placeholder="请输入支付宝支付商户PID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPid')">商户PID不能为空!</span>

          <div class="dialog_item">
            <span>APPID</span>
            <el-input class="el-right" v-model="appid" name="appid" v-validate="'required'"
                         :class="{'is-danger': errors.has('appid') }" placeholder="请输入支付宝支付appid"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appid')">appid不能为空!</span>

          <div class="dialog_item">
            <span>商户私钥</span>
            <el-input class="el-right" v-model="mchPriKey" name="mchPriKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchPriKey') }" placeholder="请输入支付宝支付商户私钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPriKey')">商户私钥不能为空!</span>

          <div class="dialog_item">
            <span>商户公钥</span>
            <el-input class="el-right" v-model="mchPubKey" name="mchPubKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchPubKey') }" placeholder="请输入支付宝支付商户公钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPubKey')">商户公钥不能为空!</span>

          <div class="dialog_item">
            <span>支付宝公钥</span>
            <el-input class="el-right" v-model="alipayPubKey" name="alipayPubKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('alipayPubKey') }" placeholder="请输入支付宝公钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('alipayPubKey')">支付宝公钥不能为空!</span>
          <div class="dialog_item">
            <span>绑定人</span>
            <el-input class="el-right" v-model="contactName" name="contactName" v-validate="'required'"
                      :class="{'is-danger': errors.has('contactName') }" placeholder="请输入绑定人"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPubKey')">绑定人不能为空!</span>

          <div class="dialog_item">
            <span>手机号</span>
            <el-input class="el-right" v-model="contactPhone" name="contactPhone" v-validate="'required'"
                      :class="{'is-danger': errors.has('contactPhone') }" placeholder="请输入手机号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('alipayPubKey')">手机号不能为空!</span>


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
        alipayId: '',
        mchName: '',
        mchPid: '',
        appid: '',
        mchPriKey: '',
        mchPubKey: '',
        alipayPubKey: '',
        contactName:'',
        contactPhone:'',
      }
    },
    methods: {
      ...mapActions([
        'getAlipayConfigList',
        'updateAlipay',
        'goto',
        'getAlipayById',
      ]),
      addAlipay() {
        this.goto({
          name: 'AddAlipay'
        })
      },
      edit(obj) {
        console.log(obj);
        this.getAlipayById({
           id:obj.id,
          onsuccess:body=>{
            this.showDialog = true;
            this.alipayId=obj.id;
            this.mchName=body.data.mchName;
            this.mchPid = body.data.mchPid;
            this.appid = body.data.appId;
            this.mchPriKey =body.data.mchPrivateKey;
            this.mchPubKey = body.data.mchPublicKey;
            this.alipayPubKey=body.data.aliPublicKey
            this.contactName=body.data.contactName;
            this.contactPhone=body.data.contactPhone;
          }
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
      modify() {
        this.updateAlipay({
          data:{
            "id":this.alipayId,
            "mchPid":this.mchPid,     // 合作伙伴身份ID
            "appId":this.appid,       // appid
            "mchName":this.mchName,                // 商户名称
            "mchPrivateKey":this.mchPriKey ,                // 商户私钥key
            "mchPublicKey":this.mchPubKey,                  // 商户公钥key
            "aliPublicKey":this.alipayPubKey,                  // 阿里公钥key
            "contactName":this.contactName,    //绑定人
            "contactPhone":this.contactPhone    // 手机号码
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getAlipayConfigList({
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
