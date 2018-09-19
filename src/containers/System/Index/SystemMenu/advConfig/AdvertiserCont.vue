<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>广告商管理</span>
        <el-button type="success" @click="add" class="button">添加广告商</el-button>
      </div>
      <div class="dataTable">
        <el-table
          :data="tableData"
          style="width: 100%" height="500px">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="广告商"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="contral" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialogModel">
        <el-dialog :title="title" :visible.sync="showAddContent" center>
          <el-form ref="form" label-width="80px" labelPosition="left">
            <el-form-item label="广告商">
              <el-input v-model="advertiserName"  placeholder="请输入广告商名称"></el-input>
            </el-form-item>
            <span class="error" v-if="reNameError">*广告商重名请重新命名</span>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save" :disabled="!validateall">保 存</el-button>
          </div>
        </el-dialog>
      </div>


      <div class="paginationPage">
        <el-pagination
          :page-size="pageSize"
          @current-change="currentChange"
          layout="prev, pager, next"
          :total="Total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {},
    computed: {
      ...mapState([
        'route',
        'Interface'
      ]),
      validateall() {
        if (this.advertiserName.length == 0 || this.advertiserName.length > 30) {
          return false
        } else {
          return true
        }
      },
    },
    data() {
      return {
        showAddContent: false,
        title:'添加广告商',
        advertiserName: '',
        tableData: [

        ],
        pageSize: 10,
        currentPage: 1,
        Total: 0,
        reNameError: false,
        editeStatus: false,
        currentItem: {},
        sendDate: {
//          address: "",
//          description: "",
//          isDelete: '',
//          name: "",
//          status: "",
//          tel: "",
//          userName: "",
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'AdvertiserList',
        'saveAdvertiser',
        'modifiAdvertiser',

      ]),

      add(){
        this.title = '添加广告商';
        this.advertiserName=''
        this.showAddContent=true

      },
      save() {
        if (this.editeStatus) {
          this.modifiAdvertiser({
            id: this.currentItem.id,
            data: {
              name: this.advertiserName
            },
            onsuccess: body => {
              this.getAdvertiserList()
              this.showAddContent = false;

            }
          })
        } else {
          this.saveAdvertiser({
            data: {
              name: this.advertiserName
            },
            onsuccess: body => {
//              this.tableData = body.data
              this.showAddContent = false;

            }
          })
        }
      },
      currentChange(argum) {
        console.log('当前', argum)
        this.currentPage = argum
        this.$nextTick(function () {
          this.getAdvertiserList()
        })

      },
      getAdvertiserList() {
        this.AdvertiserList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.tableData = body.data.list
            this.Total=body.data.total

          }
        })
      },

      handleEdit(parm) {
        console.log(parm)
        this.title = '编辑广告商';
        this.showAddContent = true;
        this.currentItem = parm;
        this.editeStatus = true;
        this.advertiserName=parm.name
      },

    },

    mounted() {
      this.getAdvertiserList()
    }
  }
</script>
<style lang="less" scoped>
  .module-wrapper {
    padding: 1rem;
    .top {
      line-height: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
      span {
        font-weight: bold;
        font-size: 16px;
      }
      .el-button {
        &.button {
          float: right;
          width: 12rem;
        }
      }
    }
    /deep/ .dataTable {
      .el-table th {
        background-color: #ccc;
        text-align: center;
      }
      .el-table td {
        text-align: center;
      }
      .contral {
        color: #3AC240;
        /* 编辑: */
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #3AC240;
        letter-spacing: 0;
        line-height: 12px;
        cursor: pointer;
      }

    }
    /deep/ .dialogModel {
      .el-dialog {
        width: 65%;
        .el-dialog__header {
          padding: 0;
          margin: 0 20px;
          text-align: left;
          border-bottom: solid 1px #D8D8D8;
          margin-bottom: 30px;
          display: flex;
          flex-direction: row;
          align-items: center;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }

          .el-dialog__headerbtn {
            font-size: 24px;
            top: 0px;
            padding: 0;

          }
        }

      }
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
    }

    .error {
      color: #ff2712;
      font-size: 10px;
      display: block;
      margin-left: 80px;
    }
    .paginationPage {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .el-pagination {
        text-align: center;
        /*position: absolute;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        box-sizing: border-box;
        width: 100%;
        line-height: 50px;
      }
    }
  }
</style>
