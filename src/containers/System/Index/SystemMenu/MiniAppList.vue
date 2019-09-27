<template>
  <div>
    <div class="module-wrapper">
      <div class="content_system">
        <div class="data_title">
          <el-button type="success" @click.native="addMiniApp">+添加小程序</el-button>
        </div>
        <table-miniapp :list="list" :page="page" :size="size" @edit="edit"></table-miniapp>
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
        title="修改小程序"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="system-dialog">
          <div class="dialog_item">
            <span>小程序名称</span>
            <el-input class="el-right" v-model="appName" name="appName" v-validate="'required'"
                      :class="{'is-danger': errors.has('appName') }" placeholder="请输入小程序名称"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appName')">小程序名称不能为空!</span>

          <div class="dialog_item">
            <span>小程序ID</span>
            <el-input class="el-right" v-model="appId" name="appId" v-validate="'required'"
                      :class="{'is-danger': errors.has('appId') }" placeholder="请输入小程序ID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appId')">小程序ID不能为空!</span>

          <div class="dialog_item">
            <span>小程序密钥</span>
            <el-input type="password" class="el-right" v-model="appSecret" name="appSecret" v-validate="'required'"
                      :class="{'is-danger': errors.has('appSecret') }" placeholder="请输入小程序密钥"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('appSecret')">小程序密钥不能为空!</span>

          <div class="dialog_item">
            <span>小程序原始ID</span>
            <el-input class="el-right" v-model="originalId" name="originalId" v-validate="'required'"
                      :class="{'is-danger': errors.has('originalId') }" placeholder="请输入小程序原始ID"></el-input>
          </div>
          <span class="help is-danger" v-show="errors.has('originalId')">小程序原始ID不能为空!</span>
          <div class="dialog_item">
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
          </div>
          <span class="help is-danger" v-show="errors.has('appType')">请选择微信APP类型!</span>
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
    name: 'MiniAppList',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
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
        'getMiniAppList',
        'modifyMiniApp',
        'getWechatpayList',
        'goto'
      ]),
      addMiniApp() {
        this.goto({
          name: 'AddMiniApp'
        })
      },
      edit(obj) {
        this.showDialog = true;

        this.appId = obj.app_id;
        this.appSecret = obj.app_secret;
        this.originalId = obj.original_id;
        this.appName = obj.app_name;
        this.contactName = obj.contact_name;
        this.contactPhone = obj.contact_phone;
        this.appType = obj.app_type;
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

        this.modifyMiniApp({
          app_id: this.appId,
          app_secret: this.appSecret,
          original_id: this.originalId,
          app_name: this.appName,
          contact_name: this.contactName,
          contact_phone: this.contactPhone,
          app_type: this.appType,
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getMiniAppList({
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

            this.list = body.data;
          }
        })
      }
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
