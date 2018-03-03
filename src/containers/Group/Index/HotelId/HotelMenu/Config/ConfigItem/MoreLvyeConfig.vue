<!--多旅业页-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_moreLvye">
        <div class="top">多旅业配置
          <el-button type="success" @click.native="addMoreLvye" class="button">添 加</el-button>
        </div>
        <table-moreLvyeConfig :list="moreLvyeList" :page="page" :size="size" @edit="goEdit" @del="goDel" :filterDeskList="deskList"></table-moreLvyeConfig>
        <el-dialog title="添加／编辑 多旅业配置"
                   :visible.sync="showDialog"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="true"
                   width=""
                   @close="handleClose"
                   center>
        <div class="morelvye">
          <div class="item-form">
            <span class="itemTitle">旅业名称</span>
            <el-input class="" v-model="id" v-show=false></el-input>
            <el-input class="" v-model="lvyeName" placeholder="请输入旅业名称" :disabled="!enabledReport"></el-input>
          </div>
          <div class="item-form">
            <span class="itemTitle">上传通道</span>
            <el-select class="" v-model="reportChannel" placeholder="请选择上传通道" :disabled="!enabledReport">
            <el-option
            v-for="(obj, index) in lvyeTypeList"
            :key="obj.index"
            :label="obj.lvye_report_type_name"
            :value="obj.lvye_report_type">
            </el-option>
            </el-select>
          </div>
          <div class="item-form">
            <span class="itemTitle">上传类型</span>
            <el-select class="" v-model="reportType" placeholder="请选择上传类型" :disabled="!enabledReport">
            <el-option
            v-for="(obj, index) in moreLyReportTypeList"
            :key="obj.index"
            :label="obj.name"
            :value="obj.value">
            </el-option>
            </el-select>
          </div>
          <div class="item-form">
            <span class="itemTitle">酒店公安ID</span>
            <el-input class="" v-model="lvyeId" placeholder="请输入酒店公安ID" :disabled="!enabledReport"></el-input>
          </div>
          <div v-if="!(reportChannel == 'CLOUD'||reportChannel == 'WUHAN'||reportChannel == 'SUZHOU')">
            <div class="item-form">
              <span class="itemTitle">公安参数</span>
              <el-input class="" v-model="transitParam" placeholder="请输入公安参数,正确的JSON字符串" :disabled="!enabledReport"></el-input>
            </div>
          </div>
          <div class="item-form">
            <span class="itemTitle">选择底座</span>
            <el-select class="" v-model="deviceId" placeholder="请选择底座" :disabled="!enabledReport">
              <el-option
              v-for="(obj, index) in deskList"
              :key="index"
              :label="obj.device_name"
              :value="obj.device_id">
              </el-option>
            </el-select>
          </div>
          <div class="item-form">
            <span class="itemTitle">选择房型</span>
            <div>
            <el-checkbox-group v-model="roomType">
              <el-checkbox v-for="room in roomTypeList" :key="room.pms_id" :label="room.pms_id">{{room.name}}</el-checkbox>
            </el-checkbox-group>
            </div>
          </div>
          <div class="item-form transfer" >
            <span class="itemTitle">关联房号</span>
            <el-transfer filterable :titles=transferListName filter-placeholder="请输入房间号" v-model="filterRoomNo" :data="roomNoList" :disabled="!enabledReport">
            </el-transfer>
          </div>
          <div class="item-form">
            <span class="itemTitle">说明</span>
            <el-input class="" v-model="descrption" placeholder="本旅业的相应描述" :disabled="!enabledReport"></el-input>
          </div>
          <div class="item-form">
            <span class="itemTitle">自动上传配置项</span>
            <el-switch
            v-model="autoReport"
            on-color="#13ce66"
            off-color="#ff4949" :disabled="!enabledReport">
            </el-switch >
          </div>
          <div class="item-form">
            <span class="itemTitle">是否开启</span>
            <el-switch
            v-model="enabledReport"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
          </div>
        </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog=false">取 消</el-button>
            <el-button type="primary" @click="modifyMoreLvyes" :disabled="!validateSaveBtn">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
    import tool from '@/assets/tools/tool.js'
    export default {
        name: 'moreLvyeConfig',
        data () {
            return {
                page: 1,
                size: 20,
                total: 0,
                roomType:[],
                roomTypeList:[],
                roomNoList: [],
                filterRoomNo: [],
                transferListName: ['所有房号', '已选房号'],
                deskList:[],
                setTip:false,
                reportType:'',
                moreLyReportTypeValue: '',
                moreLyReportTypeList: [{name: "数据库交换", value: "MIDDLE_BASE"}, {
                    name: "文件交换",
                    value: "FILE_EXCHANGE"
                }, {name: "云端上传", value: "CLOUD"}],
                moreLvyeList: [],
                id:'',
                enabledReport:true,
                autoReport:true,
                descrption:'',
                renderDeskList:[],
                lvyeId:'',
                reportChannel:'',
                deviceId:'',
                lvyeName:'',
                transitParam:'',
                lvyeTypeList:[],
                showDialog: false,
            }
        },
        watch:{
            roomType(val){
                if(val){
                    console.log(888)
                    this.changeRoomType()
                }
            }

        },
        computed: {
            groupId () {
                return this.$route.params.id
            },
            hotelId () {
                return this.$route.params.hotelid
            },
            validateSaveBtn(){
                if(tool.isNotBlank(this.lvyeName)&&tool.isNotBlank(this.reportChannel)&&tool.isNotBlank(this.reportType)&&tool.isNotBlank(this.lvyeId)&&tool.isNotBlank(this.filterRoomNo)&&tool.isNotBlank(this.deviceId)){
                    if(!(this.reportChannel == 'CLOUD' || this.reportChannel == 'WUHAN'|| this.reportChannel == 'SUZHOU' ) ){
                       return tool.isNotBlank(this.transitParam)
                    }else {
                        return true;
                    }
                }else {
                    return false
                }
           }
        },
        methods: {
            ...mapActions ([
                'goto',
                'showtoast',
                'getlvyeTypeList',
                'getDeskList',
                'deleteMoreLvye',
                "searchRoomType",
                "searchRoomNo",
                'getMoreLvye',
                'modifyMoreLvye'
            ]),
            //获取旅业类型列表
            getlvyeTypeLists() {
                this.getlvyeTypeList({
                    onsuccess: body => (this.lvyeTypeList = [...body.data])
                })
            },
            //关闭弹窗，取消按钮
            handleClose(){

            },
            //添加多旅业
            addMoreLvye(){
                this.showDialog=true;
                this.getRoomTypeList();
                this.id="",
                this.lvyeName= "",
                this.reportChannel= "",
                this.reportType= "",
                this.device_id="",
                this.lvyeId= "",
                this.transitParam= "",
                this.descrption= "",
                this.autoReport= true,
                this.enabledReport= true,
                this.filterRoomNo=[],
                this.roomType=[],
                this.roomNoList=[],
                this.deviceId=''
            },
            //选房型联动选房间
            changeRoomType(){
                console.log('监听了')
                this.roomNoList = [];
                this.searchRoomNo ({
                    hotel_id: this.$route.params.hotelid,
                    body: {
                        "lvye_config_id":this.id ||'',       //多旅业id，新增传空字符串
                        "room_type": this.roomType||[]
                    },
                    onsuccess: body => {
                        if(body.data==null){
                            console.log("没有选房型");
                        }
                        if (body.data&&body.data!=null) {
                            console.log('有房型');
                            body.data.forEach ((i, index) => {
                                // console.log(i+"进来了")
                            this.roomNoList.push ({label: i, key: i});
                            })
                        };
                        console.log ('联动查供选择的房间号列表：',body.data);
                    }
                });
            },
            //查询房型
            getRoomTypeList() {
                this.searchRoomType ({
                    hotel_id: this.$route.params.hotelid,
                    onsuccess: body => {
                        //先查所有房型列表，再赋值已选房型，方便查房型的pmsId,pmsId用于监听联动查房间号
                        this.roomTypeList = body.data;
                        console.log ('罗列房型：' + JSON.stringify (this.roomTypeList))
                    }
                });
            },
            //查询旅业里的底座设备
            getDeskLists() {
                this.getDeskList({
                    hotel_id: this.$route.params.hotelid,
                    onsuccess: body => {
                        (this.deskList = [...body.data]);
                    }
                })
            },
            //获取多旅业列表
            getMoreLvyeList() {
                this.getMoreLvye({
                    hotel_id: this.$route.params.hotelid,
                    onsuccess:body=>{
                        this.moreLvyeList=body.data;
                        console.log('多旅业列表：',this.moreLvyeList);
                    }
                })
            },
            //修改多旅业数据（新增或保存）
            modifyMoreLvyes() {
                let lvyeData={
                "id":this.id,
                "lvye_name":this.lvyeName, //旅业名称
                "report_channel":this.reportChannel, //旅业通道
                "report_type":this.reportType, //旅业类型
                "lvye_id":this.lvyeId, //酒店公安id
                "transit_param":this.transitParam,   //公安参数
                "room_no":this.filterRoomNo,   //关联房号 值为房间号
                "descrption":this.descrption,   //说明
                "auto_report": this.autoReport===true?1:0,
                "enabled_report":this.enabledReport===true?1:0,
                "device_id":this.deviceId
                }
                this.modifyMoreLvye({
                    hotel_id: this.$route.params.hotelid,
                    data:lvyeData,
                    onsuccess: body => {
                        this.showDialog = false;
                        this.getMoreLvyeList();
                    }
                })
            },
            //列表编辑
            goEdit(obj){
                this.showDialog=true;
                this.roomType=obj.room_type;
                this.id=obj.id;
                this.lvyeName=obj.name; //旅业名称
                this.reportChannel=obj.report_channel; //旅业通道
                this.reportType=obj.report_type; //旅业类型
                this.lvyeId=obj.lvye_id; //酒店公安id
                this.transitParam=obj.transit_param;   //公安参数
                this.filterRoomNo=obj.room_no;   //已选房号 值为房间号
                this.descrption=obj.descrption;   //说明
                this.autoReport=obj.auto_report==1?true:0;
                this.enabledReport=obj.enabled_report==1?true:0;
                this.deviceId=obj.device_id;
                console.log('hhhh:',this.roomType)
                this.getRoomTypeList();
            },
            //删除多旅业项
            goDel(obj) {
                    this.deleteMoreLvye({
                        lvyeId: obj.id,
                        onsuccess: body => {
                            this.getMoreLvyeList();
                        }
                    });
                }
        },
        mounted () {
            this.getlvyeTypeLists();
            this.getMoreLvyeList ();
            this.getDeskLists()
        }
    }
</script>
<style lang="less" scoped>
  .module-wrapper {
    padding: 1rem;
    .content_moreLvye {
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
          padding: 0 2.5rem;
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
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          height: 36px;
        }
        .el-dialog__body {
          padding: 0 15rem 0 2.5rem;
          .morelvye {
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
              margin-top: 1rem;
              margin-bottom: 1rem;
              .itemTitle {
                display: inline-block;
                min-width: 6rem;
              }
              .el-select {
                width: 100%;
                .el-option {
                  width: 50%;
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
          .morelvye:not(:last-child) {
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
