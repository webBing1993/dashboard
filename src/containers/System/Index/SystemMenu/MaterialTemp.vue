<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>模板管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加模板</el-button>
      </div>
      <div class="tableList dataTable">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="id" label="ID" width="180"></el-table-column>
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="have-link" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="添加模板" :visible.sync="showAddContent"

                 center>
        <!--<div class="rec">-->
        <el-form ref="form" :model="form" label-width="180px" labelPosition="left">
          <el-form-item label="模板名称">
            <el-input v-model="Dateform.name"></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo el-right"
            :action="scriptUpload"
            :show-file-list=false
            :headers="setHeader"
            :before-upload='beforeUploadfilter'
            :on-success="filterScriptSuccess"
            :onError="uploadError"
            :limit=1>
            <el-button size="small" type="primary">上传logo</el-button>
          </el-upload>
          <el-form-item label="二代证读卡间隔">
            <el-select v-model="Dateform.readInterval" placeholder="请选择">
              <el-option :label="item.value" v-for="(item ,index) in initDate.IdCardReadTime" :key="index"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="找脸模式">
            <el-select v-model="Dateform.searchMode" placeholder="请选择">
              <el-option label="找相似度最高" value="找相似度最高"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传数据总开关">
            <el-switch v-model="Dateform.uploadOn"></el-switch>
          </el-form-item>
          <el-form-item label="上传低于下限得数据">
            <el-switch v-model="Dateform.uploadLower"></el-switch>
          </el-form-item>
          <el-form-item label="验证不通过提示验证完成">
            <el-switch v-model="Dateform.remindFinish"></el-switch>
          </el-form-item>
          <el-form-item label="有证抓脸出实时画面？">
            <el-switch v-model="Dateform.cardReal"></el-switch>
          </el-form-item>
          <el-form-item label="无证抓脸出实时画面？">
            <el-switch v-model="Dateform.undocumentReal"></el-switch>
          </el-form-item>
        </el-form>

        <!--</div>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddContent=false">取 消</el-button>
          <el-button type="primary" v-if="!editStatus" :disabled="!validateall" @click="saveTemplate">保 存</el-button>
          <el-button type="primary" v-if="editStatus" :disabled="!validateall" @click="HandelmodifiTemp">确认</el-button>
        </div>
      </el-dialog>


    </div>

  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {

    data() {
      return {
        showAddContent: false,
        tableData: [],
        form: {},
        initDate: {
          IdCardReadTime: [
            {
              id: '1',
              value: "1秒"
            },
            {
              id: '2',
              value: "2秒"
            },
            {
              id: '3',
              value: "3秒"
            },
            {
              id: '4',
              value: "4秒"
            },
            {
              id: '5',
              value: "5秒"
            },
          ]
        },
        Dateform: {
          name: "",
          logoUrl: "",
          readInterval: '',
          searchMode: '找相似度最高',
          uploadOn: true,
          uploadLower: true,
          remindFinish: false,
          cardReal: true,
          undocumentReal: true
        },
        editStatus: false,
//        formatScript: "",

      }
    },

    computed: {
      ...mapState([]),
      scriptUpload() {
        return "/virgo/files/adv/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      },
    },
    methods: {
      ...mapActions([
        'goto',
        'tempList',
        'addTemplate',
        'modifiTemp',

      ]),
      beforeUploadfilter(file) {
        this.file=file
        console.log('file',file)
      },
      uploadError (response, file, fileList) {
        console.log('上传失败，请重试！1',response)
        console.log('上传失败，请重试！2',file)
        console.log('上传失败，请重试！3',fileList)
      },
      filterScriptSuccess(res, file, list) {
        console.log('resresres',res)
        if (res.data) {
          this.Dateform.logoUrl = res.data;
        }
      },
      handleClose() {
        this.showAddContent = false

      },

      getTempList() {
        this.tempList({
          onsuccess: body => {
            this.tableData = body.data
          }
        })
      },

      saveTemplate() {
        let temo = {
          "name": this.Dateform.name,
          "logoUrl": this.Dateform.logoUrl,
          "readInterval": this.Dateform.readInterval,
          "searchMode":1, //this.Dateform.searchMode,
          "uploadOn": this.Dateform.uploadOn,
          "uploadLower": this.Dateform.uploadLower,
          "remindFinish": this.Dateform.remindFinish,
          "cardReal": this.Dateform.cardReal,
          "undocumentReal": this.Dateform.undocumentReal,
        }
        this.addTemplate({
          data: JSON.stringify(temo),
          onsuccess: body => {
            this.getTempList()
            this.showAddContent = false
          }
        })
      },

      HandelmodifiTemp() {
        let temp = {
          "name": this.Dateform.name,
          "logoUrl": this.Dateform.logoUrl,
          "readInterval": this.Dateform.readInterval,
          "searchMode": 1,//this.Dateform.searchMode,
          "uploadOn": this.Dateform.uploadOn,
          "uploadLower": this.Dateform.uploadLower,
          "remindFinish": this.Dateform.remindFinish,
          "cardReal": this.Dateform.cardReal,
          "undocumentReal": this.Dateform.undocumentReal,
        }
        this.modifiTemp({
          tempId: this.Dateform.id,
          data: JSON.stringify(temp),
          onsuccess: body => {
            this.getTempList()
            this.showAddContent = false
          }
        })
      },

      handleEdit(parm) {
        this.editStatus = true
        this.showAddContent = true
        this.Dateform = parm
        console.log('this.Dateform', this.Dateform)

      },

      validateall() {
        if (this.Dateform.name.length == 0 || this.Dateform.name.length > 30) {
          return false
        } else {
          return true
        }
      },


    },

    mounted() {
      this.getTempList()
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
    .have-link {
      color: #3CC51F;
      cursor: pointer;
    }
  }
</style>
