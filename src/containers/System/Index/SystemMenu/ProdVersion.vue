<!--产品版本页-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_prodVersion">
        <div class="top">产品版本
          <el-button type="success" @click.native="addProdVersion" class="button">添 加</el-button>
        </div>
        <table-prodVersion :list="list" :page="page" :size="size" @edit="goEdit" @del="goDel"></table-prodVersion>
        <el-dialog title="添加产品版本"
                   :visible.sync="showAddContent"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="true"
                   width=""
                   @close="handleClose"
                   center>
          <div class="rec">
            <div class="item-form" style="font-weight: bolder">基本信息</div>
            <div class="item-form">
              <span class="itemTitle">产品版本</span>
              <el-input v-model="versionName" placeholder="请输入产品版本号" class="input"></el-input>
            </div>
            <div class="item-form">
              <span class="itemTitle">版本描述</span>
              <textarea placeholder="请输入内容" type="text" class="input text" v-model="versionDescribe"></textarea>
            </div>
            <div class="item-form">
              <span class="itemTitle">默认选择</span>
              <el-switch
                v-model="defaultChoice"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

    export default {
        name: 'prodVersion',
        data () {
            return {
                list: [],
                showDialog: false,
                page: 1,
                size: 20,
                total: 0,
                offset:0,
                limit:0,
                showAddContent: false,
                defaultChoice:false,
                versionDescribe:'',
                versionName:'',
                id:''
            }
        },
        computed: {
            groupId () {
                return this.$route.params.id
            },
            hotelId () {
                return this.$route.params.hotelid
            }
        },
        methods: {
            ...mapActions ([
                'getProdVersionList',
                'goto',
                'showtoast',
                'saveProdVersionList',
                'delProdVersion',
                'modifyProdVersionList'
            ]),
            //获取产品版本列表
            getList () {
                this.getProdVersionList ({
                    offset:this.offset,
                    limit:this.limit,
                    onsuccess: body => {
                        this.list = body.data;
                        console.log ('获取产品版本列表：', body.data);
                    }
                })
            },
            //新增／修改产品版本
            save () {
                if(!this.id) {
                    console.log(88888)
                    this.saveProdVersionList ({
                        data: {
                            "version_name": this.versionName,
                            "description": this.versionDescribe,
                            "default_config": this.defaultChoice
                        },
                        onsuccess: body => {
                            this.showAddContent = false;
                            this.getList ();
                        }
                    })
                }else {
                    console.log(77777)
                    this.modifyProdVersionList({
                        id:this.id,
                        data: {
                            "version_name": this.versionName,
                            "description": this.versionDescribe,
                            "default_config": this.defaultChoice
                        },
                        onsuccess: body => {
                            this.showAddContent = false;
                            this.getList ();
                        }
                    })
                }


            },
            //删除产品版本
            goDel (obj) {
                this.delProdVersion({
                    id:obj.id,
                    onsuccess: body => {
                        this.getList();
                    }
                })
            },
            //添加产品版本
            addProdVersion () {
                this.showAddContent = true;

            },
            //编辑产品版本
            goEdit (obj) {
                this.showAddContent = true;
                this.id=obj.id,
                this.versionName=obj.version_name;
                this.versionDescribe=obj.description;
                this.defaultChoice=obj.default_config;
            },
            reset () {
                this.name = "";
                this.tel = "";
                this.address = "";
                this.roomType = [];
                this.lvyeVal = '';
                this.deviceType = [];
                this.id = '';
            },
            handleClose () {
                this.showAddContent = false;

            },
        },
        mounted () {
            this.getList ();
        }
    }
</script>
<style lang="less">
  .module-wrapper {
    padding: 1rem;
    .content_prodVersion {
      .top {
        font-size: 16px;
        height: 3rem;
        margin-bottom: 1rem;
        line-height: 3rem;
        .button {
          float: right;
          left: 500px;
          line-height: 18px;
          min-width: 173px;
          font-size: 13px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin: 0;
        }
      }
      .el-dialog {
        width: 65%;
        .el-dialog__header {
          padding: 0 20px;
          border-bottom: solid 1px #979797;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }
          .el-dialog__headerbtn {
            padding-top: 12px;
          }
        }
        .recCheckbox {
          .el-checkbox {
            margin-left: 0;
            margin-right: 1.5rem;
          }
        }

        .el-icon-search {
          height: 85%;
        }

        .el-transfer-panel__filter {
          padding: 0.2rem 1rem 1.1rem 1rem;
          width: 100%;
        }
        .el-input__inner {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          height: 36px;
        }
        .el-dialog__body {
          padding: 0 20px 33px;
          .rec {
            padding: 1rem 0;
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            .departLine {
              margin: 1rem 10rem 2rem 5.5rem;
              border-top: 1px solid #dadada;
            }
            .item-form {
              display: flex;
              align-items: center;
              margin-top: 10px;
              margin-bottom: 10px;
              .itemTitle {
                display: inline-block;
                min-width: 75px;
              }
              .el-select {
                width: 80%;
                .el-option {
                  width: 80%;
                }
              }
              .el-input {
                width: 100%;
              }
              .el-switch {
                margin-left: 16px;
              }
              .el-checkbox-group {
                .el-checkbox__inner {
                  display: inline-block;
                  min-width: 0.2rem;
                  min-height: 0.2rem;
                }
              }
              .input {
                width: 80%;
              }
              .text{
                resize: none;
                min-height: 100px;
                padding: 0.5rem;
                border-color: #a9bdd1;
                width: 80%
              }
            }
            article {
              ul {
                font-size: 14px;
                color: #9B9B9B;
                margin-left: 41px;
                line-height: 22px;
                li {
                  margin-left: 20px;
                }
              }
            }
            .item_large {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              span {
                min-width: 194px;
                text-align: end;
              }
              .el-input {
                width: 60%;
              }
            }
            .item-tag2 {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
                    border-radius: 50px;
                    outline: none;
                    border: solid 1px;
                    margin-left: 5px;
                    padding-bottom: 2px;
                    background-color: #ffffff;
                    height: 20px;
                    width: 20px;
                  }
                }
              }
            }
          }
          .rec:not(:last-child) {
            border-bottom: solid 1px #979797;;
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
      }
    }
  }
</style>
