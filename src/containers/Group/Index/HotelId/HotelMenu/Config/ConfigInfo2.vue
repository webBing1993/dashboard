<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <div class="content-title">
        <span>系统配置2</span>
        <a @click="goSummary">查看配置汇总</a>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.withoutCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证核验配置</span>
              <p>酒店是否开启无证核验，核验金额，充值金额配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !withoutCardConfig, 'tag_text_green':withoutCardConfig}">{{withoutCardConfig? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
      </el-row>
      <!--/弹框页-->
      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true">
        <div class="dialog-content">
          <!--无证核验配置-->
          <div v-if="showType === enumShowType.withoutCard">
            <div class="item-form">
              <span style="width: 155px">无证核验{{withoutCardConfig}}</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="withoutCardConfig"></el-switch>
            </div>
            <!--<div class="item-form" v-if="withoutCardConfig">-->
            <!--<span style="width: 155px">充值金额（元）</span>-->
            <!--<el-input class="el-right" v-model="rangeMoney" style="display:block"></el-input>-->
            <!--</div>-->
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">付费来源</span>
              <div style="margin-left:20px">
                <el-checkbox-group v-model="checkedMoney" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="sta in moneyStatus" :label="sta" :key="sta">{{(sta =='1')?'酒店付费':'顾客付费'}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">无证核验金额（元）</span>
              <el-input class="el-right" v-model="checkMoney" style="display:block"></el-input>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">余额不足提醒金额（元）</span>
              <el-input class="el-right"v-model="balanceTip" style="display:block"></el-input>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">备注</span>
              <el-input class="el-right"v-model="beizhu" style="display:block" placeholder="关联到消费记录中的备注"></el-input>
            </div>
            <!--<div class="item-form" v-if="withoutCardConfig">-->
              <!--<span style="width: 155px">无证收费方式</span>-->
              <!--<el-select v-model="collectionManner" placeholder="请选择无证收费方式" style="width:60%;margin-left:16px!important">-->
                <!--<el-option v-for="(item, index) in collection" :key="index" :label="item.methods" :value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
          </div>
        </div>
        <!--footer-->
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
          <!--:disabled="!validateAll"-->
            <el-button  type="primary" @click="submitDialog">确 定</el-button>
        </div>
        <!--footer-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElDialog from "../../../../../../../node_modules/element-ui/packages/dialog/src/component.vue";


  //弹框类型
  const enumShowType = {
    withoutCard:1
  }

  //弹框标题类型
  const typeTitles = [
      '是否删除',
    '无证核验配置',
  ]

  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import ElInput from "../../../../../../../node_modules/element-ui/packages/input/src/input";
  import tool from '@/assets/tools/tool.js'

  export default {
    components: {
      ElDialog,
      ElInput
    },
    name: 'ConfigInfo',
    data() {
      return {
//        公共参数
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
//        无证核验配置参数
        withoutCardConfig:false,
        openWithoutCard:true,
        // rangeMoney:'',
        checkMoney:'',
        balanceTip:'',
        moneyStatus:['1','2'],
        checkedMoney:[],
        beizhu:'',
        // collectionManner:'',
        // collection:[{'id':'1','methods':'向客人收费'},{'id':'2','methods':'向酒店收费'}]


      }
    },

    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),

      //无数个validate
      validateWithoutCard(){
        if(
          // tool.isNotBlank(this.rangeMoney)&&
          tool.isNotBlank(this.checkMoney)&&tool.isNotBlank(this.balanceTip)){
          return false;
        }else {
            return true
        }
      },
      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.withoutCard:
            result = this.validateWithoutCard;
            break;
          default:
            result = false;
        }
        return result;
      }
    },

    methods: {
      ...mapActions([
        'getConfig',
        'goto',
        'patchConfig',
      ]),
      handleCheckedCitiesChange(val){
        console.log('当前选中的有哪些',val)
      },
      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },

      dialogConfig(type) {
        this.showType = type;
          this.showDialog = true;
      },

        //弹框取消按钮
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.withoutCard:
             this.appValue=this.configData.business_mode;
             break;
          default:
        }
      },

      submitDialog() {
        let data;
        switch (this.showType) {
          case enumShowType.withoutCard://无证核验
            data = {
              "enable_identity_check_undocumented":this.withoutCardConfig.toString(),
              // "recharge_lowest":this.rangeMoney,
              "nocard_used_pay":this.checkMoney,
              "nocard_money_insufficient":this.balanceTip,
              //付费来源  checkedMoney
              "nocard_pay_mode":this.checkedMoney.join(','),
              // "nocard_pay_mode":this.collectionManner
              "remarks_content":this.beizhu, //备注
            }
            break;
          default:null
        };
        this.patchConfigData(data);
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
        })
      },

      //修改服务端数据
      patchConfigData(data) {
        console.log('debug:------->patchConfigData：',data)
        this.patchConfig({
          hotel_id: this.$route.params.hotelid,
          data: {
              "enable_identity_check_undocumented":data.enable_identity_check_undocumented,
              "recharge_lowest":data.recharge_lowest,
              "nocard_used_pay":data.nocard_used_pay,
              "nocard_money_insufficient":data.nocard_money_insufficient,
              "nocard_pay_mode":this.checkedMoney.join(','),
              // "nocard_pay_mode":this.collectionManner
              "remarks_content":this.beizhu, //备注
          },
          onsuccess: body => {
            this.showDialog = false;
            this.getConfigs();
          }
        })
      },


    },

    mounted() {
      this.getConfigs();

    },

    computed:{
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
    },

    watch: {
      configData() {
        let configData = this.configData;
        console.log('全局configData:',configData)
        if (tool.isNotBlank(configData)) {
//            无证核验
          this.withoutCardConfig=configData.enable_identity_check_undocumented== 'true' ? true : false;
          // this.rangeMoney=configData.recharge_lowest;
          this.checkMoney=configData.nocard_used_pay;
          this.balanceTip=configData.nocard_money_insufficient;
          this.openWithoutCard= configData.enable_identity_check_undocumented == 'true' ? true : false;
          // this.collectionManner= configData.nocard_pay_mode
          this.beizhu = configData.remarks_content
          this.checkedMoney = configData.nocard_pay_mode.split(',')
          console.log('ceshi4444',configData.nocard_pay_mode)

        }
      }
    },
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
      width: 100%;
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
              text-align: left;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: left;
              }
              .el-input {
                width: 60%;
              }
              .el-select {
                width:60%!important;
                margin-left:16px!important;
                .el-input{
                  width:100%!important;
                }
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
    /*padding-top: 12px;*/
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
