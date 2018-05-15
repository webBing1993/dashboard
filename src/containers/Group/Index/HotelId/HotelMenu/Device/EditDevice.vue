<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>设备类型</span>
        <el-select class="el-right" v-model="deviceType" placeholder="请选择设备类型" @change="_changeDeviceType">
          <el-option

            v-for="(obj, index) of deviceTypeList"
            :key="obj.target_type_code"
            :label="obj.type_name"
            :value="obj.target_type_code">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <span>设备ID</span>
        <el-input :disabled="!isAdd" class="el-right" v-model="deviceId" placeholder="请输入该设备ID"></el-input>
      </div>
      <div class="content-item">
        <span>设备名称</span>
        <el-input class="el-right" v-model="deviceName" placeholder="请输入该设备名称"></el-input>
      </div>
      <div class="content-item" v-if="deviceType!==''">
        <span>配对设备</span>
        <el-select class="el-right" v-model="partnerIdTemp" placeholder="请选择配对设备">
          <el-option
            v-for="(obj, index) of partnerIdListTemp"
            :key="obj.value"
            :label="obj.value"
            :value="obj.value">
          </el-option>
        </el-select>
      </div>

      <div class="content-item" v-if="deviceType!==''">
        <span>电脑MAC地址</span>
        <el-input class="el-right" v-model="MacAdress" placeholder="请输入电脑MAC地址"></el-input>
      </div>

      <div class="content-item">
        <span>是否开启</span>
        <el-switch
          v-model="enabled"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </div>
      <div class="content-item" v-show="deviceType==='32'">
        <span>是否在pad上显示设备名称</span>
        <el-switch
          v-model="isShowDeviceNameOnPad"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </div>
      <div v-if="isAdd" class="content-btn">
        <el-button class="btn-red" :disabled="submitDisabled" @click.native="goto(-1)">取消</el-button>
        <el-button class="btn-green" :disabled="submitDisabled" @click.native="addDevices">确认添加</el-button>
      </div>
      <div v-else class="content-btn">
        <el-button class="btn-red" @click.native="showDeleteDialog = true">删除设备</el-button>
        <el-button class="btn-yellow" :disabled="submitDisabled" @click.native="unlink">解除酒店关联</el-button>
        <el-button class="btn-green" :disabled="submitDisabled" @click.native="modifyDevices">确认修改</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="showDialog"
      >
        <h1>确定解除酒店关联？</h1>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="showDeleteDialog"
      >
        <h1>确定删除设备？</h1>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDeleteDialog = false">取 消</el-button>
          <el-button type="primary" @click="removeDevices">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'EditDevice',
    data() {
      return {
        showDialog: false,
        showDeleteDialog: false,
        isAdd: true,
        deviceId: '',
        deviceName: '',
        MacAdress: '',
        deviceType: '',
        enabled: true,
        deviceTypeList: [],
//        deviceList: [
//            {
//          "id": "5fa04bd348394a568b67aa56a1a61029",
//          "type": "22",
//          "name": "107底座",
//          "enabled": true,
//          "partner_name": "107pad",
//          "partner_id": "6efa1c7efcda81013cdb97e7168aaa0a"
//        },
//          {
//          "id": "6efa1c7efcda81013cdb97e7168aaa0a",
//          "type": "22",
//          "name": "107pad",
//          "enabled": true,
//          "partner_name": "107底座",
//          "partner_id": "5fa04bd348394a568b67aa56a1a61029"
//        }, {
//          "id": "6efa1c7efcda81013cdb97e7168ccc0a",
//          "type": "22",
//          "name": "Tina_Root",
//          "enabled": true,
//          "partner_name": "开发-底座(Tina)",
//          "partner_id": "8669c4fcc26c4f4d8b7b30cbcf432fd5"
//        }, {
//          "id": "7a4275c81eb111e8b4670ed5f89f718b",
//          "type": "30",
//          "name": "底座三",
//          "enabled": true,
//          "partner_name": "",
//          "partner_id": null
//        }, {
//          "id": "8105a7894b9657d34a060d4352326a34",
//          "type": "30",
//          "name": "温德姆新设备",
//          "enabled": true,
//          "partner_name": "",
//          "partner_id": ""
//        }, {
//          "id": "8669c4fcc26c4f4d8b7b30cbcf432fd5",
//          "type": "30",
//          "name": "开发-底座(Tina)",
//          "enabled": true,
//          "partner_name": "Tina_Root",
//          "partner_id": "6efa1c7efcda81013cdb97e7168ccc0a"
//        }, {
//          "id": "8e9826bbbe9146be99bd7a6607973371",
//          "type": "21",
//          "name": "温德姆新底座",
//          "enabled": true,
//          "partner_name": "温德姆新设备",
//          "partner_id": "8105a7894b9657d34a060d4352326a34"
//        }, {
//          "id": "d58d1c8f33114d1bbb05c64f4d62d674",
//          "type": "21",
//          "name": "CESHIDIZOU1",
//          "enabled": false,
//          "partner_name": "",
//          "partner_id": null
//        }, {
//          "id": "d8db7c6c80104b278f559a49eaba6aaa",
//          "type": "21",
//          "name": "37广告机",
//          "enabled": false,
//          "partner_name": "",
//          "partner_id": null
//        }, {
//          "id": "e8c4f92b69264ebb869d948eb8d1f328",
//          "type": "22",
//          "name": "37pad",
//          "enabled": false,
//          "partner_name": "",
//          "partner_id": null
//        }],
//        deviceTypeList: [{id: '31', name: '底座'}, {id: '32', name: 'pad'}, {id: '51', name: '发票插件'},{id:'41',name:'广告机'}],
        partnerIdTemp: '',
        partnerName: '',
        isShowDeviceNameOnPad:false,
        currentDeviceId:'',
      }
    },
    computed: {
      ...mapState({
        deviceList: state => state.enterprise.deviceList,
      }),
      hotelId(){
          return this.$route.params.hotelid
      },
      submitDisabled() {
        if (this.deviceId == '' || this.deviceName == '' || this.deviceType == '' || this.$route.params.id == '' || this.$route.params.hotelid == '')
          return true;
        return false;
      },
      partnerId: {
        get() {
          if (!this.partnerIdTemp||this.deviceType=='41') return '';
          if (this.partnerIdTemp === '无') return '';
          return this.partnerIdTemp.split(' | ')[1];
        },
        set(val) {
          val && (this.partnerIdTemp = `${this.partnerName} | ${val}`);
        }
      },
//      baseList() {
//        return this.deviceList.filter(v => v.type === '31')
//      },
//      padList() {
//        return this.deviceList.filter(v => v.type === '32')
//      },
      partnerIdListTemp() {
        let partnerIdList = [];
        console.log(this.currentDeviceId)
       console.log('======',this.deviceList.filter(v => v.type === '31'))
//        if (this.deviceType === '31') {
//          partnerIdList = this.padList;
//        } else if (this.deviceType === '32') {
//          partnerIdList = this.baseList;
//        }
//
//        let list = partnerIdList.map(v => {
//          let obj = {
//            value: `${v.name} | ${v.id}`
//          }
//          return obj
//        })
//        list.unshift({value: '无'})
//        return list;
//        console.log(this.currentDeviceId)
//        console.log(this.deviceList)
//        console.log(this.deviceList.filter(v => v.type == this.currentDeviceId))
        partnerIdList=this.deviceList.filter(v => v.type == this.currentDeviceId)
        console.log(partnerIdList)
        let list = partnerIdList.map(v => {
          let obj = {
            value: `${v.name} | ${v.id}`
          }
          return obj
        })
        list.unshift({value: '无'})
        return list;
//        return this.deviceList.filter(v => v.type == this.currentDeviceId)
      }
    },
    methods: {
      ...mapActions([
        'getDeviceList',
        'getDeviceTypeList',
        'addDevice',
        'getDevice',
        'modifyDevice',
        'removeDevice',
        'goto',
        'saveIsShowPadName',
        'getShowDeviceNameStatus'
      ]),

      _changeDeviceType(obj){
          console.log('---->',this.deviceType)
          console.log(obj)
        let currentDeviceId=obj
        this.currentDeviceId=obj
        console.log('------',this.currentDeviceId)

      },

      hideDialog() {
        this.showDialog = false;
      },
      submitDialog() {
        this.modifyDevice({
          hotel_id: '',
          device_id: this.deviceId,
          device_type: this.deviceType,
          device_name: this.deviceName,
          partner_id: this.partnerId,
          enabled: this.enabled ? 1 : 0,
          onsuccess: body => {
            this.showDialog = false;
            this.goto(-1)
          }
        })
      },

      addDevices() {
          if (this.submitDisabled) return;
          this.saveIsShowPadName ({
              hotel_id: this.hotelId,
              data: this.isShowDeviceNameOnPad,
              onsuccess: body => {
                  console.log (888)
                  this.addDevice ({
                      hotel_id: this.hotelId,
                      device_id: this.deviceId,
                      device_type: this.deviceType,
                      device_name: this.deviceName,
                      partner_id: this.partnerId,
                      enabled: this.enabled ? 1 : 0,
                      onsuccess: body => {
                          this.goto (-1)
                      }
                  })
              }
          })
      },

      getDevices() {
        this.getDevice({
          device_id: this.$route.query.device_id,
          onsuccess: (body, headers) => {
            this.deviceId = body.data.id;
            this.deviceType = body.data.type;
            this.deviceName = body.data.name;
            this.partnerName = body.data.partner_name;
            this.partnerId = body.data.partner_id;
            this.enabled = body.data.enabled == 1 ? true : false;
          }
        })
      },

      modifyDevices() {
        if (this.submitDisabled) return;
          this.saveIsShowPadName ({
              hotel_id: this.hotelId,
              data: this.isShowDeviceNameOnPad,
              onsuccess: body => {
                  console.log (77)
                  this.modifyDevice({
                      device_id: this.deviceId,
                      hotel_id: this.$route.params.hotelid,
                      device_type: this.deviceType,
                      device_name: this.deviceName,
                      partner_id: this.partnerId,
                      enabled: this.enabled ? 1 : 0,
                      onsuccess: body => this.goto(-1)
                  })
              }
          })
      },

      removeDevices() {
        this.removeDevice({
          device_id: this.$route.query.device_id,
          onsuccess: body => this.goto(-1)
        })
      },

      _getDeviceTypeList(){
          this.getDeviceTypeList({
            onsuccess: (body) => {
              this.deviceTypeList=body.data
            }
          })
      },

      getList() {
        this.getDeviceList({
          hotel_id: this.$route.params.hotelid,
          // onsuccess: (body, headers) => console.log(body)
        })
      },

      unlink() {
        if (this.submitDisabled) return;
        this.showDialog = true;
      }
    },
    mounted() {
      if (this.$route.query.device_id) {
        this.isAdd = false;
        this.deviceId = this.$route.query.device_id;
        this.getDevices();
        this.getShowDeviceNameStatus({
            hotel_id:this.hotelId,
            onsuccess : (body, headers) => {
               if(body.data){
                   this.isShowDeviceNameOnPad=body.data.enabled_mirror_show_device_name==='true'?true:false
               }
            }
          });
      }
      this.getList();
      this._getDeviceTypeList();
//      if (!this.deviceList || this.deviceList.length === 0) {
//        this.getList();
//        this._getDeviceTypeList();
//      }
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    padding: 26px 45px;
    .content-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 14px;
      span {
        min-width: 100px;
        text-align: end;
        text-align: left;
      }
      .el-switch {
        margin-left: 24px;
      }
      .el-right {
        margin-left: 20px;
        padding: 4px;
        width: 80%;
      }
    }
    .content-btn {
      width: 100%;
      margin-top: 53px;
      text-align: center;
      .el-button {
        width: 173px;
        line-height: 18px;
        border-radius: 0;
        color: #ffffff;
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
  .btn-green {
    width: 173px;
    line-height: 18px;
    background-color: #39C240;
    border-color: #39C240;
    border-radius: 0;
    color: #ffffff;
  }
  .btn-red {
    width: 173px;
    line-height: 18px;
    background-color: #D0011B;
    border-color: #D0011B;
    border-radius: 0;
    color: #ffffff;
  }
  .btn-yellow {
    width: 173px;
    line-height: 18px;
    background-color: orange;
    border-color: orange;
    border-radius: 0;
    color: #ffffff;
  }
</style>
