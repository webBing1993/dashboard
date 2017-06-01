<template>
  <div>
    <div class="module-wrapper">
      <h3>设备管理</h3>
      <el-button type="success" @click.native="edit">添加设备</el-button>
      <table-device :list="list" @edit="edit"></table-device>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeviceList',
    data() {
      return {
        list: [
          {                                                                                
            "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
            "device_id":"f86cf4b3155011e78ece0bb05596f0f1",
            "device_type":"31",//31底座、32底座PAD
            "device_name":"设备名称",
            "enabled":1,  //1可用0禁用
            "created_time":"2017-04-28 17:21:37"
          }
        ]
      }
    },
    methods: {
      edit(obj) {
        //这里需要判断是否有group_id,再决定跳哪个路由
        this.$router.push({
          name: 'EditDevice',
          // query: {
          //   device_id: obj && obj.device_id ? obj.device_id : ''
          // }
        })
        // this.$router.push({
        //   name: 'GroupEditDevice',
        //   query: {
        //     device_id: obj && obj.device_id ? obj.device_id : ''
        //   }
        // })
      }
    }
  }
</script>