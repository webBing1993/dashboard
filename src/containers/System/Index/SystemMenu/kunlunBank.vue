<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addAlipay">+添加昆仑银行支付</el-button>
        </div>
        <table-bank :list="list" :page="page" :size="size" @edit="edit" @deleteFun="deleteFun"></table-bank>
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
        title="修改昆仑银行支付"
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
            <span>商户号</span>
            <el-input class="el-right" v-model="mchId" name="mchId" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchId') }" placeholder="请输入昆仑银行支付商户号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchId')">商户号不能为空!</span>

          <div class="dialog_item">
            <span>商户名称</span>
            <el-input class="el-right" v-model="mchName" name="mchName" v-validate="'required'"
                      :class="{'is-danger': errors.has('mchName') }" placeholder="请输入昆仑银行支付商户名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('mchPid')">商户名称不能为空!</span>

          <div class="dialog_item">
            <span>代理商编号</span>
            <el-input class="el-right" v-model="agentNum" name="agentNum" v-validate="'required'"
                      :class="{'is-danger': errors.has('agentNum') }" placeholder="请输入昆仑银行支付代理商编号"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('agentNum')">代理商编号不能为空!</span>

          <div class="dialog_item">
            <span>下游商户号</span>
            <el-input class="el-right" v-model="outMchId" name="outMchId"  placeholder="请输入昆仑银行支付下游商户号"></el-input>
          </div>
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
    name: 'kunlunBank',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        mchId: '',
        mchName: '',
        agentNum: '',
        outMchId: '',
        bankId:'',
      }
    },
    methods: {
      ...mapActions([
        'getBankPayList',
        'updateBank',
        'goto',
        'bankDetail',
        'detailBank'
      ]),
      addAlipay() {
        this.goto({
          name: 'AddBank'
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
        this.bankDetail({
          id: obj.id,
          onsuccess: body => {
            this.showDialog = true;
            this.bankId = body.data.id;
            this.mchId = body.data.mchId;
            this.mchName = body.data.mchName;
            this.agentNum = body.data.agentNum;
            this.outMchId = body.data.outMchId;
          }
        });
      },
      // 删除
      deleteFun(obj) {
          this.detailBank({
            id: obj.id,
            onsuccess: body => {
              this.getList();
            }
          })
      },
      modify() {
        this.updateBank({
          data:{
            id: this.bankId,
            mchId: this.mchId ,
            mchName:  this.mchName,
            agentNum: this.agentNum,
            outMchId: this.outMchId,
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getBankPayList({
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
