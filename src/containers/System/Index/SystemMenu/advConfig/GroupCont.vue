<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>XX管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加分组</el-button>
      </div>
      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="组名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="have-link" @click="handleEdit(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="添加分组" :visible.sync="showAddContent" center>
        <div class="rec">
          <el-form ref="form" :model="form" label-width="100px" labelPosition="left">
            <el-form-item label="组名">
              <el-input v-model="form.groupName"></el-input>
              <span class="error">*组名重名，请重新命名</span>
            </el-form-item>
          </el-form>
          <div class="treeCount">
            <div class="title">设备列表</div>
            <div class="equipmentList">
              <div class="leftTree common">
                <div class="title">
                  <el-checkbox>所有设备</el-checkbox>
                  <span>10</span>
                </div>
                <div class="treeBody">
                  <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterKey">
                  </el-input>
                  <el-tree
                    ref="tree2"
                    :data="equTree"
                    :props="props"
                    :filter-node-method="filterNode"
                    show-checkbox
                  >
                  </el-tree>
                </div>
              </div>
              <div class="centre">
                <span class="el-icon-arrow-left active"></span>
                <span class="el-icon-arrow-left blue"></span>
              </div>
              <div class="rightList common">
                <div class="title">
                  <el-checkbox>已选设备</el-checkbox>
                  <span>2</span>
                </div>
                <div class="treeBody">
                  <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterKey">
                  </el-input>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddContent=false">取 消</el-button>
          <el-button type="primary" v-if="!editStatus" @click="save">保 存</el-button>
          <el-button type="primary"v-if="editStatus" @click="modifi">修 改</el-button>
        </div>
      </el-dialog>


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
        tableData: [],
        form: {
          groupName: '',

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
        props: {
          label: 'name',
          children: 'zones'
        },
        equTree: [],
        filterKey: '',
        selectedList: [],
        editStatus:false
      }
    },
    methods: {
      ...mapActions([
        'groupContList',

      ]),
      save() {
      },

      getGroupContList(){
        this.groupContList({
          onsuccess: body => {
            this.tableData=body.data
          }
        })
      },

      handleEdit(){
        this.showAddContent=true
        this.editStatus=true
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }

    },
    computed: {
      ...mapState([
        'route',
        'Interface'
      ]),

    },
    watch: {
      filterKey(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted() {
        this.getGroupContList()
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
    .el-dialog {
      width: 65%;

    }
    /deep/.el-dialog__header {
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
    .error {
      color: #ff2712;
      font-size: 10px;
      display: block;
    }
    .rec {
      .treeCount {
        /*border: 1px solid #9B9B9B;*/
        display: flex;
        flex-direction: row;
        .title {
          width: 100px;

        }
        .equipmentList {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          .common {
            width: 100%;
            height: 300px;
            border: 1px solid #F5F7FA;
            border-radius: 5px;
            .title {
              width: 100%;
              height: 40px;
              background-color: #F5F7FA;
              color: #9B9B9B;
              border-radius: 5px 5px 0 0;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            .el-checkbox {
              margin-left: 15px;
            }
            span {
              margin-right: 15px;
            }
            /deep/ .el-input .el-input__inner {
              border-radius: 16px;
              margin-top: 10px;
              background-color: #FFFFFF;
              border: 1px solid #d6d6d6;
              height: 32px;
            }
            .treeBody {
              padding: 0 10px;
            }

          }
          .centre {
            display: flex;
            flex-direction: column;
            height: 300px;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
            margin-right: 20px;
            span {
              width: 36px;
              height: 36px;
              display: block;
              border-radius: 50%;
              line-height: 36px;
              text-align: center;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .blue {
              color: #8e8e8e;
              background-color: #ebebeb;
              border: 1px solid #8e8e8e;
            }
            .active {
              color: #FFFFFF;
              background-color: #39C240;
            }
          }
        }
      }

    }
    .have-link {
      color: #3CC51F;
      cursor: pointer;
    }
  }
</style>
