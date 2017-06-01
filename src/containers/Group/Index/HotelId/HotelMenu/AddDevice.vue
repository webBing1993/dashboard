<template>
  <div>
    <div class="module-wrapper">
      <div>
        <span>所属品牌</span>
        <el-select class="el-right" v-model="deviceType" placeholder="请选择设备类型">
          <el-option
            v-for="(obj, index) of deviceTypeList"
            :key="obj.device_id"
            :label="obj.device_type"
            :value="obj.device_id">
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
      <el-button type="success" @click.native="addDevice">确认添加</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddDevice',
    data() {
      return {
        deviceId: '',
        deviceType: '',
        enabled: 1,
        deviceTypeList: [
          {                                                                                
            "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
            "device_id":"f86cf4b3355011e78ece0bb05596f0f1",
            "device_type":"31",//31底座、32底座PAD
            "device_name":"设备名称",
            "enabled":1,  //1可用0禁用
            "created_time":"2017-04-28 17:21:37"
          },{                                                                                
            "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
            "device_id":"f86cf4b3155011e78ece0bb05596f0f1",
            "device_type":"32",//31底座、32底座PAD
            "device_name":"设备名称",
            "enabled":1,  //1可用0禁用
            "created_time":"2017-04-28 17:21:37"
          }
        ]
      }
    },
    methods: {
      addDevice() {
        
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
