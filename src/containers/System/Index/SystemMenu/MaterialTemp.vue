<template>
  <div>
    <div class="module-wrapper">
      <div class="top">
        <span>模板管理</span>
        <el-button type="success" @click="showAddContent=true" class="button">添加模板</el-button>
      </div>
      <div>
        <el-table
          style="width: 100%">
          <el-table-column label="ID" width="180"></el-table-column>
          <el-table-column label="名称" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!---->
      <!--:close-on-click-modal="false"-->
      <!--:close-on-press-escape="false"-->
      <!--:show-close="true"-->
      <!--width=""-->
      <!--@close="handleClose"-->
      <el-dialog title="添加模板" :visible.sync="showAddContent"

                 center>
        <!--<div class="rec">-->
          <el-form ref="form" :model="form" label-width="180px" labelPosition="left">
            <el-form-item label="模板名称">
              <el-input v-model="Dateform.tempName"></el-input>
            </el-form-item>
            <el-form-item label="二代证读卡间隔">
              <el-select v-model="Dateform.IdCardReadTime" placeholder="请选择">
                <el-option :label="item.value" v-for="(item ,index) in initDate.IdCardReadTime" :key="index"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="找脸模式">
              <el-select v-model="Dateform.fetchFaceMod" placeholder="请选择">
                <el-option label="找相似度最高" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传数据总开关">
              <el-switch v-model="Dateform.uploadAllDate"></el-switch>
            </el-form-item>
            <el-form-item label="上传低于下限得数据">
              <el-switch v-model="Dateform.underFloor"></el-switch>
            </el-form-item>
            <el-form-item label="验证不通过提示验证完成">
              <el-switch v-model="Dateform.notPassTost"></el-switch>
            </el-form-item>
            <el-form-item label="有证抓脸出实时画面？">
              <el-switch v-model="Dateform.hasCardCatchFace"></el-switch>
            </el-form-item>
            <el-form-item label="无证抓脸出实时画面？">
              <el-switch v-model="Dateform.noCardCatchFace"></el-switch>
            </el-form-item>
          </el-form>

        <!--</div>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddContent=false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
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
          tempName: '',
//          fileList: [],
          IdCardReadTime: '2秒',
          fetchFaceMod: '',
          uploadAllDate: true,
          underFloor: true,
          notPassTost: false,
          hasCardCatchFace: true,
          noCardCatchFace: true,
        }
      }
    },

    methods: {
      ...mapActions([
        'goto',
        'TemplateList',

      ]),
      addTemplate() {
        this.showAddContent = true
      },
      handleClose() {
        this.showAddContent = false

      },
      save() {
      }


    },

    mounted() {

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
            .text {
              resize: none;
              min-height: 100px;
              padding: 0.5rem;
              border-color: #a9bdd1;
              width: 80%
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
</style>
