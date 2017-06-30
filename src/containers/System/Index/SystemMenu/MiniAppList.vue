<template>
  <div>
    <div class="module-wrapper">
        <div class="content_miniAppList">
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
    name: 'MiniAppList',
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
      addMiniApp() {
        this.goto({
          name: 'AddMiniApp'
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
    .content_miniAppList {
      font-size: 16px;
      color: #4A4A4A;
      font-weight: normal;
      padding: 16px 25px 0 24px;
      .data_title {
        text-align: end;
        margin-bottom: 10px;
        .el-button {
          line-height: 18px;
          min-width: 173px;
          font-size: 13px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin: 0;
        }
      }
    }
</style>
