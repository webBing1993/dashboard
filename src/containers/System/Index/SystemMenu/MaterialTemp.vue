<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>模板管理</span>
        <el-button type="success" @click="add()" class="button">添加模板</el-button>
      </div>
      <div class="tableList dataTable">
        <el-table
          :data="tableData"
          width="100%">
          <el-table-column prop="id" label="ID" width="180"></el-table-column>
          <el-table-column prop="name" label="名称" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="have-link" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog :title="title" :visible.sync="showAddContent"

                 center>
        <!--<div class="rec">-->
        <el-form ref="form" :model="form" label-width="180px" labelPosition="left">
          <el-form-item label="模板名称">
            <el-input v-model="Dateform.name" maxlength="30"minlength="1" ></el-input>
          </el-form-item>
          <el-form-item label="上传信息">
            <img class="img_wh" :src="Dateform.logoUrl" alt="">
            <el-upload
              class="upload-demo el-right"
              :action="scriptUpload"
              :show-file-list=false
              :headers="setHeader"
              :before-upload='beforeUploadfilter'
              :on-preview="handlePictureCardPreview"
              :on-success="filterScriptSuccess"
              :onError="uploadError"
              list-type="picture-card"
              >
              <el-button size="small" type="primary">{{editStatus ? "重新上传logo" : "上传logo"}}</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="二代证读卡间隔">
            <el-select v-model="Dateform.readInterval" placeholder="请选择">
              <el-option :label="item.value" v-for="(item ,index) in initDate.IdCardReadTime" :key="index"
                         :value="item.value">{{item.value}}
              </el-option>
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
        title: '添加模板',
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
          readInterval: '2秒',
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
        return "/virgo/files/logo/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      },
      validateall() {
        if (this.Dateform.name.length == 0 || this.Dateform.name.length > 30 || this.Dateform.logoUrl == '') {
          return false
        } else {
          return true
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
      add() {
        this.editStatus=false
        this.showAddContent = true
        this.Dateform.name = ''
        this.Dateform.logoUrl = ''
        this.Dateform.readInterval = '2秒';
        this.Dateform.searchMode = '找相似度最高'
        this.Dateform.uploadOn = true
        this.Dateform.uploadLower = true
        this.Dateform.remindFinish = false
        this.Dateform.cardReal = true
        this.Dateform.undocumentReal = true

      },

      beforeUploadfilter(file) {
//        this.file = file
        console.log('file', file)
      },
      uploadError(response, file, fileList) {
        console.log('上传失败，请重试！1', response)
        console.log('上传失败，请重试！2', file)
        console.log('上传失败，请重试！3', fileList)
      },
      filterScriptSuccess(res, file, list) {
        console.log('resresres', res)
        if (res.data) {
          this.Dateform.logoUrl = res.data;
        }
      },
      handlePictureCardPreview(file) {
        this.Dateform.logoUrl= file.data;
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
        let tempcode = '';
        this.Dateform.readInterval
        this.initDate.IdCardReadTime.map(item => {
          if (this.Dateform.readInterval == item.value) {
            tempcode = item.id
          }
        })


        let temo = {
          "name": this.Dateform.name,
          "logoUrl": this.Dateform.logoUrl,
//          "readInterval": this.Dateform.readInterval,
          "readInterval": tempcode || this.Dateform.readInterval,
          "searchMode": 1, //this.Dateform.searchMode,
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
        let tempcode = '';
        this.Dateform.readInterval
        this.initDate.IdCardReadTime.map(item => {
          if (this.Dateform.readInterval == item.value) {
            tempcode = item.id
          }
        })
        let temp = {
          "name": this.Dateform.name,
          "logoUrl": this.Dateform.logoUrl,
          "readInterval": tempcode || this.Dateform.readInterval,
//          "readInterval": this.Dateform.readInterval,
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
        this.title = '编辑模板'
        this.editStatus = true
        this.showAddContent = true
        this.Dateform = parm
        this.Dateform.id = parm.id
        this.Dateform.searchMode = '找相似度最高'
        this.Dateform.logoUrl = parm.logoUrl
        this.Dateform.readInterval = parm.readInterval

      },

//      validateall() {
//        if (this.Dateform.name.length == 0 || this.Dateform.name.length > 30) {
//          return false
//        } else {
//          return true
//        }
//      },


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
            top: 0px;
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
    .el-button--default {
      width: 160px;
      height: 40px;
      border-radius: 2px;
    }
    .el-button--primary {
      background-color: #3CC51F;
      border: 1px solid #3CC51F;
      width: 160px;
      height: 40px;
      border-radius: 2px;
      margin-top: 80px;
    }
    /deep/ .el-switch.is-checked .el-switch__core {
      background-color: #3CC51F;
      border: 1px solid #3CC51F;
    }
    /deep/.el-upload--picture-card{
      width: 100px;
      height: 40px;
      background: none;
      border: none;
      margin-top: -80px;
    }
    .img_wh {
      width: 100px;
      height: 100px
    }
  }
</style>
