<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>素材管理</span>
        <el-button type="success" @click="add()" class="button">添加素材</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="ID" type="index"></el-table-column>
          <el-table-column prop="name" label="素材名"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
            <template slot-scope="scope">
              <span>{{formatdate(scope.row.updateTime, 'YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="have-link" @click="handleView(scope.row)">查看</span>
              <span class="have-link" @click="edit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="dialogModel">
        <el-dialog :title="title" :visible.sync="showAddContent" center>
          <div class="rec">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="素材名称">
                <el-input v-model="form.mattertName" placeholder="请输入素材名" :disabled="viewStatus"></el-input>
                <!--<span class="error">*素材名重名，请重新命名</span>-->

              </el-form-item>

              <el-form-item label="素材类型">
                <el-radio v-model="form.mattertType" label="VIDEO">视频</el-radio>
              </el-form-item>


              <span class="people">针对人群</span>
              <el-form-item label="性别">
                <el-radio-group v-model="form.aimtAtSex">
                  <el-radio :disabled="viewStatus" :label="item.code" :key="item.code"
                            v-for="(item,index) in Dateform.aimtAtSex">
                    {{item.name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="年龄段">
                <div class="agecount">
                  <div>
                    <el-radio-group v-model="form.aimtAtAge">
                      <el-radio label="不限" :disabled="viewStatus">不限</el-radio>
                      <el-radio label="特定年龄段" :disabled="viewStatus">特定年龄段</el-radio>
                    </el-radio-group>
                  </div>
                  <span class="ageRange" v-if="form.aimtAtAge=='特定年龄段'">
                  <!--<el-radio v-model="form.aimtAtAge" label="不限" :disabled="viewStatus">不限</el-radio>-->
                <div class="ageNum">
                  <el-input-number :disabled="viewStatus" v-model="form.ageLow" :controls="false" :min="1"
                                   :max="200"></el-input-number>至
                <el-input-number :disabled="viewStatus" v-model="form.ageTop" :controls="false" :min="1"
                                 :max="200"></el-input-number>岁
                </div>
              </span>
                </div>

              </el-form-item>
              <el-form-item label="广告商">
                <el-select v-model="form.mattertListValue" placeholder="请选择广告商" size="100%" :disabled="viewStatus">
                  <el-option :label="item.name" v-for="(item ,index) in Dateform.mattertList" :key="index"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="素材审核编号">
                <el-input :disabled="viewStatus" v-model="form.mattertAuditNum" placeholder="请输入素材审核编号"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input :disabled="viewStatus" v-model="form.comment" placeholder="请输入备注"></el-input>
              </el-form-item>
              <div class="upload">
                <div class="rowContral">
                  <el-upload
                    class="upload-demo el-right"
                    :action="scriptUpload"
                    :show-file-list=false
                    :before-upload='beforeUploadfilter'
                    :headers="setHeader"
                    :on-success="filterScriptSuccess"
                    :on-preview="handlePictureCardPreview"
                    :onError="uploadError"
                    :on-progress="uploadVideoProcess"
                    list-type="picture-card">
                    <el-button size="small" type="primary" :disabled="viewStatus">上传素材</el-button>


                  </el-upload>
                  <video style="width: 300px;height: 200px" v-if="viewStatus ||editStatus " :autoplay="playVideo"
                         :src="form.uplodGetUrl"></video>
                </div>

                <el-progress v-if="videoFlag == true" :percentage="videoUploadPercent"
                             style="margin-top:30px;"></el-progress>
              </div>


            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" v-if="!viewStatus">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button v-if="!editStatus" type="primary" :disabled="!validateall" @click="save">保 存</el-button>
            <el-button v-if="editStatus" type="primary" :disabled="!validateall" @click="handleEdit">确 认</el-button>
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
    data() {
      return {
        title: "添加素材",
        showAgeNum: false,
        showAddContent: false,
        tableData: [],
        form: {
          mattertName: '',
          mattertType: '',
          aimtAtSex: '',
          aimtAtAge: '不限',
          ageLow: '',
          ageTop: '',
          mattertListValue: '',
          mattertAuditNum: '',
          comment: '',
          uplodGetUrl: '',
        },
        Dateform: {
          mattertType: [
            {
              name: "视频",
              code: "VIDEO",
            }
          ],
          aimtAtSex: [
            {
              name: "男",
              code: "MAN",
            },
            {
              name: "女",
              code: "woman",
            },
            {
              name: "不限",
              code: "nothing",
            },
          ],
          mattertList: [],
        },
        havePut: false,
        pageSize: 10,
        currentPage: 1,
        Total: 0,
        viewStatus: false,
        formatScript: "",
        currentTemp: {},
        editStatus: false,
        videoFlag: false,
        videoUploadPercent: '',
        playVideo: true,

      }
    },
    computed: {
      ...mapState([
        'route',
        'Interface'
      ]),
      scriptUpload() {
        return "/virgo/files/adv/upload";
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
        }
      },
      validateall() {
        if (this.form.mattertName.length == 0 ||
          this.form.mattertName.length > 30 ||
          this.form.mattertListValue == '' ||
          this.form.mattertAuditNum.length > 99 ||
          this.form.comment.length > 99

        ) {
          return false
        } else {
          return true
        }
      },
    },
    methods: {
      ...mapActions([
        'goto',
        'MatterList',
        'saveMatter',
        'modifiMatter',
        'checkMatter',
        'viewMatter',
        'allCanSelectedCom',

      ]),

      resetparm() {
        this.form = {
          mattertName: '',
          mattertType: 'VIDEO:',
          aimtAtSex: 'nothing',
          aimtAtAge: '不限',
          ageLow: '',
          ageTop: '',
          mattertListValue: '',
          mattertAuditNum: '',
          comment: '',
          uplodGetUrl: '',

        };
      },

      formatdate(param, status) {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
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
      currentChange(argum) {
        console.log('当前', argum)
        this.currentPage = argum
        this.$nextTick(function () {
          this.getMatterList()
        })

      },
      getMatterList() {
        this.MatterList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.tableData = body.data.list
            this.Total = body.data.total

          }
        })
      },
      getAllCanSelectedCom() {
        this.allCanSelectedCom({
          onsuccess: body => {
            this.Dateform.mattertList = body.data.list

          }
        })
      },
      add() {
        this.viewStatus = false
        this.title = '添加素材'
        this.showAddContent = true
        this.resetparm()
      },

      save() {
        let temp = {
          advMatch: {
            "ageBegin": this.form.ageLow,
            "ageEnd": this.form.ageTop,
            "ageType": this.form.aimtAtAge=="不限" ? "ALL" : "PART",
            "id": "string",
            "sexType": this.form.aimtAtSex,
//            "status": "未知",
            "weight": 0
          },
          "companyId": this.form.mattertListValue,
//          "id": "未知",
          "name": this.form.mattertName,
          "remark": this.form.comment,
          "serialNumber": this.form.mattertAuditNum,
//          "source": "未知",
//          "status": "未知",
          "type": this.form.mattertType,
          "url": this.form.uplodGetUrl,

        }
        this.saveMatter({
          data: temp,
          onsuccess: body => {
            this.showAddContent = false;
            this.getMatterList()
          }
        })
      },

      handleView(parm) {
        this.title = '查看素材';
        this.currentTemp = []
        this.currentTemp = parm
        this.viewStatus = true
        this.showAddContent = true;
        this.viewMatter({
          id: parm.id,
          onsuccess: body => {
            this.form.mattertType = body.data.type
            this.form.aimtAtSex = body.data.advMatch.sexType
            this.form.aimtAtAge = body.data.advMatch.ageType == 'ALL' ? '不限' : '特定年龄段'
            this.form.ageLow = body.data.advMatch.ageBegin
            this.form.ageTop = body.data.advMatch.ageEnd
            this.form.mattertName = body.data.name
            this.form.comment = body.data.remark
            this.form.uplodGetUrl = body.data.url
            this.form.mattertListValue = body.data.companyName
            this.form.mattertAuditNum = body.data.serialNumber
          }
        })
      },

      edit(parm) {
        console.log(parm)
        this.checkMatter({
          id: parm.id,
          onsuccess: body => {
            if (!body.data) {
              this.$message({
                message: '不可更改已经投放了',
                type: 'success'
              });
            } else {
//              title:"",
              this.title = '编辑素材';
              this.showAddContent = true;
              this.editStatus = true;
              this.viewStatus = false
              this.currentTemp = parm
              this.viewMatter({
                id: parm.id,
                onsuccess: body => {
//            this.form.mattertName=
                  this.form.mattertType = body.data.type
                  this.form.aimtAtSex = body.data.advMatch.sexType
                  this.form.aimtAtAge = body.data.advMatch.ageType == 'ALL' ? '不限' : '特定年龄段'
                  this.form.ageLow = body.data.advMatch.ageBegin
                  this.form.ageTop = body.data.advMatch.ageEnd
                  this.form.mattertListValue = body.data.companyName
                  this.form.mattertAuditNum = body.data.serialNumber
                  this.form.mattertName = body.data.name
                  this.form.comment = body.data.remark
                  this.form.uplodGetUrl = body.data.url
                }
              })

            }
          }
        })

      },

      handleEdit() {
        console.log('11111',this.form.aimtAtAge)

        let temp = {
          advMatch: {
            "ageBegin": this.form.ageLow,
            "ageEnd": this.form.ageTop,
            "ageType": this.form.aimtAtAge=="不限" ? "ALL" : "PART",
            "id": "string",
            "sexType": this.form.aimtAtSex,
//            "status": "未知",
            "weight": 0
          },
          "companyId": this.form.mattertListValue,
//          "id": "未知",
          "name": this.form.mattertName,
          "remark": this.form.comment,
          "serialNumber": this.form.mattertAuditNum,
//          "source": "未知",
//          "status": "未知",
          "type": this.form.mattertType,
          "url": this.form.uplodGetUrl,

        }
        this.modifiMatter({
          id: this.currentTemp.id,
          data: temp,
          onsuccess: body => {
            this.showAddContent = false
            this.getMatterList()
          }
        })
      },

      beforeUploadfilter(file) {
//        this.file = file
//        console.log('file', file)
      },

      uploadError(response, file, fileList) {
        console.log('上传失败，请重试！1', response)
        console.log('上传失败，请重试！2', file)
        console.log('上传失败，请重试！3', fileList)
      },

      filterScriptSuccess(res, file, list) {
        console.log(res)
        if (res.data) {
          this.form.uplodGetUrl = res.data;
          this.videoFlag = false;
        }
      },
      handlePictureCardPreview(file) {
        this.form.uplodGetUrl = file.data;
        this.videoFlag = false;
      },
      uploadVideoProcess(event, file, fileList) {
        console.log('filefilefile', file)
        this.videoFlag = true;
        this.videoUploadPercent = parseInt(file.percentage.toFixed(0));
      },
    },
    watch: {},
    mounted() {
      this.getMatterList()
      this.getAllCanSelectedCom()
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
    /deep/ .tableList {
      table tr {
        background-color: #cccccc;
      }
      .el-table th, .el-table tr {
        background-color: #cccccc;
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
          padding-top: 0px;
        }
        .el-input {
        }
        .agecount {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .ageRange {
          display: flex;
          flex-direction: row;
          align-items: center;
          .ageNum {
            margin-left: 30px;
          }
          .el-input {
            width: 34px;
            height: 24px;
            line-height: 24px;
            border-radius: 5px;
            padding: 0;
            margin: 0;
          }
          .el-input-number {
            width: 40px;
            margin: 0 10px;
          }
          .el-input-number.is-without-controls .el-input__inner {
            padding: 0;
            margin: 0;
            border-radius: 4px;

          }
        }
        .el-select {
          width: 100%;
        }
        .el-button--primary {
          color: #fff;
          background-color: #3AC240;
          border-color: #3AC240;
          width: 137px;
          height: 39px;
          border-radius: 1px;
        }
        .el-form-item {
          margin-bottom: 5px;
        }
        .el-radio__inner {
          width: 24px;
          height: 24px;
          /*border-color: #3AC240;*/
          border-color: #dfdfdf;
          background: #e8e8e8;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #3AC240;
          background: #3AC240;
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
      .people {
        color: #4A4A4A;
        font-size: 16px;
      }
    }

    .error {
      color: #ff2712;
      font-size: 10px;
      display: block;
    }
    .have-link {
      color: #3CC51F;
      cursor: pointer;
    }
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 40px;
      background: none;
      border: none;
      margin-top: -10px;
      margin-bottom: 30px;
    }
    .upload {
      display: flex;
      flex-direction: column;

      .rowContral {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        video {
          margin-left: 60px;
        }
      }
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
