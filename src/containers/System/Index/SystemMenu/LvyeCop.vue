<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>旅业公司</span>
        <el-button type="success" @click.native="addLvyeCop" class="button">添 加</el-button>
      </div>
      <table-lvyeCop :list='lvyeCopList' @edit="editItem" @del="delItem"></table-lvyeCop>
    </div>
    <div class="dialogModel">
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
            <div class="transfer">
              <el-form-item label="人证通模板">
                <el-transfer v-model="HaveSelectedTemplateList"
                             :titles="['所有设备', '已选设备']"
                             :data="ALLTemplateList"></el-transfer>
              </el-form-item>
            </div>

          </el-form>


        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddContent=false">取 消</el-button>
          <el-button type="primary" @click="save" :disabled="validate">保 存</el-button>
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
        'bindLvyeCopInfo',

        'delLvyeCopInfo',
        'updateLvyeCopInfo',
        'haveSelectTemplateList',
        'tempList',
      ]),
      save() {
        if (!this.flag) {
          this.saveLvyeCopInfo({
            lvyecode: this.copCode,
            data: {
              lvyeCode: this.copCode,
              lvyeName: this.copName,
              templates: this.HaveSelectedTemplateList.length > 0 ? this.HaveSelectedTemplateList.join(',') : ''
            },
            onsuccess: body => {
              this.bindLvyeCopInfo({
                data: {
                  code: this.copCode,
                  name: this.copName,
                },
                onsuccess: body => {
                  this.showAddContent = false;
                  this.getLvyeCopLists()
                }
              });

            }
          });

        } else {
//          this.updateLvyeCopInfo({
          this.saveLvyeCopInfo({
            lvyecode: this.copCode,
            data: {
              lvyeCode: this.copCode,
              lvyeName: this.copName,
              templates: this.HaveSelectedTemplateList.length > 0 ? this.HaveSelectedTemplateList.join(',') : ''
            },
            onsuccess: body => {
              this.updateLvyeCopInfo({
                data: {
                  code: this.copCode,
                  name: this.copName,
                },
                onsuccess: body => {
                  this.showAddContent = false;
                  this.getLvyeCopLists()
                }
              })
            }
          })
        }

      },

      editItem(obj) {
        this.showAddContent = true;
        this.flag = true;
        this.copCode = obj.code;
        this.copName = obj.name;

        this.ALLTemplateList = []
        this.HaveSelectedTemplateList = []

        this.getAllTempList()
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
            body.data.map(item => {
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

    /deep/ .dialogModel {
      .el-dialog__header{
        text-align: left;
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
      .el-dialog {
        width: 65%;


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
    }
    /deep/ .rec {
      /deep/ .el-checkbox__inner {
        background-color: #39C240;
        border-color: #39C240;
      }
      .el-checkbox__label {
        color: #39C240;
      }
    }

    /deep/ .transfer {
      .el-checkbox__inner {
        background-color: #3CC51F !important;
      }
      .el-button--primary {
        background-color: #3CC51F !important;
      }
    }
  }
</style>
