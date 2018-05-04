<!--产品基本配置页-->
<template>
  <div class="module-content">

    <table-prodBaseConfig :list="prodBaseList" @edit="_edit"></table-prodBaseConfig>
    <el-dialog title="编辑"
               :visible.sync="showDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="true">
      <div class="dialog-content">
        <div>
          <div class="item-form">
            <span>产品</span>
            <span>{{prodName}}</span>
          </div>
          <div class="item-form">
            <span>后台链接</span>
            <el-input class="el-right" v-model="prodUrl"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    data () {
      return {
        prodBaseList: [],
        showDialog: false,
        prodCode: '',
        prodName: '',
        prodUrl: ''
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
      ...mapActions([
        'goto',
        'showtoast',
        'getProdBaseList',
        'setProdBaseList',
      ]),

      _getProdBaseList(){
        this.getProdBaseList({
          onsuccess: body => {
            this.prodBaseList = body.data;
          }
        })
      },

      _edit(obj){
        console.log('---->', obj)
        this.prodCode = obj.code
        this.prodName = obj.name
        this.prodUrl = obj.control_url
        this.showDialog = true

      },

      hideDialog(){
        this.showDialog = false
      },
      submitDialog(){
        this.setProdBaseList({
          code: this.prodCode,
          control_url: this.prodUrl,
          onsuccess: body => {
            console.log('---->',body)
            this._getProdBaseList()
            this.showDialog = false
          }
        })
      },
    },
    mounted () {
      this._getProdBaseList()
    }
  }
</script>
<style lang="less">
  .el-dialog__headerbtn {
    padding-top: 12px;
  }

  .el-dialog {
    width: 68%;
    .el-dialog__header {
      padding: 0 20px;
      border-bottom: solid 1px #979797;
      .el-dialog__title {
        line-height: 43px;
        font-size: 16px;
        font-weight: 400;
        color: #4A4A4A;
      }
    }
    .lvyeItem {
      border-bottom: 1px solid #979797;;
    }
    .el-dialog__body {
      padding: 22px 20px 33px;
      .dialog-content {
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        .item-form {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          text-align: left;
          & > span {
            display: inline-block;
            min-width: 110px;
            text-align: left;
          }
          .el-select {
            width: 100%;
            .el-input {
              width: 69.5%;
            }
          }
          .el-input {
            width: 60%;
          }
          .el-transfer {
            .el-input {
              width: 100%;
            }
          }

          .el-switch {
            margin-left: 60px;
          }
          .el-radio {
            margin-left: 16px;
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

        .item-tag {
          display: flex;
          align-items: flex-start;
          padding-left: 20px;
          span {
            width: 60px;
            text-align: end;
            line-height: 40px;
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
    }
    .delLv {
      color: red;
      position: absolute;
      right: 0;
      display: inline-block;
      cursor: pointer;
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

