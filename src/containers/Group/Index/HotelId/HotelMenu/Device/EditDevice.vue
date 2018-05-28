<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>设备类型</span>
        <el-select class="el-right" v-model="deviceType" placeholder="请选择设备类型" @change="_changeDeviceType">
          <el-option
            v-for="(obj, index) of deviceTypeList"
            :key="obj.type_code"
            :label="obj.type_name"
            :value="obj.type_code">
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
      <div class="content-item" v-if="deviceType!='41'&& deviceType!='51'">
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

      <!--<div class="content-item" v-if="deviceType!='41'&& deviceType!='51'">-->
        <!--<span>电脑MAC地址</span>-->
        <!--<el-input class="el-right" v-model="MacAdress" placeholder="请输入电脑MAC地址"></el-input>-->
      <!--</div>-->

      <div class="content-item">
        <span>是否开启</span>
        <el-switch
          v-model="enabled"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </div>
      <div class="content-item" v-show="currentCode==='32'">
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
        :visible.sync="showDeleteDialog">
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
        PadId: '',
        deviceId: '',
        deviceName: '',
        MacAdress: '',
        deviceType: '请选择',
        enabled: true,
        deviceTypeList: [],
        partnerIdTemp: '',
        partnerName: '',
        isShowDeviceNameOnPad: false,
        currentDeviceId: '',
        typeCode: '',


        matchList: [],
        currentCode: '',
        currentName: '',
        currentTargetCode: '',
        currentTargetName: '',
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
          if (!this.partnerIdTemp || this.deviceType == '41') return '';
          if (this.partnerIdTemp === '无') return '';
          return this.partnerIdTemp.split(' | ')[1];
        },
        set(val) {
          val && (this.partnerIdTemp = `${this.partnerName} | ${val}`);
        }
      },

      partnerIdListTemp() {
        let partnerIdList = [];
//        console.log('配对设备code',this.currentDeviceId)
        partnerIdList = this.matchList.filter(v => v.type == this.currentTargetCode)
        let list = partnerIdList.map(v => {
          let obj = {
            value: `${v.name} | ${v.id}`
          }
          return obj
        })
        list.unshift({value: '无'})
        return list;
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
          console.log(this.deviceType)
        console.log('当前设备code1', obj)
        this.currentCode=obj;
        this.deviceTypeList.map(item => {
          if (item.target_type_code == obj) {
            this.PadId = item.type_code
          }
          if (item.type_code == obj) {
            this.currentTargetCode = item.target_type_code
          }
          if(item.type_name==this.deviceType){
            this.currentCode=item.type_code
          }
        })
        console.log('当前设备code2', this.currentCode)
        console.log("配对设备Code是", this.currentTargetCode)
      },

      hideDialog() {
        this.showDialog = false;
      },

      submitDialog() {
        this.modifyDevice({
          hotel_id: '',
          device_id: this.deviceId,
//          device_type: this.deviceType,
          device_type: this.currentCode,
          device_name: this.deviceName,
          mac_address: this.MacAdress,
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
        this.saveIsShowPadName({
          hotel_id: this.hotelId,
          data: this.isShowDeviceNameOnPad,
          onsuccess: body => {
            console.log(888)
            this.addDevice({
              hotel_id: this.hotelId,
              device_id: this.deviceId,
              device_type: this.currentCode,
              device_name: this.deviceName,
              mac_address: this.MacAdress,
              partner_id: this.partnerId,
              enabled: this.enabled ? 1 : 0,
              onsuccess: body => {
                this.goto(-1)
              }
            })
          }
        })
      },


      getDevices() {
        this.getList()
        this.deviceType = [];
        this.getDevice({
          device_id: this.$route.query.device_id,
          onsuccess: (body, headers) => {
            console.log('编辑时获取的设备code', body.data.type)
            this.deviceTypeList.forEach(item => {
              if (body.data.type == item.type_code) {
                this.deviceType = item.type_name;
                this.currentTargetCode = item.target_type_code
              }
            })
//
            console.log('---->shi', this.deviceType)

            this.deviceId = body.data.id;
            this.currentCode = body.data.type;
            this.deviceName = body.data.name;
            this.MacAdress = body.data.mac_address;
            this.partnerName = body.data.partner_name;
            this.partnerId = body.data.partner_id;
            this.enabled = body.data.enabled == 1 ? true : false;
          }
        })
      },

      modifyDevices() {
        if (this.submitDisabled) return;
        console.log('确认编辑的code', this.currentCode)
        this.saveIsShowPadName({
          hotel_id: this.hotelId,
          data: this.isShowDeviceNameOnPad,
          onsuccess: body => {
            this.modifyDevice({
              device_id: this.deviceId,
              hotel_id: this.$route.params.hotelid,
//              device_type: this.deviceType,
              device_type: this.currentCode,
              device_name: this.deviceName,
              mac_address: this.MacAdress,
              partner_id: this.partnerId,
              enabled: this.enabled ? 1 : 0,
              onsuccess: body => this.goto(-1)
            })
          }
        })
      },

      removeDevices() {
        this.removeDevice({
          hotelId: this.hotelId,
          device_type:this.currentCode,
          device_id: this.$route.query.device_id,
          onsuccess: body => this.goto(-1)
        })
      },

//      获取设备类型
      _getDeviceTypeList(){
        this.deviceTypeList = []
        this.getDeviceTypeList({
          onsuccess: (body) => {
            let temp = body.data
            temp.map(item => {
              if (item.type_name == '发票插件') {
                item.target_type_code = '无配对设备1'
              } else if (item.type_name == '广告机') {
                item.target_type_code = '无配对设备2'
              }
            })
            this.deviceTypeList = temp
          }
        })
      },

//      获取配对设备
      getList(){
        this.matchList = []
        this.getDeviceList({
          hotel_id: this.$route.params.hotelid,
          onsuccess: (body) => {
            this.matchList = body.data
            console.log("配对列表", this.matchList)
          }
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
          hotel_id: this.hotelId,
          onsuccess: (body, headers) => {
            if (body.data) {
              this.isShowDeviceNameOnPad = body.data.enabled_mirror_show_device_name === 'true' ? true : false
            }
          }
        });
      }
      this.getList();
      this._getDeviceTypeList();
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
