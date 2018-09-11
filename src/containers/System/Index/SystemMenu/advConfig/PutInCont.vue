<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>XX管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加投放策略</el-button>
      </div>
      <div class="dataTable">
        <el-table
          :data="tableData"
          style="width: 100%" height="500px">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="advMaterialId" label="素材名"></el-table-column>
          <el-table-column prop="advScopeId" label="分组"></el-table-column>
          <el-table-column prop="showType" label="广告位"></el-table-column>
          <el-table-column prop="beginTime" label="开始时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
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
            <el-form-item label="素材">
              <el-select v-model="form.mattertListValue" placeholder="" size="100%">
                <el-option :label="item.value" v-for="(item ,index) in Dateform.mattertList" :key="index"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放组别">
              <el-select v-model="form.GroupListValue" placeholder="" size="100%">
                <el-option :label="item.value" v-for="(item ,index) in Dateform.GroupList" :key="index"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告位">
              <el-checkbox-group v-model="form.advertising">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch v-model="form.used"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>


      <div class="paginationPage">
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
        tableData: [],
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
        },
        form:{
          mattertListValue:'',
          GroupListValue:'',
          advertising:[],
          used:true
        },
        Dateform:{
          mattertList: [
            {
              name: "不限",
              id: "man",
            },
            {
              name: "特定年龄",
              id: "w",
            }
          ],
          GroupList:[
            {
              name: "不限",
              id: "man",
            },
            {
              name: "特定年龄",
              id: "w",
            }
          ],
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'putInList',
        'saveAdvertiser',
        'modifiAdvertiser',

      ]),
      save() {
        this.saveAdvertiser({
          data: this.sendDate,
          onsuccess: body => {
            this.tableData = body.data.list
          }
        })
      },

      getPutInList() {
        this.putInList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.tableData = body.data.list
          }
        })
      },

      handleEdit(parm) {
        console.log(parm)
        this.showAddContent = true;
        this.sendDate = parm
        this.modifiAdvertiser({
          id: parm,
          data: this.sendDate,
          onsuccess: body => {
            this.showAddContent = false;
            this.getPutInList()
          }
        })
      },

    },

    mounted() {
      this.getPutInList()
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
            padding: 0;

          }
        }
        .el-dialog__body{
          padding-right: 200px;
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
      .el-select{
        width: 100%;
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
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        line-height: 50px;
      }
    }
  }
</style>
