<template>
  <div>
    <div class="module-wrapper">
        <div class="content_room">
            <div class="data_title">
                <div class="header-btn">
                    <el-button type="success" @click.native="addWechatpay">+添加微信支付</el-button>
                </div>
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
            title="哈哈哈"
            :visible.sync="showDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div class="dialog-content">
              
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'WechatPayList',
    data() {
      return {
        showDialog: false,
        list: [{
            id: 666666666,
            name: '曼克+',
            user: '哈哈',
            tel: '13333333333'
        }],
        page: 1,
        size: 20,
        total: 0
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
      addWechatpay() {
        this.goto({
          name: 'AddWechatpay'
        })
      },
      edit(obj) {
        this.showDialog = true;
      },
      hideDialog() {
        this.showDialog = false;
      },
      submitDialog() {

      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.page = val;
      },
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="less">
    .content_room {
      font-size: 16px;
      color: #4A4A4A;
      font-weight: normal;
      padding: 9px 25px 0 24px;
      .data_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          flex: 1;
          font-size: 14px;
          color: #4A4A4A;
        }
        .header-btn {
          display: flex;
          /*margin-right: 6px;*/
          .el-button {
            line-height: 18px;
            min-width: 173px;
            font-size: 13px;
            background-color: #39C240;
            border-color: #39C240;
            border-radius: 0;
            margin: 0;
            &:nth-child(1) {
              margin-right: 59px;
            }
          }
        }
      }
    }
</style>
