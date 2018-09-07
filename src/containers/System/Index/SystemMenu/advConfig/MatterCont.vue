<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>XX管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加素材</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="素材名"></el-table-column>
          <el-table-column label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="handleView(scope.row)">查看</span>
              <span @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="dialogModel">
        <el-dialog title="添加素材" :visible.sync="showAddContent" center>
          <div class="rec">
            <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
              <el-form-item label="素材名称">
                <el-input v-model="form.mattertName" placeholder="请输入素材名"></el-input>
                <span class="error">*素材名重名，请重新命名</span>

              </el-form-item>

              <el-form-item label="素材类型">
                <el-radio-group v-model="form.mattertType">
                  <el-radio :label="item.code" :key="item.code" v-for="(item,index) in Dateform.mattertType">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <span class="people">针对人群</span>
              <el-form-item label="性别">
                <el-radio-group v-model="form.aimtAtSex">
                  <el-radio :label="item.code" :key="item.code" v-for="(item,index) in Dateform.aimtAtSex">
                    {{item.name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄段">
                <span class="ageRange">
                <el-radio-group v-model="form.aimtAtAge">
                  <el-radio :label="item.code" :key="item.code"
                            v-for="(item,index) in Dateform.aimtAtAge">{{item.name}}</el-radio>
                </el-radio-group>

                <el-input-number :controls="false" :min="1" :max="100"></el-input-number>至
                <el-input-number :controls="false" :min="1" :max="100"></el-input-number>岁
              </span>

                <span class="error">年龄段未设置</span>
              </el-form-item>
              <el-form-item label="广告商">
                <el-select v-model="form.mattertListValue" placeholder="请选择广告商" size="100%">
                  <el-option :label="item.value" v-for="(item ,index) in Dateform.mattertList" :key="index"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="素材审核编号">
                <el-input v-model="form.mattertAuditNum" placeholder="请输入素材审核编号"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.comment" placeholder="请输入备注"></el-input>
              </el-form-item>
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--:limit="1">-->
                <!--<el-button size="small" type="primary">上传素材</el-button>-->
              <!--</el-upload>-->

              <el-upload
                class="upload-demo el-right"
                :action="scriptUpload"
                :headers="setHeader"
                :data="{'script_type':'filter'}"
                :show-file-list=false
                :before-upload='beforeUploadfilter'
                :on-success="filterScriptSuccess"
                :limit=1>
                <el-button size="small" type="primary">{{formatScript ? '上传素材' : '选择上传文件'}}</el-button>
              </el-upload>

            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
          <div v-if="viewStatus">查看的信息</div>
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
    data() {
      return {
        showAddContent: false,
        tableData: [
          {
            "id": "1aa87764e31145bc9a28e5a179ac0632",
            "serialNumber": "string",
            "name": "string",
            "url": "string",
            "type": "string",
            "source": "string",
            "companyId": "string",
            "remark": "string",
            "status": "string",
            "isDelete": true
          },
          {
            "id": "5105895e9cf34e6bb2e0f7c2a834c897",
            "serialNumber": "1111",
            "name": "测试视频",
            "url": "http://for-test01.oss-cn-beijing.aliyuncs.com/%E5%B9%BF%E5%91%8A4.2%201080.mp4",
            "type": "VIDEO",
            "source": "string",
            "companyId": "630fc706ab86400896aef6673552e2ac",
            "remark": "测试专用",
            "status": "OPEN"
          }
        ],
        form: {
          mattertName: '',
          mattertType: '',
          aimtAtSex: '',
          aimtAtAge: '',
          mattertListValue: '',
          mattertAuditNum: '',
          comment: '',

        },
        Dateform: {
          mattertType: [
            {
              name: "视频",
              code: "sp",
            }
          ],
          aimtAtSex: [
            {
              name: "男",
              code: "man",
            },
            {
              name: "女",
              code: "w",
            },
            {
              name: "不限",
              code: "man",
            },
          ],
          aimtAtAge: [
            {
              name: "不限",
              code: "man",
            },
            {
              name: "特定年龄",
              code: "w",
            }
          ],
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
        },
        pageSize: 10,
        currentPage: 1,
        Total: 100,
        viewStatus: false,
        formatScript: "",

      }
    },
    computed: {
      ...mapState([
        'route',
        'Interface'
      ]),
      scriptUpload(){
        return "/virgo/scriptupload/" + this.$route.params.hotelid
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
        'MatterList',
        'saveMatter',
        'modifiMatter',
        'viewMatter',
        'allCanSelectedCom',

      ]),

      getMatterList() {
        this.MatterList({
          page: this.currentPage,
          pageSize: this.pageSize,
          onsuccess: body => {
            this.Dateform.tableData = body.data
          }
        })
      },
      getAllCanSelectedCom() {
        this.allCanSelectedCom({
          id: '',//不知道是啥id
          onsuccess: body => {
            this.mattertList = body.data
          }
        })
      },
      save() {
      },
      handleView(parm) {
        this.viewMatter({
          id: parm.id,
          onsuccess: body => {

          }
        })

      },

      handleEdit(parm) {
        this.modifiMatter({
          id: parm.id,
          data: {},
          onsuccess: body => {
            this.showAddContent = false;
            this.getMatterList()
          }
        })
      },

      beforeUploadfilter(){
        this.fileList2 = []
      },
      filterScriptSuccess(res, file, list){
        if (res.data) {
          this.filterScript = res.data.script_name;
        }
      },
    },

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
            top: 10px;

          }
        }
        .el-dialog__body {
          padding-right: 200px;
          padding-top: 0px;
        }
        .el-input {
        }
        .ageRange {
          .el-input {
            width: 80px;
            border-radius: 5px;
          }
          .el-input-number {
            width: 80px;
            margin: 0 20px;
          }
          .el-input-number.is-without-controls .el-input__inner {
            border-radius: 10px;

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
  }
</style>
