<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <div class="content-title">
        <span>微前台2.0配置</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig('facein','优图面部通行证配置')">
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
        <el-col :span="8">
          <button @click="dialogConfig('guest','客史记录配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>客史记录</span>
              <p>酒店企业微信关闭功能，并隐藏栏目</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !guest, 'tag_text_green':guest}">{{guest? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('hotelinfo','基础信息配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>基础信息</span>
              <p>酒店企业微信基础信息关闭编辑权限</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !hotelinfo, 'tag_text_green':hotelinfo}">{{hotelinfo? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('wifi','wifi管理配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>WIFI管理</span>
              <p>酒店企业微信关闭wifi管理权限，C端小程序不可点，提示“当前酒店暂未开通”</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !wifi, 'tag_text_green':wifi}">{{wifi? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('activity','活动广告配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>活动广告</span>
              <p>酒店企业微信活动广告关闭管理权限，C端小程序不显示</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !activity, 'tag_text_green':activity}">{{activity? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('integral','摇一摇获取积分配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>摇一摇获取积分</span>
              <p>C端小程序关闭摇一摇获取积分功能</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !integral, 'tag_text_green':integral}">{{integral? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('roomService','专属管家配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>专属管家</span>
              <p>客房享有的餐券，SPA，迷你吧</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !roomService, 'tag_text_green':roomService}">{{roomService? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('roomRestricts','客房权益配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>客房权益</span>
              <p>客房享有的餐券，SPA，迷你吧</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !roomRestricts, 'tag_text_green':roomRestricts}">{{roomRestricts? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('car','车牌登记配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>车牌登记</span>
              <p>开启后住户可在小程序端录入车牌</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !car, 'tag_text_green':car}">{{car? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('invoice','预约发票配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>预约发票</span>
              <p>开启后住户可在小程序端预约发票</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !invoice, 'tag_text_green':invoice}">{{invoice? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('guestControl','智能客控配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>智能客控</span>
              <p>开启后住户可在小程序端使用智能客控</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !guestControl, 'tag_text_green':guestControl}">{{guestControl? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('guestContinue','续住配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>续住</span>
              <p>开启后住户可在小程序端使用续住</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !guestContinue, 'tag_text_green':guestContinue}">{{guestContinue? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig('guestCheckout','退房配置')">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>退房</span>
              <p>开启后住户可在小程序端使用退房</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !guestCheckout, 'tag_text_green':guestCheckout}">{{guestCheckout? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
      </el-row>
      <!--/弹框页-->
      <el-dialog
        :title="typeTitle"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true">
        <div class="dialog-content">
          <!--优图面部通行证配置-->
          <div v-if="this.showType=='facein'">
            <div class="item-form">
              <span style="width: 155px">优图面部通行证</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="facein"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='guest'">
            <div class="item-form">
              <span style="width: 155px">客史记录</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="guest"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='hotelinfo'">
            <div class="item-form">
              <span style="width: 155px">基础信息</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="hotelinfo"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='wifi'">
            <div class="item-form">
              <span style="width: 155px">WIFI管理</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="wifi"></el-switch>
            </div>
         </div>
          <div v-if="this.showType=='activity'">
            <div class="item-form">
              <span style="width: 155px">活动广告</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="activity"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='integral'">
            <div class="item-form">
              <span style="width: 155px">摇一摇获取积分</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="integral"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='roomService'">
            <div class="item-form-service">
              <div class="item-form-header">
                <span style="width: 155px">专属管家</span>
                <el-switch on-color="#13ce66"off-color="#ff4949" v-model="roomService"></el-switch>
              </div>
              <div class="hotel_server_main_checkList" v-if="roomService">
                <p class="hotel_server_main_checkList_span2">选择支持在线客专属管家的房型</p>
                <p class="hotel_server_main_p2">（不选表示不启用该功能）</p>
                <div style="margin-top: 10px">
                  <el-checkbox-group
                    v-model="checkedServer2"
                    >
                    <el-checkbox v-for="list2 in optionList2" :disabled="roomService == false" :label="list2.id" :key="list2.id">{{list2.value}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.showType=='roomRestricts'">
            <div class="item-form">
              <span style="width: 155px">客房权益</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="roomRestricts"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='car'">
            <div class="item-form">
              <span style="width: 155px">车牌登记</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="car"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='invoice'">
            <div class="item-form">
              <span style="width: 155px">预约发票</span>
              <el-switch on-color="#13ce66" off-color="#ff4949" v-model="invoice"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='guestControl'">
            <div class="item-form">
              <span style="width: 155px">智能客控</span>
              <el-switch on-color="#13ce66" off-color="#ff4949" v-model="guestControl"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='guestContinue'">
            <div class="item-form">
              <span style="width: 155px">续住</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="guestContinue"></el-switch>
            </div>
          </div>
          <div v-if="this.showType=='guestCheckout'">
            <div class="item-form">
              <span style="width: 155px">退房</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="guestCheckout"></el-switch>
            </div>
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
  import {mapActions,mapState} from 'vuex'
  export default {
    data(){
      return{
        facein: false,
        faceinId: '',
        guest: false,
        guestId: '',
        hotelinfo: false,
        hotelinfoId: '',
        wifi: false,
        wifiId: '',
        activity: false,
        activityId: '',
        integral: false,
        integralId: '',
        roomService: false,
        roomServiceId: '',
        roomRestricts: false,
        roomRestrictsId: '',
        car:false,
        carId:'',
        invoice: false,
        invoiceId: '',
        guestControl:false,
        guestControlId:'',
        checkedServer2: [],    //选中的房间类型
        optionList2: [],      //房间类型列表
        guestContinue:false,  //续住
        guestContinueId:'',
        guestCheckout:false,   //退房
        guestCheckoutId:'',
        typeTitle:'',     //弹框标题
        showType:'',      //弹框类型
        showDialog:false, //控制是否打开弹框
      }
    },
    methods:{
      ...mapActions(['getHotelServer','getHotelServiceConfigs','getHotelIdsStatus']),
      hideDialog(){
        this.showDialog = false;
      },
      submitDialog(){
        this.showDialog = false;
        var dataObj={};
        switch(this.showType){
           case 'facein':            dataObj={ id:this.faceinId, value:this.facein?1:0 }
             break;
           case 'guest':             dataObj={ id:this.guestId, value:this.guest?1:0 }
             break;
           case 'hotelinfo':         dataObj={ id:this.hotelinfoId, value:this.hotelinfo?1:0 }
             break;
           case 'wifi':              dataObj={ id:this.wifiId, value:this.wifi?1:0 }
             break;
           case 'activity':          dataObj={ id:this.activityId, value:this.activity?1:0 }
             break;
           case 'integral':          dataObj={ id:this.integralId, value:this.integral?1:0 }
             break;
           case 'roomService':
             if(this.roomService){
                this.getHotelServiceConfigs({
                  data:{
                    "hotelId":this.$route.params.hotelid,
                    "ids": this.checkedServer2.toString(),// 房间类型id集合
                    "type":2 // 默认为2，即房间类型
                  },
                  onsuccess:body=>{

                  }
                })
             }
             dataObj={ id:this.roomServiceId, value:this.roomService?1:0 }
             break;
           case 'roomRestricts':     dataObj={ id:this.roomRestrictsId, value:this.roomRestricts?1:0 }
             break;
           case 'car':               dataObj={ id:this.carId, value:this.car?1:0}
             break;
           case 'invoice':           dataObj={ id:this.invoiceId, value:this.invoice?1:0}
             break;
           case 'guestControl':      dataObj={ id:this.guestControlId, value:this.guestControl?1:0}
             break;
           case 'guestContinue':     dataObj={ id:this.guestContinueId, value:this.guestContinue?1:0 }
             break;
           case 'guestCheckout':     dataObj={ id:this.guestCheckoutId, value:this.guestCheckout?1:0}
             break;
        }
        this.getHotelIdsStatus({
          data:dataObj,
          onsuccess:body=>{

          }
        })

      },
      dialogConfig(type,title){
        this.showType = type;
        this.typeTitle= title;
        this.showDialog = true;
      },
      //酒店状态列表
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
                  }else if(i.key == 'guest'){
                    this.guest = i.value==0?false:true
                    this.guestId = i.id
                  }else if(i.key == 'hotelinfo'){
                    this.hotelinfo = i.value==0?false:true
                    this.hotelinfoId = i.id
                  }else if(i.key == 'wifi'){
                    this.wifi = i.value==0?false:true
                    this.wifiId = i.id
                  }else if(i.key == 'activity'){
                    this.activity = i.value==0?false:true
                    this.activityId = i.id
                  }else if(i.key == 'integral'){
                    this.integral = i.value==0?false:true
                    this.integralId = i.id
                  }else if(i.key == 'roomService'){
                    this.roomService = i.value==0?false:true
                    this.roomServiceId = i.id
                  }else if(i.key == 'roomRestricts'){
                    this.roomRestricts = i.value==0?false:true
                    this.roomRestrictsId = i.id
                  }else if(i.key == 'car'){
                    this.car = i.value==0?false:true
                    this.carId = i.id
                  }else if(i.key == 'invoice'){
                    this.invoice = i.value==0?false:true
                    this.invoiceId = i.id
                  }else if(i.key == 'guestControl'){
                    this.guestControl = i.value==0?false:true
                    this.guestControlId = i.id
                  }else if(i.key == 'is_support_stay'){
                    this.guestContinue = i.value==0?false:true
                    this.guestContinueId = i.id
                  }
                  else if(i.key == 'is_support_checkout'){
                    this.guestCheckout = i.value==0?false:true
                    this.guestCheckoutId = i.id
                  }
                }
              }
              this.optionList2 = body.data.roomType
              if(this.optionList2.length>0){
                for(let i of this.optionList2){
                  if(i.status == true){
                    this.checkedServer2.push(i.id)
                  }
                }
              }
            }
          }
        )
      },

    },
    watch:{

    },
    computed:{
      ...mapState([
        'route',
        'Interface'
      ])
    },
    mounted(){
      this.hotelServer()
    }
  }
</script>
<style lang="less" scoped>
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
                min-width: 130px;
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
            .item-form-service{
              display: flex;
              min-height: 80px;
              justify-content: space-between;
              flex-direction: column;
              .item-form-header{
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
              .hotel_server_main_checkList{
                padding: 10px 0 10px 0;
                .hotel_server_main_checkList_span{
                  display: inline-block;
                  margin: 10px 0;
                  font-family: PingFangSC-Medium;
                  font-size: 12px;
                  color: #000000;
                }
                .hotel_server_main_checkList_span2{
                  display: inline-block;
                  font-family: PingFangSC-Medium;
                  font-size: 12px;
                  color: #000000;
                }
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
