<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>旅业公司</span>
        <el-button type="success" @click.native="addLvyeCop" class="button">添 加</el-button>
      </div>
      <table-lvyeCop :list='lvyeCopList' @edit="editItem" @del="delItem"></table-lvyeCop>
    </div>
    <el-dialog title="添加旅业公司"
               :visible.sync="showAddContent"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="true"
               width=""
               @close="handleClose"
               center>
      <div class="rec">
        <el-form ref="form" label-width="100px" labelPosition="left">
          <el-form-item label="编码">
            <el-input v-model="copCode" placeholder="请输入编码" class="input"
                      :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="copName" placeholder="请输入旅业公司名称" class="input"></el-input>
          </el-form-item>
        </el-form>

        <!--<div class="treeCount">-->
        <!--<div class="title">人证通模板</div>-->
        <!--<div class="equipmentList">-->
        <!--<div class="leftTree common">-->
        <!--<div class="title">-->
        <!--<el-checkbox>所有模板</el-checkbox>-->
        <!--<span>10</span>-->
        <!--</div>-->
        <!--<div class="treeBody">-->
        <!--<el-input-->
        <!--v-model="filterText_l"-->
        <!--placeholder="输入模板名称">-->
        <!--</el-input>-->
        <!--<el-tree-->
        <!--class="filter-tree"-->
        <!--:data="ALLTemplateList"-->
        <!--:props="defaultProps_l"-->
        <!--default-expand-all-->
        <!--show-checkbox-->
        <!--:filter-node-method="filterNode_l"-->
        <!--ref="tree">-->
        <!--</el-tree>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="centre">-->
        <!--<span class="el-icon-arrow-left active"></span>-->
        <!--<span class="el-icon-arrow-left blue"></span>-->
        <!--</div>-->
        <!--<div class="rightList common">-->
        <!--<div class="title">-->
        <!--<el-checkbox>已选模板</el-checkbox>-->
        <!--<span>2</span>-->
        <!--</div>-->
        <!--<div class="treeBody">-->
        <!--<el-input-->
        <!--v-model="filterText_r"-->
        <!--placeholder="请输入模板名称">-->
        <!--</el-input>-->
        <!--&lt;!&ndash;<el-tree&ndash;&gt;-->
        <!--&lt;!&ndash;class="filter-tree"&ndash;&gt;-->
        <!--&lt;!&ndash;:data="HaveSelectedTemplateList"&ndash;&gt;-->
        <!--&lt;!&ndash;:props="defaultProps_r"&ndash;&gt;-->
        <!--&lt;!&ndash;default-expand-all&ndash;&gt;-->
        <!--&lt;!&ndash;show-checkbox&ndash;&gt;-->
        <!--&lt;!&ndash;:filter-node-method="filterNode_r"&ndash;&gt;-->
        <!--&lt;!&ndash;ref="tree">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-tree>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->


        <el-transfer v-model="HaveSelectedTemplateList" :data="ALLTemplateList"></el-transfer>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddContent=false">取 消</el-button>
        <el-button type="primary" @click="save" :disabled="validate">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        showAddContent: false,
        copCode: '',
        copName: '',
        lvyeCopList: [],
        flag: true,
        ALLTemplateList: [],
        HaveSelectedTemplateList: [],
      }
    },
    computed: {
      ...mapState([
        'route',
        'Interface'
      ]),

      validate() {
        if (this.copCode == '' || this.copName == '') {
          return true
        }
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getLvyeCopList',
        'saveLvyeCopInfo',
        'delLvyeCopInfo',
        'updateLvyeCopInfo',
        'haveSelectTemplateList',
        'tempList',
      ]),
      save() {
        if (!this.flag) {
          this.saveLvyeCopInfo({
            data: {
              code: this.copCode,
              name: this.copName
            },
            onsuccess: body => {
              this.showAddContent = false;
              this.getLvyeCopLists()
            }
          });
        } else {
          this.updateLvyeCopInfo({
            data: {
              code: this.copCode,
              name: this.copName
            },
            onsuccess: body => {
              this.showAddContent = false;
              this.getLvyeCopLists()
            }
          })
        }

      },

      editItem(obj) {
        this.showAddContent = true;
        this.flag = true;
        this.copCode = obj.code;
        this.copName = obj.name;
        this.getHaveSelectTemp()
      },

      delItem(obj) {
        this.delLvyeCopInfo({
          code: obj.code,
          onsuccess: body => {
            this.showAddContent = false;
            this.getLvyeCopLists()
          }
        })
      },

      handleClose() {

      },

      //添加旅业酒店
      addLvyeCop() {
        this.showAddContent = true;
        this.flag = false
        this.copCode = '';
        this.copName = '';
        this.getAllTempList();

      },
      //获取旅业酒店列表

      getLvyeCopLists() {
        this.getLvyeCopList({
          onsuccess: body => {
            this.lvyeCopList = body.data
          }
        })
      },

      getHaveSelectTemp() {
        this.haveSelectTemplateList({
          lvyecode: this.copCode,
          onsuccess: body => {
//            this.HaveSelectedTemplateList = body.data
            body.data.map(item=>{
              this.HaveSelectedTemplateList.push(item.id)
            })
          }

        })
      },
//      获取所有的模板列表
      getAllTempList() {
        this.tempList({
          onsuccess: body => {
//            this.ALLTemplateList = body.data
            body.data.map(item => {
              this.ALLTemplateList.push({
                label: item.name,
                key: item.id,
              })
            })

          }
        })
      },
    },

    mounted() {
      this.getLvyeCopLists()
//      this.getAllTempList()
//      this.getHaveSelectTemp()
    },
    watch: {},
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
  }
</style>
