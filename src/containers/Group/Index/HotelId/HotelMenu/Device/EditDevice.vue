<template>
  <div>
    <div class="module-wrapper">
      <div>
        <span>所属品牌</span>
        <el-select class="el-right" v-model="deviceType" placeholder="请选择设备类型">
          <el-option
            v-for="(obj, index) of deviceTypeList"
            :key="obj.id"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-msg">
        <span>设备ID</span>
        <el-input class="el-right" v-model="deviceId" placeholder="请输入该设备ID"></el-input>
      </div>
      <div>
        <span>是否开启</span>
        <el-switch
          v-model="enabled"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </div>
      <div v-if="isAdd">
        <el-button type="success" :disabled="submitDisabled" @click.native="addDevice">确认添加</el-button>
      </div>
      <div v-else>
        <el-button type="success" :disabled="submitDisabled" @click.native="modifyDevice">确认修改</el-button>
        <el-button type="danger" @click.native="removeDevice">删除设备</el-button>
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
        deviceType: '',
        enabled: true,
        deviceTypeList: [{id: '31', name: '底座'}, {id: '32', name: '底座PAD'}]
      }
    },
    computed: {
      submitDisabled() {
        if (this.deviceId == '' || this.deviceType == '' || this.$route.params.id == '' || this.$route.params.hotelid == '')
          return true;
        return false;
      }
    },
    methods: {
      ...mapActions([
        'addDevice',
        'getDevice',
        'modifyDevice',
        'removeDevice'
      ]),
      addDevices() {
        if (this.submitDisabled) return;
        this.addDevice({
          group_id: this.$route.params.id,
          hotel_id: this.$route.params.hotelid,
          device_id: this.deviceId,
          device_type: this.deviceType,
          device_name: '',
          enabled: this.enabled ? 1 : 0,
          onsuccess: body => this.goto(-1)
        })
      },
      getDevices() {
        this.getDevice({
          device_id: this.$route.params.device_id,
          onsuccess: (body, headers) => {
            this.deviceId = body.data.device_id;
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
          device_type: this.deviceType,
          device_name: '',
          enabled: this.enabled ? 1 : 0,
          onsuccess: body => this.goto(-1)
        })
      },
      removeDevices() {
        this.modifyDevice({
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
  .content-msg {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
  .el-right {
    margin: 10px 20px;
    padding: 4px;
    width: 80%;
  }
</style>
