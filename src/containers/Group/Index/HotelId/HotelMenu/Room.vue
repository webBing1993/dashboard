<template>
  <div>
    <div class="module-wrapper">
      <h3>数据源</h3>
      <p>当前门店楼宇房间信息来自PMS系统，上次同步时间：2017/06/01 23:33 。</p>
      <el-button type="success">PMS同步数据</el-button>
      <el-button type="success">添加房间(非对接PMS)</el-button>
      <table-room :list="list" @edit="edit"></table-room>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Room',
    data() {
      return {
        list: [
          {
            "room_id":"00090117c8dc4c68ac1d5cd343cb59a4",
            "building_name":"1号楼", 
            "floor_name":"2层楼",
            "room_num":"0201",  
            "room_type_name":"大床房",
            "roomfeature_desc":"无烟,朝南"
          }
        ]
      }
    },
    methods: {
      edit(obj) {

      }
    }
  }
</script>