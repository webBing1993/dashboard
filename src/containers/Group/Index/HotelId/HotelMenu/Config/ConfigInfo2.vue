<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <div class="content-title">
        <span>待删除配置</span>
        <a @click="goSummary">查看配置汇总</a>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="depswitch()">
            <div class="item_img">
              <img src="../../../../../../assets/images/酒店.png" alt="a">
            </div>
            <div class="item-text">
              <span>生态酒店配置</span>
              <p>必须开通该配置,身份识别、旅业上报
                等接口需要用到。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!configData.wx_hotel_id, 'tag_text_green': configData.wx_hotel_id}">{{configData.wx_hotel_id ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.doorLock_unknown)">
            <div class="item_img">
              <img src="../../../../../../assets/images/门锁.png" alt="a">
            </div>
            <div class="item-text">
              <span>门锁配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">暂无</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.preCheckin)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证入住</span>
              <p>酒店是否支持无证入住</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledPreCheckin, 'tag_text_green': enabledPreCheckin}">{{enabledPreCheckin ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.identityCheck)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>开启身份核验功能</span>
              <p>是否开启墨镜身份核验</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !identityCheckVal, 'tag_text_green': identityCheckVal}">{{identityCheckVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.fastCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>极速领卡配置</span>
              <p>配置极速领卡</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledSpeedCard, 'tag_text_green':enabledSpeedCard}">{{enabledSpeedCard ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.CustomerOperate)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>订单操作配置</span>
              <p>酒店是否允许顾客操作</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!curstomDeploy, 'tag_text_green':curstomDeploy}">{{curstomDeploy ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.noCertificateCheck)">
            <div class="item_img">
              <img src="../../../../../../assets/images/认证.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证核验</span>
              <p>酒店是否开启无证核验功能</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enableNoCertificateCheck, 'tag_text_green': enableNoCertificateCheck}">{{enableNoCertificateCheck ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.hotelAreaCode)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店行政区划代码配置</span>
              <p>酒店行政区划代码</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hotelAreaCodeVal, 'tag_text_green':hotelAreaCodeVal}">{{hotelAreaCodeVal ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.PADshowContent)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>PAD界面内容显示配置</span>
              <p>PAD界面内容显示配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hotelMark, 'tag_text_green': hotelMark}">{{hotelMark ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.informCoResident)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>同住人未到提醒配置</span>
              <p>同住人未到提醒配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !timeStep, 'tag_text_green': timeStep}">{{timeStep ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.enabledCancelTime)">
            <div class="item_img">
              <img src="../../../../../../assets/images/cancel.png" alt="a">
            </div>
            <div class="item-text">
              <span>电话取消订单</span>
              <p>客人是否可以电话取消订单，如果可以，最晚在几点之前可以取消。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !isEnabledCancelTime, 'tag_text_green': isEnabledCancelTime}">{{isEnabledCancelTime ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.delayedPayment)">
            <div class="item_img">
              <img src="../../../../../../assets/images/到店.png" alt="a">
            </div>
            <div class="item-text">
              <span>到店支付</span>
              <p>开通后客人可以免支付完成预登记</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !enabledDelayedPayment, 'tag_text_green': enabledDelayedPayment}">{{enabledDelayedPayment ? '已开通' : '未开通'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.ticketPrint)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>是否打印小票配置</span>
              <p>是否打印小票</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!enabledTicketPrint, 'tag_text_green': enabledTicketPrint}">{{enabledTicketPrint ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.facein)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>优图面部通行证</span>
              <p>支持刷脸入住、吃早餐</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !facein, 'tag_text_green':facein}">{{facein? '已配置' : '未配置'}}</span>
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
          <!--生态酒店配置弹框-->
          <div v-if="showType === enumShowType.wxHotel && RegisterOk">
            <div class="item-form">
              <el-select class="el-right" v-model="optionvalue" placeholder="城市服务">
                <el-option
                  v-for="(obj, index) of renderList"
                  :key="index"
                  :label="obj.route_name"
                  :value="obj.route_code">
                </el-option>
              </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button class="reg" @click="dialogConfig(enumShowType.wxHotel)">注册
              </el-button>
            </div>
          </div>
          <div v-if="showType === enumShowType.WxHotelRegister">
            <div style="font-size: 14px;font-weight: 400;color: #6d6e6e;margin-left: 35px;line-height: 2em">
              <p style="margin-top: 30px"><span style="margin-right: 20px">微信酒店ID:</span>
                <label v-if="RegistersWxHotelId">{{RegistersWxHotelId ? RegistersWxHotelId : '系统异常1'}}</label>
                <label v-if="wxHotelId">{{wxHotelId ? wxHotelId : '系统异常2'}}</label>
              </p>
              <div>
                <div v-if="1">
                  <el-button style="width: 200px;margin-top: 30px" @click="isDelete()">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <!--门锁配置弹框-->
          <div v-if="showType === enumShowType.doorLock_unknown">
            <h1>暂无</h1>
          </div>
          <!--无证入住-->
          <div v-if="showType === enumShowType.preCheckin">
            <div class="item-form">
              <span>是否开通无证入住业务？</span>
              <el-switch
                v-model="enabledPreCheckin"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--开启身份核验功能-->
          <div v-if="showType === enumShowType.identityCheck">
            <div class="item-form">
              <span>是否自动调用人脸识别接口</span>
              <el-switch
                v-model="identityCheckVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--极速领卡配置-->
          <div v-if="showType === enumShowType.fastCard">
            <div class="item-form">
              <span>极速领卡配置</span>
              <el-switch
                v-model="enabledSpeedCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--订单操作配置-->
          <div v-if="showType === enumShowType.CustomerOperate">
            <div class="item-form">
              <span>禁止顾客操作订单</span>
              <el-switch v-model="curstomDeploy"
                         on-color="#13ce66"
                         off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--无证核验配置-->
          <div v-if="showType === enumShowType.noCertificateCheck">
            <div class="item-form">
              <span>无证核验</span>
              <el-switch
                v-model="enableNoCertificateCheck"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--酒店行政区代码配置-->
          <div v-if="showType === enumShowType.hotelAreaCode">
            <div class="item-form">
              <span>酒店行政区划代码</span>
              <el-input class="el-right" v-model="hotelAreaCodeVal" placeholder="请输入酒店行政区划代码"></el-input>
            </div>
          </div>
          <!--PAD内容显示配置弹框-->
          <div v-if="showType === enumShowType.PADshowContent">
            <div class="item-form">
              <span style="width: 155px">未查找到订单界面提示语</span>
              <el-input class="el-right" v-model="notFoundMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">申请退房完成界面提示语</span>
              <el-input class="el-right" v-model="checkOutMark" style="display:block;"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">非设备入住退房提示语</span>
              <el-input class="el-right" v-model="noDeviceCheckInMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">退房失败以后提示语</span>
              <el-input class="el-right" v-model="failedCheckOutMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span style="width: 155px">酒店客服电话</span>
              <el-input class="el-right" v-model="hotelServiceTelMark" style="display:block"></el-input>
            </div>
            <div class="item-form">
              <span>是否在人证通显示完整房号</span>
              <el-switch
                v-model="enabledFullRoom"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--同住人未到提醒配置-->
          <div v-if="showType === enumShowType.informCoResident">
            <div class="item-form">
              <span>酒店同住人未到时通知发送间隔</span>
              <el-input class="el-right" style="margin-right: 10px" v-model="timeStep"></el-input>
              小时
            </div>
          </div>
          <!--电话取消订单-->
          <div v-if="showType === enumShowType.enabledCancelTime">
            <div class="item-form">
              <span>是否支持电话取消订单？</span>
              <el-switch
                v-model="isEnabledCancelTime"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div v-show="isEnabledCancelTime">
              <span>允许最晚取消时间</span>
              <el-select class="el-right" v-model="enabledCancelTime">
                <el-option
                  v-for="(obj, index) of enabledCancelTimeList"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--到店支付-->
          <div v-if="showType === enumShowType.delayedPayment">
            <div class="item-form">
              <span>是否开通到店支付？</span>
              <el-switch
                v-model="enabledDelayedPayment"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--是否打印小票配置-->
          <div v-if="showType === enumShowType.ticketPrint">
            <div class="item-form">
              <span>是否打印小票配置</span>
              <el-switch
                v-model="enabledTicketPrint"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
        </div>
        <!--优图面部通行证配置-->
        <div v-if="showType === enumShowType.facein">
          <div class="item-form">
            <span style="width: 155px">优图面部通行证</span>
            <el-switch on-color="#13ce66"off-color="#ff4949" v-model="facein"></el-switch>
          </div>
        </div>
        <!--footer-->
        <div slot="footer" class="dialog-footer" v-if="showType != enumShowType.wxHotel && showType !=enumShowType.WxHotelRegister">
            <el-button @click="hideDialog">取 消</el-button>
          <!--:disabled="!validateAll"-->
            <el-button  type="primary" @click="submitDialog">确 定</el-button>
        </div>
        <!--footer-->
      </el-dialog>
      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="queryDel"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        @close="handleClose"
        center>
        <span>是否删除</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteWxHotels(false)">取 消</el-button>
          <el-button type="primary" @click="deleteWxHotels(true)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ElDialog from "../../../../../../../node_modules/element-ui/packages/dialog/src/component.vue";


  //弹框类型
  const enumShowType = {
    wxHotel:1,
    doorLock_unknown:2,
    preCheckin:3,
    identityCheck:4,
    fastCard: 5,  //极速领卡配置
    CustomerOperate: 6,//禁止顾客操作订单
    noCertificateCheck: 7,//无证核验
    hotelAreaCode: 8,//酒店行政区划代码
    PADshowContent: 9,//PAD界面内容显示配置
    informCoResident: 10,//通知同住人配置
    enabledCancelTime: 11, //电话取消订单配置
    delayedPayment: 12, //到店支付配置
    ticketPrint: 13,//是否启用小票打印
    facein:14 //优图面部通行证配置
  }

  //弹框标题类型
  const typeTitles = [
      '是否删除',
     '生态酒店配置',
     '门锁配置',
     '无证入住',
    '开启身份核验功能','极速领卡配置',
    '禁止顾客操作订单配置','无证核验','酒店行政区划代码配置', 'PAD界面内容显示配置','同住人未到提醒配置','电话取消订单配置','到店支付配置','是否打印小票配置','优图面部通行证配置'

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

        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        enumShowType: enumShowType,
  //**********************微信生态酒店配置**********************
          wxHotelId: '',
          wxhotelCityserList: [],
          RegistersWxHotelId: '',//注册返回的微信酒店id
          deleteList: '',//删除微信酒店后返回
          optionvalue: '',//微信生态酒店配置列表初始化
          RegisterOk:true,
          queryDel: false,
          switchName: 'close',//微信生态酒店配置按钮
          delName: 'close',

        //**********************无证入住**********************
         enabledPreCheckin: true,

        //   ***********开启身份核验功能**********************
         identityCheckVal: false,

        //极速领卡配置
        enabledSpeedCard: false,
        //禁止用户操作配置
        curstomDeploy: false,
        //无证核验
        enableNoCertificateCheck: false,
         //酒店行政区划代码
        notFoundMark: '',
        checkOutMark: '',
        noDeviceCheckInMark: '',
        failedCheckOutMark: '',
        hotelServiceTelMark: '',
        enabledFullRoom:false,
        hotelAreaCodeVal: '',
        hotelMark: false,
        //同住人配置
        timeStep: '',
        //电话取消订单
        isEnabledCancelTime: false,
        enabledCancelTime: '18:00',
        enabledCancelTimeList: ['12:00', '12:30', '13:00',
          '13:30', '14:00', '14:30', '15:00', '15:30',
          '16:00', '16:30', '17:00', '17:30', '18:00',
          '18:30', '19:00', '19:30', '20:00', '20:30',
          '21:00', '21:30', '22:00', '22:30', '23:00',
          '23:30', '24:00'],
        //到店支付配置
        enabledDelayedPayment: true,
        ////是否打印小票配置
        enabledTicketPrint: false,
        //优图面部通行证配置
        facein: false,
        faceinId:'',
      }
    },

    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
      renderList() {
        return this.wxhotelCityserList;
      },
      validateInformCoResident(){
        return (tool.isNotBlank(this.timeStep))
      },
      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.withoutCard:
            result = this.validateWithoutCard;
            break;
          case enumShowType.fastCard:
            result = true;
            break;
          case enumShowType.CustomerOperate:
            result = true;
            break;
          case enumShowType.noCertificateCheck:
            result = true;
            break;
          case enumShowType.hotelAreaCode:
            result = true;
            break;
          case enumShowType.PADshowContent:
            result = true;
            break;
          case enumShowType.informCoResident:
            result = this.validateInformCoResident;
            break;
          case enumShowType.enabledCancelTime:
            result = true;
            break;
          case enumShowType.delayedPayment:
            result = true;
            break;
          case enumShowType.ticketPrint:
            result = true;
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
        'isDeleteCatch','showtoast',
        'getWxhotelCityser','WxhotelRegister','deleteWxHotel','savePADMarkConfig','getPADMarkConfig','getHotelIdsStatus','getHotelServer'
      ]),
      dialogConfig(type) {
         this.showType = type;
         this.showDialog = true;
         if (type === enumShowType.wxHotel) {
           if(this.optionvalue==''){
             this.showtoast({
               text: '请选择城市服务',
               type: 'success'
             })
             return
           }else{
             this.showType = enumShowType.WxHotelRegister;
             this.WxhotelRegisters()
           }
         }
      },
      deleteWxHotels(flag) {
        if (flag) {
          this.deleteWxHotel({
            hotel_id: this.$route.params.hotelid,
            wx_hotel_id: this.wxHotelId||this.RegistersWxHotelId,
            onsuccess: (body, header) => {
              this.showtoast({
                text: '删除成功',
                type: 'success'
              })
            }
          });
        };
        this.queryDel = false;
        this.hideDialog();
      },
      WxhotelRegisters() {
        console.log("this.optionvalue",this.optionvalue);
        this.WxhotelRegister({
          hotel_id: this.$route.params.hotelid,
          route_code: this.optionvalue,
          onsuccess: body => {
            this.RegistersWxHotelId = body.data.wx_hotel_id;
            this.switchName = 'close';
          }
        })
        this.showtoast({
          text: '注册成功',
          type: 'success'
        })
      },
      //生态酒店配置弹框
      depswitch() {
        console.log("this.wxHotelId",this.wxHotelId)
        if (this.wxHotelId) {
          console.log('11111111111')
          this.delName = 'open';
          this.showType=enumShowType.WxHotelRegister;
          this.dialogConfig(enumShowType.WxHotelRegister)
        } else {
          console.log('22222222222')
          this.delName = 'open';
          this.switchName = 'open';
          this.showType=enumShowType.wxHotel;
          this.dialogConfig(enumShowType.wxHotel)
        }
      },
      handleClose() {
        this.delName = 'close';
        this.switchName = 'close';
      },
      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },
      getWxhotelCitysers() {
        this.getWxhotelCityser({
          onsuccess: body => (this.wxhotelCityserList = [...body.data])
        })
      },
        //弹框取消按钮
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.withoutCard:
             this.appValue=this.configData.business_mode;
             break;
          case enumShowType.preCheckin:
            this.enabledPreCheckin = this.configData.enabled_pre_checkin == 'true' ? true : false;
            break;
          case enumShowType.identityCheck:
            this.identityCheckVal = this.configData.enabled_identity_check == 'true' ? true : false;
            break;
          case enumShowType.fastCard:
            this.enabledSpeedCard = this.configData.enabled_speed_card == 'true' ? true : false;
            break;
          case enumShowType.CustomerOperate:
            this.curstomDeploy = this.onfigData.user_disable_order == 'true' ? true : false;
            break;
          case enumShowType.noCertificateCheck:
            this.enableNoCertificateCheck = this.configData.enable_identity_check_undocumented == 'true' ? true : false;
            break;
          case enumShowType.hotelAreaCode:
            this.hotelAreaCodeVal = this.configData.hotel_area_code;
            break;
          case enumShowType.informCoResident:
            this.timeStep = this.configData.checkin_noshow_interval_time;
            break;
          case enumShowType.enabledCancelTime:
            this.isEnabledCancelTime = tool.isNotBlank(this.configData.enabled_cancel_time);
            if (this.isEnabledCancelTime) {
              let date = new Date(parseInt(this.configData.enabled_cancel_time));
              let hours = date.getHours();
              let min = date.getMinutes();
              let minStr = min > 9 ? min : `0${min}`;
              this.enabledCancelTime = `${hours}:${minStr}`;
            }
            break;
          case enumShowType.delayedPayment:
            this.enabledDelayedPayment = this.configData.enabled_delayed_payment == 'true' ? true : false;
            break;
          case enumShowType.ticketPrint:
            this.enabledTicketPrint = this.configData.enabled_ticket_print == 'true' ? true : false;
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
              "nocard_pay_mode":this.checkedMoney,
              // "nocard_pay_mode":this.collectionManner
              "nocard_remarks_content":this.beizhu, //备注
            }
            break;
          case enumShowType.preCheckin:
            data = {
              enabled_pre_checkin: this.enabledPreCheckin.toString(),
            }
            break;
          case enumShowType.identityCheck:
            data = {'enabled_identity_check': this.identityCheckVal.toString()};
            break;
          case enumShowType.fastCard:
            data = {
              enabled_speed_card: this.enabledSpeedCard.toString()
            }
            break;
          case enumShowType.CustomerOperate:
            data = {
              user_disable_order: this.curstomDeploy.toString()
            }
            break;
          case enumShowType.noCertificateCheck:
            data = {
              enable_identity_check_undocumented: this.enableNoCertificateCheck.toString()
            }
            break;
          case enumShowType.hotelAreaCode:
            data = {
              hotel_area_code: this.hotelAreaCodeVal
            }
            break;
          case enumShowType.PADshowContent:
            this.savePADMarkConfigs();
            return;
          case enumShowType.informCoResident:
            data = {
              checkin_noshow_interval_time: this.timeStep
            }
            break;
          case enumShowType.enabledCancelTime:
            if (this.isEnabledCancelTime) {
              let date = `${new Date().toLocaleDateString()} ${this.enabledCancelTime}`
              data = {
                enabled_cancel_time: new Date(date).getTime()
              }
            } else {
              data = {
                enabled_cancel_time: ''
              }
            }
            break;
          case enumShowType.delayedPayment:
            data = {
              enabled_delayed_payment: this.enabledDelayedPayment.toString()
            }
            break;
          case enumShowType.ticketPrint:
            data = {
              enabled_ticket_print: this.enabledTicketPrint.toString()
            }
            break;
          default:null
        };
        if(this.showType==enumShowType.facein){
          this.showDialog = false;
          data={ id:this.faceinId, value:this.facein?1:0 }
          this.getHotelIdsStatus({
            data:data,
            onsuccess:body=>{
            }
          })
        }else{
          this.patchConfigData(data);
        }
      },
      //新增酒店提示语
      savePADMarkConfigs(){
        this.savePADMarkConfig({
          data: {
            "hotel_id": this.$route.params.hotelid,
            "order_hint_item": this.notFoundMark == '' ? '' + '#190155' : this.notFoundMark + '#190155',
            "apply_checkout_finish": this.checkOutMark == '' ? '' + '#190164' : this.checkOutMark + '#190164',
            "non_equipment_checkin": this.noDeviceCheckInMark == '' ? '' + '#190159' : this.noDeviceCheckInMark + '#190159',
            "checkout_failure": this.failedCheckOutMark == '' ? '' + '#190163' : this.failedCheckOutMark + '#190163',
            "customer_service_tel": this.hotelServiceTelMark,
            "show_full_roomno":this.enabledFullRoom
          },
          onsuccess: body => {
            this.showDialog = false;
            this.hotelMark = true;
          }
        })
      },
      //获取酒店提示语配置
      getPADMarkConfigs(){
        this.getPADMarkConfig({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            if (body.data) {
              this.notFoundMark = body.data.order_hint_item;
              this.checkOutMark = body.data.apply_checkout_finish;
              this.noDeviceCheckInMark = body.data.non_equipment_checkin;
              this.failedCheckOutMark = body.data.checkout_failure;
              this.hotelServiceTelMark = body.data.customer_service_tel;
              this.hotelMark = true;
            }

          }
        })
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
        })
      },
      //删除微信生态酒店配置
      isDelete() {
        this.showDialog = false;
        this.queryDel = true;
        this.delName = 'close';
        this.switchName = 'close';
      },
      //修改服务端数据
      patchConfigData(data) {
        console.log('debug:------->patchConfigData：',data)
        this.patchConfig({
          hotel_id: this.$route.params.hotelid,
          // data: {
          //     "enable_identity_check_undocumented":data.enable_identity_check_undocumented,
          //     "recharge_lowest":data.recharge_lowest,
          //     "nocard_used_pay":data.nocard_used_pay,
          //     "nocard_money_insufficient":data.nocard_money_insufficient,
          //     "nocard_pay_mode":this.checkedMoney,
          //     // "nocard_pay_mode":this.collectionManner
          //     "nocard_remarks_content":this.beizhu, //备注
          // },
          data:data,
          onsuccess: body => {
            this.showDialog = false;
            this.getConfigs();
          }
        })
      },
      hotelServer(){
        this.getHotelServer(
          {
            data:{
              hotelId:this.$route.params.hotelid,
            },
            onsuccess:body=>{
              console.log(body.data)
              let hotelStatusList = body.data.hotelConfig
              if(hotelStatusList.length >0){
                for (let i of hotelStatusList) {
                  if(i.key == 'facein'){
                    this.facein = i.value==0?false:true
                    this.faceinId = i.id
                  }
                }
              }
            }
          }
        )
      },
    },

    mounted() {
      this.getConfigs();
      this.getPADMarkConfigs();
      this.hotelServer();

    },
    watch: {
      configData() {
        let configData = this.configData;
        console.log('全局configData:',configData)
        if (tool.isNotBlank(configData)) {
          //微信生态酒店配置
          this.wxHotelId = configData.wx_hotel_id;
          //无证入住
          this.enabledPreCheckin = configData.enabled_pre_checkin == 'true' ? true : false;
          //身份核验功能配置
          this.identityCheckVal = configData.enabled_identity_check == 'true' ? true : false;
          //极速领卡配置
          this.enabledSpeedCard = configData.enabled_speed_card == 'true' ? true : false;
          //禁止用户操作订单配置
          this.curstomDeploy = configData.user_disable_order == 'true' ? true : false;
          //无证核验
          this.enableNoCertificateCheck = configData.enable_identity_check_undocumented == 'true' ? true : false;
          //酒店行政区划代码配置
          this.hotelAreaCodeVal = configData.hotel_area_code;

          //pad界面内容显示配置 是否在人证通显示完整房号
          this.enabledFullRoom=configData.show_full_roomno == 'true' ? true : false;
          //同住人通知配置
          this.timeStep = configData.checkin_noshow_interval_time;
          //电话取消订单
          this.isEnabledCancelTime = tool.isNotBlank(configData.enabled_cancel_time);
          if (this.isEnabledCancelTime) {
            let date = new Date(parseInt(configData.enabled_cancel_time));
            let hours = date.getHours();
            let min = date.getMinutes();
            let minStr = min > 9 ? min : `0${min}`;
            this.enabledCancelTime = `${hours}:${minStr}`;
          }
          //到店支付配置
          this.enabledDelayedPayment = configData.enabled_delayed_payment == 'true' ? true : false;
          //是否打印小票配置
          this.enabledTicketPrint = configData.enabled_ticket_print == 'true' ? true : false;


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
