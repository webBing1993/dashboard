<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>投放管理</span>
        <el-button type="success" @click="addPutIN" class="button">添加投放策略</el-button>
      </div>
      <div class="dataTable">
        <el-table
          :data="tableData"
          style="width: 100%" height="500px">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="advMaterialId" label="素材名"></el-table-column>
          <el-table-column prop="advScopeId" label="分组"></el-table-column>
          <el-table-column prop="showType" label="广告位"></el-table-column>
          <el-table-column prop="beginTime" label="开始时间">
            <template slot-scope="scope">
              <span>{{formatdate(scope.row.beginTime,'YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="结束时间">
            <template slot-scope="scope">
              <span>{{formatdate(scope.row.endTime,'YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="contral have-link" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dialogModel">
        <el-dialog title="添加模板广告商" :visible.sync="showAddContent" center>
          <el-form ref="form" label-width="80px" labelPosition="left">
            <el-form-item label="素材">
              <el-select v-model="form.mattertListValue" placeholder="" size="100%">
                <el-option :label="item.name" v-for="(item ,index) in Dateform.mattertList" :key="item.id"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投放组别">
              <el-select v-model="form.GroupListValue" placeholder="" size="100%">
                <el-option :label="item.name" v-for="(item ,index) in Dateform.GroupList" :key="item.id"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告位">
              <el-checkbox-group v-model="form.advertising">
                <el-checkbox :key="item.code" :label="item.code" v-for="(item,index) in Dateform.advertising">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.dateRange"
                type="daterange"
                value-format="timestamp"
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
            <el-button type="primary" v-if="!editStatus" @click="save">保 存</el-button>
            <el-button type="primary" v-if="editStatus" @click="HandelModifiPutIn">确 认</el-button>
          </div>
        </el-dialog>
      </div>


      <div class="paginationPage">
        <!--<el-pagination-->
          <!--:page-size="pageSize"-->
          <!--:pager-count="11"-->
          <!--layout="prev, pager, next"-->
          <!--:total="Total">-->
        <!--</el-pagination>-->

        <el-pagination
          :page-size="pageSize"
          :total="Total"
          @current-change="currentChange"
          layout="prev, pager, next"
        >
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
        Total: 0,
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
        form: {
          dateRange: [],
          mattertListValue: '',
          GroupListValue: '',
          advertising: ['HOME_PAGE'],
          used: true
        },
        Dateform: {
          mattertList: [],
          GroupList: [],
          advertising:[]
        },
        editStatus:false,
        currentItem:{},
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'putInList',
        'matterInList',
        'advGroupList',
        'putInStrategy',
        'modifiPutIn',
        'advshowLocal',

      ]),
      save() {
        let temp = {
          "advMaterialId":this.form. mattertListValue,
          "advScopeId": this.form. GroupListValue,
          "beginTime": this.form.dateRange.length>0?this.form.dateRange[0]:" ",
          "endTime": this.form.dateRange.length>0?this.form.dateRange[1]:" ",
          "showType": this.form.advertising.join(','),
          "status": this.form.used,
        }
        this.putInStrategy({
          data: JSON.stringify(temp),
          onsuccess: body => {
            this.showAddContent=false
            this.getPutInList()
          }
        })
      },

      currentChange(argum) {
        console.log('当前', argum)
        this.currentPage = argum
        this.$nextTick(function () {
          this.getPutInList()
        })

      },
      getPutInList() {
        this.putInList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.tableData = body.data.list
            this.Total=body.data.total

          }
        })
      },
      getMatterInList() {
        this.matterInList({
          onsuccess: body => {
            this.Dateform.mattertList = body.data.list
          }
        })
      },
      getAdvGroupList() {
        this.advGroupList({
          onsuccess: body => {
            this.Dateform.GroupList = body.data.list
          }
        })
      },
      getadvshowLocalList() {
        this.Dateform.advertising=[]
        this.advshowLocal({
          onsuccess: body => {
            this.Dateform.advertising = JSON.parse(body.data)
          }
        })
      },

      handleEdit(parm) {
        this.getadvshowLocalList()
        console.log('parmparmparm',parm)
        this.showAddContent = true;
        this.editStatus = true;
//        dateRange: [],
//          mattertListValue: '',
//          GroupListValue: '',
//          advertising: [],
//          used: true
        this.currentItem = parm;
        this.form.dateRange = [parm.beginTime,parm.endTime];
        this.form.mattertListValue = parm.advMaterialId;
        this.form.GroupListValue = parm.advScopeId;
         parm.showType.length>1?this.form.advertising=parm.showType.split(','):this.form.advertising.push(parm.showType);
        this.form.used = parm.status;

        console.log('this.form',this.form)
      },
      addPutIN(){
        this.showAddContent=true
        this.getadvshowLocalList()
      },
      HandelModifiPutIn(){
        let temp = {
          "advMaterialId":this.form. mattertListValue,
          "advScopeId": this.form. GroupListValue,
          "beginTime": this.form.dateRange[0],
          "endTime": this.form.dateRange[1],
          "showType": this.form.advertising.length>0?this.form.advertising.join(','):"空",
          "status": this.form.used,
        }
        this.modifiPutIn({
          id: this.currentItem.id,
          data: temp,
          onsuccess: body => {
            this.showAddContent = false;
            this.getPutInList()
          }
        })
      },
      formatdate(param, status) {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '年';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
          var D = date.getDate() + ' 日';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          if (status == 'YYYY-MM-DD') {
            return Y + M + D
          } else {
            return Y + M + D + h + m + s;
          }

        }
      },

    },

    mounted() {
      this.getPutInList()
      this.getMatterInList()
      this.getAdvGroupList()
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
            top: 10px;
            padding: 0;

          }
        }
        .el-dialog__body {
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
      .el-select {
        width: 100%;
      }
    }

    .error {
      color: #ff2712;
      font-size: 10px;
      display: block;
      margin-left: 80px;
    }
    .have-link {
      color: #3CC51F;
      cursor: pointer;
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
