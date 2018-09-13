<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>XX管理</span>
        <el-button type="success" @click="addGroup" class="button">添加分组</el-button>
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
              <span class="error" v-if="error">*组名重名，请重新命名</span>
            </el-form-item>

            <el-form-item label="设备列表">
              <div class="treeCount">
                <!--<div class="title">设备列表</div>-->
                <div class="equipmentList">
                  <div>
                    <div class="title">
                      <!--<el-checkbox>所有设备</el-checkbox>-->
                      <span>所有设备</span>
                      <span></span>
                    </div>
                    <div class="leftTree common">
                      <div class="treeBody">
                        <el-input
                          placeholder="输入关键字进行过滤"
                          v-model="filterKey">
                        </el-input>
                        <div class="tree-detail">
                          <el-tree
                            ref="tree"
                            node-key="id"
                            :filter-node-method="filterNode"
                            :data="equTree"
                            :props="props"
                            @check="checkNode"
                            show-checkbox>
                            <!---->

                          </el-tree>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="centre">
                    <!--<span class="el-icon-arrow-left active"></span>-->
                    <!--<span class="el-icon-arrow-left blue"></span>-->
                  </div>
                  <div>
                    <div class="title">
                      <!--<el-checkbox>已选设备</el-checkbox>-->
                      <span>已选设备</span>
                      <span>{{selectedDevice.length}}</span>
                    </div>
                    <div class="rightList common">
                      <div class="treeBody">
                        <el-input
                          placeholder="输入关键字进行过滤"
                          v-model="filterKey">
                        </el-input>
                        <el-form-item label="">
                          <!--<el-checkbox-group v-model="sendKeyList" @change="getkey">-->
                          <!--<el-checkbox :label="item.id"-->
                          <!--:value="item.id"-->
                          <!--:key="item.id" v-for="(item ,index) in selectedDevice" >{{item.label}}-->
                          <!--</el-checkbox>-->
                          <div v-for="(item ,index) in selectedDevice" class="selected-item">
                            <span>{{item.label}}</span>
                            <span class="el-icon-close" @click="delSel(item)"></span>
                          </div>
                          <!--</el-checkbox-group>-->
                        </el-form-item>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </el-form-item>
          </el-form>


        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddContent=false">取 消</el-button>
          <el-button type="primary" v-if="!editStatus" @click="save">保 存</el-button>
          <el-button type="primary" v-if="editStatus" @click="modify">修 改</el-button>
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
        error: false,
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
          label: 'label',
          children: 'children',
          key: 'id',
        },
        equTree: [],
        filterKey: '',
        selectedList: [],
        editStatus: false,
        selectedDevice: [],
        selectedKey: [],
        sendKeyList: [],
        allSelectKey: [],
        allSelectNode: [],
        currentId: '',
      }
    },
    methods: {
      ...mapActions([
        'groupContList',
        'hotelTree',
        'devicesList',
        'saveGroup',
        'modifyGroup',
        'groupDetail',

      ]),
      addGroup() {
        this.showAddContent = true
        this.form.groupName = ''
        this.selectedDevice = []
        this.selectedKey = []
        this.getHotelTree()
      },
      getkey(parm) {
        console.log('getkey', parm)
        this.sendKeyList = parm
      },

      save() {
        console.log('this.sendKeyList', this.sendKeyList)
        let temp = {
          "deviceIds": this.sendKeyList.length > 0 ? this.sendKeyList.join(',') : "",
          "deviceType": "",
          "hotelIds": "",
          "id": "",
          "name": this.form.groupName,
          "status": ""
        }
        this.saveGroup({
          data: temp,
          onsuccess: body => {
            this.showAddContent = false
            this.getGroupContList()
          }
        })
      },

      delSel(parm) {
        this.selectedDevice.splice(this.selectedDevice.indexOf(parm), 1);

        let temp = []
        this.selectedDevice.map(v => {
          temp.push(v.id)
        })
        this.$nextTick(function () {
          this.sendKeyList = temp
        })

        this.$refs.tree.setChecked(parm.id, false, false)
      },

      modify() {
        let temp = {
          "deviceIds": this.sendKeyList.length > 0 ? this.sendKeyList.join(',') : "",
          "deviceType": "",
          "hotelIds": "",
          "id": "",
          "name": this.form.groupName,
          "status": ""
        }
        this.modifyGroup({
          id: this.currentId,
          data: temp,
          onsuccess: body => {
            this.showAddContent = false
            this.getGroupContList()
          }
        })
      },

      getGroupContList() {
        this.groupContList({
          onsuccess: body => {
            this.tableData = body.data.list
          }
        })
      },

      getHotelTree() {
        this.hotelTree({
          onsuccess: body => {
            this.equTree = body.data
          }
        })
      },

      handleEdit(parm) {
        this.selectedDevice = []
        this.selectedKey = []
        this.showAddContent = true;
        this.editStatus = true;
        this.form.groupName = parm.name;
        this.getHotelTree();
        this.currentId = parm.id
        this.groupDetail({
          id: parm.id,
          onsuccess: body => {
            console.log(body.data)
            let temp = []
            this.selectedDevice = body.data.deviceAdvVos
            this.selectedDevice.map(v => {
              temp.push(v.id)
            })
            this.$nextTick(function () {
              this.selectedKey = temp
            })
          }
        })

      },

      checkNode(parm1, parm2) {
        console.log("parm2", parm2)

        if (this.selectedKey.indexOf(parm1.id) == -1) {
          this.selectedKey.push(parm1.id)
          console.log('首次点击')
          if (parm1.children) {    //非叶子节点
            this.devicesList({
              hotelid: parm1.id,
              onsuccess: body => {
                let temp = []
                parm1.children = []
                temp = body.data
                if (temp.length > 0) {
                  temp.map(i => {
                    i.id = parm1.id + '-' + i.id
                    i.label = parm1.label + '-' + i.label

                  })
                  console.log('temptemp', temp)
                  this.$nextTick(function () {
                    parm1.children = temp
                  })

                }
              }
            })
          } else {//叶子节点
            this.$nextTick(function () {
              let tempnode = []
              if (parm2.checkedNodes.length > 0) {
                this.selectedDevice = []
                parm2.checkedNodes.map(item => {
                  if (!item.children) {
                    tempnode.push(item)
                  }
                })
              }
              this.selectedDevice = tempnode
              this.sendKeyList = []
              this.selectedDevice.map(v => {
                this.sendKeyList.push(v.id)
              })

            })
          }
        } else {
          console.log('非首次点击')
        }


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
        this.$refs.tree.filter(val);
      },
//      sendKeyList(val) {
//        console.log(val)
//      }
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
    /deep/ .el-dialog__header {
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
          .title {
            width: 260px;
            height: 40px;
            background-color: #F5F7FA;
            color: #9B9B9B;
            border: 1px solid #F5F7FA;
            border-radius: 5px 5px 0 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;

          }
          .common {
            width: 280px;
            height: 300px;
            border: 1px solid #F5F7FA;
            border-radius: 0 0 5px 5px;
            position: relative;
            overflow-x: scroll;
            overflow-y: scroll;

            .el-checkbox {
              margin-left: 15px;
            }
            span {
              margin-right: 15px;
            }
            .el-input {
              width: 100%;
            }
            /deep/ .el-input .el-input__inner {
              border-radius: 16px;
              margin-top: 10px;
              background-color: #FFFFFF;
              border: 1px solid #d6d6d6;
              height: 32px;
            }
            .treeBody {
              width: 280px;
              overflow-x: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              .el-input {
                width: 90%;
              }
              .tree-detail {
                align-self: flex-start;
              }
            }
            /deep/ .el-tree__empty-text {
              display: none;
            }
            .selected-item {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              height: 30px;
              span {
                display: block;
              }
            }

          }
          .centre {
            width: 50px;
          }
        }
      }
    }

  }

  .have-link {
    color: #3CC51F;
    cursor: pointer;
  }

</style>
