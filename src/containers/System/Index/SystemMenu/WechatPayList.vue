<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addWechatpay">+添加微信支付</el-button>
        </div>
        <table-wechatpay :list="list" :page="page" :size="size" @edit="edit"></table-wechatpay>
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
        title="修改微信支付"
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
                      :class="{'is-danger': errors.has('mchName') }" placeholder="请输入微信支付商户名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchName')">商户名称不能为空!</span>

          <div class="dialog_item">
            <span>商户号</span>
            <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchId') }" placeholder="请输入微信支付商户号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchId')">商户号不能为空!</span>

          <div class="dialog_item">
            <span>商户类型</span>
            <el-select class="el-right" v-model="mchType" name="mchType" v-validate="'required'"
                         :class="{'is-danger': errors.has('mchType') }" placeholder="请选择商户类型">
                <el-option
                  v-for="(obj, index) of mchTypeList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
          </div>
          <span class="help is-danger" v-show="errors.has('mchType')">商户号不能为空!</span>

          <div class="dialog_item">
            <span>商户号密钥</span>
            <el-input class="el-right" type="password" v-model="mchKey" name="mchKey" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchKey') }" placeholder="请输入微信支付商户号密钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchKey')">商户号密钥不能为空!</span>

          <div class="dialog_item">
            <span>绑定人</span>
            <el-input class="el-right" v-model="contactName" name="contactName" v-validate="'required'"
                      :class="{'is-danger': errors.has('contactName') }" placeholder="请输入小程序绑定人"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('contactName')">绑定人不能为空!</span>

          <div class="dialog_item">
            <span>手机号</span>
            <el-input class="el-right" v-model="contactPhone" name="contactPhone" v-validate="'required'"
                      :class="{'is-danger': errors.has('contactPhone') }" placeholder="请输入小程序绑定人手机号码"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('contactPhone')">手机号不能为空!</span>

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
    name: 'WechatPayList',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        wechatpayId: '',
        mchName: '',
        mchId: '',
        mchKey: '',
        contactName: '',
        contactPhone: '',
        mchType: '',
        mchTypeList: [{
          id: 'PROVIDER',
          name: '服务商'
        },{
          id: 'SPECIAL',
          name: '特约商户'
        },{
          id: 'GENERAL',
          name: '普通商户'
        }]
      }
    },
    methods: {
      ...mapActions([
        'getWechatpayList',
        'modifyWechatpay',
        'goto'
      ]),
      addWechatpay() {
        this.goto({
          name: 'AddWechatpay'
        })
      },
      edit(obj) {
        this.showDialog = true;
        this.mchType = obj.mch_type,
        this.wechatpayId = obj.id;
        this.mchName = obj.mch_name;
        this.mchId = obj.mch_id;
        this.mchKey = '********';
        this.contactName = obj.contact_name;
        this.contactPhone = obj.contact_phone;
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
        this.modifyWechatpay({
          id: this.wechatpayId,
          mch_id: this.mchId,
          mch_name: this.mchName,
          mch_type: this.mchType,
          mch_key: this.mchKey,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getWechatpayList({
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;
            console.log("this.total", headers['x-current-page'] );
            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total']? this.total = +headers['x-total'] : null;

            this.list = body.data;
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
