<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>XX管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加模板广告商</el-button>
      </div>
      <div class="dataTable">
        <el-table
          :data="tableData"
          style="width: 100%" height="500px">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column label="广告商"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="contral" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialogModel">
        <el-dialog title="添加模板广告商" :visible.sync="showAddContent" center>
          <el-form ref="form" label-width="80px" labelPosition="left">
            <el-form-item label="广告商">
              <el-input v-model="advertiserName"></el-input>
            </el-form-item>
            <span class="error" v-if="reNameError">*广告商重名请重新命名</span>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>


      <div class="pagination">
        <el-pagination
          :page-size="pageSize"
          :pager-count="11"
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

    },
    data() {
      return {
        showAddContent: false,
        advertiserName: '',
        tableData: [
          {
            "id": "18577f265b9d4d0c91428c46bfcbcc9d",
            "name": "张三",
            "description": "",
            "address": "",
            "tel": "",
            "userName": "",
            "status": "OPEN",
            "isDelete": "0"
          },
          {
            "id": "630fc706ab86400896aef6673552e2ac",
            "name": "string",
            "description": "测试店铺",
            "address": "test",
            "tel": "",
            "userName": "test",
            "status": "",
            "isDelete": "0"
          },
          {
            "id": "a9620a4c419c47c5aa2944b1a599eb0a",
            "name": "",
            "description": "",
            "address": "",
            "tel": "",
            "userName": "",
            "status": "",
            "isDelete": "0"
          }
        ],
        pageSize: 10,
        currentPage: 1,
        Total: 100,
        reNameError: false,
        sendDate: {
          address: "",
          description: "",
          isDelete: '',
          name: "",
          status: "",
          tel: "",
          userName: "",
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
      save() {
        this.saveAdvertiser({
          data: this.sendDate,
          onsuccess: body => {
            this.tableData = body.data
          }
        })
      },

      getAdvertiserList() {
        this.AdvertiserList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.tableData = body.data
          }
        })
      },

      handleEdit(parm) {
        console.log(parm)
        this.showAddContent=true;
        this.sendDate=parm
        this.modifiAdvertiser({
          id: parm,
          data: this.sendDate,
          onsuccess: body => {
            this.showAddContent=false;
            this.getAdvertiserList()
          }
        })
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
      }
    }
   /deep/.dialogModel {
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
            top: 10px;

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
    .pagination {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
</style>
