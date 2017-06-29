<template>
  <div>
    <div class="module-wrapper">
        <div class="content_room">
            <table-roomconfig :list="list" :page="page" :size="size" @edit="edit"></table-roomconfig>
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
            title="房型设置"
            :visible.sync="showDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div class="dialog-content">
                <div class="item-form">
                    <span>可住人数</span>
                    <el-select class="el-right" v-model="allowCustomerNum" placeholder="请选择可住人数">
                        <el-option
                            v-for="num of 10"
                            :key="num"
                            :label="num"
                            :value="num">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialog">取 消</el-button>
                <el-button type="primary" @click="modify">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RoomConfig',
    data() {
      return {
        showDialog: false,
        page: 1,
        size: 20,
        total: 0,
        list: [{
            type: '哈哈',
            count: 3,
            num: 2
        }],
        allowCustomerNum: ''
      }
    },
    methods: {
      edit(obj) {
        this.showDialog = true;;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.page = val;
      },
      hideDialog() {
        this.showDialog = false;
      },
      modify() {
        this.showDialog = false;
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

    .dialog-content {
        .item-form {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .el-select {
                width: 70%;
                .el-input {
                  width: 100%;
                }
              }
              .el-input {
                width: 70%;
              }

              .el-switch {
                margin-left: 16px;
              }
            }
    }
</style>
