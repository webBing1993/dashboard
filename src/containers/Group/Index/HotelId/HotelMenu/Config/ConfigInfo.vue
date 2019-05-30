<!--总配置页面-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <ConfigSysInfo></ConfigSysInfo>
      <ConfigBusnessInfo></ConfigBusnessInfo>
      <ConfigHotelInfo></ConfigHotelInfo>
    </div>
  </div>
</template>

<script>
  import ConfigSysInfo from './ConfigSysInfo'
  import ConfigBusnessInfo from './ConfigBusnessInfo.vue'
  import ConfigHotelInfo from './ConfigHotelInfo.vue'
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    components: {
      ConfigSysInfo,
      ConfigBusnessInfo,
      ConfigHotelInfo
    },
    name: 'ConfigInfo',
    data() {
      return {

      }
    },
    mounted() {

    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
        pmsData: state => state.enterprise.pmsData,
        lvyeData: state => state.enterprise.lvyeData,
        wechatAppData: state => state.enterprise.wechatAppData,
        hotelName: state => state.enterprise.tempHotelName,
        showReception: state => state.enterprise.showReception,
        showMoreLvyeConfig:  state => state.enterprise.showMoreLvyeConfig
      }),
    },
    methods: {

    }
  }
</script>
<style lang="less">
  .morelvyeCheckbox {
    .el-checkbox {
      margin-left: 0;
      margin-right: 1.5rem;
    }
  }
  .tip{
    color: #ff2b1c;
    font-size: 16px;
    margin-left: 9rem;
  }
  .module-wrapper {
    .content-configinfo {
      padding: 24px 20px 0 8px;
      .content-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 18px;
        padding: 0 0 0 12px;
        i {
          font-size: 12px;
          font-style: normal;
        }
        a {
          color: #39C240;
          cursor: pointer;
        }
      }
      .el-row {
        padding-right: 20px;
        .el-col-8 {
          margin-bottom: 20px;
          button {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: #ffffff;
            border: solid 1px #E5E5E5;
            outline: none;
            color: #4A4A4A;
            padding: 12px 6px;
            position: relative;
            height: 110px;
            .item_img {
              width: 42px;
              height: 42px;
              text-align: center;
              border: solid 1px #E5E5E5;
              background-color: #FBFBFB;
              border-radius: 50%;
              padding: 10px;
              display: flex;
              align-items: center;
              -webkit-align-items: center;
              img {
                width: 38px;
                height: 38px;
              }
            }
            .item-text {
              text-align: start;
              margin-left: 10px;
              span {
                font-size: 16px;
              }
              p {
                font-size: 12px;
                margin-top: 5px;
              }
            }
            .tag_text {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 16px;
            }
            .tag_text_red {
              color: #D0011B;
            }
            .tag_text_green {
              color: #39C240;
            }
            .tag_text_gray {
              color: #9B9B9B;
            }
          }
        }
        button {
          width: 100%;
          height: 90px;
        }
      }
      .el-right {
        width: 300px;
        margin-left: 16px;
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
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
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
              .el-transfer{
                .el-input{
                  width: 100%;
                }
              }

              .el-switch {
                margin-left: 16px;
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
    }
  }

  .el-autocomplete {
    width: 60%;
    margin-left: 16px;
  }

  .el-autocomplete .el-input {
    width: 100% !important;
  }

  .qrcode-img {
    display: flex;
    justify-content: center;
  }

  //我的
  .el-dialog__headerbtn {
    padding-top: 12px;
  }

  .reg {
    display: block;
    width: 200px;
    margin-top: 25px;
    margin-left: 35px;
  }
  .bottoomLine{
    padding-top: 2rem;
    border-bottom: 1px solid #000000;
  }
  .el-transfer-panel__filter {
    padding: 0.2rem 1rem 1.1rem 1rem;
    width: 100%;
  }
  .reduceImg{
    display: inline-block;
    width:2rem;
    height: 2rem;
    margin-left: 1rem;
  }
</style>
