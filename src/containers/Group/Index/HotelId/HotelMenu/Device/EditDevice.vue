<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>设备类型</span>
        <el-select class="el-right" :disabled="!isAdd" v-model="deviceType" placeholder="请选择设备类型">
          <el-option
            v-for="(obj, index) of deviceTypeList"
            :key="obj.id"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <span>设备ID</span>
        <el-input class="el-right" :disabled="!isAdd" v-model="deviceId" placeholder="请输入该设备ID"></el-input>
      </div>
      <div class="content-item">
        <span>设备名称</span>
        <el-input class="el-right" :disabled="!isAdd" v-model="deviceName" placeholder="请输入该设备名称"></el-input>
      </div>
      <div class="content-item">
        <span>是否开启</span>
        <el-switch
          v-model="enabled"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </div>
      <div v-if="isAdd" class="content-btn">
        <el-button type="success" :disabled="submitDisabled" @click.native="addDevices">确认添加</el-button>
      </div>
      <div v-else class="content-btn">
        <el-button type="danger" @click.native="removeDevices">删除设备</el-button>
        <el-button type="success" :disabled="submitDisabled" @click.native="modifyDevices">确认修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'EditDevice',
    data() {
      return {
        isAdd: true,
        deviceId: '',
        deviceName: '',
        deviceType: '',
        enabled: true,
        deviceTypeList: [{id: '31', name: '底座'}, {id: '32', name: '魔镜'}, {id: '51', name: '发票插件'}]
      }
    },
    computed: {
      submitDisabled() {
        if (this.deviceId == '' || this.deviceName == '' || this.deviceType == '' || this.$route.params.id == '' || this.$route.params.hotelid == '')
          return true;
        return false;
      }
    },
    methods: {
      ...mapActions([
        'addDevice',
        'getDevice',
        'modifyDevice',
        'removeDevice',
        'goto'
      ]),
      addDevices() {
        if (this.submitDisabled) return;
        this.addDevice({
          group_id: this.$route.params.id,
          hotel_id: this.$route.params.hotelid,
          device_id: this.deviceId,
          device_name: this.deviceName,
          device_type: this.deviceType,
          enabled: this.enabled ? 1 : 0,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      getDevices() {
        this.getDevice({
          device_id: this.$route.query.device_id,
          onsuccess: (body, headers) => {
            this.deviceId = body.data.device_id;
            this.deviceName = body.data.device_name;
            this.deviceType = body.data.device_type;
            this.enabled = body.data.enabled == 1 ? true : false;
          }
        })
      },
      modifyDevices() {
        if (this.submitDisabled) return;
        this.modifyDevice({
          old_device_id: this.$route.query.device_id,
          group_id: this.$route.params.id,
          hotel_id: this.$route.params.hotelid,
          device_id: this.deviceId,
          device_name: this.deviceName,
          device_type: this.deviceType,
          enabled: this.enabled ? 1 : 0,
          onsuccess: body => this.goto(-1)
        })
      },
      removeDevices() {
        this.removeDevice({
          device_id: this.$route.query.device_id,
          onsuccess: body => this.goto(-1)
        })
      },
    },
    mounted() {
      if (this.$route.query.device_id) {
        this.isAdd = false;
        this.deviceId = this.$route.query.device_id;
        this.getDevices();
      }
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
        min-width: 68px;
        text-align: end;
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
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        color: #ffffff;
        &:nth-child(1) {
          background-color: #D0011B;
          border-color: #D0011B;
        }
      }
    }
  }
</style>
